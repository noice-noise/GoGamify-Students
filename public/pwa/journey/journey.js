

// fetch('https://gogamify-education.herokuapp.com/student/p/resources/')
//     .then(response =>response.json())
//     .then(responseJson=>console.log(responseJson));

const data = [
    {
        title: "English week 1",
        subtitle: "Reading and fuck Writing",
    },
    {
        title: "planet paper"
    },
    {
        title: "modern history"
    },
    {
        title: "fuck artssdf"
    }

];


let getInitials = function (string) {
    let names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[1].substring(0, 1).toUpperCase();
    }
    return initials;
};



data.forEach((element, i) => {

    const container = document.querySelector(".file-container");
    //create

    const card = document.createElement('div');
    card.classList = 'card-main-container';

    const cardContent = `                
        <div class="subject-box">
            <p class="h1 text-box">${getInitials(data[i].title)}</p>
        </div>
        <div class = "card-body">
            <p class="h3">${data[i].title}</p>
            <p class="h4 sub-title">${data[i].subtitle}</p>
            <div>
                <div class="meter yellow">
                    <span style='width: 60%'>
                    </span>
                </div>
                <div class="progress-text">
                    <p class="h6">Progress</p>
                    <div>
                        <!--progress width length basis-->
                        <span class="h6" id="current">10</span>
                        <span class="h6"> / </span>
                        <span class="h6 total" id="total">20</span>
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
