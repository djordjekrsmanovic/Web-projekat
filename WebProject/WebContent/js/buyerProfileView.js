var comments=[];
var ordersForReview=[];
var selectedOrder;
$(document).ready(function(){
    

    //kod za ucitavanje korisnika

    $.get({
        url:'rest/login/get-loged-user',
        contentType:'application/json',
        success:function(user){
            fillUserData(user);
        }
    })

    $('#logout').click(function(){
        $.get({
            url:'rest/login/logout',
            contentType:'application/json',
            success:function(data){
                if (data=="Loged out successfully!"){
                    window.location.href="http://localhost:8080/WebProject/home.html";
                }else{
                    alert('Greska prilikom odjave sa profila');
                }
            }
        })
    })

    $('#changeButton').click(function(){
        window.location.href="http://localhost:8080/WebProject/changeProfile.html";
    })

    $.get({
        url:'rest/buying/get-orders-for-review',
        contentType:'application/json',
        success:function(data){
            ordersForReview=data;
            formOrderTable(ordersForReview);
        },
        error:function(data){
            alert('Greska prilikom ucitavanja narudzbina za ocjenjivanje')
        }
    })

    $('#send-comment').click(function(){
        let rate=$('#rate').val();
        $('#writeComment').hide();
        var postCommentDTO=({restaurantID:selectedOrder.restaurant.name,comment:$('#comment-text').val(),rate:$('#rate').val(),orderID:selectedOrder.id})
        $.post({
            url:'rest/comments/post-comment',
            data:JSON.stringify(postCommentDTO),
            contentType:'application/json',
            success:function(){
                alert('Komentar je uspjesno kreiran');
            },
            error:function(){
                alert('Greska prilikom kreiranja komentarar');
            }
        })
    })
})

function fillUserData(user){
    let date=new Date(user.birthDate);
    date=date.toLocaleDateString();
    let parts=date.split('/');
    let newDate=parts[0]+'.'+parts[1]+'.'+parts[2];
    $('#name').text(user.firstName);
    $('#lastname').text(user.lastName);
    $('#username').text(user.username);
    $('#birthDate').text(newDate);
    
    if (user.gender=='male'){
        $('#gender').text('Muški');
    }else{
        $('#gender').text('Ženski');
    }

    $('#category').text(getRole(user));
    $('#points').text(user.points);
    $('#discount').text(user.buyerType.discount+'%');
    
}

function formOrderTable(){
    for (order of ordersForReview){
        let tr=$('<tr></tr>');
        let statusTD=$('<td>'+getStatus(order)+'</td>');
        let restaurantTD=$('<td>'+order.restaurant.name+'</td>');
        let date=new Date(order.dateAndTime);
        date=date.toLocaleString();
        let parts=date.split('/');
        let newDate=parts[0]+'.'+parts[1]+'.'+parts[2];
        let dateTD=$('<td>'+newDate+'</td>');
        let reviewButton=$('<button>Ocijeni restoran</button>');
        reviewButton[0].addEventListener('click',createCommentHandler(order));
        let reviewTD=$('<td></td>').append(reviewButton);
        tr.append(statusTD,restaurantTD,dateTD,reviewTD);
        $('#tableBody').append(tr);
    }
    
}

function createCommentHandler(order){
    return function(){
        alert(order.dateAndTime);
        selectedOrder=order;
        $('#writeComment').show();
        window.scrollTo(0,document.body.scrollHeight);
    }
}

function getStatus(order){
    if (order.status=='OBRADA'){
        return 'U statusu obrade';
    }else if(order.status=='U_PRIPREMI'){
        return 'U pripremi';
    }else if(order.status=='CEKA_DOSTAVLJACA'){
        return 'Čeka dostavljača'
    }else if(order.status=='U_TRANSPORTU'){
        return 'U transportu';
    }else if(order.status=='DOSTAVLJENA'){
        return 'Dostavljena';
    }else if (order.status=='OTKAZANA'){
        return 'Otkazana';
    }
}

function getRole(user){
    if (user.buyerType.buyerRank=='GOLD'){
        return 'Zlatni kupac';
    }else if(user.buyerType.buyerRank=='BRONZE'){
        return 'Bronzani kupac';
    }else if(user.buyerType.buyerRank=='SILVER'){
        return 'Srebrni kupac';
    }
    else{
        return 'Početnik';
    }
    
}
