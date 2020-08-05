// 공통게시판 - 주간 
function gongWeek() {
    console.log('공통 주간게시판 clicked');
    $('#gong_week_lists').attr("style", "display:;");
    $('#gong_day_lists').attr("style", "display:none;");
    $('#week_gong').attr("style", "color:black;");
    $('#day_gong').attr("style", "color:#7f7f7f;");
}
// 공통게시판 - 일간
function gongDay() {
    console.log('공통 일간게시판 clicked');
    $('#gong_day_lists').attr("style", "display:;");
    $('#gong_week_lists').attr("style", "display:none;");
    $('#day_gong').attr("style", "color:black;");
    $('#week_gong').attr("style", "color:#7f7f7f;");
}
// 동 게시판 - 주간
function dongWeek() {
    console.log('동 주간게시판 clicked');
    $('#dong_week_lists').attr("style", "dispaly:;");
    $('#dong_day_lists').attr("style", "display:none;");
    $('.week_dong').attr("style", "color:black;");
    $('.day_dong').attr("style", "color:#7f7f7f;");
}
// 동 게시판 - 일간 
function dongDay() {
    console.log('동 일간게시판 clicked');
    $('#dong_day_lists').attr("style", "display:;");
    $('#dong_week_lists').attr("style", "display:none;");
    $('.day_dong').attr("style", "color:black;");
    $('.week_dong').attr("style", "color:#7f7f7f;");
}


// 생활게시판 - 보관
function keep() {
    console.log('보관 게시판 clicked');
    $('#cobuy_lists').attr("style", "display:none;");
    $('#keep_lists').attr("style", "display:;");
    $('#rent_lists').attr("style", "display:none;");
    $('#resell_lists').attr("style", "display:none;");
    $('#keep').attr("style", "color:black;");
    $('#rent').attr("style", "color:#7f7f7f;");
    $('#resell').attr("style", "color:#7f7f7f;");
    $('#cobuy').attr("style", "color:#7f7f7f;");
}

// 생활게시판 - 대여
function rent() {
    console.log('대여 게시판 clicked');
    $('#cobuy_lists').attr("style", "display:none;");
    $('#keep_lists').attr("style", "display:none;");
    $('#rent_lists').attr("style", "display:;");
    $('#resell_lists').attr("style", "display:none;");
    $('#rent').attr("style", "color:black;");
    $('#keep').attr("style", "color:#7f7f7f;");
    $('#resell').attr("style", "color:#7f7f7f;");
    $('#cobuy').attr("style", "color:#7f7f7f;");
}

// 생활게시판 - 중고
function resell() {
    console.log('중고 게시판 clicked');
    $('#cobuy_lists').attr("style", "display:none;");
    $('#keep_lists').attr("style", "display:none;");
    $('#rent_lists').attr("style", "display:none;");
    $('#resell_lists').attr("style", "display:;");
    $('#resell').attr("style", "color:black;");
    $('#rent').attr("style", "color:#7f7f7f;");
    $('#keep').attr("style", "color:#7f7f7f;");
    $('#cobuy').attr("style", "color:#7f7f7f;");
}

// 생활게시판 - 공구
function cobuy() {
    console.log('공구 게시판 clicked');
    $('#cobuy_lists').attr("style", "display:;");
    $('#keep_lists').attr("style", "display:none;");
    $('#rent_lists').attr("style", "display:none;");
    $('#resell_lists').attr("style", "display:none;");
    $('#cobuy').attr("style", "color:black;");
    $('#resell').attr("style", "color:#7f7f7f;");
    $('#keep').attr("style", "color:#7f7f7f;");
    $('#rent').attr("style", "color:#7f7f7f;");
}

var list = $('.life-list').find('.list').children().length;
console.log(list);

