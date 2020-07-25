from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Cobuy, Share, Store, Deal, FeedComment, FeedLike, \
    FeedUnlike, CommentLike, CommentUnlike, CommentReply
from django.contrib.auth.models import User

# TODO:


def index(request):
    if request.method == 'GET':

        return render(request, 'feedpage/index.html')

    elif request.method == 'POST':

        return redirect('/feeds')


def minwon(request):
    if request.method == 'GET':
        feeds = Feed.objects.all()
        return render(request, 'feedpage/minwon.html', {'feeds': feeds})

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
        if id == 1:
            return render(request, 'feedpage/new.html', {'board_id': 1})
        elif id == 2:
            return render(request, 'feedpage/new.html', {'board_id': 2})

    elif request.method == 'POST':
        explanation = request.POST['explanation']
        product = request.POST['product']
        price = request.POST['price']

        if id == 1:  # cobuy 게시판
            quantity = request.POST['quantity']
            pagelink = request.POST['pagelink']
            duedate = request.POST['duedate']
            contact = request.POST['contact']

            Cobuy.objects.create(product=product, quantity=quantity, pagelink=pagelink, duedate=duedate,
                                 contact=contact, price=price, explanation=explanation, author=request.user)
            return redirect('/feeds/cobuy')

        elif id == 2:
            return redirect('/feeds/share')
        elif id == 3:
            return redirect('/feeds/store')
        elif id == 4:
            return redirect('/feeds/deal')

    return redirect('feeds/')


def delete(reuqest, id):
    if request.method == 'GET':
        return render(request, 'feedpage/delete.html')

    return edirect('/feeds')


def edit(request, id):
    if request.method == 'GET':

        return render(request, 'feedpage/edit.html')

    return redirect('/feeds')


def comment(request, id):
    if request.method == 'GET':
        return render(request, 'feedpage/comment.html')

    return redirect('/feeds')


def post(request):
    if request.method == 'GET':
        return render(request, 'feedpage/post.html')

    redirect('/feeds')


def show(request):
    if request.method == 'POST':
        return render(request, 'feedpage/show.html')

    redirect('/feeds')


def minwon_gong_new(request):
    if request.method == 'GET':
        return render(request, 'feedpage/minwon_new.html')

    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        photo = request.POST['photo']

        Feed.objects.create(title=title, content=content,
                            photo=photo, author=request.user)
        return redirect('/feeds/minwon/')
