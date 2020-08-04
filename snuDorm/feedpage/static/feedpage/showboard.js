//전체글 베스트글

var BestButton = document.getElementById("best")
var AllButton = document.getElementById("not_best")
var BestList = document.getElementById("show_best_lists")
var AllList = document.getElementById("show_normal_lists")

var urlPath = window.location.href

var num1Text = document.querySelector('.num1').innerText;
var num1 = document.querySelector('.num1')

var num3Text = document.querySelector('.num3').innerText;
var num3 = document.querySelector('.num3')

//전체글
AllButton.addEventListener('click', () => {
    BestList.style.visibility = 'hidden'
    AllList.style.visibility = 'visible'
    AllButton.style.color = 'black';
    BestButton.style.color = '#7f7f7f';
    num3.style.color = '#016aff';
})

//베스트
BestButton.addEventListener('click', () => {
    BestList.style.visibility = 'visible'
    AllList.style.visibility = 'hidden'
    BestButton.style.color = 'black';
    AllButton.style.color = '#7f7f7f';
    num3.style.color = '#016aff';
})


// page numbers 효과
if(urlPath.indexOf(num1Text)!= -1) {
    num1.style.color = '#016aff';
} else {
}

if(urlPath.indexOf("best")!= -1 && urlPath.indexOf(num3Text)!= -1) {
    BestList.style.visibility = 'visible'
    AllList.style.visibility = 'hidden'
    AllButton.style.fontWeight = '400';
    BestButton.style.color = 'black';
    AllButton.style.color = '#7f7f7f';
    num3.style.color = '#016aff';
} else {

}


//완료 dim 처리 


var string = '완료';

$('.whole-feed:contains("'+string+'")').css("color","#7f7f7f");
$('.whole-feed:contains("'+string+'")').find( '.comment' ).css("color","#7f7f7f");
$('.life-status:contains("'+string+'")').css("background-color","#7f7f7f");
