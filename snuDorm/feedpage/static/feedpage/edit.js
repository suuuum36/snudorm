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
