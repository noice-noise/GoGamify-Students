 function changeToBackContent() {

     document.getElementById("contentFront").style.transition=  "all 1s";
     document.getElementById("contentFront").style.transform= "rotateY(360deg)";
     setTimeout(flipBox,400);
    
}
function flipBox(){
    document.getElementById("contentFront").style.display= "none";
    document.getElementById("contentBack").style.display="flex";
}
function changeToFrontContent() {

    document.getElementById("contentFront").style.display="flex";
    document.getElementById("contentBack").style.display="none";
}