from django.urls import path
from feedpage import views

urlpatterns = [
    path('', views.showMain, name='showmain'),
    path('<str:board>/<str:category>/', views.showBoard, name='showboard'),
    path('<str:board>/<str:category>/new/', views.newFeed, name='newfeed'),
    path('<str:board>/<str:category>/<int:fid>/',
         views.showFeed, name='showfeed'),
    path('<str:board>/<str:category>/<int:fid>/edit/',
         views.editFeed, name='editfeed'),
    path('<str:board>/<str:category>/<int:fid>/delete/',
         views.deleteFeed, name='deletefeed'),
    path('<str:board>/<str:category>/<int:fid>/feedlike/',
         views.likeFeed, name='likefeed'),
    path('<str:board>/<str:category>/<int:fid>/newcomment/',
         views.newComment, name='newcomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/editcomment/',
         views.editComment, name='editcomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/deletecomment/',
         views.deleteComment, name='deletecomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/likecomment/',
         views.likeComment, name='likecomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/',
         views.newRecomment, name='newrecomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/<int:rcid>/editrecomment/',
         views.editRecomment, name='editrecomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/<int:rcid>/',
         views.deleteRecomment, name='deleterecomment'),
    path('<str:board>/<str:category>/<int:fid>/<int:cid>/<int:rcid>/likerecomment/',
         views.likeRecomment, name='likerecomment'),

]
