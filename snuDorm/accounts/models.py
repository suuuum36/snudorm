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

    # 셀렉트 박스 사용
    BUIDING_CATEGORY_CHOICES = {
        ('bachelor', '학부생활관'),
        ('master', '대학원생활관'),
        ('family', '가족생활관'),
        ('BK', 'BK생활관'),
    }
    building_category = models.CharField(max_length=20, choices=BUIDING_CATEGORY_CHOICES, verbose_name='생활관')

    BUIDING_DONG_CHOICES = {
        ('900', '900동'),
        ('901', '901동'),
        ('902', '902동'),
        ('903', '903동'),
        ('904', '904동'),
        ('905', '905동'),
        ('906', '906동'),
    }
    building_dong = models.CharField(max_length=20, choices=BUIDING_DONG_CHOICES, verbose_name='동')

    def __str__(self):
        return f'user={self.user}, name={self.name}, nickname={self.nickname}, notices={self.notices},\
            building_category={self.building_category}, building_dong={self.building_dong}'

class Message(models.Model):
    user_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatfrom')
    user_from = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatto')
    content = models.CharField(max_length=100)
    created_at = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.content