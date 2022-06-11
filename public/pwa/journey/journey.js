function openTodo(){
     document.querySelector(".file-container").innerHTML= "";
    fetch('/student/p/resources', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generateCards(data);
        data.forEach((element,i) =>{
            btnclick(i);
        })
    })
    .catch(error => {
        console.log(error)
    });
    document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-accent)';
    document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';
    document.getElementById("btn_todo").style.zIndex = "1";
    document.getElementById("btn_comp").style.zIndex = "0";
}

function openComp(){
    document.querySelector(".file-container").innerHTML= "";
   fetch('/student/p/resources', { method: 'GET' })
   .then(res => res.json())
   .then(data => {
       console.log(data);
    //    generateCards(data);
    //    data.forEach((element,i) =>{
    //        btnclick(i);
    //    })
   })
   .catch(error => {
       console.log(error)
   });
   document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-accent)';
   document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';
   document.getElementById("btn_todo").style.zIndex = "0";
   document.getElementById("btn_comp").style.zIndex = "1";
}

fetch('/student/p/resources', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generateCards(data);
        data.forEach((element,i) =>{
            btnclick(i);
            // openComp(data[i]._id);
        })
    })
    .catch(error => {
        console.log(error)
    });

    function generateCards(data) {

    data.forEach((element, i) => {
        const container = document.querySelector(".file-container");
        //create

        const card = document.createElement('div');
        card.classList = 'card content';
        card.id = data[i]._id;
        console.log(card.id);
        const cardContent = `                
        <div class="card-main-container" id = "main${i}">

        <div class="subject-box">
            <p class="h1 text-box">${getInitials(data[i].title)}</p>
        </div>
        <div class="card-body">
            <p class="h3">${data[i].title}</p>
            <p class="h4 sub-title">${data[i].subtitle}</p>
            <div id="main-sub-content${i}" style="display:block;">
                
                <div class="meter yellow">
                    <span style="width:${progressMeter(1, data[i].pages)}%;"></span>
                </div>
                <div class="progress-text">
                    <p class="h6">Progress</p>
                    <div>

                        <span class="h6" id="current${card.id}">${currentPage(card.id, i)}</span>
                        <span class="h6"> / </span>
                        <span class="h6 total" id="total">${data[i].pages}</span>

                    </div>
                </div>
            </div>

            <div id="more-sub-content${i}" style="display:none;">

                <p class="h6">Owner : ${data[i].owner}</p>
                <p class="h6">Total Pages : ${data[i].pages}</p>
                <p class="h6">Students Enrolled : ${data[i].students.length}</p>
            </div>

        </div>

        <div class="btn-div">

            <div class="btn-main">
                <div class="btn-view">

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
    });
}

function btnclick(id){
    document.getElementById("btn_more"+id).addEventListener("click", function() {
        openMore(id);
    }, false);

}
function bla(){
    fetch('/pwa/journey/completed', { method: 'GET' })
    .then(res =>{
        if(res.ok){
            console.log('SUCCESS')
            return res.json();
        }else{
            console.log('unSUCCESSful')
        }
        return res.json();
    })
    .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });
}

bla();

function currentPage( id, i) {

    fetch('/student/p/currentPage', { method: 'GET' })
    .then(res =>{
        if(res.ok){
            console.log('SUCCESS')
            return res.json();
        }else{
            console.log('unSUCCESSful')
        }
    })
    .then(data => {
        console.log(data);
        if(id == data.header._id){
            console.log(data);
            appendCurrent(data.header.currentPageNumber+1, id);
        }

    })
    .catch(error => {
        console.log(error)
    });
}

function appendCurrent(index, id) {
    document.getElementById("current" + id).innerHTML = index;
    // console.log(index);
}

let getInitials = function (string) {
    let names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[1].substring(0, 1).toUpperCase();
    }
    else if (names.length == 1) {
        initials += names[0].charAt(1).toUpperCase();
        console.log(initials);
    }
    return initials;
};


function progressMeter(current, total) {
    console.log("read");
    let meter = (current / total) * 100;
    console.log(meter);
    return meter;
}



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

// function openComp(id){
//     console.log("COMP btn: CLICKED!");
//     console.log(id);
//     // document.getElementById(card.id).style.display = "none";
// }
