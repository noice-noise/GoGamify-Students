const { doc } = require("prettier");

document.getElementById("btn_comp").click = openComp();
document.getElementById("btn_todo").click = openTodo();
document.getElementById("btn_show").click = show(id);



function openComp(){
    for(var x = 1; x<9; x++){
        document.getElementById("todo"+x).style.display = "none"; 
    }
    for(var x = 11; x<15; x++){
        document.getElementById("todo"+x).style.display = "flex"; 
    }
 document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary)';
 document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';
 console.log("COMPLETE BUTTON: CLICKED!");

}
function openTodo(){
    for(var x = 1; x<9; x++){
        document.getElementById("todo"+x).style.display = "flex"; 
    }    for(var x = 11; x<15; x++){
        document.getElementById("todo"+x).style.display = "none"; 
    }

    document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary)';
    document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';
    console.log("TODO BUTTON: CLICKED!");

}

function show(id){
    var btn = document.getElementById("btn_show");
    var x = document.getElementById("more"+id);
    var new_txt = document.getElementById("txt_show"+id);
    var icon_more = document.getElementById("icon_more"+id);
    var icon_less = document.getElementById("icon_less"+id);
    if(x.style.display == "none"){
        x=  x.style.display = "block";
        icon_less = icon_less.style.visibility = "visible";
        icon_more = icon_more.style.visibility = "hidden";
        // btn.hover();
        // svg.classList.add('focused');
        // svg.classList.remove('unfocused');
        new_txt = new_txt.innerHTML = "show less";
        // btn.focus();
        console.log("SHOW MORE BUTTON: CLICKED");


    } 
    else{
        x.style.display="none";
        icon_more = icon_more.style.visibility = "visible";
        icon_less = icon_less.style.visibility = "hidden";
        // svg.classList.remove('focused');
        // svg.classList.add('unfocused');
        new_txt.innerHTML="show more";
        // btn.blur();
        console.log("SHOW LESS BUTTON: CLICKED");
    }
}

