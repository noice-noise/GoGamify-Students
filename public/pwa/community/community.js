//This is just dummy data. Once the app can retrieve data to be used here from the DB, please
// do the necessary modifications.
const teacherList = [
  {
    subject: "English",
    teacherName: "Ms.Cristina Dela Cruz",
    email: "cristinadelacruz@gmail.com",
  },
  {
    subject: "Filipino",
    teacherName: "Mr.Angelo Garcia",
    email: "angelogarcia@gmail.com",
  },
  {
    subject: "Mother Tongue",
    teacherName: "Mr.Juan Carlos Reyes",
    email: "juancarlosreyes@gmail.com",
  },
  {
    subject: "Mathematics",
    teacherName: "Mrs.Maria Erica Ramos",
    email: "mariaericaramos@gmail.com",
  },
  {
    subject: "Aralin Panlipunan",
    teacherName: "Ms.Anna Santos",
    email: "annasantos@gmail.com",
  },
  {
    subject: "Values Education",
    teacherName: "Ms.Anna Santos",
    email: "annasantos@gmail.com",
  },
  {
    subject: "MAPEH",
    teacherName: "Mr.Ricardo Sanchez",
    email: "ricardosanchez@gmail.com",
  },
]

const studentList = [
  "Joe Charles Allen",
  "James Robert Anderson",
  "Thomas Brent Arnold",
  "Frank Beard",
  "Kenneth Michael Beeson",
  "Jerry Wayne Bliss",
  "Johnny Card",
  "Eduard Allen Dixon",
  "Jepoy Dizon",
  "Jose Moreno",
]
const studentListAll = [
  {
    name: "Joe Charles Allen",
    gender: "m",
  },
  {
    name: "Ariana Grande",
    gender: "f",
  },
  {
    name: "James Robert Anderson",
    gender: "m",
  },
  {
    name: "Thomas Brent Arnold",
    gender: "m",
  },
  {
    name: "Frank Beard",
    gender: "m",
  },
  {
    name: "Kenneth Michael Beeson",
    gender: "m",
  },
  {
    name: "Jerry Wayne Bliss",
    gender: "m",
  },
  {
    name: "Johnny Card",
    gender: "m",
  },
  {
    name: "Eduard Allen Dixon",
    gender: "m",
  },
  {
    name: "Jepoy Dizon",
    gender: "m",
  },
  {
    name: "Jose Moreno",
    gender: "m",
  },
  {
    name: "Jacquelyn Allison",
    gender: "f",
  },
  {
    name: "Betty Marie Armstrong",
    gender: "f",
  },
  {
    name: "Kathryn Bartels",
    gender: "f",
  },
  {
    name: "Alyssa Catarozoli",
    gender: "f",
  },
  {
    name: "Brianna Demotto",
    gender: "f",
  },
  {
    name: "Sarah Dakwar",
    gender: "f",
  },
  {
    name: "Alexandria Fons",
    gender: "f",
  },
  {
    name: "Camille Marcos",
    gender: "f",
  },
  {
    name: "Kylie Marie Trevor",
    gender: "f",
  },
  {
    name: "Kimberly Zuckerburg",
    gender: "f",
  },
  {
    name: "Bingbong Robredo",
    gender: "m",
  },
]

function enclose(val) {
  var data = "'" + val + "'"
  return data
}
// Get the element with id="defaultOpen" and click on it
function openCity(evt, cityName) {
  var i, sidemenu, sidelink, gradeLevel, grade, level, container
  sidemenu = document.getElementsByClassName("sidemenu")
  for (i = 0; i < sidemenu.length; i++) {
    sidemenu[i].style.display = "none"
  }
  sidelink = document.getElementsByClassName("sidelink")
  for (i = 0; i < sidelink.length; i++) {
    sidelink[i].className = sidelink[i].className.replace(" active", "")
  }

  document.getElementById(cityName).style.display = "block"
  evt.currentTarget.className += " active"
  evt.currentTarget.disabled = true
  for (var x = 1; x <= 10; x++) {
    if (String(x) !== evt.currentTarget.value) {
      var val = "bt" + String(x)
      document.getElementById(val).disabled = false
    }
  }

  if (
    cityName === "Grade1" ||
    cityName === "Grade2" ||
    cityName === "Grade3" ||
    cityName === "Grade4" ||
    cityName === "Grade5" ||
    cityName === "Grade6" ||
    cityName === "Grade7" ||
    cityName === "Grade8" ||
    cityName === "Grade9" ||
    cityName === "Grade10"
  ) {
    container = document.getElementById(cityName.toLowerCase())
    gradeLevel = cityName
    grade = cityName
    level = grade.substr(5, 6)
    gradeLevel = gradeLevel.substr(0, 5) + " " + level
  }
  teacherList.forEach((result) => {
    // Create card element
    const card = document.createElement("div")
    card.classList = "card-body"
    // Construct card content
    //temporary image holder. Please do the necessary modifications once
    // db data is retrieved
    const content = `
      <div class="card card--small">
        <div class="card__container">
          <div class="card__header">
            <div class="card__img-container">
              <img
                class="card__img h-20 w-20"
                src="https://www.shareicon.net/data/256x256/2016/09/15/829453_user_512x512.png" 
                alt="Profile Image"
              />
            </div>
            <p class="h2 text-primary">${result.subject}</p>
            <p class="text-primary-accent">${result.teacherName}</p>
            <p class="h4">${gradeLevel} Teacher</p>
            <p class="text-sm">
            Contact Email: ${result.email}
            </p>
          </div>
        </div>
      `
    // Append newyly created card element to the container
    container.innerHTML += content
  })
}

function openClassList(evt, sectionName) {
  var i,
    sidemenu,
    sidelink,
    classlistcontainer,
    classlistgirlscontainer,
    maleCtr = 0,
    femaleCtr = 0
  sidemenu = document.getElementsByClassName("sidemenu")
  for (i = 0; i < sidemenu.length; i++) {
    sidemenu[i].style.display = "none"
  }
  sidelink = document.getElementsByClassName("sidelink")
  for (i = 0; i < sidelink.length; i++) {
    sidelink[i].className = sidelink[i].className.replace(" active", "")
  }
  document.getElementById(sectionName).style.display = "block"
  evt.currentTarget.className += " active"

  classlistcontainer = document.getElementById(sectionName.toLowerCase())

  let femalecontainer = sectionName.toLowerCase() + "female"
  classlistgirlscontainer = document.getElementById(femalecontainer)

  studentListAll.forEach((result) => {
    // Create card element
    const card = document.createElement("div")
    card.classList = "card-body"
    // Construct card content
    //temporary image holder. Please do the necessary modifications once
    // db data is retrieved
    if (result.gender === "m") {
      const content = `<p class="h3">${maleCtr + 1}. ${result.name}</p>
      <br/> 
      `
      // Append newyly created card element to the container
      classlistcontainer.innerHTML += content
      maleCtr++
    } else {
      const contentFemale = `<p class="h3">${femaleCtr + 1}. ${result.name}</p>
      <br/> 
      `
      classlistgirlscontainer.innerHTML += contentFemale
      femaleCtr++
    }
  })
}
function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks
  tabcontent = document.getElementsByClassName("tabcontent")
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none"
  }
  tablinks = document.getElementsByClassName("tablink")
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = ""
  }
  document.getElementById(pageName).style.display = "block"
  elmnt.style.backgroundColor = color
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click()
