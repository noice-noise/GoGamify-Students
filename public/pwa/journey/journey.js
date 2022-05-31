fetch('/student/p/resources/')
    .then(res =>res.json())
    .then(data => {
        console.log(data);
        generateCards(data);

    })
    .catch(error => {
        console.log(error)
    });


function generateCards(data){
    data.forEach((element, i) => {

        const container = document.querySelector(".file-container");
        //create
    
        const card = document.createElement('div');
        card.classList = 'card-main-container';
        card.id = data[i]._id;
        console.log(card);
        const cardContent = `                
            <div class="subject-box">
                <p class="h1 text-box">${getInitials(data[i].title)}</p>
            </div>
            <div class = "card-body">
                <p class="h3">${data[i].title}</p>
                <p class="h4 sub-title">${data[i].subtitle}</p>
                <div>
                    <div class="meter yellow">
                        <span style="width:${progressMeter(1,data[i].pages)}%;"></span>
                    </div>
                    <div class="progress-text">
                        <p class="h6">Progress</p>
                        <div>
                            <!--progress width length basis-->
                            <span class="h6" id="current">10</span>
                            <span class="h6"> / </span>
                            <span class="h6 total" id="total">${data[i].pages}</span>
                        </div>
                    </div>
                </div>
            </div>
            <a class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="btn_exp" height="32" width="32"
                viewBox="0 0 50 50">
                <path d="M24 30.75 12 18.75 14.15 16.6 24 26.5 33.85 16.65 36 18.8Z"
                    class="svg_more" id="icon_more1" />
                <path d="M14.15 30.75 12 28.6 24 16.6 36 28.55 33.85 30.7 24 20.85Z"
                    class="svg_less" id="icon_less1">
            </svg>
            </a>`;
        
        card.innerHTML += cardContent;
        container.appendChild(card);
    });

}


function currentPage(id){
    fetch('/resource/data/all/')
    .then(res =>res.json())
    .then(data => {console.log(data)});
}

let getInitials = function (string) {
    let names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[1].substring(0, 1).toUpperCase();
    }
    else if (names.length == 1 ){
        initials += names[0].charAt(1).toUpperCase();
        console.log(initials);
    }
    return initials;
};


function progressMeter(current, total){
    console.log("read");
    let meter = (current / total) * 100;
    console.log(meter);
    return meter;    
}






