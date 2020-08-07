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
            $('div#thumbnail').append($(thumb));        
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
