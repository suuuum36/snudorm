from django.db import models
from django.utils import timezone

# user profile을 위한 import
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator

from multiselectfield import MultiSelectField
from faker import Faker
# from django.contrib.postgres.fields import ArrayField

class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=15, verbose_name='이름')
    nickname = models.CharField(max_length=15, verbose_name='닉네임')
    building_category = models.CharField(max_length=20, verbose_name='생활관')
    building_dong = models.CharField(max_length=20, verbose_name='동')
    email = models.CharField(max_length=20, verbose_name='이메일')

    def __str__(self):
        return f'user={self.user}, name={self.name}, nickname={self.nickname}, \
            building_category={self.building_category}, building_dong={self.building_dong}'

class Message(models.Model):
    user_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatfrom')
    user_from = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatto')
    content = models.CharField(max_length=100)
    created_at = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.content