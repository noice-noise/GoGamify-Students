// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
  function openCity(evt, cityName) {
    var i, sidemenu, tablinks;
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
    var i, topmenu, tablinks;
    topmenu = document.getElementsByClassName("topmenu");
    for (i = 0; i < topmenu.length; i++) {
      topmenu[i].style.display = "none";
    }
    toplink = document.getElementsByClassName("tablink");
    for (i = 0; i < toplink.length; i++) {
      toplink[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
    }
