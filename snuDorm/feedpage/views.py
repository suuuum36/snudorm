from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Minwon, FreeBoard, CoBuy, Rent, Keep, Resell, FeedComment, \
    FeedLike, CommentLike, Recomment, RecommentLike, Life
from django.contrib.auth.models import User
from django.http import JsonResponse

# TODO:


def showMain(request):
    if request.method == 'GET':
        return render(request, 'feedpage/index.html')

    elif request.method == 'POST':
        return redirect('/feeds')

# 게시판 list 보여주기


def showBoard(request, board, category):
    ''' ____________________________________________________________________
        |   board     |   category                       | list             |
        |-------------|-----------------------------------------------------|
        |  minwon     |  #                               | 전체글           |
        |             |  gong                            | 전체 게시판      |
        |             |  bachelor | master | family | bk | 생활관별 게시판  |
        |             |  bachelor_906 etc                | 동별 게시판      |
        |-------------|---------------------------------------------------- |
        |  life       |  #                               | 전체글           |
        |             |  cobuy | rent | keep | resell    | 세부 기능 게시판 |
        |-------------|-----------------------------------------------------|
        |  freeboard  |  #                               | 전체글           |
        ---------------------------------------------------------------------
    '''
    if request.method == 'GET':
        # 전체게시판 보여주기: minwon / life / freeboard
        if category == "#":
            feeds = Minwon.objects.all() if board == "minwon" else \
                (Life.objects.all() if board == "life" else
                    (FreeBoard.objects.all()))

            board_name = '민원' if board == 'minwon' else \
                ('생활' if board == 'life' else ('자유'))

        # 민원 게시판 보여주기
        elif board == "minwon":
            if category.find('_') == -1:
                # 'gong' 게시판 혹은 'bachelor' 'master' 'family' 'bk'
                feeds = Minwon.objects.filter(dormitory=category)
                board_name = '공통' if category == 'gong' else \
                             ('학부생활관' if category == 'bachelor' else
                              ('대학원생활관' if category == 'master' else
                               ('가족생활관' if category == 'family' else ('BK생활관'))))
            else:
                dorm_info = category.split('_')
                board_name = dorm_info[1] + '동'
                feeds = Minwon.objects.filter(
                    dormitory=dorm_info[0], building=dorm_info[1])

        # 생필품 게시판 보여주기
        elif board == "life":
            feeds = CoBuy.objects.all() if category == "cobuy" else \
                (Rent.objects.all() if category == "rent" else
                 (Keep.objects.all() if category == "keep" else
                  Resell.objects.all()))

            board_name = '공동구매' if category == 'cobuy' else \
                ('대여' if category == 'share' else
                         ('보관' if category == 'keep' else ('거래')))

        # 이미 위의 category가 #인 부분에서 check 완료 됨
        # else:
        #     feeds = FreeBoard.objects.all()
        return render(request, 'feedpage/show.html', {'feeds': feeds, 'board': board,
                                                      'category': category, 'board_name': board_name})

    elif request.method == 'POST':
        return redirect('showboard', board=board, category=category)

# Feed 생성


def newFeed(request, board, category):
    if request.method == 'GET':
        return render(request, 'feedpage/new.html', {'board': board, 'category': category})

    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        photo = request.POST['photo']
        noname = request.POST['noname']

        # 민원 게시판
        ''' category 
            전체 게시판: gong
            동별 게시판: bachelor | master | family | bk_906 etc
        '''
        if board == "minwon":
            dormitory = 'gong' if category.find('gong') != -1 else \
                        ('bachelor' if category.find('bachelor') != -1 else
                         ('master' if category.find('master') != -1 else
                          ('family' if category.find('family') != -1 else
                           ('bk' if category.find('bk') != -1 else 'all'))))

            building = category.split(
                '_')[1] if board.find('_') != -1 else 'none'
            Minwon.objects.create(title=title, content=content, noname=noname, dormitory=dormitory,
                                  building=building, photo=photo, author=request.user)

        # 생필품 게시판
        elif board == "life":
            product = request.POST['product']
            status = request.POST['status']
            contact = request.POST['contact']

            # cobuy 게시판
            if category == "cobuy":
                price = request.POST['price']
                url = request.POST['url']
                duedate = request.POST['duedate']
                CoBuy.objects.create(title=title, content=content, product=product, price=price, noname=noname,
                                     contact=contact, status=status, url=url, duedate=duedate, author=request.user)
            # rent 게시판
            elif category == "rent":
                deposit = request.POST['deposit']
                start_date = request.POST['start_date']
                end_date = request.POST['end_date']
                Rent.objects.create(title=title, content=content, product=product, contact=contact,
                                    noname=noname, status=status, deposit=deposit, author=request.user,
                                    start_date=start_date, end_date=end_date)
            # keep 게시판
            elif category == "keep":
                start_date = request.POST['start_date']
                end_date = request.POST['end_date']
                reward = request.POST['reward']
                Keep.objects.create(title=title, content=content, product=product, status=status, contact=contact,
                                    noname=noname, start_date=start_date, end_date=end_date, reward=reward, author=request.user)

            # resell 게시판
            elif category == "resell":
                price = request.POST['price']
                role = request.POST['role']
                Resell.objects.create(title=title, content=content, product=product, price=price, noname=noname,
                                      status=status, contact=contact, role=role, author=request.user)
            else:
                FreeBoard.objects.create(
                    title=title, content=content, photo=photo, noname=noname, author=request.user)

        return redirect('showboard', board=board, category=category)

# 특정 게시글 자세히 보기


def showFeed(request, board, category, fid):
    feed = Feed.objects.get(id=fid)

    return render(request, 'feedpage/feed.html', {'feed': feed, 'board': board, 'category': category})

# 게시글 수정
# board별로 띄워주는 글 다르므로, if문으로 나눠야함


def editFeed(request, board, category, fid):
    if request.method == 'GET':
        feed = Feed.objects.get(id=fid)

        return render(request, 'feedpage/edit.html', {'feed': feed, 'board': board, 'category': category, 'fid': fid})

    elif request.method == 'POST':

        # 민원 게시판
        ''' category 
            전체 게시판: gong
            동별 게시판: bachelor | master | family | bk_906 etc
        '''

        if board == "minwon":
            edit_minwon = Minwon.objects.get(id=fid)
            edit_minwon.title = request.POST['title']
            edit_minwon.content = request.POST['content']
            edit_minwon.photo = request.POST['photo']
            edit_minwon.noname = request.POST['noname']

            edit_minwon.dormitory = 'gong' if category.find('gong') != -1 else ('bachelor' if category.find('bachelor') != -1 else (
                'master' if category.find('master') != -1 else ('family' if category.find('family') != -1 else ('bk' if category.find('bk') != -1 else 'all'))))

            edit_minwon.building = category.split(
                '_')[1] if board.find('_') != -1 else 'none'

            edit_minwon.save()

        # 생필품 게시판
        elif board == "life":

            # cobuy 게시판
            if category == "cobuy":
                edit_cobuy = Cobuy.objects.get(id=fid)
                edit_cobuy.product = request.POST['product']
                edit_cobuy.status = request.POST['status']
                edit_cobuy.contact = request.POST['contact']
                edit_cobuy.price = request.POST['price']
                edit_cobuy.url = request.POST['url']
                edit_cobuy.duedate = request.POST['duedate']
                edit_cobuy.save()

            # rent 게시판
            elif category == "rent":
                edit_rent = Rent.objects.get(id=fid)
                edit_rent.product = request.POST['product']
                edit_rent.status = request.POST['status']
                edit_rent.contact = request.POST['contact']
                edit_rent.deposit = request.POST['deposit']
                edit_rent.start_date = request.POST['start_date']
                edit_rent.end_date = request.POST['end_date']
                edit_rent.save()

            # keep 게시판
            elif category == "keep":
                edit_keep = Keep.objects.get(id=fid)
                edit_keep.product = request.POST['product']
                edit_keep.status = request.POST['status']
                edit_keep.contact = request.POST['contact']
                edit_keep.start_date = request.POST['start_date']
                edit_keep.end_date = request.POST['end_date']
                edit_keep.reward = request.POST['reward']
                edit_keep.save()

            # resell 게시판
            elif category == "resell":
                edit_resell = Resell.objects.get(id=fid)
                edit_resell.product = request.POST['product']
                edit_resell.status = request.POST['status']
                edit_resell.contact = request.POST['contact']
                edit_resell.price = request.POST['price']
                edit_resell.role = request.POST['role']
                edit_resell.save()

        elif board == "freeboard":
            edit_free = FreeBoard.objects.get(id=fid)
            edit_free.title = request.POST['title']
            edit_free.content = request.POST['content']
            edit_free.photo = request.POST['photo']
            edit_free.noname = request.POST['noname']
            edit_free.save()

        return redirect('showfeed', board=board, category=category, fid=fid)

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
    new_comment = FeedComment.objects.create(
        feed_id=fid, content=content, author=request.user)
    like_count = new_comment.commentlike_set.filter(user_id=request.user.id)

    context = {
        'cid': new_comment.id,
        'username': new_comment.author.username,
        'content': new_comment.content,
        'like_count': like_count.count(),
    }

    return JsonResponse(context)

# 댓글 수정 -- 미완성


def editComment(request, board, category, fid, cid):
    return redirect('showfeed', board=board, category=category, fid=fid)

# 댓글 좋아요


def likeComment(request, board, category, fid, cid):
    feedcomment = FeedComment.objects.get(id=cid)
    like_list = feedcomment.commentlike_set.filter(user_id=request.user.id)
    if like_list.count() > 0:
        feedcomment.commentlike_set.get(user_id=request.user.id).delete()
    else:
        CommentLike.objects.create(
            user_id=request.user.id, comment_id=feedcomment.id)
    return redirect('showfeed', board=board, category=category, fid=fid)

# 댓글 삭제


def deleteComment(request, board, category, fid, cid):
    c = FeedComment.objects.get(id=cid)
    c.delete()

    context = {
        'json': 'working',
    }

    return JsonResponse(context)

# 대댓글 달기


def newRecomment(request, board, category, fid, cid):
    content = request.POST['content']
    new_recomment = Recomment.objects.create(
        comment_id=cid, content=content, author=request.user)
    like_count = new_recomment.recommentlike_set.filter(
        user_id=request.user.id)

    context = {
        'did': new_recomment.id,
        'username': new_recomment.author.username,
        'content': new_recomment.content,
        'like_count': like_count.count(),
    }

    return JsonResponse(context)

# 대댓글 수정 -- 미완성


def editRecomment(request, board, category, fid, cid):
    return redirect('showfeed', board=board, category=category, fid=fid)

# 대댓글 삭제


def deleteRecomment(request, board, category, fid, cid, rcid):
    c = Recomment.objects.get(id=rcid)
    c.delete()

    context = {
        'json': 'working',
    }

    return JsonResponse(context)

# 대댓글 좋아요


def likeRecomment(request, board, category, fid, cid, rcid):
    recomment = Recomment.objects.get(id=rcid)
    like_list = recomment.recommentlike_set.filter(user_id=request.user.id)
    if like_list.count() > 0:
        recomment.recommentlike_set.get(user_id=request.user.id).delete()
    else:
        RecommentLike.objects.create(
            user_id=request.user.id, recomment_id=recomment.id)
    return redirect('showfeed', board=board, category=category, fid=fid)
