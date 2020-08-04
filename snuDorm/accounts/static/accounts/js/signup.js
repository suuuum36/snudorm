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

  if (!userIdRegex.test(idInput.value)) {
    alert("아이디를 확인해주세요.");
    idInput.focus();
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

  if (!nkRegex.test(nkInput.value)) {
    alert("닉네임을 확인해주세요.");
    nkInput.focus();
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
  // 2-4자의 한글 이름
  var nameRegex = /^[가-힣]{2,4}$/; 
  // 영문, 숫자, 특수문자 최소 한 글자씩 포함 & 8자 이상
  var pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  

  // 이름 확인
  if(nameInput.value == "") {
    alert("이름을 입력해주세요.");
    nameInput.focus();
    return false;
  };
  
  if (!nameRegex.test(nameInput.value)) {
    alert("이름을 확인해주세요.");
    nameInput.focus();
    return false;
  };
  
  // 아이디 중복확인 여부
  if ($('.user-id').attr("check_result") == "fail"){
    alert("아이디 중복체크를 해주시기 바랍니다.");
    $('.user-id').focus();
    return false;
  };

  // 비밀번호 확인
  // 1) 비밀번호 regex 확인
  // 2) 비밀번호 일치여부 확인
  if (!pwRegex.test(pw1Input.value)) {
    alert("비밀번호를 확인해주세요.");
    pw1Input.focus();
    return false;
  };
  
  if (pw1Input.value != pw2Input.value) {
    alert("비밀번호가 일치하지 않습니다.");
    pw1Input.focus();
    return false;
  };

  // 닉네임 중복확인 여부
  if ($('.nickname').attr("check_result") == "fail"){
    alert("닉네임 중복체크를 해주시기 바랍니다.");
    console.log(pw1Input.value == pw2Input.value);
    console.log(pw2Input.value);
    $('.nickname').focus();
    return false;
  };

  // 이메일 
  if (emailInput.value == "") {
    alert("이메일을 입력해주세요.");
    emailInput.focus();
    return false;
  };
  

  // 모든 유효성 검사 통과 시 form 제출
  document.getElementById("submit").submit();
};

// 유효성 검사를 위한 tool fucntion
function regexCheck(regex, what, message) {
  if(regex.test(what.value)) {
    return true;
  }
  alert(message);
  what.value = "";
  what.focus();
};


// 기숙사 생활관 selected 표시 변경
const selected = document.querySelector(".selected");
const category_container = document.querySelector(".category-container");
const category_options = document.querySelectorAll(".category-option");

// selected 선택시 toggle을 통해 옵션 보여주기
selected.addEventListener("click", () => {
  category_container.classList.toggle("active");
});

// 옵션 선택시 selected의 innerHTML 값 변경을 통해 노출되는 innerHTML 변경
// 옵션 선택시 toggle을 통해 옵션 숨기기
category_options.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    category_container.classList.remove("active");
  });
});

// 기숙사 동 selected_dong 표시 변경(위와 동일한 방식)
const selected_dong = document.querySelector(".selected-dong");
const dong_container = document.querySelector(".dong-container");

const dong_options = document.querySelectorAll(".dong-option");

selected_dong.addEventListener("click", () => {
  dong_container.classList.toggle("active");
  console.log(selected_dong.innerHTML);
});

dong_options.forEach(d => {
  d.addEventListener("click", () => {
    selected_dong.innerHTML = d.querySelector("label").innerHTML;
    dong_container.classList.remove("active");
    console.log(selected_dong.innerHTML);
  });
});


// 기숙사 동 반응형 구현
function categoryChange(e) {

  // 추가할 옵션 리스트 변수 설정
  var bachelor_option = ['906', '915', '919A', '919B', '919C', '919D', '921', '922', '923', '924', '925', '926'];
  var master_option = ['900', '901', '902', '903', '904', '905', '917', '918'];
  var family_option = ['931', '932', '933', '934', '935'];
  var bk_option = ['946A', '946B'];

  // 기숙사 생활관 옵션 값에 따른 변수 지정
  if(e.value == "bachelor") var category = bachelor_option;
  else if(e.value == "master") var category = master_option;
  else if(e.value == "family") var category = family_option;
  else if(e.value == "bk") var category = bk_option;

  // 기숙사 동 옵션을 추가하고자 하는 target 요소의 위치
  var target = document.getElementById("dong-container-id");
  
  // 이전에 선택한 옵션으로 인해 추가되어 있는 기숙사 동 옵션 제거
  while ( target.hasChildNodes() ) {
    target.removeChild(target.firstChild);
  }

  // for문을 통해 target의 자식 요소로 기숙사 동 옵션 추가
  for (dong in category) {
    var div = document.createElement('div');
    var input = document.createElement('input');
    var label = document.createElement('label');

    div.className = "dong-option";
    input.type = "radio";
    input.className = "radio";
    input.id = category[dong];
    input.name = "building_dong";
    label.setAttribute("for", category[dong]);
    label.innerHTML = `${category[dong]}동`;

    div.appendChild(input);
    div.appendChild(label);
    
    target.appendChild(div);
  }
};



