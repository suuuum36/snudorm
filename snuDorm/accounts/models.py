from django.db import models
from django.utils import timezone

# user profile을 위한 import
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from multiselectfield import MultiSelectField
from faker import Faker

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=15, blank=True)
    nickname = models.CharField(max_length=15, blank=True)
    building_category = models.CharField(max_length=20, blank=True)
    building_dong = models.CharField(max_length=20, blank=True)

    # # faker test 위해 number 지운상태
    # def __str__(self):
    #     return f'id={self.id}, user_id={self.user.id}, nickname={self.nickname}, \
    #             email={self.email}, building={self.building}'

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
