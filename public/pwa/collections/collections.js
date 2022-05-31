console.log('Debug');
const user_url = "/student/profile"
var fullname2 = ""
const preferences = JSON.parse(window.localStorage.getItem("preferences"));
getUserCredentials();
var username = document.querySelector(".back-username");
var currentTheme = document.querySelector(".back-theme");
currentTheme.textContent = preferences.theme;

function getUserCredentials() {
    fetch(user_url,{
        method: "get"
    }).then(res => res.json())
    .then((data) =>{
        //console.log(data);//It works
        fullname2 = data['firstName']+" "+data['middleName']+" "+data['familyName']
        username.textContent = fullname2;
    }).catch(error =>{
        console.log(error)
    })
}

/* Coded on May 30 2022: I just hope na makagenerate siyag child badges ug child achievements */
const achievement_section = document.getElementById('achievement');//parent

//Implicit
// const achievement_child1 = document.createElement("div");
// const achievement_child2 = document.createElement("div");
// const achievement_child3 = document.createElement("div");
// const achievement_child4 = document.createElement("div");

// achievement_child1.classList.add('card');
// achievement_child1.classList.add('card--extra-small');
// achievement_child1.classList.add('text-center');

// achievement_child2.classList.add('card__container');
// achievement_child3.classList.add('card__header');
// achievement_child4.classList.add('card__img-container');

// achievement_child3.appendChild(achievement_child4);
// achievement_child2.appendChild(achievement_child3);
// achievement_child1.appendChild(achievement_child2);
// achievement_section.appendChild(achievement_child1);

//Explicit
generateAchievements();
generateAchievements();

function generateAchievements() {
    const achievement_child1 = document.createElement("div");
    const achievement_child2 = document.createElement("div");
    const achievement_child3 = document.createElement("div");
    const achievement_child4 = document.createElement("div");

    achievement_child1.classList.add('card');
    achievement_child1.classList.add('card--extra-small');
    achievement_child1.classList.add('text-center');

    achievement_child2.classList.add('card__container');
    achievement_child3.classList.add('card__header');
    achievement_child4.classList.add('card__img-container');

    achievement_child3.appendChild(achievement_child4);
    achievement_child2.appendChild(achievement_child3);
    achievement_child1.appendChild(achievement_child2);
    achievement_section.appendChild(achievement_child1);
}

console.log(achievement_section);

