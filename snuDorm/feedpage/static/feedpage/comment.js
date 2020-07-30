$(document).on('submit', '.comment-submit', function(e) {
    e.preventDefault();
    console.log('form submitted');
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        type: 'POST',
        url: `/feeds/${board}/${category}/${fid}/newcomment/`,
        data: {
            fid: fid,
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            content: $(`input#${fid}[name=content]`).val(),
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            const str = `
            <div>
                <div>
                    <p>${response.username}: ${response.content }</p>
                    <a class='editcommentform'>
                        <button>수정</button>
                    </a>
                    <form method="POST" class='deletecomment' data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <button>삭제</button>
                    </form>
                    <div>
                        <a class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="0">[0]</a>
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
                        <input id='${response.cid}' type="text" name="content" />
                        <button type="submit">대댓글 달기</button>
                    </form>
                </div>
            </div>
                    `;

            $(str).insertBefore($this);
            $(`input#${fid}[name=content]`).val('');
            
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

    $.ajax({
        type: 'POST',
        url: `/feeds/${board}/${category}/${fid}/${cid}/`,
        data: {
            fid: fid,
            cid: cid,
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            content: $(`input#${cid}[name=content]`).val(),
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            const str = `
            <div>
            <p>${response.username}: ${response.content }</p>
            <div>
            <a href="/feeds/${board}/${category}/${fid}/${cid}/${response.did}/likerecomment/" class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${response.did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="0">대댓글 좋아요: 0</a>
            </div>
            <form action="/feeds/${board}/${category}/${fid}/${cid}/${response.did}/" method="POST" class='deleterecomment' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${response.did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                <button>대댓글 삭제</button>
            </form>
            </div>
                    `;

            $(str).insertBefore($this);
            $(`input#${cid}[name=content]`).val('');
            
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
    const count = $this.data('count');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/${cid}/likecomment/`,
        type: 'POST',
        data: {
            fid: fid,
            cid: cid,
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function (response) {
            console.log(response);

            if(response.like_count > 0) {
                count + 1;
            } else {
                count - 1;
            }  

            const str = `
            <div>
            <a href="/feeds/${board}/${category}/${fid}/${cid}/likecomment/" class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="${count}">[${response.likecount}]</a>
            </div>
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
    const count = $this.data('count');
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        url: `/feeds/${board}/${category}/${fid}/${cid}/${did}/likerecomment/`,
        type: 'POST',
        data: {
            fid: fid,
            cid: cid,
            csrfmiddlewaretoken: csrfmiddlewaretoken,
        },
        dataType: 'json',

        success: function (response) {
            console.log(response);

            if(response.like_count > 0) {
                count + 1;
            } else {
                count - 1;
            }  

            const str = `
            <div>
            <a href="/feeds/${board}/${category}/${fid}/${cid}/${did}/likerecomment/" class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="${count}">대댓글 좋아요: ${response.likecount}</a>
            </div>
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
            fid: fid,
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