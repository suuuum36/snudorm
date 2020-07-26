from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Minwon, FreeBoard, CoBuy, Rent, Keep, Resell, FeedComment, \
    FeedLike, CommentLike, ReComment
from django.contrib.auth.models import User

# TODO:


def index(request):
    if request.method == 'GET':

        return render(request, 'feedpage/index.html')

    elif request.method == 'POST':

        return redirect('/feeds')


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


def new(request, board, name):
    # board_id에 따라서 CoBuy, Rent, Keep, Resell 등 게시판 종류 달라짐.
    if request.method == 'GET':
        return render(request, 'feedpage/new.html', {'board': board, 'name': name})

    elif request.method == 'POST':  # 민원게시판 new
        if board == "minwon":
            title = request.POST['title']
            content = request.POST['content']
            photo = request.POST['photo']

            Minwon.objects.create(title=title, content=content,
                                photo=photo, author=request.user)

            return redirect('show', board=board, name=name)

        elif board == "life":
            title = request.POST['title']
            content = request.POST['content']
            product = request.POST['product']

            if name == "cobuy":  # cobuy 게시판
                url = request.POST['url']
                duedate = request.POST['duedate']
                contact = request.POST['contact']
                price = request.POST['price']

                CoBuy.objects.create(title=title, content=content, product=product, url=url,
                                     duedate=duedate, contact=contact, price=price, author=request.user)

            elif name == "rent":
                what = 1

            elif name == "keep":
                what = 1

            elif name == "resell":
                role = request.POST['role']
                Resell.objects.create(title=title, content=content, product=product, url=url,
                                      duedate=duedate, contact=contact, price=price, author=request.user)

            return redirect('show', board=board, name=name)

        else:
            return redirect('show', board=board, name=name)

        return redirect('feeds/')


def show(request, board, name):
    if request.method == 'GET':

        if board == "minwon":  # 민원 게시판 List page 보여주기
            feeds = Minwon.objects.all()

        elif board == "life":  # 생필품 게시판 List page 보여주기
            feeds = CoBuy.objects.all() if name == "cobuy" else \
                (Rent.objects.all() if name == "rent" else
                 (Keep.objects.all() if name == "keep" else
                  Resell.objects.all()))

        return render(request, 'feedpage/show.html', {'feeds': feeds, 'board': board, 'name': name})

    elif request.method == 'POST':
        return redirect('show', board=board, name=name)


# def delete(reuqest, board, name, fid):
#     if request.method == 'GET':
#         return render(request, 'feedpage/delete.html')

#     return edirect('/feeds')


# def edit(request, board, name, fid):
#     if request.method == 'GET':
#         return render(request, 'feedpage/edit.html')

#     return redirect('/feeds')


# 민원게시판 게시글 보기
def feed(request, board, name, fid):
    feed = Feed.objects.get(id=fid)

    return render(request, 'feedpage/feed.html', {'feed': feed, 'board': board, 'name': name})


# 민원게시판 게시글 좋아요
def feedlike(request, board, name, fid):
    feed = Feed.objects.get(id=fid)
    user_like = feed.feedlike.filter(user_id=request.user.id)

    if user_like.count() > 0:
        feed.feedlike.get(user_id=request.user.id).delete()
    else:
        FeedLike.objects.create(user_id=request.user.id, feed_id=feed.id)

    return render(request, 'feedpage/feed.html', {'feed': feed, 'board': board, 'name': name})


# 민원게시판 게시글 수정
def edit(request, board, name, fid):
    feed = Feed.objects.get(id=fid)

    if request.method == 'GET':
        return render(request, 'feedpage/edit.html', {'feed': feed, 'board': board, 'name': name})

    elif request.method == 'POST':
        new_feed = Feed.objects.get(id=fid)
        new_feed.title = request.POST['title']
        new_feed.content = request.POST['content']
        new_feed.photo = request.POST['photo']
        new_feed.save()

    return redirect('show', board=board, name=name)


def delete(request, board, name, fid):
    feed = Feed.objects.get(id=fid)
    feed.delete()

    return redirect('show', board=board, name=name)


def newcomment(request, board, name, fid):
    content = request.POST['content']
    FeedComment.objects.create(
        feed_id=fid, content=content, author=request.user)
    return redirect('show', board=board, name=name)

def commentlike(request, board, name, fid):
    return redirect('/feeds')


def commentdelete(request, board, name, fid, cid):
    c = FeedComment.objects.get(id=cid)
    c.delete()
    return redirect('show', board=board, name=name)


def createrecomment(request, board, name, fid, cid):
    content = request.POST['content']
    ReComment.objects.create(
        comment_id=cid, content=content, author=request.user)
    return redirect('show', board=board, name=name)

def recommentdelete(request, board, name, fid, cid, rcid):
    c = ReComment.objects.get(id=rcid)
    c.delete()
    return redirect('show', board=board, name=name)