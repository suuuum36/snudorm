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
            console.log(response)
            
            if (response.concount > 50){
                alert(`댓글은 50글자 이하로 입력해주세요!`);
            } else if (response.concount == 0) {
                alert('댓글을 한글자 이상 입력해주세요!')
            } else{

            if (response.noname == true) {
                username = '익명'
            } else {
                username = response.nickname;
            }


            const str = `
            <div class= "comment">
                <div class = "comment-show">
                    <div class = "c-comment">
                        <div class = "c-a">
                            ${username}
                        </div>
                        <div class = "c-c">
                            ${response.content }
                        </div>
                    </div>
                    <div class="c-button">
                        <a class='editcommentform'>
                            수정
                        </a>
                        <form method="POST" class='deletecomment' data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                            <a class="deletecommentform">
                                삭제
                            </a>
                        </form>
                        <div class ="recomment-button">
                            대댓글
                        </div>
                    </div>
                    <div class = "c-like">
                        <div class = "comment_created_date">
                            ${response.date} 
                        </div>
                        <div>
                            <a class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="0">
                                <div class = "like-img">
                                    <img class = "img1" src="/static/img/like.png">
                                </div>
                                0
                            </a>
                        </div>
                    </div>
                </div>
                <div class="comment-edit" id='editcommentsubmit' style="display: none">
                    <form method="POST" class="comment-edit"
                    data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${response.cid}' data-count = "0"
                    data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <input id="${fid}_${response.cid}" type="text" name="content" value="${response.content}"/>
                        <button type="submit">댓글 수정</button>
                    </form>
                </div>
                <div class = "recomment-make comment-make">
                    <div class = "comment-box">
                        <form method="POST" class="recomment-submit" data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                            <input class = "recomment-makebox comment-makebox" id='c${response.cid}' type="text" name="content" size="73" placeholder ="댓글을 입력해주세요."/>
                            <input class = "noname-checkbox" name="noname" type="checkbox" id="nonamec${response.cid}">
                            <label class = "noname" for="nonamec${response.cid}">익명</label>
                            <button class = "write-comment" type="submit">대댓글 달기</button>
                        </form>
                    </div>    
                </div>
            </div>
                    `;

            $('div.info').append(str)
            $(`input#${fid}[name=content]`).val('');
            $(`input:checkbox[id='noname${fid}']`).prop("checked", false);
        }
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

            if (response.concount > 50){
                alert(`댓글은 50글자 이하로 입력해주세요!`);
            } else if (response.concount == 0) {
                alert('댓글을 한글자 이상 입력해주세요!')
            } else{
            
            if (response.noname == true) {
                username = '익명'
            } else {
                username = response.nickname;
            }

            const str = `
            <div class = "recomment">
                <div class = "recomment-show">
                    <div class = "c-comment">
                        <div class = "c-a">
                            ${username}
                        </div>
                        <div class = "c-c">
                            ${response.content}
                        </div>
                    </div>
                    <div class="c-button">
                        <a class='editrecommentform'>
                            수정
                        </a>
                        <form method="POST" class='deleterecomment' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${response.did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                            <a class="deletecommentform">
                                삭제
                            </a>
                        </form>
                    </div>
                    <div class="c-like">
                        <div class="comment_created_date">
                            ${response.date}
                        </div>
                        <div>
                            <a class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${response.did}' data-count="0" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                                <div class="like-img">
                                    <img class = "img1" src="/static/img/like.png">
                                </div>
                                0
                            </a>
                        </div>
                    </div>
                </div>
                <div class = "recomment-edit" id='editrecommentsubmit' style="display: none">
                    <form method="POST" class="recomment-edit"
                    data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${cid}" data-did="${response.did}" data-count = "0"
                    data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <input id="c${cid}_d${response.did}" type="text" name="content" value="${response.content}"/>
                        <button type="submit">대댓글 수정</button>
                    </form>
                </div>
            </div>
                    `;

            $(str).insertBefore($this.parent().parent());
            $this.parent().parent().css('display', 'none');

            $(`input#c${cid}[name=content]`).val('');
            $(`input:checkbox[id='nonamec${cid}']`).prop("checked", false);
        }
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },
        complete: function (response) {
            console.log(response);
        },
    });
});

$(document).on('click', '.deletecomment', (e) => {
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
            const $Comment = $this.parent().parent().parent();
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


$(document).on('click', '.deleterecomment', (e) => {
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
            const $Comment = $this.parent().parent().parent();
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
            <a class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-count="${count}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                <div class = "like-img">
                    <img class = "img1" src="/static/img/like.png">
                </div>
                ${count}
            </a>
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

            if(response.likecount > 0) {
                count++;
            } else {
                count--;
            }  

            const str = `
            <a class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${did}' data-count="${count}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                <div class = "like-img">
                    <img class = "img1" src="/static/img/like.png">
                </div>
                ${count}
            </a>
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
    $this.parent().parent().siblings('.comment-edit').removeAttr('style');  
    $this.parent().parent().remove();
})

$(document).on('click', '.editrecommentform', function(e) {
    console.log('form submitted')
    const $this = $(e.currentTarget);
    $this.parent().parent().siblings('.recomment-edit').removeAttr('style');
    $this.parent().parent().remove();
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

            if (response.noname == true) {
                username = '익명'
            } else {
                username = response.nickname;
            }
            
            const str = `
            <div class = "comment-show">
                <div class = "c-comment">
                    <div class = "c-a">
                        ${username}
                    </div>
                    <div class = "c-c">
                        ${response.content}
                    </div>
                </div>
                <div class="c-button">
                    <a class='editcommentform'>
                        수정
                    </a>
                    <form method="POST" class='deletecomment' data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${response.cid}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <a class="deletecommentform">
                            삭제
                        </a>
                    </form>
                    <div class ="recomment-button">
                        대댓글
                    </div>
                </div>
                <div class = "c-like">
                    <div class = "comment_created_date">
                        ${response.date} 
                    </div>
                    <div>
                        <a class='comment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}" data-count="${count}">
                            <div class = "like-img">
                                <img class = "img1" src="/static/img/like.png">
                            </div>
                            ${count}
                        </a>
                    </div>
                </div>
            </div>
            <div class="comment-edit" id='editcommentsubmit' style="display: none">
                <form method="POST" class="comment-edit"
                data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-count = "${count}"
                data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                    <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                    <input id="${fid}_${cid}" type="text" name="content" value="${response.content}"/>
                    <button type="submit">댓글 수정</button>
                </form>
            </div>
                    `;

            $(str).insertBefore($this.parent());
            $this.parent().remove();
            
        },

        error: function (response, status, error) {
            console.log(response, status, error);
        },
        complete: function (response) {
            console.log(response);
        },
    });
});


$(document).on('submit', '.recomment-edit', function(e) {
    e.preventDefault();
    console.log('form submitted');
    const $this = $(e.currentTarget);
    const board = $this.data('board');
    const category = $this.data('category');
    const fid = $this.data('fid');
    const cid = $this.data('cid');
    const did = $this.data('did')
    const count = $this.data('count')
    const csrfmiddlewaretoken = $this.data('csrfmiddlewaretoken');

    $.ajax({
        type: 'POST',
        url: `/feeds/${board}/${category}/${fid}/${cid}/${did}/editrecomment/`,
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            content: $(`input#c${cid}_d${did}[name=content]`).val(),
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
            <div class = "recomment-show">
                    <div class = "c-comment">
                        <div class = "c-a">
                            ${username}
                        </div>
                        <div class = "c-c">
                            ${response.content}
                        </div>
                    </div>
                    <div class="c-button">
                        <a class='editrecommentform'>
                            수정
                        </a>
                        <form method="POST" class='deleterecomment' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${did}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                            <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                            <a class="deletecommentform">
                                삭제
                            </a>
                        </form>
                    </div>
                    <div class="c-like">
                        <div class="comment_created_date">
                            ${response.date}
                        </div>
                        <div>
                            <a class='recomment-like' data-board="${board}" data-category="${category}" data-fid='${fid}' data-cid='${cid}' data-did='${did}' data-count="${count}" data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                                <div class="like-img">
                                    <img class = "img1" src="/static/img/like.png">
                                </div>
                                ${count}
                            </a>
                        </div>
                    </div>
                </div>
                <div class = "recomment-edit" id='editrecommentsubmit' style="display: none">
                    <form method="POST" class="recomment-edit"
                    data-board="${board}" data-category="${category}" data-fid="${fid}" data-cid="${cid}" data-did="${did}" data-count = "${count}"
                    data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                        <input type="hidden" name="csrfmiddlewaretoken" value=${csrfmiddlewaretoken}>
                        <input id="c${cid}_d${did}" type="text" name="content" value="${response.content}"/>
                        <button type="submit">대댓글 수정</button>
                    </form>
                </div>
                    `;

            $(str).insertBefore($this.parent());
            $this.parent().remove();
            
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
            <a class="feed-like" data-board="${board}" data-category="${category}" data-fid='${fid}' data-count='${count}' data-csrfmiddlewaretoken="${csrfmiddlewaretoken}">
                <div class = "like-img">
                    <img class = "img1" src="/static/img/like.png">
                </div>
                ${count}
            </a>
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


$(document).on('click', '.recomment-button', function(e){
    const $this = $(e.currentTarget);
    $target = $this.parent().parent().siblings('.recomment-make');
    if( $target.css('display') == 'none'){
        $target.css('display', 'block')
        $this.css('color', '#016aff')
        console.log('yes')
    } else {
        $target.css('display', 'none')
        $this.css('color', '#5A5A5A')
        console.log('no')
    }
})

