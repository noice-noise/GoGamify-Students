// Get the element with id="defaultOpen" and click on it
function openCity(evt, cityName) {
  var i, sidemenu, sidelink;
  sidemenu = document.getElementsByClassName("sidemenu");
  for (i = 0; i < sidemenu.length; i++) {
    sidemenu[i].style.display = "none";
  }
  sidelink = document.getElementsByClassName("sidelink");
  for (i = 0; i < sidelink.length; i++) {
    sidelink[i].className = sidelink[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openPage(pageName,elmnt,color) {
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