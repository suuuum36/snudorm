// function showNormalList() {
//     console.log('전체글 submitted');
//     $('#show_normal_lists').removeAttr('style');
//     $('#show_best_lists').attr("style", "display:none;");
// }

// function showBestList() {
//     console.log('베스트 submitted');
//     $('#show_normal_lists').attr("style", "display:none;");
//     $('#show_best_lists').removeAttr('style');
// }

var BestButton = document.getElementById("best")
var AllButton = document.getElementById("not_best")
var BestList = document.getElementById("show_best_lists")
var AllList = document.getElementById("show_normal_lists")

BestButton.addEventListener('click', () => {
    BestList.style.visibility = 'visible'
    AllList.style.visibility = 'hidden'
    AllButton.style.fontWeight = '400';
    BestButton.style.fontWeight = '600';
})

window.addEventListener('load', (event) => {
    AllButton.style.fontWeight = '600';
});

