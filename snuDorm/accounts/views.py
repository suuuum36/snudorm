from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from .models import Profile
from django.contrib.auth import login as django_login
from django.contrib.auth import authenticate as django_authenticate
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .forms import UserForm, ProfileForm
from django.contrib import messages

def signup(request):
    if request.method == "POST":
        user_id = request.POST["username"] # 아이디
        password1 = request.POST['password1'] # 비밀번호 1차 확인
        password2 = request.POST['password2'] # 비밀번호 2차 확인
        name = request.POST['name'] # 이름
        nickname = request.POST['nickname'] # 닉네임
        email = request.POST['email'] # 이메일
        building_category = request.POST['building_category'] # 생활관
        building_dong = request.POST['building_dong'] # 동

        if password1 == password2:
            user = User.objects.create_user(
                username=user_id,
                email=email,
                password=password1,
            )
            user.profile.name = name
            user.profile.nickname = nickname
            user.profile.building_category = building_category
            user.profile.building_dong = building_dong
            user.save()

        login_user = django_authenticate(username=user_id, password=password1)
        django_login(request, login_user)
        
        return redirect('/feeds')

    return render(request, 'accounts/signup.html')


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(request, username=username, password=password)

        if user:
            auth.login(request, user)
            return redirect('/feeds')
        else:
            return render(request, 'accounts/login.html')
            # error 추가 가능:  , 'error':'username or password is incorrect')
            # 혹은 pop up page

    elif request.method == 'GET':
        return render(request, 'accounts/login.html')


def logout(request):
    auth.logout(request)
    return render(request, 'accounts/logout.html')

@login_required
def userEdit(request, id):

    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, ('Your profile was successfully updated!'))
            
        else:
            messages.error(request, ('Please correct the error below.'))
        
        return redirect('useredit', id=id)
        '''
        user = User.objects.get(id=id)
        User.objects.filter(id=id).update(
            username=request.POST['username'],
            email=request.POST['email'],
            password=request.POST['password'],
        )
        
        Profile.objects.filter(id=id).update(
            name=request.POST['name'],
            nickname=request.POST['nickname'],
            building_category=request.POST['building_category'],
            building_dong=request.POST['building_dong'],
        )
        
        user.profile.name=request.POST['name']
        user.profile.nickname=request.POST['nickname']
        user.profile.building_category=request.POST['building_category']
        user.profile.building_dong=request.POST['building_dong']
        user.profile.save()
        return redirect('useredit', id=id)
        '''

    elif request.method == 'GET':
        return render(request, 'accounts/user_edit.html', {'id': id})


def userInfo(request, id):

    return render(request, 'accounts/user_info.html', {'id': id})

def userNotice(request, id):

    return render(request, 'accounts/user_notice', {'id': id})

def messageBox(request, id):

    return render(request, 'accounts/messagebox.html', {'id': id})
