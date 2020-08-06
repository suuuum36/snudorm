$(document).on('change', '#photo', function(e) {
    console.log('clicked');
    let $this = $(e.currentTarget);
    $this.css('display', 'none')

    const str = `
        <input class="photo" name="photo[]" id="photo" accept=".jpg, .jpeg, .png"
        type="file"  multiple>
    `
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

$('#startDate').val(new Date().toISOString().substring(0, 10));

$(document).on('click', '#uncertain1', ()=> {
    if($('#startDate').attr("required")) {
        $("#startDate").removeAttr('required');
        $("#startDate").attr('disabled', true);
        console.log('hello uncertain1')
    } else {
        $("#startDate").removeAttr('disabled');
        $("#startDate").attr('required', true);   
        console.log('bye uncertain1')
    }     
})

$('#dueDate').val(new Date().toISOString().substring(0, 10));

$(document).on('click', '#uncertain2', ()=> {
    if($('#dueDate').attr("required")) {
        $("#dueDate").removeAttr('required');
        $("#dueDate").attr('disabled', true);
        console.log('hello uncertain2')
    } else {
        $("#dueDate").removeAttr('disabled');
        $("#dueDate").attr('required', true);   
        console.log('bye uncertain2')
    }     
})
