const schoolTitle = document.getElementById("schoolTitle");
const schoolInfo = document.getElementById("schoolInfo");
let currentPage;

let teacherList = [];
let studentList = [];
let studentListAll = [];
let teachersListArr = [];

async function fetchCommunityData() {
  await fetch("/student/community", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      teachersListArr = data.teachers;
      teacherList = data.teachers;
      studentListAll = data.schoolmates;
      schoolTitle.textContent = data.name;
      appendSchoolContent(data.info);
    });
}

fetchCommunityData();

const appendSchoolContent = (content) => {
  schoolInfo.textContent = content;
};

function enclose(val) {
  var data = "'" + val + "'";
  return data;
}
// Get the element with id="defaultOpen" and click on it
function openTab(evt, gradeTab) {
  console.log("Appending teachers data...");
  var i, sidemenu, sidelink, gradeLevel, grade, level, container;
  sidemenu = document.getElementsByClassName("sidemenu");
  for (i = 0; i < sidemenu.length; i++) {
    sidemenu[i].style.display = "none";
  }
  sidelink = document.getElementsByClassName("sidelink");
  for (i = 0; i < sidelink.length; i++) {
    sidelink[i].className = sidelink[i].className.replace(" active", "");
  }

  document.getElementById(gradeTab).style.display = "block";
  evt.currentTarget.className += " active";
  // NOTE: remove this one cause buttons in Teachers, and Schoolmates conflicts with this codeblock.
  // Better to remove disabling of buttons when clicked  for now.
  // evt.currentTarget.disabled = true;
  // for (var x = 1; x <= 10; x++) {
  //   if (String(x) !== evt.currentTarget.value) {
  //     var val = "bt" + String(x);
  //     document.getElementById(val).disabled = false;
  //   }
  // }

  if (
    gradeTab === "Grade1" ||
    gradeTab === "Grade2" ||
    gradeTab === "Grade3" ||
    gradeTab === "Grade4" ||
    gradeTab === "Grade5" ||
    gradeTab === "Grade6" ||
    gradeTab === "Grade7" ||
    gradeTab === "Grade8" ||
    gradeTab === "Grade9" ||
    gradeTab === "Grade10"
  ) {
    container = document.getElementById(gradeTab.toLowerCase());
    container.innerHTML = ""; // reset container elements to avoid duplication
    gradeLevel = gradeTab;
    grade = gradeTab;
    level = grade.substr(5, 6);
    gradeLevel = gradeLevel.substr(0, 5) + " " + level;
  }

  teacherList.forEach((result) => {
    console.log("result.gradeLevel: ", result.gradeLevel);
    console.log("level: ", gradeTab);
    if (level == result.gradeLevel) {
      // Create card element
      const card = document.createElement("div");
      card.classList = "card-body";
      // Construct card content
      //temporary image holder.

      // let subject = Object.values(result.subject).join(", ");
      const content = `
      <div class="card card--small">
        <div class="card__container">
          <div class="card__header">
            <div class="card__img-container">
              <img
                class="card__img h-20 w-20 mx-auto mb-3"
                src="https://www.shareicon.net/data/256x256/2016/09/15/829453_user_512x512.png" 
                alt="Profile Image"
              />
            </div>
            <p class="h2 text-primary">${result.firstName} ${result.middleName[0]}. ${result.familyName}</p>
            <p class="text-primary-accent">${result.subjects}</p>
            <p class="h4">${gradeLevel} Teacher</p>
            <p class="text-sm">
            ${result.resources.length} gamified modules
            </p>
          </div>
        </div>
      `;

      container.innerHTML += content;
    }
  });

  if (container) {
    container.innerHTML +=
      container.children.length === 0
        ? "No teachers registered at this grade level yet."
        : "";
  }

  console.log("Current page", currentPage);
  if (currentPage === "Schoolmates") {
    openSchoolmatesList(evt, gradeTab);
  }

  console.log(" Teachers data appended...");
}

function openSchoolmatesList(evt, gradeTab) {
  gradeLevel = gradeTab[0] + (gradeTab[1] === "0" ? "0" : "");

  console.log("Schoolmates!", gradeTab);
  var i,
    sidemenu,
    sidelink,
    classlistcontainer,
    classlistgirlscontainer,
    maleCtr = 0,
    femaleCtr = 0;
  sidemenu = document.getElementsByClassName("sidemenu");
  for (i = 0; i < sidemenu.length; i++) {
    sidemenu[i].style.display = "none";
  }
  sidelink = document.getElementsByClassName("sidelink");
  for (i = 0; i < sidelink.length; i++) {
    sidelink[i].className = sidelink[i].className.replace(" active", "");
  }
  document.getElementById(gradeTab).style.display = "block";
  evt.currentTarget.className += " active";

  classlistcontainer = document.getElementById(
    gradeTab.toLowerCase() + "schoolmates"
  );

  let femalecontainer = gradeTab.toLowerCase() + "schoolmates" + "female";
  console.log("femailCont", femalecontainer);
  classlistgirlscontainer = document.getElementById(femalecontainer);

  classlistcontainer.innerHTML = ""; // reset before generating
  classlistgirlscontainer.innerHTML = ""; // reset before generating

  studentListAll.forEach((result) => {
    if (result.gradeLevel == gradeLevel) {
      // Create card element
      const card = document.createElement("div");
      card.classList = "card-body";
      // Construct card content
      //temporary image holder. Please do the necessary modifications once
      // db data is retrieved
      if (result.gender.toLowerCase() == "male") {
        const content = `<p>${maleCtr + 1}. ${result.firstName} ${
          result.familyName
        }</p>
      <br/> 
      `;
        // Append newyly created card element to the container
        classlistcontainer.innerHTML += content;
        maleCtr++;
      } else {
        const contentFemale = `<p>${femaleCtr + 1}. ${result.firstName} ${
          result.familyName
        }</p>
      <br/> 
      `;
        classlistgirlscontainer.innerHTML += contentFemale;
        femaleCtr++;
      }
    }
  });

  // add placeholder text if class list is empty
  classlistcontainer.innerHTML +=
    classlistcontainer.children.length === 0
      ? "No registered boy schoolmates."
      : "";
  classlistgirlscontainer.innerHTML +=
    classlistgirlscontainer.children.length === 0
      ? "No registered girl schoolmates."
      : "";
}

function openPage(pageName, elmnt, color) {
  currentPage = pageName;
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
