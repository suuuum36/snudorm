from django.db import models
from django.utils import timezone 
from django.contrib.auth.models import User
from django.conf import settings

# TODO: pip install django-multiselectfield 를 해주세요 ㅎㅅㅎ
from multiselectfield import MultiSelectField 

# 게시판 
""" 
    생필품 게시판(공구, 대여, 보관, 거래) -> Feed class 상속 
    1) 공구: 품목, 개수, 제품링크, 마감기한, 연락처, 기타 
    2) 대여: 품목, 기한, 사례금, 연락처, 기타
    3) 보관:
    4) 거래: 
"""
class Feed(models.Model): 
    title = models.CharField(max_length=256)
    content = models.TextField()
    photo = models.ImageField(blank=True, upload_to='feed_photos')

    author = models.ForeignKey(User, null=True, on_delete= models.CASCADE)        
    like_users = models.ManyToManyField(User, blank=True, related_name='like_feeds', through='FeedLike')    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)   

    # market 게시판을 위함 
    product = models.CharField(max_length=256)
    explanation = models.TextField(blank=True) 
    price = models.IntegerField(blank=True)

    class Meta:
        ordering = ('created_at',)

    def update_date(self): 
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.title

class Cobuy(Feed):
    duedate = models.DateTimeField(blank=True)
    pagelink = models.CharField(max_length=256)
    contact = models.CharField(max_length=256)
    quantity = models.IntegerField(blank=True)
    state = models.CharField(max_length=256)  # 진행중, 마감, etc

class Share(Feed): 
    quantity = models.IntegerField(blank=True)
    start_at = models.DateTimeField(default=timezone.now) 
    end_at = models.DateTimeField(blank=True, null=True)

class Store(Feed):
    quantity = models.IntegerField(blank=True)
    start_at = models.DateTimeField(default=timezone.now)
    end_at = models.DateTimeField(blank=True, null=True)

class Deal(Feed):
    # 생필품 게시판-(거래 게시판) 게시한 사람 option 선택
    ROLE_OPTION = (('seller', '판매자'), ('buyer', '구매자'))
    author_role = MultiSelectField(choices=ROLE_OPTION, null=True, blank=True)
    """ 
        template에서 커스터마이징 시에는 {{ object.author_role }} 등으로 사용 
    """
class Info(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now) 

    class Meta:
        ordering = ('created_at',)

class FeedComment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_comments', through='CommentLike')
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

class FeedLike(Info):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)

class FeedUnlike(Info):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)

class CommentLike(Info):
    comment = models.ForeignKey(FeedComment, on_delete=models.CASCADE)

class CommentUnlike(Info):
    comment = models.ForeignKey(FeedComment, on_delete=models.CASCADE)

class CommentReply(Info):
    pre_comment = models.ForeignKey(FeedComment, on_delete=models.CASCADE)
