var noChange = document.getElementById("no")

noChange.addEventListener("click", () => {
    alert("아이디는 수정이 불가능합니다.")
})

// Regex 통과 여부 판단을 위한 tool function
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

  if (!regexCheck(nkRegex, nkInput, "닉네임은 한글, 영문, 숫자만 포함 가능합니다.")) {
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
        alert("이미 존재하는 닉네임입니다.");
        nk_input.focus();
        return;
      } else if(data['db_check'] == "pass1"){
        alert("기존 닉네임을 사용합니다.")
        $('.nickname').attr("check_result", "success");
        $('#nk-confirm').show();
        $('.nk-check').hide();
        return;
      } else {
        alert("사용가능한 닉네임입니다.");
        $('.nickname').attr("check_result", "success");
        $('#nk-confirm').show();
        $('.nk-check').hide();
        return;
      }
    }
  });
}

function validateForm() {

  // input 변수 지정
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var pwInput = document.getElementById("pw");

  // regex 변수 지정
  // 4자 이내의 한글 이름(공백 불가능) 또는 15자 이내의 영어 이름(공백 가능)
  var nameRegex = /^[가-힣]{1,4}|[\sa-zA-Z]{1,15}$/;    
 
  // 이름 확인
  if(blankCheck(nameInput, "이름을 입력해주세요.")) {
    return false;
  };
   
  if (!regexCheck(nameRegex, nameInput, "이름을 확인해주세요.")) {
    return false;
  };
 
  // 닉네임 중복확인 여부
  if ($('.nickname').attr("check_result") == "fail"){
    alert("닉네임 중복체크를 해주시기 바랍니다.");
    $('.nickname').focus();
    return false;
  };
 
  // 이메일 확인
  if (blankCheck(emailInput, "이메일을 입력해주세요.")) {
    return false;
  };

  // 비밀번호 공백 확인
  if (blankCheck(pwInput, "비밀번호를 입력해주세요.")) {
    return false;
  };
    
  // 모든 유효성 검사 통과 시 form 제출
  document.getElementById("submit").submit();
};


// edit 특별 기능 추가
window.onload = function () {
  var chk = document.getElementById("selected").innerHTML;
  var a = document.getElementById("default-dong"); // 처음에 보여지는 default 옵션
  var b = document.getElementById("bachelor-dong"); // 학부생활관 동 옵션
  var c = document.getElementById("master-dong"); // 대학원생활관 동 옵션
  var d = document.getElementById("family-dong"); // 가족생활관 동 옵션
  var e = document.getElementById("bk-dong"); // BK생활관 동 옵션

  if (chk.indexOf("학부생활관") != -1) {
    a.className = "remove"
    b.className = "building-bachelor"
    c.className = "remove"
    d.className = "remove"
    e.className = "remove"
  } else if (chk.indexOf("대학원생활관") != -1) {
    a.className = "remove"
    b.className = "remove"
    c.className = "building-master"
    d.className = "remove"
    e.className = "remove"
  } else if (chk.indexOf("가족생활관") != -1) {
    a.className = "remove"
    b.className = "remove"
    c.className = "remove"
    d.className = "building-family"
    e.className = "remove"
  } else if (chk.indexOf("BK생활관") != -1) {
    a.className = "remove"
    b.className = "remove"
    c.className = "remove"
    d.className = "remove"
    e.className = "building-bk"
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
        
    var opt = o.firstElementChild;
    var cateName = document.getElementsByName("building_category");
    if (cateName.length == 1) {
      cateName[0].removeAttribute("name");
    };
    opt.setAttribute("name", "building_category");
   
    var dorm = document.getElementById("selected").innerHTML;
    var defaultOpt = document.getElementById("default-dong"); // 처음에 보여지는 default 옵션
    var bachelorOpt = document.getElementById("bachelor-dong"); // 학부생활관 동 옵션
    var masterOpt = document.getElementById("master-dong"); // 대학원생활관 동 옵션
    var familyOpt = document.getElementById("family-dong"); // 가족생활관 동 옵션
    var bkOpt = document.getElementById("bk-dong"); // BK생활관 동 옵션

    if (dorm == "학부생활관") {
      defaultOpt.className='remove';
      bachelorOpt.className='building-bachelor';
      masterOpt.className='remove';
      familyOpt.className='remove';
      bkOpt.className='remove';
    } else if (dorm == "대학원생활관") {
      defaultOpt.className='remove';
      bachelorOpt.className='remove';
      masterOpt.className='building-master';
      familyOpt.className='remove';
      bkOpt.className='remove';
    } else if (dorm == "가족생활관") {
      defaultOpt.className='remove';
      bachelorOpt.className='remove';
      masterOpt.className='remove';
      familyOpt.className='building-family';
      bkOpt.className='remove';
    } else if (dorm == "BK생활관") {
      defaultOpt.className='remove';
      bachelorOpt.className='remove';
      masterOpt.className='remove';
      familyOpt.className='remove';
      bkOpt.className='building-bk';
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

// dong name 값 지정
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



