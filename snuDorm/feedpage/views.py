from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Cobuy, Share, Store, Deal, FeedComment, FeedLike, \
                    FeedUnlike, CommentLike,CommentUnlike, CommentReply
from django.contrib.auth.models import User

# TODO: 
def index(request): 
    if request.method == 'GET':
        return render(request, 'feedpage/index.html')
    
    elif request.method == 'POST': 
        return redirect('/feeds')

def minwon(request):
    if request.method == 'GET':
        return render(request, 'feedpage/minwon.html')
    
    elif request.method == 'POST':  
        return redirect('/feeds/minwon')

def market(request):
    if request.method == 'GET':  
        return render(request, 'feedpage/market.html')
    
    elif request.method == 'POST': 
        return redirect('/feeds/market')

def freeboard(request): 
    if request.method == 'GET':
        return render(request, 'feedpage/freeboard.html')
    
    elif request.method == 'POST': 
        return redirect('/feeds/freeboard')

def new(request, id):
    # board_id에 따라서 freeboard, share, cobuy, Deal 등 게시판 종류 달라짐. 
    """
        공구(cobuy) - 1번 게시판 
        대여(share) - 2번 게시판
        보관(store) - 3번 게시판 
        거래(Deal) - 4번 게시판 
        etc
    """
    if request.method == 'GET':
        return render(request, 'feedpage/new.html', {'board_id': id})
    
    elif request.method == 'POST':
        explanation = request.POST['explanation']
        product = request.POST['product']
        price = request.POST['price']

        if id == 1: # cobuy 게시판 
            quantity = request.POST['quantity']
            pagelink = request.POST['pagelink']
            duedate = request.POST['duedate']
            contact = request.POST['contact']

            Cobuy.objects.create(product=product, quantity=quantity, pagelink=pagelink, duedate=duedate,\
                                contact=contact, price=price, explanation=explanation, author=request.user)
       
        elif id == 2:
            what = 1

        elif id == 3:
            what = 1

        elif id == 4:
            role = request.POST['role']
            Deal.objects.create(product=product, price=price, author=request.user, \
                                explanation=explanation, author_role=role)
        
        return redirect('show', id=id)
    return redirect('feeds/')

def show(request, id):
    if request.method == 'GET':
        feeds = Cobuy.objects.all() if id == 1 else \
                (Share.objects.all() if id == 2  else \
                (Store.objects.all() if id == 3  else \
                Deal.objects.all() ))

        return render(request, 'feedpage/show.html', {'feeds': feeds, 'board_id': id})

    elif request.method == 'POST': 
        return redirect('show', id=id)         
    
def delete(reuqest, id):
    if request.method == 'GET':
        return render(request, 'feedpage/delete.html')
    
    return redirect('/feeds')

def edit(request, id):
    if request.method == 'GET':
        return render(request, 'feedpage/edit.html')
    
    return redirect('/feeds')

def comment(request, id): 
    if request.method == 'GET':
        return render(request, 'feedpage/comment.html')
    
    return redirect('/feeds')

