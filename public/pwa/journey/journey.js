function openTodo(){
    document.querySelector(".file-container").innerHTML= "";
    fetch('/student/p/resources', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        Status = false;
        console.log("TODO DATA: ");
        console.log(data);
        btnStatus();
        if(data.length == 0 || data == null){
            generateNull();
        }
        else{
            generateCards(data, Status);
        }
    })
    .catch(error => {
        console.log(error)
    });
    document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-accent)/var(--tw-text-opacity))';
    document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';
    document.getElementById("btn_todo").style.zIndex = "1";
    document.getElementById("btn_comp").style.zIndex = "0";
}

function openComp(){
    document.querySelector(".file-container").innerHTML= "";
   fetch('/student/p/completed', { method: 'GET' })
   .then(res => res.json())
   .then(data => {
       Status = true;
       console.log("COMPLETED DATA: ");
       console.log(data);
       btnStatus();
       if(data.length == 0 || data == null){
            generateNullComplete();
       }
       else{
        generateCards(data, Status);
        
       }
  
   })
   .catch(error => {
       console.log(error)
   });
   document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-accent)/var(--tw-text-opacity))';
   document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';
   document.getElementById("btn_todo").style.zIndex = "0";
   document.getElementById("btn_comp").style.zIndex = "1";
}

//default
fetch('/student/p/resources', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        let Status = false
        console.log("TODO DATA: ");
        console.log(data);
        btnStatus();
        if(data.length == 0 || data == null){
            generateNull();
        }
        else{
            generateCards(data, Status);
        }
    })
    .catch(error => {
        console.log(error)
    });

    function generateCards(data, Status) {

        data.forEach((element, i) => {
            const container = document.querySelector(".file-container");
            container.style.display = "grid";
            //create
            const card = document.createElement('div');
            card.classList = 'card content';
            card.id = data[i]._id;
            const cardContent = `                
            <div class="card-main-container" id = "main${i}">
    
            <div id="subject-color${i}" class="subject-box">
                <p class="h1 text-box">${getInitials(data[i].title)}</p>
            </div>
            <div class="card-body">
                <p class="h3">${data[i].title}</p>
                <p class="h4 sub-title">${data[i].subtitle}</p>
                <div id="main-sub-content${i}" style="display:block;">
                    
                    <div id = "metercolor${card.id}" class="meter yellow">
                        <span id ="meterCurrentPage${card.id}" style="width:0%;"></span>
                    </div>
                    <div class="progress-text">
                        <p class="h6">Progress</p>
                        <div>
    
                            <span class="h6" id="current${card.id}">${currentPage(card.id,i,data[i].pages, Status)}</span>
                            <span class="h6"> / </span>
                            <span class="h6 total" id="total">${data[i].pages}</span>
    
                        </div>
                    </div>
                </div>
    
                <div id="more-sub-content${i}" class ="sub-content" style="display:none;">
    
                    <p class="h6">Owner : ${data[i].owner}</p>
                    <p class="h6">Published : ${getDate(data[i].createdAt,card.id)}</p>
                    <p class="h6">Total Pages : ${data[i].pages}</p>
                    <p class="h6">Collectibles : ${data[i].collectibles.length}</p>
                </div>
    
            </div>
    
            <div class="btn-div">
    
                <div class="btn-main" >
                    <div id= "btn-view${card.id}" class="btn-view" style="display:block">
    
                        <form action="/student/p/currentPage" method="post">
                            <input hidden name="_id" value="${card.id}" type="text" />
    
                            <button class="icon-eye" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                    viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="rgb(var(--color-primary-accent) / var(--tw-bg-opacity))"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="12" cy="12" r="2" />
                                    <path
                                        d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                                </svg>
                            </button>
                        </form>
    
                    </div>
                </div>
    
                <div class="btn-effect">
                    <button id="btn_more${i}">
                        <svg id="icon_more${i}" xmlns="http://www.w3.org/2000/svg" class="btn-more" width="32"
                            height="32" viewBox="0 0 22 24" stroke-width="1.5" stroke="whitesmoke"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                        <svg id="icon_less${i}" xmlns="http://www.w3.org/2000/svg" class="btn-less" width="32"
                            height="32" viewBox="0 0 26 24" stroke-width="1.5" stroke="whitesmoke"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                    </button>
                </div>
    
            </div>
    
        </div>            
                `;
    
            card.innerHTML += cardContent;
            container.appendChild(card);
            generateColors(data[i]._id,i);
            btnclick(i);
            btnViewIcon(Status,card.id);
        });
}

function generateNull(){
    const container = document.querySelector(".file-container");
    container.style.display = "block";
    const card = document.createElement('div');
    const cardDefault = `
    <div id="moduleRoot" class="main__container my-0 overflow-x-hidden py-0 font-poppins text-base"><section class="section flex flex-col justify-center items-center">

          <h2 class="h2 text-center mb-5">No To-Do Tasks yet.</h2>
        <a class="button button--cta px-3 w-full max-w-sm py-2" >Explore All Journeys Using the "EXPLORE BUTTON"</a>
        </section></div>`
        card.innerHTML += cardDefault;
        container.appendChild(card);
}

function generateNullComplete(){
    const container = document.querySelector(".file-container");
    container.style.display = "block";
    const card = document.createElement('div');
    const cardDefault = `
    <div id="moduleRoot" class="main__container my-0 overflow-x-hidden py-0 font-poppins text-base"><section class="section flex flex-col justify-center items-center">

          <h2 class="h2 text-center mb-5">No Completed Tasks yet.</h2>
        <a class="button button--cta px-3 w-full max-w-sm py-2" >To complete a task, read all pages in each journey</a>
        </section></div>`
        card.innerHTML += cardDefault;
        container.appendChild(card);
}


function btnViewIcon(s, id) {
    if(s == true){
        document.getElementById("btn-view"+id).style.display = "none";
    }

}

function btnStatus(){
    fetch('/student/p/resources', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        document.getElementById("todo-status").innerHTML = data.length;
    })
    .catch(error => {
        console.log(error)
    });
        
        fetch('/student/p/completed', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            document.getElementById("comp-status").innerHTML = data.length;
        })
        .catch(error => {
            console.log(error)
        });
        
    
}

function btnclick(id){
    document.getElementById("btn_more"+id).addEventListener("click", function() {
        openMore(id);
    }, false);
}
function getDate(date, id){
    try{
        var dateString = date;
        dateString = date.split("T");
        const newdate = new Date(dateString[0]);
        const month = newdate.getMonth() + 1;
        const day = newdate.getDate();
        const year = newdate.getFullYear();
        if(month < 10){
            const newFormat = "0" + month + "-" + day + "-"+ year;
            return newFormat;
        }
        else{
            const newFormat = month + "-" + day + "-"+ year;
            return newFormat;
        }
    }
    catch(error){
        console.log(id+": no date published!");
    }
    
    
}
function currentPage(ID, i, total, status) {

    fetch('/student/p/resourcesCurrentPages', { method: 'GET' })
    .then(res =>{
        if(res.ok){
            console.log('individual resource fetch: SUCCESS')
            return res.json();
        }else{
            console.log('individual resource fetch: UNSUCCESSFUL')
        }
    })
    .then(data => {
        if (status == false){
            if(ID ==data[i].id){
                appendCurrent(data[i].currentPageNumber+1, ID, total);
            }
        }
        else
            appendCurrent(total, ID, total,status);

    })
    .catch(error => {
        console.log(error)
    });
}

function appendCurrent(page, id, total,status) {
    //progress number
    document.getElementById("current" + id).innerHTML = page;
    //progress meter
    let current = (page / total) * 100;
    document.getElementById("meterCurrentPage"+id).style.width = current +"%";
    
    //colors
    if(current > 50){
        document.getElementById("metercolor"+id).className = "meter orange";
    }
    // border raduis    
    if(current == 100){
        document.getElementById("meterCurrentPage"+id).style.borderTopRightRadius = "20px";
        document.getElementById("meterCurrentPage"+id).style.borderBottomRightRadius = "20px";
    }
    //completed color
    if (current == 100 && status == true){
        document.getElementById("metercolor"+id).className = "meter green";
    }
}

function getInitials (string) {
    let names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    initials += names[0].charAt(1).toUpperCase();
    //for initials with two names
    // if (names.length > 1) {
    //     if(names[1].substring(0, 1) == "-"){
    //         initials += names[3].substring(0, 1).toUpperCase();
    //     }
    //     else
    //         initials += names[1].substring(0, 1).toUpperCase();
        
    // }
    // else if (names.length == 1) {
    //     initials += names[0].charAt(1).toUpperCase();
    // }
    return initials;
};

function openMore(i){
    let div_info = document.getElementById("more-sub-content"+i);
    let div_main = document.getElementById("main-sub-content"+i);
    let main_cont = document.getElementById("main"+i);
    let icon_more = document.getElementById("icon_more"+i);
    let icon_less = document.getElementById("icon_less"+i);

    if(div_main.style.display == 'block'){
        div_main.style.display = "none";
        div_info.style.display = "block";
        main_cont.classList.add('effects');
        main_cont.classList.remove('effect');
        icon_more.style.display = "none";
        icon_less.style.display = "inline-block";

    }
    else{
        div_main.style.display = "block";
        div_info.style.display = "none";
        main_cont.classList.remove('effects');
        main_cont.classList.add('effect');
        icon_less.style.display = "none";
        icon_more.style.display = "inline-block";

    }
}

function generateColors(id,i){
    //gradient palette source:https://digitalsynopsis.com/design/beautiful-color-ui-gradients-backgrounds/
    const roseanna = ["#ffc3a0", "#ffafbd"];
    const sexyblue = ["#6dd5ed", "#2193b0"];
    const frost = [" #004e92", "#000428"];
    const purplelove = ["#cc2b5e","#753a88"];
    const pigglet = ["#ffdde1","#ee9ca7"];
    const mauve = ["#734b6d","#42275a"];
    const lostmemory = ["#ffb88c","#de6262"];
    const socialive = ["#06beb6","#48b1bf"];
    const cherry = ["#f45c43", "#eb3349"];
    const lush = ["#a8e063","#56ab2f"];
    const kashmir = ["#516395","#614385"];
    const dusk = ["#ffd89b","#19547b"]

    const roseShadow =["rgba(255, 126, 51, 0.4)", "rgba(255, 126, 51, 0.3)", "rgba(255, 126, 51, 0.2)", "rgba(255, 126, 51, 0.1)", "rgba(255, 126, 51, 0.05)"];
    const sexyShadow =["rgba(20, 133, 159, 0.4)", "rgba(20, 133, 159, 0.3)", "rgba(20, 133, 159, 0.2)", "rgba(20, 133, 159, 0.1)", "rgba(20, 133, 159, 0.05)"];
    const frostShadow =["rgba(0, 68, 128, 0.4)", "rgba(0, 68, 128, 0.3)", "rgba(0, 68, 128, 0.2)", "rgba(0, 68, 128, 0.1)", "rgba(0, 68, 128, 0.05)"];
    const purpleShadow =["rgba(240, 46, 170, 0.4)", "rgba(240, 46, 170, 0.3)", "rgba(240, 46, 170, 0.2)", "rgba(240, 46, 170, 0.1)", "rgba(240, 46, 170, 0.05)"];
    const piggletShadow =["rgba(225, 81, 100, 0.4)", "rgba(225, 81, 100, 0.3)", "rgba(225, 81, 100, 0.2)", "rgba(225, 81, 100, 0.1)", "rgba(225, 81, 100, 0.05)"];
    const mauveShadow =["rgba(118, 69, 161, 0.4)", "rgba(118, 69, 161, 0.3)", "rgba(118, 69, 161, 0.2)", "rgba(118, 69, 161, 0.1)", "rgba(118, 69, 161, 0.05)"];
    const lostShadow =["rgba(255, 129, 51, 0.4)", "rgba(255, 129, 51, 0.3)", "rgba(255, 129, 51, 0.2)", "rgba(255, 129, 51, 0.1)", "rgba(255, 129, 51, 0.05)"];
    const socialShadow =["rgba(5, 148, 141, 0.4)", "rgba(5, 148, 141, 0.3)", "rgba(5, 148, 141, 0.2)", "rgba(5, 148, 141, 0.1)", "rgba(5, 148, 141, 0.05)"];
    const cherryShadow =["rgba(241, 44, 14, 0.4)", "rgba(241, 44, 14, 0.3)", "rgba(241, 44, 14, 0.2)", "rgba(241, 44, 14, 0.1)", "rgba(241, 44, 14, 0.05)"];
    const lushShadow =["rgba(109, 170, 34, 0.4)", "rgba(109, 170, 34, 0.3)", "rgba(109, 170, 34, 0.2)", "rgba(109, 170, 34, 0.1)", "rgba(109, 170, 34, 0.05)"];
    const kashmirShadow =["rgba(62, 77, 116, 0.4)", "rgba(62, 77, 116, 0.3)", "rgba(62, 77, 116, 0.2)", "rgba(62, 77, 116, 0.1)", "rgba(62, 77, 116, 0.05)"];
    const duskShadow =["rgba(255, 157, 0, 0.4)", "rgba(2255, 157, 0, 0.3)", "rgba(255, 157, 0, 0.2)", "rgba(255, 157, 0, 0.1)", "rgba(255, 157, 0, 0.05)"];

    let color = [
        roseanna, sexyblue, frost, purplelove, pigglet, mauve, lostmemory, socialive, cherry, lush,kashmir ,dusk
    ];
    let shadow = [
        roseShadow,sexyShadow,frostShadow, purpleShadow, piggletShadow, mauveShadow, lostShadow, socialShadow, cherryShadow, lushShadow,kashmirShadow ,duskShadow
    ]
    // let randomNumber =  Math.floor(Math.random() * 4);
    document.getElementById("subject-color"+i).style.backgroundImage = "linear-gradient(to bottom right,"+ color[i] +")";
    let y = 0;
    let x = document.getElementById("subject-color"+i).style.boxShadow = shadow[i][y] + "-5px 5px," + shadow[i][y+1]+ " -10px 10px," +shadow[i][y+2]+" -15px 15px, "+shadow[i][y+3]+" -20px 20px, "+shadow[i][y+4]+" -25px 25px";


}



