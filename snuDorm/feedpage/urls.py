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

    path('int:id')
<<<<<<< HEAD
=======

    path('minwon/', views.minwon, name='minwon'),
    path('minwon/', views.minwon, name='minwon'),
<<<<<<< HEAD
    path('minwon/gong/', views.minwon_gong, name='minwon_gong'),
    path('minwon/gong/new/', views.minwon_gong_new, name='minwon_gong_new'),
    path('minwon/gong/<int:fid>/', views.minwon_gong_fid, name='minwon_gong_fid'),
    path('minwon/gong/<int:fid>/edit/', views.minwon_gong_fid_edit, name='minwon_gong_fid_edit'),
    path('minwon/gong/<int:fid>/delete/', views.minwon_gong_fid_delete, name='minwon_gong_fid_delete'),
    path('minwon/gong/<int:fid>/newcomment/', views.minwon_gong_fid_newcomment, name='minwon_gong_fid_newcomment'),
    path('minwon/gong/<int:fid>/feedlike/', views.minwon_gong_fid_feedlike, name='minwon_gong_fid_feedlike'),
    path('minwon/gong/<int:fid>/<int:cid>/', views.minwon_gong_fid_cid, name='minwon_gong_fid_cid'),
    path('minwon/gong/<int:fid>/<int:cid>/commentlike/', views.minwon_gong_fid_cid_commentlike, name='minwon_gong_fid_cid_commentlike'),
    path('minwon/gong/<int:fid>/<int:cid>/commentdelete/', views.minwon_gong_fid_cid_commentdelete, name='minwon_gong_fid_cid_commentdelete'),
    path('minwon/gong/<int:fid>/<int:cid>/recomment/', views.minwon_gong_fid_cid_recomment, name='minwon_gong_fid_cid_recomment'),
    path('minwon/dong/<int:did>/', views.minwon_dong_did, name='minwon_dong_did'),
    path('minwon/dong/<int:did>/new/', views.minwon_dong_did_new, name='minwon_dong_did_new'),
    path('minwon/dong/<int:did>/<int:fid>/', views.minwon_dong_did_fid, name='minwon_dong_did_fid'),
    path('minwon/dong/<int:did>/<int:fid>/edit/', views.minwon_dong_did_fid_edit, name='minwon_dong_did_fid_edit'),
    path('minwon/dong/<int:did>/<int:fid>/delete/', views.minwon_dong_did_fid_delete, name='minwon_dong_did_fid_delete'),
    path('minwon/dong/<int:did>/<int:fid>/newcomment/', views.minwon_dong_did_fid_newcomment, name='minwon_dong_did_fid_newcomment'),
    path('minwon/dong/<int:did>/<int:fid>/feedlike/', views.minwon_dong_did_fid_feedlike, name='minwon_dong_did_fid_feedlike'),
    path('minwon/dong/<int:did>/<int:fid>/<int:cid>/', views.minwon_dong_did_fid_cid, name='minwon_dong_did_fid_cid'),
    path('minwon/dong/<int:did>/<int:fid>/<int:cid>/commentlike/', views.minwon_dong_did_fid_cid_commentlike, name='minwon_dong_did_fid_cid_commentlike'),
    path('minwon/dong/<int:did>/<int:fid>/<int:cid>/commentdelete/', views.minwon_dong_did_fid_cid_commentdelete, name='minwon_dong_did_fid_cid_commentdelete'),
    path('minwon/dong/<int:did>/<int:fid>/<int:cid>/recomment/', views.minwon_dong_did_fid_cid_recomment, name='minwon_dong_did_fid_cid_recomment'),





>>>>>>> profile & feed model 수정2

    path('minwon/', views.minwon, name='minwon'),
    path('minwon/', views.minwon, name='minwon'),

<<<<<<< HEAD
=======
    
=======

>>>>>>> profile & feed model 수정2
>>>>>>> profile & feed model 수정2
    path('market/', views.market, name='market'),
    path('freeboard/', views.freeboard, name='freeboard'),
]