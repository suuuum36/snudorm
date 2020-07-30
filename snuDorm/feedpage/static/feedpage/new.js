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

function duedateCheck(stat) {
    var duedate = document.getElementByName("duedate");

    if(stat.checked) {
        duedate.required = false;
        duedate.value = null;
    } else {
        duedate.required = true;
    }    
}