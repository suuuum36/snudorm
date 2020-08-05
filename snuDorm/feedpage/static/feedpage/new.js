<<<<<<< HEAD
// var input = document.querySelector('#photo');
// var preview = document.querySelector('#preview');
// // 못생긴 image button 숨기기 
// input.style.opacity = 0; 

// const list = document.createElement('div');
// list.style = "display:flex;"

// if(preview)
//     preview.appendChild(list);

// result_photos = [ ]

// input.onchange = function() {
//     console.log('photo form submitted');   
//     const photoFiles =  input.files;

//     if(photoFiles.length >= 1) {
//         for(const file of photoFiles) {
//             if(result_photos.length < 5) {
//                 result_photos.push(file);
//                 // const listItem = document.createElement('li');
//                 const image = document.createElement('img');
//                 image.src = URL.createObjectURL(file);
//                 image.style.width = '200px';
//                 image.style.height = '200px';
//                 image.name = "photo";
//                 list.appendChild(image);
//                 // listItem.appendChild(image);
//                 // listItem.appendChild(para);
//                 // list.appendChild(listItem);
//             }
//         }
//     }
// }

$(document).on('click', '#photo', function(e) {
=======

$(document).on('change', '#photo', function(e) {
>>>>>>> 5f498eb60d20e51278f5fe7deafd14576142045e
    console.log('clicked');
    const $this = $(e.currentTarget);
    $this.css('display', 'none')

<<<<<<< HEAD
    const str =
    `
    <input class="photo" name = "photo[]" id="photo" accept=".jpg, .jpeg, .png" type="file" multiple>
    `
    
=======
    var input = document.querySelector('#photo');
    const photoFiles =  input.files;
    // input.style.opacity = 0; 

    for(const file of photoFiles) {
        var src = URL.createObjectURL(file);
        const strimg = `<img class="image" src=${src} width="200px" height="200px">`
        $(strimg).insertBefore($this);
    }

    const str = `
        <input class="photo" name="photo[]" id="photo" accept=".jpg, .jpeg, .png"
        type="file"  multiple>
    `
>>>>>>> 5f498eb60d20e51278f5fe7deafd14576142045e
    $(str).insertAfter($this);
})    


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



