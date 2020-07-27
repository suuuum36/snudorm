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
            <p>${response.username}: ${response.content }</p>
            <a href="/feeds/${board}/${category}/${fid}/${response.cid}/likecomment/">댓글 좋아요</a>
            <form action="/feeds/${board}/${category}/${fid}/${response.cid}/deletecomment/" method="POST" class='deletecomment' data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                <button>댓글 삭제</button>
            </form>
            <form action="/feeds/${board}/${category}/${fid}/${response.cid}/" method="POST" class="recomment-submit" data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                <input id='${response.cid}' =type="text" name="content" />
                <button type="submit">대댓글 달기</button>
            </form>
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
            <a href="/feeds/${board}/${category}/${fid}/${cid}/${response.did}/likerecomment/">대댓글 좋아요</a>
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
            fid: fid,
            cid: cid,
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
            fid: fid,
            cid: cid,
            did: did,
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