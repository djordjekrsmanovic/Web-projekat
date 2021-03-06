var loggedUser;
var cart;
var wrongAmount=false;
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

    if (  loggedUser==null || loggedUser==undefined || loggedUser.role!='BUYER' ){
        alert("Potrebno je da se prijavite kao kupac");
        window.location.href="http://localhost:8080/WebProject/home.html";
    }

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

    $.get({
        url:'rest/buying/get-cart/'+loggedUser.username,
        contentType:'application/json',
        success:function(data){
            cart=data;
            formCart();
        },
        error:function(data){
            alert('Greska prilikom ucitavanja korisnicke korpe');
        }
    })

    $('#confirmButton').click(function(){
        if (cart.cartItems.length==0){
            alert('Korpa je prazna');
            return;
        }

        if (wrongAmount==true){
            alert('Kolicina proizvoda u korpi treba da bude veca od 0');
            return;
        }

        $.post({
            url:'rest/buying/form-order',
            data:JSON.stringify(cart),
            contentType:'application/json',
            success:function(data){
                alert('Narudžba je uspješno kreirana');
                cart=data;
                formCart();
            },
            error:function(data){
                alert('Greška prilikom kreiranja porudžbine');
            }
        })
    })

})

function formCart(){
    var i=0;
    $('#tableBody').empty();
    for (cartItem of cart.cartItems){
        let tr=$('<tr></tr>');
        let pictureTD=$('<td></td>');
        let picture=$('<img />',{
            src:cartItem.product.photoPath,
        })
        pictureTD.append(picture);

        let name=$('<td>'+cartItem.product.name+'</td>');
        let amountInput=$('<input id='+i+' type="number">');
        amountInput[0].addEventListener('change',createChangeHandler(cartItem,i));
        amountInput.val(cartItem.amount);
        let amount=$('<td></td>').append(amountInput);
        let unitPrice=$('<td>'+cartItem.product.price+'</td>');
        let price=parseInt(cartItem.product.price)*parseInt(cartItem.amount);
        let productPrice=$('<td>'+price+'</td>');
        let deleteButton=document.createElement('button');
        deleteButton.innerHTML="Obriši artikal";
        deleteButton.addEventListener('click',createDeleteHandler(cartItem));
        let deleteTd=$('<td></td>').append(deleteButton);

        tr.append(pictureTD,name,amount,unitPrice,productPrice,deleteTd);
        $('#tableBody').append(tr);
        i++;
    }
    $('#finalPrice').text('Cijena:'+cart.price+' dinara');
}

function createChangeHandler(cartItem,i){
    return function(){
        let newValue=$('#'+i).val();
        if (parseInt(newValue)<=0){
            alert('Kolicina proizvoda treba da bude veca od 0');
            wrongAmount=true;
            return;
        }
        cartItem.amount=newValue;
        if(newValue=="" || newValue=="0"){
            alert('Potrebno je da unesete kolicinu za proizvod');
            wrongAmount=true;
            return;
        }

        wrongAmount=false;
        $.post({
            url:'rest/buying/change-amount',
            data:JSON.stringify(cart),
            contentType:'application/json',
            success:function(data){
                cart=data;
                formCart();
            },
            error:function(){
                alert('Greska prilikom izmjene vrijednosti proizvoda');
            }
        })
    }
}
function createDeleteHandler(cartItem){
    return function(){
        $.ajax({
            url: 'rest/buying/delete-item',
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(cartItem),
            success: function(data){
                cart=data;
                formCart();
            },
            error:function(data){
                alert('Greska prilikom brisanja proizvoda iz korpe');
            }
            
          });
    }
}

