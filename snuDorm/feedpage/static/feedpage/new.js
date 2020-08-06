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

function startCheck(stat) {
    var start_date = document.getElementByName("start_date");

    if(stat.checked) {
        start_date.required = false;
        start_date.value = null;
    } else {
        start_date.required = true;
    }
}


$('#estartDate').val(new Date().toISOString().substring(0, 10));

$(document).on('click', '#euncertain1', ()=> {
    if($('#estartDate').attr("required")) {
        $("#estartDate").removeAttr('required');
        $("#estartDate").attr('disabled', true);
        console.log('hello uncertain1')
    } else {
        $("#estartDate").removeAttr('disabled');
        $("#estartDate").attr('required', true);   
        console.log('bye euncertain1')
    }     
})


$('#edueDate').val(new Date().toISOString().substring(0, 10));

$(document).on('click', '#euncertain2', ()=> {
    if($('#edueDate').attr("required")) {
        $("#edueDate").removeAttr('required');
        $("#edueDate").attr('disabled', true);
        console.log('hello euncertain2')
    } else {
        $("#edueDate").removeAttr('disabled');
        $("#edueDate").attr('required', true);   
        console.log('bye euncertain2')
    }     
})
