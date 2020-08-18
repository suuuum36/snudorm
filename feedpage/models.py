from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField

# 게시판
""" 
    생필품 게시판(공구, 대여, 보관, 거래) -> Feed class 상속 
    1) 공구: 개수, 제품링크, 마감기한, 연락처
    2) 대여: 기한, 사례금, 연락처, 기타
    3) 보관:
    4) 거래: 
"""
STAT_OPTION = (('ongoing', '진행중'), ('onsale', '판매중'), ('complete', '완료'))   

def get_image_filename(instanece, filename):
    id = instance.post.id
    return "post_imgages/%s" % (id)


class Feed(models.Model):
    title = models.CharField(max_length=256)
    content = models.TextField()
    # photo = ArrayField(models.ImageField(blank=True, null=True, upload_to='feed_photos')))
    noname = models.BooleanField(default=False)

    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_feeds', through='FeedLike')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    views = models.IntegerField(blank=True, default=0)

    # 공지사항인지 check하는 값
    notice = models.BooleanField(default=False)

    # 검색시 Feed object에서 찾고, feedpage 넘길 때 필요 
    board = models.CharField(max_length=256)
    category = models.CharField(max_length=256)

    # 게시판 항목 이름 위해서 필요 
    board_info1 = models.CharField(max_length=20)
    board_info2 = models.CharField(max_length=20)

    status = MultiSelectField(choices=STAT_OPTION, default='ongoing')    
    class Meta:
        ordering = ('created_at',)

    def update_date(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.title

# class Photo(models.Model):
#     feed = models.ForeinKey(Feed, default=None)
#     photo = models.ImageField(upload_to=get_image_filename, verbose_name="Image")

class Minwon(Feed):
    def __str__(self):
        return self.title

class FreeBoard(Feed):
    def __str__(self):
        return self.title

class Life(Feed):
    class Meta:
        ordering = ('created_at', )


class CoBuy(Life):
    price = models.CharField(max_length=256)
    url = models.CharField(max_length=256, null=True)
    duedate = models.DateTimeField(blank=False, default=timezone.now)

class Rent(Life):
    OPTION = (('lender', '빌려줄게요'), ('user', '빌려주세요'))   
    purpose = MultiSelectField(choices=OPTION, default='lender')      
    deposit = models.CharField(max_length=256)
    start_date = models.DateTimeField(blank=False, default=timezone.now)
    end_date = models.DateTimeField(blank=False, default=timezone.now)


class Keep(Life):
    OPTION = (('lender', '보관할래요'), ('user', '보관해줄게요'))   
    purpose = MultiSelectField(choices=OPTION, default='lender')   
    reward = models.CharField(max_length=256)
    start_date = models.DateTimeField(blank=False, default=timezone.now)
    end_date = models.DateTimeField(blank=False, default=timezone.now)


class Resell(Life):
    OPTION = (('seller', '판매'), ('buyer', '구매'))
    purpose = MultiSelectField(choices=OPTION, default='seller')   
    price = models.CharField(max_length=256)

class FeedComment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(
        User, blank=True, related_name='like_comments', through='CommentLike')
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    noname = models.BooleanField(default=False)


class FeedLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    feed = models.ForeignKey(
        Feed, on_delete=models.CASCADE, related_name='feedlike')  # 역참조를 위한 related_name 지정


class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    comment = models.ForeignKey(FeedComment, on_delete=models.CASCADE)


class Recomment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(
        User, blank=True, related_name='like_recomments', through='RecommentLike')
    comment = models.ForeignKey(FeedComment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    noname = models.BooleanField(default=False)


class RecommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    recomment = models.ForeignKey(Recomment, on_delete=models.CASCADE)

class Notice(models.Model):
    user_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mynotice')
    user_from = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mylog')
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='notification', null=True)
    type_info1 = models.CharField(max_length=20, blank=False)
    type_info2 = models.CharField(max_length=20, null=True)
    checked = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    noname = models.BooleanField(default=False)

    def __str__(self):
        return self.user_to.username

class Image(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    photo = models.ImageField(blank=True, null=True, upload_to='feed_photos')
