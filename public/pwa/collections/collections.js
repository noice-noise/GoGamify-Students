
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
const badges_section = document.getElementById('badge');
// console.log(achievement_section.id) console.log(badges_section.id)

//Explicit
generateAchievements(achievement_section);
generateAchievements(badges_section);

function generateAchievements(section_parent) {
    const achievement_child1 = document.createElement("div");
    const achievement_child2 = document.createElement("div");
    const achievement_child3 = document.createElement("div");
    const achievement_child4 = document.createElement("div");

    achievement_child1.classList.add('card','card--extra-small','text-center');
    achievement_child2.classList.add('card__container');
    achievement_child3.classList.add('card__header');
    achievement_child4.classList.add('card__img-container');

    var achievement_img = document.createElement('img');
    var achievement_header = document.createElement('p')
    var achievement_desc = document.createElement('p')
    achievement_img.classList.add('card__img','mx-auto','h-12','w-12');
    achievement_img.src = './badges/Begginer.png';
    achievement_img.alt = 'Profile Image';
    achievement_header.classList.add('h2','text-primary');
    achievement_header.innerHTML = 'Baby Steps(gen)'
    achievement_desc.classList.add('text-primary-accent');
    achievement_desc.innerHTML = 'Read 1 Learning Module on any subject'

    achievement_child4.appendChild(achievement_img);
    achievement_child4.appendChild(achievement_header);
    achievement_child4.appendChild(achievement_desc);

    achievement_child3.appendChild(achievement_child4);
    achievement_child2.appendChild(achievement_child3);
    achievement_child1.appendChild(achievement_child2);
    if(section_parent.id = 'achievement'){
        section_parent.appendChild(achievement_child1);
    }else{
        section_parent.appendChild(achievement_child1);
    }
    
}


