from django.conf.urls import include
from django.urls import path
from accounts import views

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('login/', views.login, name="login"),
    path('', include('allauth.urls')),
    path('logout/', views.logout, name="logout"),
    path('error/', views.error, name="error"),
    path('signup/iddbcheck/', views.id_db_check, name="iddbcheck"),
    path('useredit/<int:id>/', views.userEdit, name="useredit"),
    path('passwordedit/<int:id>/', views.passwordEdit, name="passwordedit"),
    path('userinfo/<int:id>/', views.userInfo, name="userinfo"),
    path('usernotice/<int:id>/', views.userNotice, name="usernotice"),
    path('messagebox/<int:id>/', views.messageBox, name="messagebox"),
]
