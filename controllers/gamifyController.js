const path = require("path");
const mammoth = require("mammoth");
const fs = require("fs");

const LearningResource = require("../models/learningResource");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
let isOffline;

// check internet connection
require("dns").resolve("www.google.com", function (err) {
  if (err) {
    console.log("No connection");
    isOffline = true;
  } else {
    console.log("Connected");
    isOffline = false;
  }
});

const gamify_index = (req, res) => {
  console.log("Gamify index...");

  if (isOffline) {
    console.log("App is currently running offline...");
    console.log("Cannot retrieve learning resources from DB...");
    res.render("gamify/index", {
      title: "All Learning Resources",
      resources: [],
      offline: true,
    });
  } else {
    console.log("App is currently running online...");
    console.log("Retrieving learning resources from DB...");
    if (req.session.user.role.toLowerCase() == "admin") {
      LearningResource.find()
        .sort({ createdAt: -1 })
        .then((result) => {
          console.log("Number of Learning Resources: ", result.length);
          res.render("gamify/index", {
            title: "All Learning Resources",
            resources: result,
            offline: false,
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("404", { title: "Sorry, something went wrong." });
        });
    } else {
      LearningResource.find({ ownerId: req.session.user.profile })
        .sort({ createdAt: -1 })
        .then((result) => {
          console.log("Number of Learning Resources: ", result.length);
          res.render("gamify/index", {
            title: "All Learning Resources",
            resources: result,
            offline: false,
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("404", { title: "Sorry, something went wrong." });
        });
    }
  }
};

const gamify_create_get = async (req, res) => {
  console.log("Gamify create...");
  console.log("session profile", req.session.user.role.toLowerCase());
  console.log("Retrieving user profile from DB...");

  /**
   * Handle error if admin or unknown user creates the resource
   */
  if (
    req.session.user.role.toLowerCase() == "na" ||
    req.session.user.role.toLowerCase() == "admin"
  ) {
    console.log("Profile not available, sending public user credentials...");
    return res.render("gamify/create", {
      title: "Gamify Create",
      user: {
        _id: "xxxadminxxx",
        familyName: "Community",
        middleName: "X",
        firstName: "GoGamify",
      },
    });
  } else if (req.session.user.role.toLowerCase() == "student") {
    console.log("Student profile...");
    await Student.findById(req.session.user.profile, (err, doc) => {
      if (err) {
        console.log("Error while accessing the document.");
        console.log(err);
      } else {
        return res.render("gamify/create", {
          title: "Gamify Create",
          user: doc,
        });
      }
    })
      .clone()
      .catch((err) => {
        console.log("Retrieval failed.");
        console.log(err);
      });
  } else if (req.session.user.role.toLowerCase() == "teacher") {
    console.log("Teacher profile...");
    await Teacher.findById(req.session.user.profile, (err, doc) => {
      if (err) {
        console.log("Error while accessing the document.");
        console.log(err);
      } else {
        // console.log("doc target", doc);
        return res.render("gamify/create", {
          title: "Gamify Create",
          user: doc,
        });
      }
    })
      .clone()
      .catch((err) => {
        console.log("Retrieval failed.");
        console.log(err);
      });
  } else {
    console.log("An error occured.");
    res.redirect("/home");
  }
};

const gamify_file_post = (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  console.log("Requesting...");
  const extensionName = path.extname(file.name);
  const allowedExtension = [".docx"];
  const targetPath = path.join(
    __dirname,
    "..",
    "public/uploads/gamify",
    file.name
  );
  console.log("target path: " + targetPath);

  if (!allowedExtension.includes(extensionName)) {
    // return res.status(422).send("Invalid file.");
    return res.status(422).send({
      status: "failed",
      message: "Invalid file.",
    });
  }

  file.mv(targetPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    readUploadFolderContents();
    return res.send({
      status: "success",
      message: "File was uploaded successfully.",
      file: file,
      path: targetPath,
    });
  });
};

const uploadFolder = path.join(__dirname, "..", "public/uploads/gamify");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

let uploadFolderContents = fs.readdirSync(uploadFolder);

const readUploadFolderContents = () => {
  uploadFolderContents = fs.readdirSync(uploadFolder);
};

var htmlContents = "";

const gamify_file_get = async (req, res) => {
  gamifiedObj = {};
  htmlContents = "";

  readUploadFolderContents();
  await parseAllHtml();

  gamifiedObj.htmlContents = htmlContents;
  gamifiedObj.pages = uploadFolderContents.length;

  await res.send(JSON.stringify(gamifiedObj));
};

const options = {
  // reserve  H1 conversions (right-side arrows) for specific page titles for semantic meaning
  // so style conversions for title headers starts with H2
  styleMap: [
    "p[style-name='Heading 1'] => h1:fresh",
    "p[style-name='Heading 2'] => h2:fresh",
    "p[style-name='Heading 3'] => h3:fresh",
    "p[style-name='Heading 4'] => h4:fresh",
    "p[style-name='Heading 5'] => h5:fresh",
    "p[style-name='Heading 6'] => h6.:fresh",
    "p => p:fresh",
  ],
  ignoreEmptyParagraphs: true,
};

const parseHtml = (file) => {
  return mammoth
    .convertToHtml({ path: `${uploadFolder}/${file}` }, options)
    .then(function (result) {
      let html = result.value;
      // var messages = result.messages;
      htmlContents += `<!-- module -->`; // serves as separator string for module isolation
      htmlContents += `<div class="module">`;
      htmlContents += html;
      htmlContents += `</div>`;
    });
};

const parseAllHtml = async () => {
  readUploadFolderContents();
  console.log("Size: " + uploadFolderContents.length);
  for (const file of uploadFolderContents) {
    console.log("File to parse: " + file.name);
    await parseHtml(file);
  }

  console.log("All files have been parsed...");
};

const gamify_file_delete = async (req, res) => {
  readUploadFolderContents();
  for (const file of uploadFolderContents) {
    const target = path.join(uploadFolder, file);
    fs.unlink(target, () => {
      console.log("Successfully deleted: " + target);
    });
  }

  res.send("Uploaded files deleted successfully.");
};

const gamify_file_list_get = async (req, res) => {
  let uploadedItems = [];
  readUploadFolderContents();
  for (const file of uploadFolderContents) {
    const fileDIR = path.join(uploadFolder, file);
    let fileInfo = {};
    fileInfo.name = file;
    fileInfo.extension = path.extname(fileDIR);

    fs.stat(fileDIR, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      fileInfo.size = data.size;
    });
    const json = JSON.stringify(fileInfo);
    console.log(json);
    uploadedItems.push(json);
  }
  console.log("Uploaded items: ", uploadedItems);
  await res.send(uploadedItems);
};

module.exports = {
  gamify_index,
  gamify_create_get,
  gamify_file_post,
  gamify_file_get,
  gamify_file_delete,
  gamify_file_list_get,
};
