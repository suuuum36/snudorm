from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Cobuy, Share, Store, Deal, FeedComment, FeedLike, \
    FeedUnlike, CommentLike, CommentUnlike, CommentReply
from django.contrib.auth.models import User

# TODO:


def index(request):
    if request.method == 'GET':
<<<<<<< HEAD

        return render(request, 'feedpage/index.html')

    elif request.method == 'POST':

        return redirect('/feeds')


def market(request):
    if request.method == 'GET':

        return render(request, 'feedpage/market.html')

    elif request.method == 'POST':

=======
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
>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0
        return redirect('/feeds/market')


def freeboard(request):
    if request.method == 'GET':
<<<<<<< HEAD

        return render(request, 'feedpage/freeboard.html')

    elif request.method == 'POST':

        return redirect('/feeds/freeboard')


def cobuy(request):
    if request.method == 'GET':
        feeds = Cobuy.objects.all()
        return render(request, 'feedpage/cobuy.html', {'feeds': feeds})

    elif request.method == 'POST':

        return redirect('/feeds/cobuy')


def share(request):
    if request.method == 'GET':

        return render(request, 'feedpage/share.html')

    elif request.method == 'POST':

        return redirect('/feeds/share')


def store(request):
    if request.method == 'GET':

        return render(request, 'feedpage/store.html')

    elif request.method == 'POST':

        return redirect('/feeds/store')


def deal(request):
    if request.method == 'GET':

        return render(request, 'feedpage/deal.html')

    elif request.method == 'POST':

        return redirect('/feeds/deal')


=======
        return render(request, 'feedpage/freeboard.html')
    
    elif request.method == 'POST': 
        return redirect('/feeds/freeboard')

>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0
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
<<<<<<< HEAD
        if id == 1:
            return render(request, 'feedpage/new.html', {'board_id': 1})
        elif id == 2:
            return render(request, 'feedpage/new.html', {'board_id': 2})

=======
        return render(request, 'feedpage/new.html', {'board_id': id})
    
>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0
    elif request.method == 'POST':
        explanation = request.POST['explanation']
        product = request.POST['product']
        price = request.POST['price']

<<<<<<< HEAD
        if id == 1:  # cobuy 게시판
=======
        if id == 1: # cobuy 게시판 
>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0
            quantity = request.POST['quantity']
            pagelink = request.POST['pagelink']
            duedate = request.POST['duedate']
            contact = request.POST['contact']

<<<<<<< HEAD
            Cobuy.objects.create(product=product, quantity=quantity, pagelink=pagelink, duedate=duedate,
                                 contact=contact, price=price, explanation=explanation, author=request.user)
            return redirect('/feeds/cobuy')

=======
            Cobuy.objects.create(product=product, quantity=quantity, pagelink=pagelink, duedate=duedate,\
                                contact=contact, price=price, explanation=explanation, author=request.user)
       
>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0
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

<<<<<<< HEAD

def delete(reuqest, id):
    if request.method == 'GET':
        return render(request, 'feedpage/delete.html')

    return edirect('/feeds')
=======
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
>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0


def edit(request, id):
    if request.method == 'GET':
        return render(request, 'feedpage/edit.html')

    return redirect('/feeds')


def comment(request, id):
    if request.method == 'GET':
        return render(request, 'feedpage/comment.html')

    return redirect('/feeds')

<<<<<<< HEAD

def post(request):
    if request.method == 'GET':
        return render(request, 'feedpage/post.html')

    redirect('/feeds')


def show(request):
    if request.method == 'POST':
        return render(request, 'feedpage/show.html')

    redirect('/feeds')


# 민원 게시판 List page 보여주기
def minwon(request):
    if request.method == 'GET':
        feeds = Feed.objects.all()
        return render(request, 'feedpage/minwon.html', {'feeds': feeds})

    elif request.method == 'POST':

        return redirect('/feeds/minwon')


# 민원게시판 게시글 작성
def minwon_gong_new(request):
    if request.method == 'GET':
        return render(request, 'feedpage/minwon_gong_new.html')

    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        photo = request.POST['photo']

        Feed.objects.create(title=title, content=content,
                            photo=photo, author=request.user)
        return redirect('/feeds/minwon/')


# 민원게시판 게시글 보기
def minwon_gong_show(request, fid):
    feed = Feed.objects.get(id=fid)

    return render(request, 'feedpage/minwon_gong_show.html', {'feed': feed})


# 민원게시판 게시글 좋아요
def minwon_gong_feedlike(request, fid):
    feed = Feed.objects.get(id=fid)
    user_like = feed.feedlike.filter(user_id=request.user.id)

    if user_like.count() > 0:
        feed.feedlike.get(user_id=request.user.id).delete()
    else:
        FeedLike.objects.create(user_id=request.user.id, feed_id=feed.id)

    return redirect('minwon_gong_show', feed.id)

# 민원게시판 게시글 수정


def minwon_gong_feed_edit(request, fid):
    feed = Feed.objects.get(id=fid)

    if request.method == 'GET':
        return render(request, 'feedpage/minwon_gong_feed_edit.html', {'feed': feed})

    elif request.method == 'POST':
        new_feed = Feed.objects.get(id=fid)
        new_feed.title = request.POST['title']
        new_feed.content = request.POST['content']
        new_feed.photo = request.POST['photo']
        new_feed.save()

    return redirect('minwon_gong_show', feed.id)


def minwon_gong_feed_delete(request, fid):
    feed = Feed.objects.get(id=fid)
    feed.delete()

    return redirect('minwon')
=======
>>>>>>> c657fe35175c45e1abfaac7c809119f0cadf89b0
