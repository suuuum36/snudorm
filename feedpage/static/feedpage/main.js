//설정

// var url = window.location.href
var url = window.location.href.split('.com/')[1]
var urlPath = window.location.pathname.split('/').reverse()[1]
var urlPath2 = window.location.pathname.split('/').reverse()[2]

//1단계 글자 효과
var homeText = document.querySelector('.home-text');
var minwonText = document.querySelector('.minwon-text');
var lifeText = document.querySelector('.life-text');
var freeText = document.querySelector('.free-text');

var board = ["", "feeds", "minwon", "life", "freeboard"]
var boardText = [homeText, homeText, minwonText, lifeText, freeText]
var idx;

for(idx = 0; idx < 5; idx++) {
	if(urlPath == board[idx]) {
        boardText[idx].style.color = 'black';
	} else if (urlPath2 == board[idx]) {
        boardText[idx].style.color = 'black';
	} 
}

//2단계 layer show
var minwonC = document.querySelector('.minwon-category');
var lifeC = document.querySelector('.life-category');

if (url.indexOf("minwon")!= -1) {
    minwonC.style.visibility = 'visible';
    minwonText.style.color = 'black';
} else if (url.indexOf("life")!= -1) { 
    lifeC.style.visibility = 'visible';
    lifeText.style.color = 'black';
} else if (url.indexOf("freeboard")!= -1) { 
    freeText.style.color = 'black';
}


//3단계 layer show
var building1 = document.querySelector('.building-1');
var building2 = document.querySelector('.building-2');
var building3 = document.querySelector('.building-3');
var building4 = document.querySelector('.building-4');

var category = ["bachelor", "master", "family", "bk"]
var building = [building1, building2, building3, building4]
var idx;

for(idx = 0; idx < 12; idx++) {
	if(url.indexOf(category[idx])!= -1) {
        building[idx].style.visibility = 'visible';
	} 
}

//2단계 글자 효과
//민원
var mAll = document.querySelector('.minwon-all-text');
var mGong = document.querySelector('.gong-text');
var mB = document.querySelector('.bachelor-text');
var mG = document.querySelector('.master-text');
var mF = document.querySelector('.family-text');
var mBK = document.querySelector('.bk-text');

//생활
var lAll = document.querySelector('.life-all-text');
var l1 = document.querySelector('.l1');
var l2 = document.querySelector('.l2');
var l3 = document.querySelector('.l3');
var l4 = document.querySelector('.l4');

var category2 = ["tori", "tori", "gong", "bachelor", "master", "family", "bk", "cobuy", "rent", "keep", "resell"]
var categoryText = [mAll, lAll, mGong, mB, mG, mF, mBK, l1, l2, l3, l4]

for (idx=0; idx < 11; idx++) {
    if(url.indexOf(category2[idx])!= -1) {
        categoryText[idx].style.color = '#016aff';
    } else {
        categoryText[idx].style.color = 'gray';
    }
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

//학부
var Dong = ["906", "915", "919A", "919B", "919C", "919D", "921", "922", "923", "924", "925", "926" ]
var b_num = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12]
var idx;

for(idx = 0; idx < 12; idx++) {
	if(url.indexOf(Dong[idx])!= -1) {
        b_num[idx].style.color = 'black';
	} 
}

//대학원
var Dong = ["900", "901", "902", "903", "904", "905", "917", "918"]
var g_num = [g1, g2, g3, g4, g5, g6, g7, g8]
var idx;

for(idx = 0; idx < 12; idx++) {
	if(url.indexOf(Dong[idx])!= -1) {
        g_num[idx].style.color = 'black';
	} 
}

//가족+BK
var Dong = ["931", "932", "933", "934", "935", "946A", "946B"]
var fbk_num = [f1, f2, f3, f4, f5, bk1, bk2]
var idx;

for(idx = 0; idx < 12; idx++) {
	if(url.indexOf(Dong[idx])!= -1) {
        fbk_num[idx].style.color = 'black';
	} 
}


//레이아웃 변화
var headerWhole = document.querySelector('.category-bar')
var header3 = document.querySelector('.building')

if (url.indexOf("freeboard")!= -1 || urlPath == "" || urlPath == "feeds")  {
        headerWhole.style.height = 0;
} else if (url.indexOf("bachelor")!= -1 || url.indexOf("master")!= -1 || url.indexOf("family")!= -1 || url.indexOf("bk")!= -1 || url.indexOf("accounts") != -1) {
        header3.style.height ='60px';
} else if (url.indexOf("tori")!= -1 || url.indexOf("gong")!= -1 || url.indexOf("life")!= -1 ) {
        header3.style.height = 0;
} else {

}

if (url.indexOf("feeds/search/?select-option")!= -1) {
        headerWhole.style.height = 0;
}