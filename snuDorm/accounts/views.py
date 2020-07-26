from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from .models import Profile
from django.contrib.auth import login as django_login
from django.contrib.auth import authenticate as django_authenticate
from django.http import JsonResponse

def signup(request):
    if request.method == "POST":
        username = request.POST["username"]
        nickname = request.POST["nickname"]
        email = request.POST["email"]
        password = request.POST["password1"]
        building = request.POST["building"]

        user = User.objects.create_user(username=username, email=email, password=password)

        user.profile.building = building
        user.profile.nickname = nickname
        user.save()

        login_user = django_authenticate(username=username, password=password)
        django_login(request, login_user)
        return redirect('/feeds')
    
    return render(request, 'accounts/signup.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(request, username = username, password = password)

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
    return render(request, 'accounts/logout.html')

def user_edit(request, id):
    if request.method == 'POST':
        user = User.objects.get(id = id)
        Profile.objects.filter(user = user).update( email = request.POST['email'], \
           nickname = requet.POST['nickname'], building = request.POST['building'])
        return redirect('/feeds')

    elif request.method == 'GET':
        return render(request, 'accounts/user_edit.html')

def user_info(request, id):

    return render(request, 'accounts/user_info.html')


def user_message(request, id):
    
    return render(request, 'accounts/user_message.html')    