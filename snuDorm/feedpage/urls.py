from django.urls import path
from feedpage import views

urlpatterns = [
    path('', views.index, name='index'),
    # TODO: url setting for the pages
    path('main/', views.index, name='main'),

    path('<int:id>/edit/', views.edit, name='edit'),
    path('<int:id>/delete/', views.delete, name='delete'),
    path('<int:id>/comment/', views.comment, name='comment'),
    path('<int:id>/new/', views.new, name='new'),
    path('<int:id>/show/', views.show, name='show'),

    path('minwon/', views.minwon, name='minwon'),
    path('minwon/gong/new/', views.minwon_gong_new,
         name='minwon_gong_new'),  # 민원게시판 게시글 작성
    path('minwon/gong/<int:fid>/', views.minwon_gong_show,
         name='minwon_gong_show'),  # 민원게시판 게시글 보기
    path('minwon/gong/<int:fid>/feedlike/', views.minwon_gong_feedlike,
         name='minwon_gong_feedlike'),  # 민원게시판 게시글 좋아요
    path('minwon/gong/<int:fid>/edit/',
         views.minwon_gong_feed_edit, name='minwon_gong_feed_edit'),  # 민원게시판 게시글 수정
    path('minwon/gong/<int:fid>/delete', views.minwon_gong_feed_delete,
         name='minwon_gong_feed_delete'),  # 민원게시판 게시글 삭제
    path('cobuy/', views.cobuy, name='cobuy'),
    path('share/', views.share, name='share'),
    path('store/', views.store, name='store'),
    path('deal/', views.deal, name='deal'),
    path('market/', views.market, name='market'),
    path('freeboard/', views.freeboard, name='freeboard'),
]
