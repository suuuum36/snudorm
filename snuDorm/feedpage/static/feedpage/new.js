
$(document).on('change', '#photo', function(e) {
    console.log('clicked');
    const $this = $(e.currentTarget);
    $this.css('display', 'none')

    const str = `
        <input class="photo" name="photo[]" id="photo" accept=".jpg, .jpeg, .png"
        type="file"  multiple>
    `
    $(str).insertAfter($this);
    
    const len = e.target.files.length;
    
    let totallen = len;
    $(e.target).siblings('#photo').each(function(){
        totallen = totallen + this.files.length
    })
    
    if(totallen > 5){
        alert('사진은 5개까지 업로드 가능합니다.');
        $this.remove()
        
    } else {
        for(let i=0; i<len; i++){
            const tmppath = URL.createObjectURL(e.target.files[i]);
            const thumb = `
            <div>
                <img src='${tmppath}' alt="" width="100px" height="100px">
            </div>
                `
            $('td#thumbnail').append($(thumb));        
        }
    }
})    

$(document).on('click', '#photodelete', function(e) {
    const $this = $(e.currentTarget)
    console.log($this)
    
    $this.parent().remove()

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



