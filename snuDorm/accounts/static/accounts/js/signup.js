// TODO: 로그인 실패 기능
// 아이디 숫자로만 이루어지지 않게


// 아이디 중복확인 기능
function id_db_check() {

  // id input 값이 달라지는 경우 다시 중복확인 하기
  $('.user-id').change(function () {
    $('#id-confirm').hide();
    $('.id-check').show();
    $('.user-id').attr("check_result", "fail");
  })

  // 5자 이상의 아이디 입력
  if ($('.user-id').val().length < 5) {
    alert('5자 이상의 아이디를 입력해주세요.');
    $('.user-id').focus();
    return false;
  }
  
  // 영문 또는 숫자 조합의 아이디가 입력되지 않았을 경우
  var userIdRegex = /^[a-zA-Z0-9]{5,}$/;
  var idInput = document.getElementById("user-id");

  if (!regexCheck(userIdRegex, idInput, "아이디를 확인해주세요.")) {
    return false;
  }
  
  id_input = document.querySelector('input[name="user_id"]');

  $.ajax({
    url: "/accounts/signup/iddbcheck",
    data: {
      'user_id': id_input.value
    },
    datatype: 'json',
    success: function (data) {
      if (data['db_check'] == "fail") {
        alert("이미 존재하는 아이디 입니다.");
        id_input.focus();
        return;
      } else {
        alert("사용가능한 아이디 입니다.");
        $('.user-id').attr("check_result", "success");
        $('#id-confirm').show();
        $('.id-check').hide();
        return;
      }
    }
  });
}

// 닉네임 중복확인 기능(아이디와 동일)
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
    url: "/accounts/signup/nkdbcheck",
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

// 회원가입 form 유효성 검사
function validateForm() {

  // input 변수 지정
  var nameInput = document.getElementById("name");
  var pw1Input = document.getElementById("pw1");
  var pw2Input = document.getElementById("pw2");
  var emailInput = document.getElementById("email");

  // regex 변수 지정
  // 4자 이내의 한글 이름(공백 불가능) 또는 15자 이내의 영어 이름(공백 가능)
  var nameRegex = /^[가-힣]{1,4}|[\sa-zA-Z]{1,15}$/; 
  // 영문, 숫자, 특수문자 최소 한 글자씩 포함 & 8자 이상
  var pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  

  // // 이름 확인
  // if(blankCheck(nameInput, "이름을 입력해주세요.")) {
  //   return false;
  // };
  
  // if (!regexCheck(nameRegex, nameInput, "이름을 확인해주세요.")) {
  //   return false;
  // };
  
  // // 아이디 중복확인 여부
  // if ($('.user-id').attr("check_result") == "fail"){
  //   alert("아이디 중복체크를 해주시기 바랍니다.");
  //   $('.user-id').focus();
  //   return false;
  // };

  // // 비밀번호 확인
  // // 1) 비밀번호 regex 확인
  // // 2) 비밀번호 일치여부 확인
  // if (!regexCheck(pwRegex, pw1Input, "비밀번호를 확인해주세요.")) {
  //   return false;
  // }; // 1차 비밀번호 확인

  // if (!regexCheck(pwRegex, pw2Input, "비밀번호를 확인해주세요.")) {
  //   return false;
  // }; // 2차 비밀번호 확인
  
  // if (pw1Input.value != pw2Input.value) {
  //   alert("비밀번호가 일치하지 않습니다.");
  //   pw1Input.focus();
  //   return false;
  // };

  // // 닉네임 중복확인 여부
  // if ($('.nickname').attr("check_result") == "fail"){
  //   alert("닉네임 중복체크를 해주시기 바랍니다.");
  //   $('.nickname').focus();
  //   return false;
  // };

  // // 이메일 
  // if (blankCheck(emailInput, "이메일을 입력해주세요.")) {
  //   return false;
  // };
  

  // 모든 유효성 검사 통과 시 form 제출
  document.getElementById("submit").submit();
};

// regex 검증을 위한 tool fucntion
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


// 기숙사 생활관 selected 표시 변경
var selected = document.querySelector(".selected");
var categoryContainer = document.querySelector(".category-container");
var categoryOptions = document.querySelectorAll(".category-option");

// selected 선택시 toggle을 통해 옵션 보여주기
selected.addEventListener("click", () => {
  categoryContainer.classList.toggle("active");
});

// 옵션 선택시 selected의 innerHTML 값 변경을 통해 노출되는 innerHTML 변경
// 옵션 선택시 toggle을 통해 옵션 숨기기
categoryOptions.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    categoryContainer.classList.remove("active");
    
    var dorm = document.getElementById("selected").innerHTML;
    if (dorm == "학부생활관") {
      document.getElementById("default-dong").className='remove';
      document.getElementById("bachelor-dong").className='building-bachelor';
      document.getElementById("master-dong").className='remove';
      document.getElementById("family-dong").className='remove';
      document.getElementById("bk-dong").className='remove';
    } else if (dorm == "대학원생활관") {
      document.getElementById("default-dong").className='remove';
      document.getElementById("bachelor-dong").className='remove';
      document.getElementById("master-dong").className='building-master';
      document.getElementById("family-dong").className='remove';
      document.getElementById("bk-dong").className='remove';
    } else if (dorm == "가족생활관") {
      document.getElementById("default-dong").className='remove';
      document.getElementById("bachelor-dong").className='remove';
      document.getElementById("master-dong").className='remove';
      document.getElementById("family-dong").className='building-family';
      document.getElementById("bk-dong").className='remove';
    } else if (dorm == "BK생활관") {
      document.getElementById("default-dong").className='remove';
      document.getElementById("bachelor-dong").className='remove';
      document.getElementById("master-dong").className='remove';
      document.getElementById("family-dong").className='remove';
      document.getElementById("bk-dong").className='building-bk';
    };
  });
});

// default 표시 변경
var defaultSelected = document.querySelector(".selected-default");
var defaultContainer = document.querySelector(".default-container");
var defaultOptions = document.querySelectorAll(".default-option");

defaultSelected.addEventListener("click", () => {
  defaultContainer.classList.toggle("active");
});

defaultOptions.forEach(d => {
  d.addEventListener("click", () => {
    defaultSelected.innerHTML = d.querySelector("label").innerHTML;
    defaultContainer.classList.remove("active");
  });
});

// 학부생활관 동 표시 변경
var bachelorSelected = document.querySelector(".selected-bachelor");
var bachelorContainer = document.querySelector(".bachelor-container");
var bachelorOptions = document.querySelectorAll(".bachelor-option");

bachelorSelected.addEventListener("click", () => {
  bachelorContainer.classList.toggle("active");
});

bachelorOptions.forEach(d => {
  d.addEventListener("click", () => {
    bachelorSelected.innerHTML = d.querySelector("label").innerHTML;
    bachelorContainer.classList.remove("active");
  });
});

// 대학원생활관 동 표시 변경
var masterSelected = document.querySelector(".selected-master");
var masterContainer = document.querySelector(".master-container");
var masterOptions = document.querySelectorAll(".master-option");

masterSelected.addEventListener("click", () => {
  masterContainer.classList.toggle("active");
});

masterOptions.forEach(d => {
  d.addEventListener("click", () => {
    masterSelected.innerHTML = d.querySelector("label").innerHTML;
    masterContainer.classList.remove("active");
  });
});

// 가족생활관 동 표시 변경
var familySelected = document.querySelector(".selected-family");
var familyContainer = document.querySelector(".family-container");
var familyOptions = document.querySelectorAll(".family-option");

familySelected.addEventListener("click", () => {
  familyContainer.classList.toggle("active");
});

familyOptions.forEach(d => {
  d.addEventListener("click", () => {
    familySelected.innerHTML = d.querySelector("label").innerHTML;
    familyContainer.classList.remove("active");
  });
});

// BK생활관 동 표시 변경
var bkSelected = document.querySelector(".selected-bk");
var bkContainer = document.querySelector(".bk-container");
var bkOptions = document.querySelectorAll(".bk-option");

bkSelected.addEventListener("click", () => {
  bkContainer.classList.toggle("active");
});

bkOptions.forEach(d => {
  d.addEventListener("click", () => {
    bkSelected.innerHTML = d.querySelector("label").innerHTML;
    bkContainer.classList.remove("active");
  });
});



// name 값 지정
var choose = document.querySelectorAll(".dong-option");

choose.forEach(x => {
  x.addEventListener("click", () => {
    var ipt = x.firstElementChild;
    var beforeName = document.getElementsByName("building_dong");
    if (beforeName.length == 1) {
      beforeName[0].removeAttribute("name");
    };
    ipt.setAttribute("name", "building_dong");
  });
});

