function id_overlap_check() {

    $('.username_input').change(function () {
      $('#id_check_sucess').hide();
      $('.id_overlap_button').show();
      $('.username_input').attr("check_result", "fail");
    })


    if ($('.username_input').val() == '') {
      alert('아이디를 입력해주세요.')
      return;
    }

    id_overlap_input = document.querySelector('input[name="username"]');

    $.ajax({
      url: "{% url 'signup' %}",
      data: {
        'username': id_overlap_input.value
      },
      datatype: 'json',
      success: function (data) {
        console.log(data['overlap_check']);
        if (data['overlap_check'] == "fail") {
          alert("이미 존재하는 아이디 입니다.");
          id_overlap_input.focus();
          return;
        } else {
          alert("사용가능한 아이디 입니다.");
          $('.username_input').attr("check_result", "success");
          $('#id_check_sucess').show();
          $('.id_overlap_button').hide();
          return;
        }
      },
      error: function(response, status, error) {
        console.log(response, status, error);
      },
      complete: function(response) {
        console.log(response);
      },
    });
  }
  