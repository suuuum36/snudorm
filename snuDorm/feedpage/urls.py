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

    path('minwon/', views.minwon, name='minwon'),
    path('minwon/', views.minwon, name='minwon'),

    path('market/', views.market, name='market'),
    path('freeboard/', views.freeboard, name='freeboard'),
]