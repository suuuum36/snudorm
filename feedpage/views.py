from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, Minwon, Life, FreeBoard, CoBuy, Rent, Keep, Resell, FeedComment, \
                    FeedLike, CommentLike, Recomment, RecommentLike, STAT_OPTION, Notice, Image 
# from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.paginator import Paginator 

from datetime import datetime, timedelta, date
from collections import OrderedDict

# 페이지 노출 시에 보여지는 게시판 이름들 정리
def get_board(board, category):
    board_info = ['', '', ''] 
    # 전체 리스트 게시판 항목 정보 1
    board_info[0] = '공통' if category.find('gong') != -1 else \
                    ('학부' if category.find('bachelor') != -1 else 
                    ('대학원' if category.find('master') != -1 else 
                    ('가족' if category.find('family') != -1 else 
                    ('BK' if category.find('bk') != -1 else ''))))

    # 전체 리스트 게시판 항목 정보 2
    board_info[1] = category.split('_')[1] + '동' if category.find('_') != -1 else \
                    ('공구' if category == 'cobuy' else 
                    ('대여' if category == 'rent' else 
                    ('보관' if category == 'keep' else 
                    ('중고' if category == 'resell' else ''))))
    
    # 게시판별 이름 정보  
    board_info[2] = '전체' if category == 'tori' else \
                    '공통' if category.find('gong') != -1 else board_info[1]

    return board_info

def get_feed(board, category):
    board_info = get_board(board, category)           
    # 전체게시판 보여주기: minwon / life / freeboard
    if category == "tori":
        feeds = Minwon.objects.all() if board == "minwon" else \
                (Life.objects.all() if board == "life" else
                (FreeBoard.objects.all()))

    # 민원 게시판 보여주기
    elif board == "minwon":
        feeds = Minwon.objects.filter(board_info1=board_info[0], board_info2=board_info[1])

    # 생활 게시판 보여주기
    elif board == "life":
        feeds = CoBuy.objects.all() if category == "cobuy" else \
                (Rent.objects.all() if category == "rent" else
                (Keep.objects.all() if category == "keep" else
                (Resell.objects.all() if category == "resell" else 
                (Life.objecst.all()))))
    else:
        feeds = Feeds.objects.all()
    return feeds

def get_pages(feeds, request):
    # 전체글 버튼
    feeds = feeds.order_by('-created_at')
    paginator = Paginator(feeds, 11)
    page = request.GET.get('page')
    posts = paginator.get_page(page)

    # 베스트 버튼 
    best_feeds = feeds.order_by('like_users', '-created_at')
    paginator2 = Paginator(best_feeds, 11)
    best_page = request.GET.get('best_page')
    best_posts = paginator2.get_page(best_page)
    
    page_numbers_range = 10

    max_index = len(paginator.page_range)
    current_page = int(page) if page else 1
    start_index = int((current_page - 1) / page_numbers_range) * page_numbers_range
    end_index = start_index + page_numbers_range

    if end_index >= max_index:
        end_index = max_index

    paginator_range = paginator.page_range[start_index:end_index]

    max_index = len(paginator2.page_range)
    current_page = int(best_page) if best_page else 1
    start_index = int((current_page - 1) / page_numbers_range) * page_numbers_range
    end_index = start_index + page_numbers_range
    
    if end_index >= max_index:
        end_index = max_index

    paginator_range2 = paginator2.page_range[start_index:end_index]
    
    return [posts, best_posts, paginator_range, paginator_range2]

# 기본 PAGE
def showMain(request):
    if request.method == 'GET':
        yesterday = datetime.now()-timedelta(days=1)
        yesterday.strftime('%Y-%m-%d')
        tomorrow = datetime.now()+timedelta(days=1)
        tomorrow.strftime('%Y-%m-%d')
        week_ago = datetime.now()-timedelta(weeks=1)
        week_ago.strftime('%Y-%m-%d') 

        user_category = "학부"
        user_building = "906"

        if request.user.is_authenticated:
            category = request.user.profile.building_category
            user_building = request.user.profile.building_dong
            user_category = "학부" if category.find("학부") != -1 else \
                            ("대학원" if category.find("대학원") != -1 else 
                            ("가족" if category.find("가족") != -1 else 
                            ("BK" if category.find("BK") != -1 else "학부")))

        dong = Minwon.objects.filter(board_info1=user_category, board_info2=user_building) 
        dong_name = user_category + " " + user_building

        # 전체게시판 = [ 주간게시글, 일간게시글 ] - 좋아요 기준 정렬
        gong_feeds = [ Minwon.objects.filter(category='gong', created_at__gte=week_ago).order_by('like_users', '-created_at')[:5],
                        Minwon.objects.filter(category='gong', created_at__gte=yesterday).order_by('like_users', '-created_at')[:5] ]
        # 동별게시판 = [ 주간게시글, 일간게시글 ] - 좋아요 기준 정렬
        dong_feeds = [ dong.filter(created_at__gte=week_ago).order_by('like_users', '-created_at')[:5],
                        dong.filter(created_at__gte=yesterday).order_by('like_users', '-created_at')[:5] ]

        cobuy_feeds = CoBuy.objects.filter(created_at__gte=yesterday).order_by('-created_at')
        keep_feeds = Keep.objects.filter(created_at__gte=yesterday).order_by('-created_at')
        rent_feeds = Rent.objects.filter(created_at__gte=yesterday).order_by('-created_at')
        resell_feeds = Resell.objects.filter(created_at__gte=yesterday).order_by('-created_at')

        # 생활게시판 - 시간 정렬
        life_feeds = [ [cobuy_feeds[:5], cobuy_feeds[5:10]], [keep_feeds[:5], keep_feeds[5:10]],
                        [rent_feeds[:5], rent_feeds[5:10]], [resell_feeds[:5], resell_feeds[5:10]] ]
        # 자유게시판 - 좋아요 정렬
        free_feeds = FreeBoard.objects.filter(created_at__gte=yesterday).order_by('like_users', '-created_at')[:17]

        return render(request, 'feedpage/index.html', {'gong_feeds': gong_feeds, 'dong_feeds': dong_feeds,
                                'life_feeds': life_feeds,'free_feeds': free_feeds, 'dong_name': dong_name })

    elif request.method == 'POST':
        return redirect('/feeds')

# 게시판 list 보여주기
def showBoard(request, board, category):
    ''' ____________________________________________________________________
        |   board     |   category                       | list             
        |-------------|-----------------------------------------------------
        |  minwon     |  tori                            | 전체 게시판      
        |             |  gong                            | 생활관 공통      
        |             |  bachelor | master | family | bk | 생활관별 게시판  
        |             |  bachelor_906 etc                | 동별 게시판      
        |-------------|---------------------------------------------------- 
        |  life       |  tori                             | 전체 게시판      
        |             |  cobuy | rent | keep | resell     | 세부 기능 게시판 
        |-------------|-----------------------------------------------------
        |  freeboard  |  tori                             | 전체 게시판      
        ---------------------------------------------------------------------
    '''
    if request.method == 'GET': 
        board_info = get_board(board, category)           
        # 전체글 버튼
        feeds = get_feed(board, category).order_by('-created_at')
        pages = get_pages(feeds, request)

        return render(request, 'feedpage/show.html', {'posts':pages[0], 'best_posts': pages[1], 
                            'board': board, 'category': category, 'board_name': board_info[2] + ' 게시판', 
                            'paginator_range':pages[2], 'paginator_range2':pages[3] })

    elif request.method == 'POST':
        return redirect('showboard', board=board, category=category)


# Feed 생성
def newFeed(request, board, category):
    board_info = get_board(board, category)

    if request.method == 'GET':
        return render(request, 'feedpage/new.html', {'board': board,
                    'category': category, 'board_name': board_info[2] + ' 게시판' })

    elif request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        noname = True if "noname" in request.POST else False
        # 관리자 계정('domitori) 일 때만 공지사항 작동 
        notice = True if request.user.username == 'domitori' else False

        # 민원 게시판 
        if board == "minwon":
            feed = Minwon.objects.create(title=title, content=content,  noname=noname, views=0,
                                author=request.user, board=board, category=category, notice=notice,
                                board_info1=board_info[0], board_info2=board_info[1])
        # 자유 게시판 
        elif board == 'freeboard':
            feed = FreeBoard.objects.create(title=title, content=content,  noname=noname, views=0,
                                    author=request.user, board=board, category=category, notice=notice,
                                    board_info1=board_info[0], board_info2=board_info[1])   
        # 생필품 게시판 
        elif board == "life":
            # cobuy 게시판 - (제목, 설명, 사진, 익명) + 가격, 링크, 마감일(+ 미정)
            if category == "cobuy":
                price = request.POST['price']
                url = request.POST['url'].replace("https://", "").replace("http://", "")
                duedate = request.POST.get('duedate', '2020-01-01')
                status = STAT_OPTION[0]
                feed = CoBuy.objects.create(title=title, content=content,  noname=noname, views=0,
                                    price=price, url=url, duedate=duedate, status=status, notice=notice,
                                    author=request.user, board=board, category=category,
                                    board_info1=board_info[0], board_info2=board_info[1])

            # rent 게시판 - (제목, 설명, 사진, 익명) + 목적, 대여료, 시작일(+ 미정), 마감일(+ 미정)
            elif category == "rent":
                purpose = Rent.OPTION[0] if request.POST['purpose'] == 'borrow' else Rent.OPTION[1]
                deposit = request.POST['deposit']
                start_date = request.POST.get('start_date', '2020-01-01')
                end_date = request.POST.get('duedate', '2020-01-01')
                status = STAT_OPTION[0]
                feed = Rent.objects.create(title=title, content=content,  noname=noname, deposit=deposit, 
                                    purpose=purpose, start_date=start_date, end_date=end_date, status=status,
                                    author=request.user, board=board, category=category, notice=notice, views=0,
                                    board_info1=board_info[0], board_info2=board_info[1])

            # keep 게시판 - (제목, 설명, 사진, 익명) + 목적, 보관료, 시작일(+ 미정), 마감일(+ 미정)
            elif category == "keep":
                purpose = Keep.OPTION[0] if request.POST['purpose'] == 'keep' else Keep.OPTION[1]
                reward = request.POST['reward']
                start_date = request.POST.get('start_date', '2020-01-01')
                end_date = request.POST.get('duedate', '2020-01-01')
                status = STAT_OPTION[0]
                feed = Keep.objects.create(title=title, content=content,  noname=noname, purpose=purpose, 
                                    reward=reward, start_date=start_date, end_date=end_date, status=status,
                                    author=request.user, board=board, category=category, notice=notice, views=0,
                                    board_info1=board_info[0], board_info2=board_info[1])

            # resell 게시판 - (제목, 설명, 사진, 익명) + 목적, 가격
            elif category == "resell":
                purpose = Resell.OPTION[0] if request.POST['purpose'] == "sell" else Resell.OPTION[1]
                price = request.POST['price']
                status = STAT_OPTION[1]   
                feed = Resell.objects.create(title=title, content=content,  noname=noname, purpose=purpose, 
                                price=price, status=status, author=request.user, board=board, category=category,
                                board_info1=board_info[0], board_info2=board_info[1], notice=notice, views=0)
            
        feed.save()
        photos = request.FILES.getlist('photo[]')
        print(photos)
        for image in photos:
            print(image)
            new_image = Image.objects.create(feed_id = feed.id, photo = image)
            new_image.save()
        

    return redirect('showboard', board=board, category=category)

# 특정 게시글 자세히 보기 
def showFeed(request, board, category, fid): # board, category 필요없음. 
    board_info = get_board(board, category)
    # 조회수 count 본인 게시글 조회 제외!
    feed = Feed.objects.filter(board=board, category=category, id=fid)

    if not request.user.is_authenticated:
        return render(request, 'accounts/login.html')

    if board == "minwon":
        feed = Minwon.objects.get(id=fid)

    elif board == "life":
        if category == 'tori':
            feed = Life.objects.get(id=fid)
            category = feed.category 

        feed = CoBuy.objects.get(id=fid) if category == "cobuy" else \
        (Rent.objects.get(id=fid) if category == "rent" else 
        (Keep.objects.get(id=fid) if category == "keep" else 
        (Resell.objects.get(id=fid) if category == "resell" else 
        ())))

    elif board == "freeboard":
        feed = FreeBoard.objects.get(id=fid)

    if request.user.id != feed.author.id:
        feed.views += 1     
        feed.save()
    
    if request.user.id != None:
        notices = Notice.objects.filter(user_to = request.user, feed_id = fid)
        for notice in notices:
            notice.checked = True
            notice.save()

    return render(request, 'feedpage/feed.html', {'feed': feed, 'board': board, 'fid':fid, 
                                        'category': category, 'board_name': board_info[2] + ' 게시판'})



# 게시글 수정
def editFeed(request, board, category, fid):
    board_info = get_board(board, category)
    if request.method == 'GET':
        complete = False

        if board == "minwon":
            feed = Minwon.objects.get(id=fid)

        elif board == "life":
            feed = CoBuy.objects.get(id=fid) if category == "cobuy" else \
                (Rent.objects.get(id=fid) if category == "rent" else 
                (Keep.objects.get(id=fid) if category == "keep" else 
                (Resell.objects.get(id=fid) if category == "resell" else "tori")))
            complete = True if feed.status == STAT_OPTION[2] else False

        elif board == "freeboard":
            feed = FreeBoard.objects.get(id=fid)

        return render(request, 'feedpage/edit.html', {'feed': feed, 'board': board,
                        'category': category, 'fid': fid, 'board_name': board_info[2] + ' 게시판' })

    elif request.method == 'POST':
        print(request.POST)
        feed = Minwon.objects.get(id=fid) if board == 'minwon' else \
            (FreeBoard.objects.get(id=fid) if board == 'freeboard' else 
            (CoBuy.objects.get(id=fid) if category == 'cobuy' else 
            (Rent.objects.get(id=fid) if category == 'rent' else 
            (Keep.objects.get(id=fid) if category == 'keep' else 
            (Resell.objects.get(id=fid))))))

        feed.title = request.POST['title']
        feed.content = request.POST['content']      
        feed.noname = True if "noname" in request.POST else False
        
        if board == 'life':
            feed.status = STAT_OPTION[0] if request.POST['status'] == '진행중' else \
                    (STAT_OPTION[1] if request.POST['status'] == '판매중' else (STAT_OPTION[2]))

            # cobuy 게시판 - (제목, 설명, 사진, 익명) + 가격, 링크, 마감일(+ 미정)
            if category == "cobuy":
                feed.price = request.POST['price']
                feed.url = request.POST['url']
                feed.duedate = request.POST.get('duedate', '2020-01-01')

            # rent 게시판 - (제목, 설명, 사진, 익명) + 목적, 대여료, 시작일(+ 미정), 마감일(+ 미정)
            elif category == "rent":
                feed.deposit = request.POST['deposit']
                feed.purpose = Rent.OPTION[0] if request.POST['purpose'] == 'borrow' else Rent.OPTION[1]
                feed.start_date = request.POST.get('start_date', '2020-01-01')
                feed.end_date = request.POST.get('duedate', '2020-01-01')

            # keep 게시판 - (제목, 설명, 사진, 익명) + 목적, 보관료, 시작일(+ 미정), 마감일(+ 미정)
            elif category == "keep":
                feed.purpose = Keep.OPTION[0] if request.POST['purpose'] == 'keep' else Keep.OPTION[1]
                feed.reward = request.POST['reward']
                feed.start_date = request.POST.get('start_date', '2020-01-01')
                feed.end_date = request.POST.get('duedate', '2020-01-01')

            # resell 게시판 - (제목, 설명, 사진, 익명) + 목적, 가격
            elif category == "resell":
                feed.purpose = Resell.OPTION[0] if request.POST['purpose'] == 'sell' else Resell.OPTION[1]
                feed.price = request.POST['price']

        photos = request.FILES.getlist('photo[]')
        for image in photos:
            print(image)
            new_image = Image.objects.create(feed_id = feed.id, photo = image)
            new_image.save()
        feed.save()
        delphoto = request.POST.getlist('deletelist[]')
        for photo in delphoto:
            print(photo)
            Image.objects.get(id = photo).delete()
    
        return redirect('showfeed', board=board, category=category, fid=fid)


# 게시글 삭제
def deleteFeed(request, board, category, fid):
    feed = Feed.objects.get(id=fid)
    feed.delete()

    return redirect('showboard', board=board, category=category)


# 민원게시판 게시글 좋아요
def likeFeed(request, board, category, fid):
    board_info = get_board(board, category)
    
    if board == "minwon":
        feed = Minwon.objects.get(id=fid)

    elif board == "life":
        feed = CoBuy.objects.get(id=fid) if category == "cobuy" else (Rent.objects.get(id=fid) if category == "rent" else (
        Keep.objects.get(id=fid) if category == "keep" else (Resell.objects.get(id=fid) if category == "resell" else "tori")))

    elif board == "freeboard":
        feed = FreeBoard.objects.get(id=fid)

    if request.user.id != feed.author.id:
        Notice.objects.create(user_to_id = feed.author.id, user_from = request.user, feed_id = fid, type_info1='게시글', type_info2='공감')
    
    user_like = feed.feedlike.filter(user_id=request.user.id)
    if user_like.count() > 0:
        feed.feedlike.get(user_id=request.user.id).delete()
    else:
        FeedLike.objects.create(user_id=request.user.id, feed_id=feed.id)

    context = {
        'likecount': user_like.count()
    }
    return JsonResponse(context)

# 댓글 달기
def newComment(request, board, category, fid):
    content = request.POST['content']

    if (len(content) > 50 or len(content) == 0):
        context = {
            'concount': len(content),
        }
        return JsonResponse(context)

    noname = True if "noname[]" in request.POST else False
    new_comment = FeedComment.objects.create(feed_id=fid, content=content, author = request.user, noname = noname)
    like_count = new_comment.commentlike_set.filter(user_id = request.user.id)
    feed = Feed.objects.get(id = fid)
    if request.user.id != feed.author.id:
        Notice.objects.create(user_to_id = feed.author.id, user_from = request.user, feed_id = fid, type_info1='게시글', type_info2='댓글', noname=noname)


    context = {
        'cid': new_comment.id,
        'nickname': new_comment.author.profile.nickname,
        'content': new_comment.content,
        'concount': len(new_comment.content),
        'like_count': like_count.count(),
        'noname': noname,
        'date': new_comment.created_at.strftime("%y.%m.%d"),        
    }

    return JsonResponse(context)


def editComment(request, board, category, fid, cid):
    if request.method == 'POST':
        content = request.POST['content']
        FeedComment.objects.filter(id =cid).update(content = content)
        edit_comment = FeedComment.objects.get(id = cid)
        like_count = edit_comment.commentlike_set.filter(user_id = request.user.id)

        context = {
            'nickname': edit_comment.author.profile.nickname,
            'content' : content,
            'noname' : edit_comment.noname,
            'date': edit_comment.created_at.strftime("%y.%m.%d"), 
        }

        return JsonResponse(context)


# 댓글 좋아요
def likeComment(request, board, category, fid, cid):
    feedcomment = FeedComment.objects.get(id=cid)
    like_list = feedcomment.commentlike_set.filter(user_id=request.user.id)

    if like_list.count() > 0:
        feedcomment.commentlike_set.get(user_id=request.user.id).delete()
    else:
        CommentLike.objects.create(user_id = request.user.id, comment_id = feedcomment.id)
        if request.user.id != feedcomment.author.id:
            Notice.objects.create(user_to_id = feedcomment.author.id, user_from = request.user, feed_id = fid, type_info1='댓글', type_info2='공감')

    context = {
        'likecount': like_list.count()
    }

    return JsonResponse(context)



# 댓글 삭제


def deleteComment(request, board, category, fid, cid):
    c = FeedComment.objects.get(id=cid)
    c.delete()
    return JsonResponse({})

# 대댓글 달기


def newRecomment(request, board, category, fid, cid):
    content = request.POST['content']
    if (len(content) > 50 or len(content) == 0):
        context = {
            'concount': len(content),
        }
        return JsonResponse(context)

    noname = True if "noname[]" in request.POST else False
    new_recomment = Recomment.objects.create(
        comment_id=cid, content=content, author=request.user, noname = noname)
    like_count = new_recomment.recommentlike_set.filter(
        user_id=request.user.id)

    feedcomment = FeedComment.objects.get(id=cid)
    if request.user.id != feedcomment.author.id:
        Notice.objects.create(user_to_id = feedcomment.author.id, user_from = request.user, feed_id = fid, type_info1='댓글', type_info2='대댓글', noname=noname)

    context = {
        'did': new_recomment.id,
        'nickname': new_recomment.author.profile.nickname,
        'content': new_recomment.content,
        'likecount': like_count.count(),
        'noname': noname,
        'date': new_recomment.created_at.strftime("%y.%m.%d"),     
    }

    return JsonResponse(context)

# 대댓글 수정 -- 미완성


def editRecomment(request, board, category, fid, cid, rcid):
    if request.method == 'POST':
        content = request.POST['content']
        Recomment.objects.filter(id = rcid).update(content = content)
        edit_recomment = Recomment.objects.get(id = rcid)
        like_count = edit_recomment.recommentlike_set.filter(user_id = request.user.id)

        context = {
            'nickname': edit_recomment.author.profile.nickname,
            'content' : content,
            'noname' : edit_recomment.noname,
            'date': edit_recomment.created_at.strftime("%y.%m.%d"), 
        }

        return JsonResponse(context)



# 대댓글 삭제


def deleteRecomment(request, board, category, fid, cid, rcid):
    c = Recomment.objects.get(id=rcid)
    c.delete()
    return JsonResponse({})


def likeRecomment(request, board, category, fid, cid, rcid):
    recomment = Recomment.objects.get(id=rcid)
    like_list = recomment.recommentlike_set.filter(user_id=request.user.id)
    if like_list.count() > 0:
        recomment.recommentlike_set.get(user_id=request.user.id).delete()
    else:
        RecommentLike.objects.create(user_id = request.user.id, recomment_id = recomment.id)
        if request.user.id != recomment.author.id:
            Notice.objects.create(user_to_id = recomment.author.id, user_from = request.user, feed_id = fid, type_info1='대댓글', type_info2='공감')
    
    context = {
        'likecount': like_list.count()
    }
    return JsonResponse(context)

def search(request):
    if request.method == 'GET':
        searchtype = request.GET
        query = request.GET['query']
        search_option = request.GET['select-option']

        feeds = []
        if search_option == 'title':
            feeds = Feed.objects.all().filter(title__contains = query).order_by('-created_at')
        elif search_option == 'content':
            feeds = Feed.objects.all().filter(content__contains = query).order_by('-created_at')
        elif search_option == 'title-and-content':
            feeds = (Feed.objects.filter(title__contains = query)|
                    Feed.objects.filter(content__contains = query)).order_by('-created_at')
        
        board_name = '제목 검색 결과' if search_option == 'title' else \
                    ('내용 검색 결과' if search_option == 'content' else 
                    ('제목 + 내용 검색 결과'))

        if len(feeds) == 0:
            board_name += ' 없음'

        pages = get_pages(feeds, request)
        return render(request, 'feedpage/show.html', {'posts': pages[0], 'query':query, 'search': 'all', 'option': search_option,
                                'board_name': board_name, 'paginator_range': pages[2], 'board': 'search' })

def searchMore(request, board, category):
    searchtype = request.GET
    query = request.GET['query2']
    search_option = request.GET['select-option2']

    feeds = get_feed(board, category)
    if search_option == 'title':
        feeds = feeds.filter(title__contains = query).order_by('-created_at')
    elif search_option == 'content':
        feeds = feeds.filter(content__contains = query).order_by('-created_at')
    elif search_option == 'title-and-content':
        feeds = (feeds.filter(title__contains = query)|
                feeds.filter(content__contains = query)).order_by('-created_at')
    
    board_name = '제목 검색 결과' if search_option == 'title' else \
                 ('내용 검색 결과' if search_option == 'content' else 
                 ('제목 + 내용 검색 결과'))
   
    pages = get_pages(feeds, request)
    if len(feeds) == 0:
        board_name += ' 없음'
        
    return render(request, 'feedpage/show.html', {'posts': pages[0], 'board': board, 'category': category, 'option': search_option,
                        'query':query, 'board_name': board_name, 'paginator_range': pages[2], 'search': 'part' })

