from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from .models import Profile
from django.contrib.auth import login as django_login
from django.contrib.auth import authenticate as django_authenticate
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash

# 비밀번호 변경
from django.contrib.auth.hashers import check_password

def signup(request):
    if request.method == "POST":
        user_id = request.POST['user_id'] # User, 아이디
        password = request.POST['password'] # User, 비밀번호 
        confirm_password = request.POST['confirm_password'] # 비밀번호 확인
        name = request.POST['name'] # Profile, 이름
        nickname = request.POST['nickname'] # Profile, 닉네임
        email = request.POST['email'] # User, 이메일
        building_category = request.POST['building_category'] # Profile, 생활관
        building_dong = request.POST['building_dong'] # Profile, 동

        if password == confirm_password: # 1,2차 비밀번호가 일치할 시에 회원가입
            try:
                user = User.objects.create_user(
                    username=user_id,
                    email=email,
                    password=password,
                )
            # username이 중복될 경우 error가 발생
            except:
                context = "username이 중복되었습니다(좀 더 구체화 하겠습니다)."
                return render(request, 'accounts/error.html', {'context': context})

            # update로 구현해보기
            user.profile.name = name
            user.profile.nickname = nickname
            user.profile.building_category = building_category
            user.profile.building_dong = building_dong
            user.save()

        else:
            context = "비밀번호가 일치하지 않습니다."
            return render(request, 'accounts/error.html', {'context': context})

        login_user = django_authenticate(username=user_id, password=password)
        django_login(request, login_user)
        
        return redirect('/feeds')

    return render(request, 'accounts/signup.html')


def error(request): # 회원가입 실패, 회원정보 수정 실패 등은 추후에 자바 스크립트로 구현

    return render(request, 'accounts/error.html')

def login(request):
    if request.method == 'POST':
        user_id = request.POST['user_id']
        password = request.POST['password']
        user = auth.authenticate(request, username=user_id, password=password)

        if user:
            auth.login(request, user)
            return redirect('/feeds')
        else:
            context = "로그인 실패"
            return render(request, 'accounts/error.html', {'context': context})
            # error 추가 가능:  , 'error':'username or password is incorrect')
            # 혹은 pop up page

    elif request.method == 'GET':
        return render(request, 'accounts/login.html')


def logout(request):
    auth.logout(request)
    return redirect('showmain')

# 개인정보 변경하기
@login_required
def userEdit(request, id): 

    # 개인정보 변경하기 url 접근할 때
    if request.method == 'GET': 
        return render(request, 'accounts/user_edit.html', {'id': id})

    # 개인정보 변경하기 버튼을 클릭할 때
    elif request.method == 'POST': 
        current_user = request.user
        current_password = request.POST.get('origin_password', 'False')

        # 현재 비밀번호와 입력한 비밀번호가 일치할 때
        if check_password(current_password, current_user.password): 
            User.objects.filter(username=request.user.username).update(
                username=request.POST['user_id'],
                email=request.POST['email'],
            )            
            Profile.objects.filter(user=request.user).update(
                name=request.POST['name'],
                nickname=request.POST['nickname'],
                building_category=request.POST['building_category'],
                building_dong=request.POST['building_dong'],
            )

            return render(request, 'accounts/user_info.html', {'id': id})

        # 현재 비밀번호와 입력한 비밀번호가 일치하지 않을 때
        else: 
            context = "입력한 비밀번호를 확인해주세요."
            return render(request, 'accounts/error.html', {'context':context}) # argument 확인 필요, pop up도 생각  

# 비밀번호 변경하기
@login_required
def passwordEdit(request, id):
    if request.method == 'GET':
        return render(request, 'accounts/pw_edit.html', {'id': id})

    elif request.method == 'POST':    
        current_user = request.user
        current_password = request.POST['origin_password']

        # 현재 비밀번호와 입력한 비밀번호가 일치할 때
        if check_password(current_password, current_user.password): 
            new_password = request.POST['new_password']
            password_confirm = request.POST['password_confirm']

            # 새로운 비밀번호와 확인까지 일치할 때 비밀번호 변경완료
            if new_password == password_confirm:
                current_user.set_password(new_password)
                current_user.save()                
                update_session_auth_hash(request, current_user)  # 변경된 비밀번호로 로그인 시켜주기
                return redirect('userinfo', id=id)
                
                '''
                else:
                    context = "로그인이 왜 안되는거지?"
                    return render(request, 'accounts/error.html', {'context': context})
                '''
                
            # 새로운 비밀번호 두 개가 일치하지 않을 때 변경 실패
            else:
                context = "새로운 비밀번호를 확인해 주세요"
                return render(request, 'accounts/error.html', {'context': context})

        # 현재 비밀번호와 입력한 비밀번호가 일치하지 않을 때
        else:
            context = "현재 비밀번호를 확인해 주세요"
            return redirect('error')
        

def userInfo(request, id):
    
    return render(request, 'accounts/user_info.html', {'id': id})

def userNotice(request, id):

    return render(request, 'accounts/user_notice', {'id': id})

def messageBox(request, id):

    return render(request, 'accounts/messagebox.html', {'id': id})
