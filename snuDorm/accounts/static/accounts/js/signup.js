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

// 기숙사 동 반응형 구현
function categoryChange(e) {

  var bachelor_option = ['906', '915', '919A', '919B', '919C', '919D', '921', '922', '923', '924', '925', '926'];
  var master_option = ['900', '901', '902', '903', '904', '905', '917', '918'];
  var family_option = ['931', '932', '933', '934', '935'];
  var bk_option = ['946A', '946B'];

  if(e.value == "bachelor") var category = bachelor_option;
  else if(e.value == "master") var category = master_option;
  else if(e.value == "family") var category = family_option;
  else if(e.value == "bk") var category = bk_option;

  var target = document.getElementById("dong-container-id");
  
  while ( target.hasChildNodes() ) {
    target.removeChild(target.firstChild);
  }

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

// 기숙사 생활관
const selected = document.querySelector(".selected");
const category_container = document.querySelector(".category-container");

const category_options = document.querySelectorAll(".category-option");

selected.addEventListener("click", () => {
  category_container.classList.toggle("active");
});

category_options.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    category_container.classList.remove("active");
  });
});

// 기숙사 동
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


