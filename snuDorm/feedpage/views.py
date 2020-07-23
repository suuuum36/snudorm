from django.shortcuts import render
from .models import Feed, Cobuy, Share, Store, Deal, FeedComment \
                    FeedComment, FeedLike, FeedUnlike, CommentLike, \
                    CommentUnlike, CommentReply
from django.contrib.auth.models import User
from django.shortcuts import redirect 

# TODO: 
def index(request): 
    if request.method == 'GET':
        
        return render(request, 'feedpage/index.html')
    
    elif request.method == 'POST': 
        
        return redirect('/feeds')

# def post(request):
#     if request.method == 'GET':


#         return render(request, 'feedpage/post.html')
    
#     redirect('/feeds')

# def show(request):
#     if request.method == 'POST':


#         return render(request, 'feedpage/show.html')
    
#     redirect('/feeds')