document.getElementById("btn_comp").click = openComp();
document.getElementById("btn_todo").click = openTodo();
document.getElementById("btn_show").click = show(id);



function openComp(){
 document.getElementById("todo").style.display = "none";
 document.getElementById("todo2").style.display = "none";
 document.getElementById("todo3").style.display = "none";
 document.getElementById("todo4").style.display = "none";
 document.getElementById("todo1").style.display = "flex";
 document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary)';
 document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';


}
function openTodo(){
    document.getElementById("todo").style.display = "flex";
    document.getElementById("todo2").style.display = "flex";
    document.getElementById("todo3").style.display = "flex";
    document.getElementById("todo4").style.display = "flex";
    document.getElementById("todo1").style.display = "none";
    document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary)';
    document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';

}

function show(id){
    var btn = document.getElementById("btn_show");
    var x = document.getElementById("more"+id);
    var new_txt = document.getElementById("txt_show"+id);
    var icon_more = document.getElementById("icon_more"+id);
    var icon_less = document.getElementById("icon_less"+id);
    const svg = document.querySelector(".btn_exp");
    if(x.style.display == "none"){
        x=  x.style.display = "block";
        new_txt = new_txt.innerHTML = "show less";
        icon_less = icon_less.style.visibility = "visible";
        icon_more = icon_more.style.visibility = "hidden";
        btn.focus();
        btn.hover();
        svg.classList.add('focused');
        svg.classList.remove('unfocused');


    } 
    else{
        x.style.display="none";
        new_txt.innerHTML="show more";
        icon_more = icon_more.style.visibility = "visible";
        icon_less = icon_less.style.visibility = "hidden";
        svg.classList.add('unfocused');
        svg.classList.remove('focused');
        btn.blur();

    }


}