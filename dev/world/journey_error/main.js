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

var box = document.getElementById('subject-box');
var no_subjects = 4;

function generateCards(){
    for(i = 0; i < no_subjects; i++){
        document.getElementById("putHere").innerHTML+=`
        <div class="card__container">
            <div class="card__header">
              <div class="card__subject-container">
                <div class="card__subject-content">
                  <p class="text-sub-box">SC</p>
                </div>
              </div>
              <p class="h2 text-primary">Science</p>
            </div>
            <div class="card__body">
              <p class="text-stats">Output : 12</p>
              <p class="text-stats">Progress: 50%</p>
            </div>
          </div>
        `
    }

}
const mycolors=["red","violet","green","yellow","aquamarine","blue","purple","greenyellow","pink"];
function generateColors(){
    // for(i = 0; i < 8; i++){
    //     switch(i){
    //         case 0: document.getElementById(i).style.backgroundColor = "red";break;
    //         case 1: document.getElementById(i).style.backgroundColor = "blue";break;
    //         case 2: document.getElementById(i).style.backgroundColor = "green";break;
    //         case 3: document.getElementById(i).style.backgroundColor = "yellow";break;
    //         case 4: document.getElementById(i).style.backgroundColor = "aquamarine";break;
    //         case 5: document.getElementById(i).style.backgroundColor = "blue";break;
    //         case 6: document.getElementById(i).style.backgroundColor = "greenyellow";break;
    //         case 7: document.getElementById(i).style.backgroundColor = "pink";break;
    //         case 8: document.getElementById(i).style.backgroundColor = "pink";break;
    //         default:break;
    //     }
    // }
    for(i = 1;i<no_subjects+1;i++){
        document.getElementById("putHere").children[i].children[0].children[0].children[0].style.backgroundColor=mycolors[i];
    }
    // document.getElementById("putHere").children[2].children[0].children[0].children[0].style.backgroundColor="red";
    // document.getElementById("putHere").children[3].children[0].children[0].children[0].style.backgroundColor="blue";
    // document.getElementById("putHere").children[4].children[0].children[0].children[0].style.backgroundColor="green";
    // document.getElementById("putHere").children[5].children[0].children[0].children[0].style.backgroundColor="yellow";
    // document.getElementById("putHere").children[6].children[0].children[0].children[0].style.backgroundColor="aquamarine";
    // document.getElementById("putHere").children[7].children[0].children[0].children[0].style.backgroundColor="greenyellow";
}
generateColors();