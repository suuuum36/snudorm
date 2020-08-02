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
var BestButton = document.getElementById("best")

var wholeFeed = document.querySelector('.whole-feed')
var comment = document.querySelector('.comment')

var wholeFeed2 = document.getElementById("whole-feed")
var comment2 = document.getElementById("comment")

var statusText = document.querySelector('.status-text').innerText;
var statusBox = document.querySelector('.life-status')

var statusText2 = document.getElementById("status-text").innerText;
var statusBox2 = document.getElementById("life-status")

var oneFeed = document.querySelector('.one-feed').childElementCount;


if (statusText == "완료") {
    wholeFeed.style.color = '#7f7f7f';
    comment.style.color = '#7f7f7f';
    statusBox.style.backgroundColor = '#7f7f7f';
}


BestButton.addEventListener('click', () => {
    if (statusText == "완료") {
        wholeFeed2.style.color = '#7f7f7f';
        comment2.style.color = '#7f7f7f';
        statusBox2.style.backgroundColor = '#7f7f7f';
    } else {

    }
})
