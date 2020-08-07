// Get the modal

// Get the image and insert it inside the modal - use its "alt" text as a caption

window.modal = function(self) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = self.src;
    console.log('click');
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}


//완료 dim 처리 
var string = '완료';

$('.feed_status:contains("'+string+'")').css("background-color","#7f7f7f");


//대댓글 팝업


$(document).on('click', '.recomment-button', function(e){
    const $this = $(e.currentTarget);
    $target = $this.parent().parent().siblings('.recomment-make');
    if( $target.css('display') == 'none'){
        $target.css('display', 'block')
        $this.css('color', '#016aff')
        console.log('yes')
    } else {
        $target.css('display', 'none')
        $this.css('color', '#5A5A5A')
        console.log('no')
    }
})


$(document).on('click', '.editrecommentform', function(e){
    const $this = $(e.currentTarget);
    $target = $this.parent().parent().siblings('.recomment-edit');
    $target.css('heigth', '34px')
})