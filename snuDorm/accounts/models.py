from django.db import models
from django.utils import timezone

# user profile을 위한 import
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator

from multiselectfield import MultiSelectField
from faker import Faker

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

    # # testing을 위함
    # def seed_user_profile():
    #     myfake = Faker('ko_KR')
    #     myfake2 = Faker('en_US')

    #     for i in range(20):
    #         username = myfake.name()
    #         user = User.objects.create_user(username=username, password='123')

    #         college = myfake2.state()
    #         major = myfake.catch_phrase()
    #         email = myfake.free_email()
    #         birthday = myfake.date_of_birth()
    #         address = myfake.address()

    #         Profile.objects.filter(user=user).update(college=college,
    #                                                  major=major, email=email, birthday=birthday, address=address)
