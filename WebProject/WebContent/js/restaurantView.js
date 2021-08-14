
var loadedProducts=[];

$(document).ready(function(){
  

    var restaurantName=getUrlParameters("name");
    if (restaurantName===undefined || restaurantName===""){
        alert("Restoran ne postoji");
        window.location.replace("http://localhost:8080/WebProject/home.html");
    }else{
        console.log("Restoran postoji i njegovo ime je "+ restaurantName);
    }
    var urlAddress='rest/restaurant/get-restaurant/'+restaurantName;
    $.get({
        url:urlAddress,
        contentType:'application/json',
        success:function(restaurant){
            fillData(restaurant);
        },
        error:function (param) { 
            alert('Restoran ne postoji u bazi');
         }
    })

    var productsUrlAddress='rest/products/get-products/'+restaurantName;

    $.get({
        url:productsUrlAddress,
        contentType:'application/json',
        success:function(products){
            for (product of products){
                loadedProducts.push(product);
                fillProducts(product);
            }
        }
    })

    
    
    
});

function fillProducts(product){
    /*<div class="Product-card">
            <img src="../pictures/slika1.jpg" alt="Denim Jeans" style="width:100%">
            <h1>Tailored Jeans</h1>
            <p class="Product-price">$19.99</p>
            <p style="overflow-wrap:break-word; padding: 10px">ADdadkakaaaaaaaaaaaaaaaaaaaaa</p>
            <p style="margin-top: 25px;">Kolicina</p>
            <p style="margin-bottom:25px ;"><input type="text"></p>
            <p><button>Add to Cart</button></p>
          </div> */
    let cardDiv=$('<div></div>',{
        class:'Product-card',
    })
    let image=$('<img/>',{
        //src:'product.photoPath',
        src:'../pictures/hrana1.jpg',
    })
    image.css('width','100%');
    let productTitle=$('<h1></h1>',{
        text:product.name
    })
    let productPrice=$('<p></p>',{
        text:'Cijena '+product.price+' dinara',
        class:'Product-price'
    })
    
    let productDescription=$('<p></p>',{
        text:'Opis proizvoda: '+product.description,
        class:'Product-Description'
    })
    let productAmount=$('<p></p>',{
        text:'Velicina porcije:'+product.amount+' g'
    })
    productAmount.css('margin-top','5px');
    productAmount.css('marigin-bottom','15px');
    let inputParagraph=$('<p></p>').css('margin-bottom','25px').append('<input type="text">');
    let buttonAdd=$('<p></p>').append($('<button></button>',{text:'Dodaj u korpu'}));
    cardDiv.append(image).append(productTitle).append(productPrice).append(productDescription).append(productAmount,inputParagraph,buttonAdd);
    $('#Proizvodi').append(cardDiv);
}

function fillData(restaurant){
    console.log("Ucitan je restoran sa servera i njegovo ime je "+ restaurant.name);
    //$('#restaurant-logo').html(restaurant.picturePath); ovo otkomentarisati kada budu dodat logo restorana u bazu
    $('#title-restaurant').html(restaurant.name);
    $('#restaurant-raiting').html(restaurant.raiting);
    $('#restaurant-sort').html(restaurant.restaurantType);
    $('#restaurant-sort').html(restaurant.restaurantType);
    let restaurantLocation=restaurant.location.address.street+" "+restaurant.location.address.streetNumber+" "+restaurant.location.address.city;
    $('#restaurant-address').html(restaurantLocation);
    let restaurantStatus=restaurant.restaurantStatus=='OPEN' ? 'Otvoren' : 'Zatvoren';
    $('#restaurant-status').html(restaurantStatus);
}
function getUrlParameters(paramName){
    var PageURL = window.location.search.substring(1),
        URLVariable=PageURL.split("&"),
        sParametarName;
    for(let i=0;i<URLVariable.length;i++){
        sParametarName=URLVariable[i].split("=");
        if (sParametarName[0]===paramName){
            
            let decodedParam=decodeURIComponent( sParametarName[1].replace(/\+/g, '%20') );
            return decodedParam;
        }
    }
    return undefined;
}

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    document.getElementById("Komentari").style.display = "none";
    //document.getElementById("Proizvodi").style.display="none";
    //document.getElementById("Lokacija").style.display="none";
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (cityName==="Proizvodi"){
        //readProducts();d
    }
    document.getElementById(cityName).style.display = "grid";
    evt.currentTarget.className += " active";
    window.scroll(0,400);
}