//설정
var urlPath = window.location.pathname.split('/').reverse()[1]
var urlPath2 = window.location.pathname.split('/').reverse()[2]

//1단계 글자 효과
var homeText = document.querySelector('.home-text');
var minwonText = document.querySelector('.minwon-text');
var lifeText = document.querySelector('.life-text');
var freeText = document.querySelector('.free-text');

if (urlPath == "") {
    homeText.style.color = 'black';
} else if (urlPath == "feeds") {
    homeText.style.color = 'black';
} else if (urlPath2 == "minwon") {
    minwonText.style.color = 'black';
} else if (urlPath2 == "life") {
    lifeText.style.color = 'black';
} else if (urlPath2 == "freeboard") {
    freeText.style.color = 'black';
} else {
}

//2단계 layer show
var minwonC = document.querySelector('.minwon-category');
var lifeC = document.querySelector('.life-category');

if (urlPath2 == "minwon") {
    minwonC.style.visibility = 'visible';
} else if (urlPath2 == "life") { 
    lifeC.style.visibility = 'visible';
} else {

}

//3단계 layer show
var building1 = document.querySelector('.building-1');
var building2 = document.querySelector('.building-2');
var building3 = document.querySelector('.building-3');
var building4 = document.querySelector('.building-4');

if (urlPath.indexOf("bachelor")!= -1) {
    building1.style.visibility = 'visible';
}
else if (urlPath.indexOf("graduate")!= -1) {
    building2.style.visibility = 'visible';
}
else if (urlPath.indexOf("family")!= -1) {
    building3.style.visibility = 'visible';
}
else if (urlPath.indexOf("bk")!= -1) {
    building4.style.visibility = 'visible';
}
else {

}

//2단계 글자 효과
//민원
var mAll = document.querySelector('.minwon-all-text');
var mGong = document.querySelector('.gong-text');
var mB = document.querySelector('.bachelor-text');
var mG = document.querySelector('.graduate-text');
var mF = document.querySelector('.family-text');
var mBK = document.querySelector('.bk-text');

if (urlPath == "tori") {
    mAll.style.color = 'black';
} else if (urlPath == "gong") {
    mGong.style.color = 'black';
} else if (urlPath.indexOf("bachelor")!= -1) {
    mB.style.color = 'black';
} else if (urlPath.indexOf("graduate")!= -1) {
    mG.style.color = 'black';
} else if (urlPath.indexOf("family")!= -1) {
    mF.style.color = 'black';
} else if (urlPath.indexOf("bk")!= -1) {
    mBK.style.color = 'black';
} else {
}

//생활
var l1 = document.querySelector('.l1');
var l2 = document.querySelector('.l2');
var l3 = document.querySelector('.l3');
var l4 = document.querySelector('.l4');

if (urlPath == "cobuy") {
    l1.style.color = 'black';
} else if (urlPath == "rent") {
    l2.style.color = 'black';
} else if (urlPath == 'keep') {
    l3.style.color = 'black';
} else if (urlPath == 'resell') {
    l4.style.color = 'black';
} else {
}

//3단계 글자 효과
var b1 = document.querySelector('.b1');
var b2 = document.querySelector('.b2');
var b3 = document.querySelector('.b3');
var b4 = document.querySelector('.b4');
var b5 = document.querySelector('.b5');
var b6 = document.querySelector('.b6');
var b7 = document.querySelector('.b7');
var b8 = document.querySelector('.b8');
var b9 = document.querySelector('.b9');
var b10 = document.querySelector('.b10');
var b11 = document.querySelector('.b11');
var b12 = document.querySelector('.b12');

var g1 = document.querySelector('.g1');
var g2 = document.querySelector('.g2');
var g3 = document.querySelector('.g3');
var g4 = document.querySelector('.g4');
var g5 = document.querySelector('.g5');
var g6 = document.querySelector('.g6');
var g7 = document.querySelector('.g7');
var g8 = document.querySelector('.g8');

var f1 = document.querySelector('.f1');
var f2 = document.querySelector('.f2');
var f3 = document.querySelector('.f3');
var f4 = document.querySelector('.f4');
var f5 = document.querySelector('.f5');

var bk1 = document.querySelector('.bk1');
var bk2 = document.querySelector('.bk2');

if (urlPath == "bachelor_906") {
    b1.style.color = 'black';
} else if (urlPath == "bachelor_915") {
    b2.style.color = 'black';
} else if (urlPath == "bachelor_919A") {
    b3.style.color = 'black';
} else if (urlPath == "bachelor_919B") {
    b4.style.color = 'black';
} else if (urlPath == "bachelor_919C") {
    b5.style.color = 'black';
} else if (urlPath == "bachelor_919D") {
    b6.style.color = 'black';
} else if (urlPath == "bachelor_921") {
    b7.style.color = 'black';
} else if (urlPath == "bachelor_922") {
    b8.style.color = 'black';
} else if (urlPath == "bachelor_923") {
    b9.style.color = 'black';
} else if (urlPath == "bachelor_924") {
    b10.style.color = 'black';
} else if (urlPath == "bachelor_925") {
    b11.style.color = 'black';
} else if (urlPath == "bachelor_926") {
    b12.style.color = 'black';
} else {
}

if (urlPath == "graduate_900") {
    g1.style.color = 'black';
} else if (urlPath == "graduate_901") {
    g2.style.color = 'black';
} else if (urlPath == "graduate_902") {
    g3.style.color = 'black';
} else if (urlPath == "graduate_903") {
    g4.style.color = 'black';
} else if (urlPath == "graduate_904") {
    g5.style.color = 'black';
} else if (urlPath == "graduate_905") {
    g6.style.color = 'black';
} else if (urlPath == "graduate_917") {
    g7.style.color = 'black';
} else if (urlPath == "graduate_918") {
    g8.style.color = 'black';
} else {
}

if (urlPath == "family_931") {
    f1.style.color = 'black';
} else if (urlPath == "family_932") {
    f2.style.color = 'black';
} else if (urlPath == "family_933") {
    f3.style.color = 'black';
} else if (urlPath == "family_934") {
    f4.style.color = 'black';
} else if (urlPath == "family_935") {
    f5.style.color = 'black';
} else {
}

if (urlPath == "bk_946A") {
    bk1.style.color = 'black';
} else if (urlPath == "bk_946B") {
    bk2.style.color = 'black';
}