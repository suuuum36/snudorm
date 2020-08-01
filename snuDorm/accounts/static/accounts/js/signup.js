// function id_overlap_check() {

//     $('.username_input').change(function () {
//       $('#id_check_sucess').hide();
//       $('.id_overlap_button').show();
//       $('.username_input').attr("check_result", "fail");
//     })


//     if ($('.username_input').val() == '') {
//       alert('아이디를 입력해주세요.')
//       return;
//     }

//     id_overlap_input = document.querySelector('input[name="username"]');

//     $.ajax({
//       url: "{% url 'signup' %}",
//       data: {
//         'username': id_overlap_input.value
//       },
//       datatype: 'json',
//       success: function (data) {
//         console.log(data['overlap_check']);
//         if (data['overlap_check'] == "fail") {
//           alert("이미 존재하는 아이디 입니다.");
//           id_overlap_input.focus();
//           return;
//         } else {
//           alert("사용가능한 아이디 입니다.");
//           $('.username_input').attr("check_result", "success");
//           $('#id_check_sucess').show();
//           $('.id_overlap_button').hide();
//           return;
//         }
//       },
//       error: function(response, status, error) {
//         console.log(response, status, error);
//       },
//       complete: function(response) {
//         console.log(response);
//       },
//     });
//   }

// 생활관 카테고리 지정 시 자동으로 동 옵션을 배정
// TODO: 생활관 카테고리 변경 시에 dong-option에 '동'이 나오도록
function categoryChange(e) {
  
  // 생활관: 학부/대학원/가족/BK
  var bachelor_option = ['906', '915', '919A', '919B', '919C', 
  '919D', '921', '922', '923', '924', '925', '926'];
  var master_option = ['900', '901', '902', '903', '904', '905', '917', '918'];
  var family_option = ['931', '932', '933', '934', '935'];
  var bk_option = ['946A', '946B'];

  var target = document.getElementById("dong-option");

  if(e.value == "bachelor") var category = bachelor_option;
  else if(e.value == "master") var category = master_option;
  else if(e.value == "family") var category = family_option;
  else if(e.value == "bk") var category = bk_option;


  target.options.length = 1; // template의 '동'은 남겨두기
  
  // 생활관 별 동 옵션 추가
  for (dong in category) {
    var opt = document.createElement("option");
    opt.value = category[dong];
    opt.innerHTML = `${category[dong]}동`;
    target.appendChild(opt);
  }
}