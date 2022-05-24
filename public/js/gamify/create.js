const dropArea = document.getElementById("dropArea");
const dropAreaText = document.getElementById("dropAreaText");
const browseBtn = document.getElementById("browseBtn");
const gamifyBtn = document.getElementById("gamifyBtn");
const browseInput = document.getElementById("browseInput");
const body = document.querySelector("body");
const contentPreview = document.getElementById("contentArea");
const resultText = document.getElementById("resultText");
const clearBtn = document.getElementById("clearBtn");
const uploadList = document.getElementById("uploadList");
const uploadListRefreshBtn = document.getElementById("uploadListRefreshBtn");
const htmlContent = document.getElementById("htmlContent");
const pages = document.getElementById("pages");

body.addEventListener("dragover", (event) => {
  event.preventDefault();
});

let file;

browseBtn.onclick = () => {
  browseInput.click();
};

browseInput.addEventListener("change", function () {
  file = this.files[0];
  uploadFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropAreaText.textContent = "Release to Upload File";
  dropArea.classList.add("drag-active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Drag and Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Release to Upload File";
  file = event.dataTransfer.files[0];
  uploadFile();
});

gamifyBtn.addEventListener("click", () => {
  fetch("./file", {
    method: "get",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      pages.value = data.pages;
      appendHTML(data.htmlContents);
      linkValidIFrames();
      htmlContent.textContent = contentPreview.innerHTML;
    })
    .catch((err) => {
      console.log(err);
    });
});

clearBtn.addEventListener("click", (event) => {
  deleteFile();
  getAndShowUploadedFiles();
});

uploadListRefreshBtn.addEventListener("click", (e) => {
  getAndShowUploadedFiles();
});

const appendHTML = (html) => {
  contentPreview.innerHTML = html;
};

const uploadFile = () => {
  const formData = new FormData();

  formData.append("file", file);

  fetch("./file", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    })
    .then((data) => {
      if (data.status == "success") {
        resultText.value = data.file.name;
        getAndShowUploadedFiles();
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      resultText.value = err.message;
      console.log(err);
    });
};

const deleteFile = () => {
  console.log("Deleting files...");
  fetch("./file", {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete file.");
      }

      console.log("Done");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const removeAllChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const getAndShowUploadedFiles = () => {
  console.log("Getting uploaded files...");
  if (uploadList.children.length > 0) {
    removeAllChildren(uploadList);
  }

  fetch("./file-upload-list", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((file) => {
        const jsonString = JSON.parse(file);
        let li = document.createElement("li");
        li.textContent = jsonString.name;
        uploadList.appendChild(li);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const linkValidIFrames = () => {
  // all tags in mobile preview
  const aTagList = contentPreview.querySelectorAll("a");
  console.log("aTagList", aTagList);

  aTagList.forEach((element) => {
    try {
      const domain = new URL(element.textContent);
      if (domain.hostname == "www.youtube.com") {
        console.log(domain.hostname);
        addYoutubeIFrame(element);
      }
    } catch (err) {
      console.log(err.message);
    }
  });
};

const addYoutubeIFrame = (element) => {
  const ytId = getYoutubeVideoId(element.textContent);
  const iFrameHTML =
    '<iframe class="w-full" width="560" height="315" src="https://www.youtube.com/embed/' +
    ytId +
    '" frameborder="0" allowfullscreen></iframe>';
  element.innerHTML += iFrameHTML;
  console.log("iFrame created successfully.");
};

// https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
function getYoutubeVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

getAndShowUploadedFiles();
