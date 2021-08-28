var comments=[];
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
    for (comment of comments){
        let tr=$('<tr></tr>');
        let customerTd=$('<td>'+comment.buyer.firstName+' '+comment.buyer.lastName+'</td>');
        let restaurantTd=$('<td>'+comment.restaurant.name+'</td>');
        let gradeTd=$('<td>'+comment.rate+'</td>');
        let commentTextTd=$('<td>'+comment.comment+'</td>');
        let commentStatus=$('<td>'+getCommentState(comment)+'</td>');
        tr.append(customerTd,restaurantTd,gradeTd,commentTextTd,commentStatus);
        $('#tableBody').append(tr);
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
    return 'Početnik';
}