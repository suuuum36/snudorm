from django.shortcuts import render, redirect, HttpResponseRedirect
from .models import Feed, CoBuy, Rent, Keep, Resell, FeedComment, \
                    FeedLike, CommentLike, Recomment 
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

def new(request, board, name):
    # board_id에 따라서 CoBuy, Rent, Keep, Resell 등 게시판 종류 달라짐. 
    if request.method == 'GET':
        return render(request, 'feedpage/new.html', {'board': board, 'name': name})
    
    elif request.method == 'POST':
        if board == "minwon":

            return redirect('show', board=board, name=name)

        elif board == "life":
            title = request.POST['title']
            content = request.POST['content']
            product = request.POST['product']

            if name == "cobuy": # cobuy 게시판 
                url = request.POST['url']
                duedate = request.POST['duedate']
                contact = request.POST['contact']
                price = request.POST['price']

                CoBuy.objects.create(title=title, content=content, product=product, url=url, \
                                    duedate=duedate, contact=contact, price=price, author=request.user)
        
            elif name == "rent":
                what = 1

            elif name == "keep":
                what = 1

            elif name == "resell":
                role = request.POST['role']
                Resell.objects.create(title=title, content=content, product=product, url=url, \
                                    duedate=duedate, contact=contact, price=price, author=request.user)
            
            return redirect('show', board=board, name=name)

        else:
            return redirect('show', board=board, name=name)

        
        return redirect('feeds/')

def feed(request, board, name, fid):
    return redirect('/feeds')

def show(request, board, name):
    if request.method == 'GET':
        feeds = CoBuy.objects.all() if name == "cobuy" else \
                (Rent.objects.all() if name == "rent"  else \
                (Keep.objects.all() if name == "keep"  else \
                Resell.objects.all() ))

        return render(request, 'feedpage/show.html', {'feeds': feeds, 'board': board, 'name': name})

    elif request.method == 'POST': 
        return redirect('show', board=board, name=name)         
    
def delete(reuqest, board, name, fid):
    if request.method == 'GET':
        return render(request, 'feedpage/delete.html')
    
    return redirect('/feeds')

def edit(request, board, name, fid):
    if request.method == 'GET':
        return render(request, 'feedpage/edit.html')
    
    return redirect('/feeds')

def feedlike(request, board, name, fid):
    return redirect('/feeds')


def newcomment(request, board, name, fid): 
    # if request.method == 'GET':
    #     return render(request, 'feedpage/newcomment.html')
    if board == "life":
        content = request.POST['content']
        FeedComment.objects.create(feed_id=fid, content=content, author = request.user)
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
        ReComment.objects.create(comment_id=cid, content=content, author = request.user)
        return redirect('show', board=board, name=name)
    else:
        return redirect('show', board=board, name=name)
    return redirect('/feeds')
