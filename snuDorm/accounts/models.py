from django.db import models
from django.utils import timezone

# from faker import Faker
from django.contrib.auth.models import User   
from django.db.models.signals import post_save  
from django.dispatch import receiver 
from multiselectfield import MultiSelectField

# Create your models here.
class Profile(models.Model):  
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=15, blank=True)

    # multiselect 
    building = models.CharField(max_length=20, blank=True)
    # snu.ac.kr template 설정 필요 
    email = models.CharField(max_length=50, blank=True)
    
    def __str__(self):   
        return f'id={self.id}, user_id={self.user.id}, \
                email={self.email}, building={self.building}` \

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):  
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):  
        instance.profile.save()
   
    # testing을 위함 
    def seed_user_profile():
        myfake = Faker('ko_KR')
        myfake2 = Faker('en')
        
        for i in range(20):
            username = myfake.simple_profile()['username']
            user = User.objects.create_user(username=username, password='123')

            college = myfake2.state() 
            major = myfake.catch_phrase()
            email = myfake.free_email()
            birthday = myfake.date_of_birth()
            address = myfake.address()

            Profile.objects.filter(user=user).update(college=college,\
                major=major, email=email, birthday=birthday, address=address