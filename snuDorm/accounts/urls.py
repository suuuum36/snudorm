from django.conf.urls import include
from django.urls import path
from accounts import views

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('login/', views.login, name="login"),
    path('logout/', views.logout, name="logout"),
    path('error/', views.error, name="error"),
    path('useredit/<int:id>', views.userEdit, name="useredit"),
    path('userinfo/<int:id>', views.userInfo, name="userinfo"),
    path('usernotice/<int:id>', views.userNotice, name="usernotice"),
    path('messagebox/<int:id>', views.messageBox, name="messagebox"),
]
