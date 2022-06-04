
const user_url = "/student/profile"
const student_url = "/student/p/collections"
var fullname2 = ""
const preferences = JSON.parse(window.localStorage.getItem("preferences"));
getUserCredentials();
getUserCredentials2();
const achievement_section = document.getElementById('achievement');
const badges_section = document.getElementById('badge');
const theme_section = document.getElementById('theme');
var username = document.querySelector(".back-username");
var currentTheme = document.querySelector(".back-theme");

currentTheme.textContent = preferences.theme;

class Achievement_Box {
    constructor(graphic, title, sub, type){
        this.graphic = graphic;
        this.title = title;
        this.sub = sub;
        this.type = type;
    }
}

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

//Coded on June 1: Get Request
function getUserCredentials2() {
    fetch(student_url,{
        method: "get"
    }).then(res => res.json())
    .then((data) =>{
        //FOR LOOP: GOODLUCK TO ME
        for (var index in data){
            //console.log(data[index].title);   ok ma access ra ang variables
            //REMINDER: MAKE BADGES FROM ADMIN.
            graphic = data[index].graphic;
            title = data[index].title;
            sub = data[index].subtitle;
            type = data[index].type;

            var box = new Achievement_Box(graphic,title,sub,type);
            if(box.type =="badge"){
                gen_badge_final(badges_section, box);
            }else if(box.type =="achievement"){
                gen_badge_final(achievement_section, box);
            }else if(box.type =="theme"){
                gen_badge_final(theme_section, box);
            }
        }
    }).catch(error =>{
        console.log(error)
    })
}

function gen_badge_final(section_parent, box_temp) {
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
    ach_img_url = "./badges/"+box_temp.graphic;
    achievement_img.src = ach_img_url;
    achievement_img.alt = `${box_temp.graphic}`;

    achievement_header.classList.add('h2','text-primary');
    achievement_header.innerHTML = box_temp.title;
    achievement_desc.classList.add('text-primary-accent');
    achievement_desc.innerHTML = box_temp.sub;

    achievement_child4.appendChild(achievement_img);
    achievement_child4.appendChild(achievement_header);
    achievement_child4.appendChild(achievement_desc);

    achievement_child3.appendChild(achievement_child4);
    achievement_child2.appendChild(achievement_child3);
    achievement_child1.appendChild(achievement_child2);
    section_parent.appendChild(achievement_child1);
}

//ORIGINAL CODE FOR GENERATE ACHIEVEMENTS: Try not to delete in case you need to change it in the future
// function generateAchievements(section_parent) {
//     const achievement_child1 = document.createElement("div");
//     const achievement_child2 = document.createElement("div");
//     const achievement_child3 = document.createElement("div");
//     const achievement_child4 = document.createElement("div");

//     achievement_child1.classList.add('card','card--extra-small','text-center');
//     achievement_child2.classList.add('card__container');
//     achievement_child3.classList.add('card__header');
//     achievement_child4.classList.add('card__img-container');

//     var achievement_img = document.createElement('img');
//     var achievement_header = document.createElement('p')
//     var achievement_desc = document.createElement('p')
//     achievement_img.classList.add('card__img','mx-auto','h-12','w-12');
//     achievement_img.src = './badges/Begginer.png';
//     achievement_img.alt = 'Profile Image';
//     achievement_header.classList.add('h2','text-primary');
//     achievement_header.innerHTML = 'Baby Steps(gen)'
//     achievement_desc.classList.add('text-primary-accent');
//     achievement_desc.innerHTML = 'Read 1 Learning Module on any subject'

//     achievement_child4.appendChild(achievement_img);
//     achievement_child4.appendChild(achievement_header);
//     achievement_child4.appendChild(achievement_desc);

//     achievement_child3.appendChild(achievement_child4);
//     achievement_child2.appendChild(achievement_child3);
//     achievement_child1.appendChild(achievement_child2);
//     if(section_parent.id = 'achievement'){
//         section_parent.appendChild(achievement_child1);
//     }else{
//         section_parent.appendChild(achievement_child1);
//     }
// }
