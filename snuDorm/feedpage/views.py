from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, CoBuy, Rent, Keep, Resell, FeedComment, \
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

            Feed.objects.create(title=title, content=content,
                                photo=photo, author=request.user)

            return redirect('show', board=board, name=name)

        # 생필품 게시판 
        elif board == "life":
            title = request.POST['title']
            content = request.POST['content']
            product = request.POST['product']
            status = request.POST['status']
            contact = request.POST['contact']
           
            # cobuy 게시판
            if name == "cobuy":  
                price = request.POST['price']
                url = request.POST['url']
                duedate = request.POST['duedate']

                CoBuy.objects.create(title=title, content=content, product=product, price=price, \
                                    contact=contact, status=status, url=url, duedate=duedate, author=request.user)
            # rent 게시판
            elif name == "rent":
                deposit = request.POST['deposit']
                start_date = request.POST['start_date']
                end_date = request.POST['end_date']

                Rent.objects.create(title=title, content=content, product=product, contact=contact,\
                                    status=status, deposit=deposit, author=request.user, \
                                    start_date=start_date, end_date=end_date)
            # keep 게시판
            elif name == "keep":
                start_date = request.POST['start_date']
                end_date = request.POST['end_date']
                reward = request.POST['reward']

                Keep.objects.create(title=title, content=content, product=product, status=status, contact=contact,\
                                    start_date=start_date, end_date=end_date, reward=reward, author=request.user)

            # resell 게시판
            elif name == "resell":
                price = request.POST['price']
                role = request.POST['role']

                Resell.objects.create(title=title, content=content, product=product, price=price, \
                                    status=status, contact=contact, role=role, author=request.user)

            return redirect('show', board=board, name=name)
        else:
            return redirect('show', board=board, name=name)

        return redirect('feeds/')


def show(request, board, name):
    if request.method == 'GET':

        if board == "minwon":  # 민원 게시판 List page 보여주기
            feeds = Feed.objects.all()

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
    # if request.method == 'GET':
    #     return render(request, 'feedpage/newcomment.html')
    if board == "life":
        content = request.POST['content']
        FeedComment.objects.create(
            feed_id=fid, content=content, author=request.user)
        return redirect('show', board=board, name=name)
    else:
        return redirect('show', board=board, name=name)

    return redirect('/feeds')


def comments(request, board, name, fid):
    return redirect('/feeds')


def commentlike(request, board, name, fid):
    return redirect('/feeds')


def commentdelete(request, board, name, fid, cid):
    c = FeedComment.objects.get(id=cid)
    c.delete()
    return redirect('/feeds')


def recomment(request, board, name, fid, cid):
    if board == "life":
        content = request.POST['content']
        ReComment.objects.create(
            comment_id=cid, content=content, author=request.user)
        return redirect('show', board=board, name=name)
    else:
        return redirect('show', board=board, name=name)
    return redirect('/feeds')
