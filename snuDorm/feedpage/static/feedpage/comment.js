$(document).on('submit', '.comment-submit', function(e) {
    e.preventDefault();
    console.log('form submitted');
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');
    const noname_list = new Array()

    $(`input#noname${fid}[name=noname]:checked`).each(function() {
        noname_list.push($(this).val());
    })
    jQuery.ajaxSettings.traditional = true;

    $.ajax({
        type: 'POST',
        url: `/feeds/${board}/${category}/${fid}/newcomment/`,
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            content: $(`input#${fid}[name=content]`).val(),
            'noname[]': noname_list,
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);

            if (response.noname == true) {
                username = '익명'
            } else {
                username = response.nickname;
            }

            const str = `
            <div>
                <div>
                    <p>${username} : ${response.content }</p>
                    <a class='editcommentform'>
                        <button>수정</button>
                    </a>
                    <form method="POST" class='deletecomment' data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <button>삭제</button>
                    </form>
                    <div>
                        <a class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="0">댓글 좋아요: [0]</a>
                    </div>
                </div>
                <div id='editcommentsubmit' style="display: none">
                    <form method="POST" class="comment-edit"
                    data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-count = "0"
                    data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <input id="${fid}_${response.cid}" type="text" name="content" value="${response.content}"/>
                        <button type="submit">댓글 수정</button>
                    </form>
                </div>
                <div>
                    <form method="POST" class="recomment-submit" data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <input id='c${response.cid}' type="text" name="content" />
                        <button type="submit">대댓글 달기</button>
                        <input name="noname" type="checkbox" id="nonamec${response.cid}">
                        <label for="nonamec${response.cid}">익명</label>
                    </form>
                </div>
            </div>
                    `;

            $(str).insertBefore($this);
            $(`input#${fid}[name=content]`).val('');
            $(`input:checkbox[id='noname${fid}']`).prop("checked", false);
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },
        complete: function (response) {
            console.log(response);
        },
    });
});


$(document).on('submit', '.recomment-submit', function(e) {
    e.preventDefault();
    console.log('form submitted');
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');
    const noname_list = new Array()

    $(`input#nonamec${cid}[name=noname]:checked`).each(function() {
        noname_list.push($(this).val());
    })
    jQuery.ajaxSettings.traditional = true;

    $.ajax({
        type: 'POST',
        url: `/feeds/${board}/${category}/${fid}/${cid}/`,
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            content: $(`input#c${cid}[name=content]`).val(),
            'noname[]': noname_list,
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            
            if (response.noname == true) {
                username = '익명'
            } else {
                username = response.nickname;
            }

            const str = `
            <div>
            <p>${username}: ${response.content }</p>
            <div>
            <a href="/feeds/${board}/${category}/${fid}/${cid}/${response.did}/likerecomment/" class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${response.did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="0">대댓글 좋아요: [0]</a>
            </div>
            <form action="/feeds/${board}/${category}/${fid}/${cid}/${response.did}/" method="POST" class='deleterecomment' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${response.did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                <button>대댓글 삭제</button>
            </form>
            </div>
                    `;

            $(str).insertBefore($this);
            $(`input#c${cid}[name=content]`).val('');
            $(`input:checkbox[id='nonamec${cid}']`).prop("checked", false);
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },
        complete: function (response) {
            console.log(response);
        },
    });
});

$(document).on('submit', '.deletecomment', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');


    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/${cid}/deletecomment/`,
        type: 'POST',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function(response) {
            console.log(response);
            const $Comment = $this.parent().parent();
            $Comment.remove();        
        },

        error: function(response, status, error) {
            console.log(response, status, error);
        },

        complete: function(response) {
            console.log(response);
        },
        
    })
})


$(document).on('submit', '.deleterecomment', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    const did = $this.data('did');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');


    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/${cid}/${did}/`,
        type: 'POST',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function(response) {
            console.log(response);
            const $Comment = $this.parent();
            $Comment.remove();        
        },

        error: function(response, status, error) {
            console.log(response, status, error);
        },

        complete: function(response) {
            console.log(response);
        },
        
    })
})


$(document).on('click', '.comment-like', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    let count = $this.data('count');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/${cid}/likecomment/`,
        type: 'GET',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function (response) {
            console.log(response);

            if(response.likecount > 0) {
                count++;
            } else {
                count--;
            }  
            
            console.log(count)
            const str = `
            <a href="/feeds/${board}/${category}/${fid}/${cid}/likecomment/" class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="${count}">댓글 좋아요: [${count}]</a>
            `
            $(str).insertBefore($this);
            $this.remove();
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },

        complete: function (response) {
            console.log(response)
        }

    });
});


$(document).on('click', '.recomment-like', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    const did = $this.data('did');
    let count = $this.data('count');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/${cid}/${did}/likerecomment/`,
        type: 'GET',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function (response) {
            console.log(response);

            if(response.like_count > 0) {
                count++;
            } else {
                count--;
            }  

            const str = `
            <a href="/feeds/${board}/${category}/${fid}/${cid}/${did}/likerecomment/" class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="${count}">대댓글 좋아요: [${count}]</a>
            `
            $(str).insertBefore($this);
            $this.remove();
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },

        complete: function (response) {
            console.log(response)
        }

    });
});

$(document).on('click', '.editcommentform', function(e) {
    console.log('form submitted')
    const $this = $(e.currentTarget);
    $this.parent().remove();
    $('#editcommentsubmit').removeAttr('style');  
})

$(document).on('click', '.recommentform', function(e) {

})

$(document).on('submit', '.comment-edit', function(e) {
    e.preventDefault();
    console.log('form submitted');
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    const count = $this.data('count')
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        type: 'POST',
        url: `/feeds/${board}/${category}/${fid}/${cid}/editcomment/`,
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            content: $(`input#${fid}_${cid}[name=content]`).val(),
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            const str = `
                        <p>${response.username}: ${response.content }</p>
                        <a class='editcommentform'>
                            <button>수정</button>
                        </a>
                        <form method="POST" class='deletecomment' data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                            <button>삭제</button>
                        </form>
                        <div>
                            <a class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="${count}">[${count}]</a>
                        </div>
                    </div>
                    <div id='editcommentsubmit' style="display: none">
                        <form method="POST" class="comment-edit"
                        data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-count = "${count}"
                        data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                            <input id="${fid}_${cid}" type="text" name="content" value="${response.content}"/>
                            <button type="submit">댓글 수정</button>
                        </form>
                    `;

            $(str).insertBefore($this);
            $this.remove();
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },
        complete: function (response) {
            console.log(response);
        },
    });
});

$(document).on('click', '.feed-like', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    let count = $this.data('count');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/feedlike/`,
        type: 'GET',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function (response) {
            console.log(response);

            if(response.likecount > 0) {
                count++;
            } else {
                count--;
            }  

            console.log(count)
            const str = `
            <a class='feed-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-count='${count}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">${count} 좋아요</a>
            `

            $(str).insertBefore($this);
            $this.remove();
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },

        complete: function (response) {
            console.log(response)
        }

    });
});
