//전체글 베스트글

var BestButton = document.getElementById("best")
var AllButton = document.getElementById("not_best")
var BestList = document.getElementById("show_best_lists")
var AllList = document.getElementById("show_normal_lists")

var urlPath = window.location.href

var num1Text = document.querySelector('.num1').innerText;
var num1 = document.querySelector('.num1')
var num2Text = document.querySelector('.num2').innerText;
var num2  = document.querySelector('.num2')

var num3Text = document.querySelector('.num3').innerText;
var num3 = document.querySelector('.num3')

var num4Text = document.querySelector('.num4').innerText;
var num4 = document.querySelector('.num3')


BestButton.addEventListener('click', () => {
    BestList.style.visibility = 'visible'
    AllList.style.visibility = 'hidden'
    AllButton.style.fontWeight = '400';
    BestButton.style.color = 'black';
    AllButton.style.color = '#7f7f7f';
    num3.style.color = '#016aff';
})

// page numbers 효과

if(urlPath.indexOf(num1Text)!= -1) {
    num1.style.color = '#016aff';
} else if (urlPath.indexOf(num2Text)!= -1) {
    num2.style.color = '#016aff';
} else {

}

if(urlPath.indexOf("best")!= -1 && urlPath.indexOf(num3Text)!= -1) {
    BestList.style.visibility = 'visible'
    AllList.style.visibility = 'hidden'
    AllButton.style.fontWeight = '400';
    BestButton.style.color = 'black';
    AllButton.style.color = '#7f7f7f';
    num3.style.color = '#016aff';
} else {}