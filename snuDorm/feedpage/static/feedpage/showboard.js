function showNormalList() {
    console.log('전체글 submitted');
    $('#show_normal_lists').removeAttr('style');
    $('#show_best_lists').attr("style", "display:none;");
}

function showBestList() {
    console.log('베스트 submitted');
    $('#show_normal_lists').attr("style", "display:none;");
}
