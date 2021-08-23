var comments=[];
$(document).ready(function(){
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
})

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