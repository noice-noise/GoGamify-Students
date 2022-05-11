document.getElementById("btn_comp").click = openComp();
document.getElementById("btn_todo").click = openTodo();
document.getElementById("btn_show").click = show(id);



function openComp(){
 document.getElementById("todo").style.display = "none";
 document.getElementById("todo1").style.display = "flex";
 document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary)';
 document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';


}
function openTodo(){
    document.getElementById("todo").style.display = "flex";
    document.getElementById("todo1").style.display = "none";
    document.getElementById("btn_todo").style.backgroundColor = 'rgb(var(--color-primary)';
    document.getElementById("btn_comp").style.backgroundColor = 'rgb(var(--color-primary-muted) / var(--tw-bg-opacity))';

}

function show(id){
    var x = document.getElementById("more"+id);
    var new_txt = document.getElementById("txt_show"+id);
    if(x.style.display == "none"){
        x=  x.style.display = "block";
        new_txt = new_txt.innerHTML = "show less";
    } 
    else
    x.style.display="none";
    new_txt.innerHTML="show more"

}