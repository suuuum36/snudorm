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