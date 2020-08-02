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

function doStatCheck(status){
    var option = document.getElementsByName("status");

    for(var i=0; i<option.length; i++){
        if(option[i] != status){
            option[i].checked = false;
            option[i].required = false;
        } else {
            option[i].required = true;
        }
    }
}

// function startCheck(stat) {
//     var start_date = document.getElementByName("start_date");

//     if(stat.checked) {
//         start_date.required = false;
//         start_date.value = null;
//     } else {
//         start_date.required = true;
//     }
// }

// function duedateCheck(stat) {
//     var duedate = document.getElementByName("duedate");

//     if(stat.checked) {
//         duedate.required = false;
//         duedate.value = null;
//     } else {
//         duedate.required = true;
//     }    
// }

// 기간이 미정값일때 실행

$(document).on('click', '#euncertain1', ()=> {
    if($('#estartDate').attr("required")) {
        $("#estartDate").removeAttr('required');
        $("#estartDate").attr('disabled', true);
        console.log('hello')
    } else {
        $("#estartDate").removeAttr('disabled');
        $("#estartDate").attr('required', true);   
        console.log('bye')
    }     
})


$(document).on('click', '#euncertain2', ()=> {
    if($('#edueDate').attr("required")) {
        $("#edueDate").removeAttr('required');
        $("#edueDate").attr('disabled', true);
        console.log('hello')
    } else {
        $("#edueDate").removeAttr('disabled');
        $("#edueDate").attr('required', true);   
        console.log('bye')
    }     
})
