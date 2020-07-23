from django.shortcuts import render
# pylint: disable=relative-beyond-top-level
from .models import Feed, Cobuy, Share, Store, Deal, FeedComment
                    # FeedComment, FeedLike, FeedUnlike, CommentLike, \
                    # CommentUnlike, CommentReply
from django.contrib.auth.models import User
from django.shortcuts import redirect 

# TODO: 
def index(request): 
    if request.method == 'GET':
        
        return render(request, 'feedpage/index.html')
    
    elif request.method == 'POST': 
        
        return redirect('/feeds')
