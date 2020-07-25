from django.db import models
from django.utils import timezone
# from faker import Faker
from django.contrib.auth.models import User   
from django.db.models.signals import post_save  
from django.dispatch import receiver 
from multiselectfield import MultiSelectField
from faker import Faker

# Create your models here.
class Profile(models.Model):  
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # nickname = models.CharField(max_length=15, blank=True)
    college = models.CharField(max_length=20, blank=True)
    major = models.CharField(max_length=20, blank=True)
    email = models.CharField(max_length=50, blank=True)
    birthday = models.DateField(blank=True, null=True)

    GENDER_OPTION = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    # gender = models.CharField(max_length=20, choices=GENDER_OPTION, null=True, blank=True)
    address = models.CharField(max_length=100, blank=True)
    # number = models.CharField(max_length=11, blank=True, null=True, default='01000000000') 
    # student_id = models.CharField(max_length=10, blank=True, null=True, default='2020-10000')
    
    # faker test 위해 number 지운상태
    def __str__(self):   
        return f'id={self.id}, user_id={self.user.id}, \
                college = {self.college}, major={self.major}, \
                email={self.email}, birthday={self.birthday}, \
                address={self.address}'
                #number={self.number}

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
        myfake2 = Faker('en_US')
        
        for i in range(20):
            username = myfake.name()
            user = User.objects.create_user(username=username, password='123')

            college = myfake2.state()
            major = myfake.catch_phrase()
            email = myfake.free_email()
            birthday = myfake.date_of_birth()
            address = myfake.address()

            Profile.objects.filter(user=user).update(college=college,\
                major=major, email=email, birthday=birthday, address=address)