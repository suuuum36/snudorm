from django import forms
from django.contrib.auth.models import User
from .models import Profile

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('nickname', 'name', 'building_category', 'building_dong')