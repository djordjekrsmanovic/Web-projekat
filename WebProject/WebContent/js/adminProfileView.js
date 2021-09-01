var comments=[];
$(document).ready(function(){


    $.ajax({
        url:'rest/login/get-loged-user',
        contentType:'application/json',
        type:'GET',
        success:function(user){
            loggedUser=user;
        },
        async:false,
    })

    if ( loggedUser==null || loggedUser==undefined || loggedUser.role!='ADMIN' ){
        alert("Potrebno je da se prijavite kao administrator");
        window.location.href="http://localhost:8080/WebProject/home.html";
    }
    $.get({
        url:'rest/comments/get-comments',
        contentType:'application/json',
        success:function(data){
            for(comment of data){
                comments.push(comment);
            }

            formCommentTable();
        },
        error:function(data){
            alert("Greska prilikom ucitavanja komentara");
        }

    })

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
    
}

function formCommentTable(){
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

function getCommentState(comment){
    if (comment.comentState=='APPROVED'){
        return 'Odobren';
    }else if(comment.comentState=='WAITING'){
        return 'Čeka';
    }else{
        return 'Odbijen';
    }
}