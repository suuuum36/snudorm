function doOpenCheck(purpose){
    var option = document.getElementsByName("purpose");
    
    for(var i=0; i<option.length; i++){
        if(option[i] != purpose){
            option[i].checked = false;
            option[i].required = false;
        } else {
            option[i].required = true;
        }
    }
}

function startCheck(stat) {
    var start_date = document.getElementByName("start_date");

    if(stat.checked) {
        start_date.required = false;
        start_date.value = null;
    } else {
        start_date.required = true;
    }
}

$('#startDate').val(new Date().toISOString().substring(0, 10));

$(document).on('click', '#uncertain1', ()=> {
    if($('#startDate').attr("required")) {
        $("#startDate").removeAttr('required');
        $("#startDate").attr('disabled', true);
        console.log('hello')
    } else {
        $("#startDate").removeAttr('disabled');
        $("#startDate").attr('required', true);   
        console.log('bye')
    }     
})


$('#dueDate').val(new Date().toISOString().substring(0, 10));

$(document).on('click', '#uncertain2', ()=> {
    if($('#dueDate').attr("required")) {
        $("#dueDate").removeAttr('required');
        $("#dueDate").attr('disabled', true);
        console.log('hello')
    } else {
        $("#dueDate").removeAttr('disabled');
        $("#dueDate").attr('required', true);   
        console.log('bye')
    }     
})


var input = document.querySelector('#photo');
var preview = document.querySelector('#preview');
// 못생긴 image button 숨기기 
input.style.opacity = 0; 
const list = document.createElement('ol');
list.style = "display:flex;"
preview.appendChild(list);

photo.onchange = function () {
    console.log('photo form submitted');   
    const photoFiles =  input.files;

    if(photoFiles.length == 1) {
        for(const file of photoFiles) {
            const listItem = document.createElement('li');
            const para = document.createElement('p');
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.style.width = '200px';
            image.style.height = '200px';
            listItem.appendChild(image);
            listItem.appendChild(para);
            list.appendChild(listItem);
        }
    }
}



