from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Minwon, FreeBoard, CoBuy, Rent, Keep, Resell, FeedComment, \
    FeedLike, CommentLike, Recomment, RecommentLike
from django.contrib.auth.models import User

# TODO:


def showMain(request):
    if request.method == 'GET':

        return render(request, 'feedpage/index.html')

    elif request.method == 'POST':

        return redirect('/feeds')

# 게시글 list 보여주기
# category로 # 받았을때 전체 넘겨주는거 if문 작성 필요
def showBoard(request, board, category):
    if request.method == 'GET':

        if board == "minwon":  # 민원 게시판 List page 보여주기
            feeds = Minwon.objects.all()

        elif board == "life":  # 생필품 게시판 List page 보여주기
            feeds = CoBuy.objects.all() if category == "cobuy" else \
                (Rent.objects.all() if category == "rent" else
                 (Keep.objects.all() if category == "keep" else
                  Resell.objects.all()))

        return render(request, 'feedpage/show.html', {'feeds': feeds, 'board': board, 'category': category})

    elif request.method == 'POST':
        return redirect('showboard', board=board, category=category)

# Feed 생성
def newFeed(request, board, category):
    # board_id에 따라서 CoBuy, Rent, Keep, Resell 등 게시판 종류 달라짐.
    if request.method == 'GET':
        return render(request, 'feedpage/new.html', {'board': board, 'category': category})

    elif request.method == 'POST':  # 민원게시판 new
        if board == "minwon":
            title = request.POST['title']
            content = request.POST['content']
            photo = request.POST['photo']

            Minwon.objects.create(title=title, content=content,
                                photo=photo, author=request.user)

            return redirect('showboard', board=board, category=category)

        # 생필품 게시판 
        elif board == "life":
            title = request.POST['title']
            content = request.POST['content']
            product = request.POST['product']
            status = request.POST['status']
            contact = request.POST['contact']
           
            # cobuy 게시판
            if category == "cobuy":  
                price = request.POST['price']
                url = request.POST['url']
                duedate = request.POST['duedate']

                CoBuy.objects.create(title=title, content=content, product=product, price=price, \
                                    contact=contact, status=status, url=url, duedate=duedate, author=request.user)
            # rent 게시판
            elif category == "rent":
                deposit = request.POST['deposit']
                start_date = request.POST['start_date']
                end_date = request.POST['end_date']

                Rent.objects.create(title=title, content=content, product=product, contact=contact,\
                                    status=status, deposit=deposit, author=request.user, \
                                    start_date=start_date, end_date=end_date)
            # keep 게시판
            elif category == "keep":
                start_date = request.POST['start_date']
                end_date = request.POST['end_date']
                reward = request.POST['reward']

                Keep.objects.create(title=title, content=content, product=product, status=status, contact=contact,\
                                    start_date=start_date, end_date=end_date, reward=reward, author=request.user)

            # resell 게시판
            elif category == "resell":
                price = request.POST['price']
                role = request.POST['role']

                Resell.objects.create(title=title, content=content, product=product, price=price, \
                                    status=status, contact=contact, role=role, author=request.user)

            return redirect('showboard', board=board, category=category)
        else:
            return redirect('showboard', board=board, category=category)

        return redirect('feeds/')

# 특정 게시글 자세히 보기
# board별로 띄워주는 글 다르므로, if문으로 나눠야함
def showFeed(request, board, category, fid):
    feed = Feed.objects.get(id=fid)

    return render(request, 'feedpage/feed.html', {'feed': feed, 'board': board, 'category': category})

# 게시글 수정
# board별로 띄워주는 글 다르므로, if문으로 나눠야함
def editFeed(request, board, category, fid):
    feed = Feed.objects.get(id=fid)

    if request.method == 'GET':
        return render(request, 'feedpage/edit.html', {'feed': feed, 'board': board, 'category': category})

    elif request.method == 'POST':
        new_feed = Feed.objects.get(id=fid)
        new_feed.title = request.POST['title']
        new_feed.content = request.POST['content']
        new_feed.photo = request.POST['photo']
        new_feed.save()

    return redirect('showboard', board=board, category=category)

# 게시글 삭제
def deleteFeed(request, board, category, fid):
    feed = Feed.objects.get(id=fid)
    feed.delete()

    return redirect('showboard', board=board, category=category)


# 민원게시판 게시글 좋아요
def likeFeed(request, board, category, fid):
    feed = Feed.objects.get(id=fid)
    user_like = feed.feedlike.filter(user_id=request.user.id)

    if user_like.count() > 0:
        feed.feedlike.get(user_id=request.user.id).delete()
    else:
        FeedLike.objects.create(user_id=request.user.id, feed_id=feed.id)

    return render(request, 'feedpage/feed.html', {'feed': feed, 'board': board, 'category': category})


# 댓글 달기
def newComment(request, board, category, fid):
    content = request.POST['content']
    FeedComment.objects.create(
        feed_id=fid, content=content, author=request.user)
    return redirect('showboard', board=board, category=category)

# 댓글 수정 -- 미완성
def editComment(request, board, category, fid, cid):
    return redirect('/feeds')

# 댓글 좋아요 -- 미완성
def likeComment(request, board, category, fid, cid):
    return redirect('/feeds')

# 댓글 삭제
def deleteComment(request, board, category, fid, cid):
    c = FeedComment.objects.get(id=cid)
    c.delete()
    return redirect('showboard', board=board, category=category)

# 대댓글 추가
def newRecomment(request, board, category, fid, cid):
    content = request.POST['content']
    Recomment.objects.create(
        comment_id=cid, content=content, author=request.user)
    return redirect('showboard', board=board, category=category)

# 대댓글 수정 -- 미완성
def editRecomment(request, board, category, fid, cid):
    return redirect('showboard', board=board, category=category)

# 대댓글 삭제
def deleteRecomment(request, board, category, fid, cid, rcid):
    c = Recomment.objects.get(id=rcid)
    c.delete()
    return redirect('showboard', board=board, category=category)

# 대댓글 좋아요 -- 미완성
def likeRecomment(request, board, category, fid, cid):
    return redirect('showboard', board=board, category=category)