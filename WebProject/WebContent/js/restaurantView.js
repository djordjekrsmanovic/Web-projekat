
var loadedProducts=[];
var loadedComments=[];
var loggedUser;
var restaurantName;
var restaurant;
var mapCreated=false;
$(document).ready(function(){
  
    restaurantName=getUrlParameters("name");
    if (restaurantName===undefined || restaurantName===""){
        alert("Restoran ne postoji");
        // window.location.replace("http://localhost:8080/WebProject/home.html");
    }else{
        console.log("Restoran postoji i njegovo ime je "+ restaurantName);
    }
    var urlAddress='rest/restaurant/get-restaurant/'+restaurantName;
    $.get({
        url:urlAddress,
        contentType:'application/json',
        success:function(data){
            restaurant=data;
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

    var commentsUrlAddress='rest/comments/get-restaurant-comments/'+restaurantName;
    $.get({
        url:commentsUrlAddress,
        contentType:'application/json',
        success:function(comments){
            for (comment of comments){
                loadedComments.push(comment);
                console.log('ucitani su komentari');
                formComments(comment);
            }
        }
    })

    $.get({
        url:'rest/login/get-loged-user',
        contentType:'application/json',
        success:function(user){
            loggedUser=user;
            if (loggedUser==null || loggedUser==undefined){
                return;
            }
            if(loggedUser.role==="ADMIN"){
                /*	<li><a href="home.html">Početna strana</a></li>
                     <li><a href="adminRestaurantsView.html">Restorani</a></li>
                    <li><a href="adminBuyersView.html">Kupci</a></li>
                    <li><a href="adminUsersView.html">Korisnici</a></li>
                    <li><a href="adminAddRestaurant.html">Dodaj restoran</a></li>
                    <li><a href="adminAddUser.html">Dodaj korisnika</a></li>
                    <li><a href="adminProfile.html">Profil</a></li>*/
                $('#loginMenu').hide();
                $('#registrationMenu').hide();
                let homeLi=$('<li></li>').append('<a href="home.html">Početna strana </a>');
                let restaurantViewLi=$('<li></li>').append('<a href="adminRestaurantsView.html">Restorani</a>');
                let buyersViewLi=$('<li></li>').append('<a href="adminBuyersView.html">Kupci</a>');
                let usersViewLi=$('<li></li>').append('<a href="adminUsersView.html">Korisnici</a>');
                let addRestaurantLi=$('<li></li>').append('<a href="adminAddRestaurant.html">Dodaj restoran</a>');
                let addUserLi=$('<li></li>').append('<a href="adminAddUser.html">Dodaj korisnika</a>');
                let profileView=$('<li></li>').append('<a href="adminProfileView.html">Profil</a>');
                let logout=$('<a id="logout" href="">Odjava</a>');
                logout.click(function(){
                   
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
                let logOut=$('<li></li>').append(logout);
                $('#ul-menu').append(homeLi,restaurantViewLi,buyersViewLi,usersViewLi,addRestaurantLi,addUserLi,profileView,logOut);
                
                            
            } else if(loggedUser.role==="BUYER"){
                $('#loginMenu').hide();
                $('#registrationMenu').hide();
                    /*<li><a href="home.html">Početna strana</a></li>
                    <li><a href="buyerCart.html">Korpa</a></li>
                    <li><a href="buyerOrders.html">Porudžbine</a></li>
		            <li><a href="buyerProfile.html">Profil</a></li>*/
                let homeLi=$('<li></li>').append('<a href="home.html">Početna strana </a>');
                let restaurantViewLi=$('<li></li>').append('<a href="buyerCart.html">Korpa</a>');
                let buyersViewLi=$('<li></li>').append('<a href="buyerOrders.html">Porudžbine</a>');
                let usersViewLi=$('<li></li>').append('<a href="buyerProfileView.html">Profil</a>');
                
                let logout=$('<a id="logout" href="">Odjava</a>');
                logout.click(function(){
                   
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
                let logOut=$('<li></li>').append(logout);
                $('#ul-menu').append(homeLi,restaurantViewLi,buyersViewLi,usersViewLi,logOut);
            } else if(loggedUser.role==="MANAGER"){
                $('#loginMenu').hide();
                $('#registrationMenu').hide();
                let homeLi=$('<li></li>').append('<a href="home.html">Početna strana </a>');
                let restaurantViewLi=$('<li></li>').append('<a href="managerCommentsView.html">Pregled komentara</a>');
                let buyersViewLi=$('<li></li>').append('<a href="menagerBuyersView.html">Pregled kupaca</a>');
                let usersViewLi=$('<li></li>').append('<a href="menagerRestaurantInfo.html">Pregled restorana</a>');
                let addRestaurantLi=$('<li></li>').append('<a href="menagerOrdersView.html">Pregled narudžbina</a>');
                let profileView=$('<li></li>').append('<a href="menagerProfile.html">Profil</a>');
                let logout=$('<a id="logout" href="">Odjava</a>');
                logout.click(function(){
                   
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
                let logOut=$('<li></li>').append(logout);
                $('#ul-menu').append(homeLi,restaurantViewLi,buyersViewLi,usersViewLi,addRestaurantLi,profileView,logOut);
            } else if(loggedUser.role==="DELIVERER"){
                $('#loginMenu').hide();
                $('#registrationMenu').hide();
                let homeLi=$('<li></li>').append('<a href="home.html">Početna strana </a>');
                let restaurantViewLi=$('<li></li>').append('<a href="delivererOrdersView.html">Pregled porudžbina</a>');
                let buyersViewLi=$('<li></li>').append('<a href="delivererOrdersView.html">Moje porudžbine</a>');
                let profileView=$('<li></li>').append('<a href="delivererProfile.html">Profil</a>');
                let logout=$('<a id="logout" href="">Odjava</a>');
                logout.click(function(){
                   
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
                let logOut=$('<li></li>').append(logout);
                $('#ul-menu').append(homeLi,restaurantViewLi,buyersViewLi,profileView,logOut);
            } else {
                
            }
        },
        error:function(data){
            alert('Greska prilikom ucitavanja prijavljenog korisnika');
        }
    })

    
    
    
    
    
});


function formComments(comment){
    /*<tr>
                  <td>
                      <div>
                          <img class="user-picture" src="pictures/maleUser.png">
                      </div>
                      <span>
                          Marko Maric
                      </span>
                      
                  </td>
                  <td > <p class="comment-text">Neki komentar Neki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentarNeki komentar</p> </td></td>
                  <td>
  
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                  </td>
              </tr> */
              
    console.log('Formiram komentar');
    
    let tableRow=$('<tr></tr>');
    let image=$('<img />',{
        class:'user-picture',
        src:'pictures/maleUser.png'
    });
    let userName=$('<span></span>',{
        text:comment.buyer.firstName+' '+comment.buyer.lastName});

    let userTD=$('<td> </td>').append(image,userName);

    let commentTd=$('<td></td>');
    let commentText=$('<p></p>',{
        text:comment.comment,
        class:'comment-text'
    })

    commentTd.append(commentText);

    let raitingTd=$('<td></td>');
    
    for (let i=0;i<5;i++){
        raitingTd.append($('<span></span>',{
            class:'fa fa-star'
        }));
    }

    stars=raitingTd.children();
    for (let i=0;i<comment.rate;i++){
        stars[i].classList.add('checked');
    }

    tableRow.append(userTD,commentTd,raitingTd);
    $('.tbl-content').append(tableRow);

}

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
    let image=$('<img />',{
        src:product.photoPath,
        class:'product-picture'
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
    let inputParagraph=$('<p></p>').css('margin-bottom','25px','margin-top','25px').append('<input type="number" id='+product.name+'>');
    let buttonAdd=document.createElement('button');
    buttonAdd.innerHTML="Dodaj u korpu";
    buttonAdd.addEventListener('click',createHandler(product));
    cardDiv.append(image).append(productTitle).append(productPrice).append(productDescription).append(productAmount,inputParagraph,buttonAdd);
    $('#Proizvodi').append(cardDiv);
}

function createHandler(product){
    return function(){
        let value=$("#"+product.name).val();
        if (loggedUser==null || loggedUser==undefined || loggedUser.role!='BUYER'){
            alert('Potrebno je da se prijavite kao kupac');
            return;
        }
        var details={productID:product.name,restaurantID:restaurantName,BuyerUsername:loggedUser.username,amount:value}
        $.post({
            url:'rest/buying/add-product-to-cart',
            contentType:'application/json',
            data:JSON.stringify(details),
            success:function(){
                alert('Proizvod je dodat u korpu');
                $("#"+product.name).val('');
            },
            error:function(){
                alert('Greska prilikom dodavanja proizvoda u korpu');
            }
        })
        
    }
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
    $('#map').hide();
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
    if (cityName==="Lokacija"){
        if(mapCreated==false){
            myMap();
        }
        mapCreated=true;
        $('#map').show();
    }
    $('#'+cityName).show();
    evt.currentTarget.className += " active";
    window.scroll(0,400);
}

function myMap() {
    console.log('Kreiram mapu');
	let restaurantLocation=restaurant.location.address.street+" "+restaurant.location.address.streetNumber+" "+restaurant.location.address.city;
	geocode(restaurantLocation);
}




	  function geocode(location){
	axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
		params:{
			address:location,
			key: 'AIzaSyCi7oxKC-tCLJBXACu020XT0PbBvfJS1pE'
		}
	})
	.then(function(response){
		console.log(response);
		var lat = response.data.results[0].geometry.location.lat;
		var lng = response.data.results[0].geometry.location.lng;
		drawMap(lat,lng);
		})
	
	.catch(function(error){
        console.log(error);
	})
}
function drawMap(lat,lng){
var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([lng,lat]),
          zoom: 18
        })
      });
	   var layer = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([lng,lat]))
             })
         ]
     })
 });
 map.addLayer(layer);
}
  
 