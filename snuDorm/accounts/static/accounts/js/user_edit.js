var noChange = document.getElementById("no")

noChange.addEventListener("click", () => {
    alert("아이디는 수정이 불가능합니다.")
})

// 닉네임 중복확인 기능
function nk_db_check() {

    // nickname input 값이 달라지는 경우 다시 중복확인 하기
    $('.nickname').change(function () {
      $('#nk-confirm').hide();
      $('.nk-check').show();
      $('.nickname').attr("check_result", "fail");
    })
    
    // 2-8자의 닉네임 입력
    if ($('.nickname').val().length < 2 || $('.nickname').val().length > 8) {
      alert('2-8자의 닉네임을 입력해주세요.')
      $('.nickname').focus();
      return;
    }
  
    // 한글 & 영문 & 숫자 조합의 닉네임 입력
    var nkRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,8}$/;
    var nkInput = document.getElementById("nickname");
  
    if (!regexCheck(nkRegex, nkInput, "닉네임을 확인해주세요.")) {
      return false;
    }
    
    nk_input = document.querySelector('input[name="nickname"]');
  
    $.ajax({
      url: "/accounts/signup/nkdbcheck/",
      data: {
        'nickname': nk_input.value
      },
      datatype: 'json',
      success: function (data) {
        if (data['db_check'] == "fail") {
          alert("이미 존재하는 닉네임 입니다.");
          nk_input.focus();
          return;
        } else {
          alert("사용가능한 닉네임 입니다.");
          $('.nickname').attr("check_result", "success");
          $('#nk-confirm').show();
          $('.nk-check').hide();
          return;
        }
      }
    });
  }

  function regexCheck(regex, what, message) {
    if(regex.test(what.value)) {
      return true;
    };
    alert(message);
    what.value = "";
    what.focus();
  };
  
  // 공백 여부 판단을 위한 tool function
  function blankCheck(field, message) {
    if(field.vaule == "") {
      alert(message);
      field.focus();
    };
  };