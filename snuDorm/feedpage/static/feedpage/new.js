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

document.getElementById('currentDate').value = new Date().toISOString().substring(0, 10);;

$('#uncertain').click(function() {
    console.log('hello')
    // .prop .attr 이용하여 수정 해보기
    // if ($('#currentDate').hasAttr("required")) {
    //     $("#currentDate").removeAttr('disabled');
    //     $("#currentDate").attr('required', true);        
    // }
    // else
        $("#currentDate").removeAttr('required');
        $("#currentDate").attr('disabled', true);
        
})