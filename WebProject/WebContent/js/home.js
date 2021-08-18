loadedRestaurants=[];
$(document).ready(function(){
	
	$.get({
		url:'rest/restaurant/load-restaurants',
		contentType:'application/json',
		success:function(restaurants){
			
			for(restaurant of restaurants){
				loadedRestaurants.push(restaurant);
                formRestaurantCard(restaurant);
			}
		},
		error:function(data){
				allert("greska");
		}
	});
	
	$.get({
		url:'rest/login/loggedUser',
		dataType:'text',
		success: function(userType){
			if(userType==="admin"){
				$('#prijavaMenu').hide();
				$('#pregled').append('Pregled korisnika');
				$('#pregled').attr('href','allUsersAdminView.html');
				$('#profile').attr('href','adminProfile.html');				
			} else if(userType==="buyer"){
				$('#prijavaMenu').hide();
				$('#pregled').append('Pregled porudzbina');
				$('#pregled').attr('href','');
				$('#profile').attr('href','buyerProfile.html');
			} else if(userType==="manager"){
				$('#prijavaMenu').hide();
				$('#pregled').append('Pregled Restorana');
				$('#pregled').attr('href','menagerRestaurantInfo.html');
				$('#profile').attr('href','menagerProfile.html');
			} else if(userType==="deliverer"){
				$('#prijavaMenu').hide();
				$('#pregled').append('Pregled porudzbina');
				$('#pregled').attr('href','');
				$('#profile').attr('href','delivererProfile.html');
			} else {
				$('#logoutMenu').hide();
				$('#profileMenu').hide();
				$('#pregledMenu').hide();
			}
		},
		
	})
	
	
})

function detailsClick(restaurant){
    alert("Kliknuto na restoran sa imenon "+ restaurant.name);
}
function formRestaurantCard(restaurant){
    let Card=$('<div></div>',{
        class:"card"
    })
    let imageDiv="<div id='imageDiv'class='fishes'></div>";
    let image=$('<img/>',{
        src:restaurant.picturePath
    }).append(imageDiv);
    let titleAndRatingDiv=$('<div style="overflow:hidden"></div>');
    let restaurantTitle=$('<p></p>',{
        class:"restaurant-title",
        text:restaurant.name
    });
    let raitingValue=$('<p></p>',{
        class:"raiting-value",
        text:'5'
    });

    let StatusAndTypeDiv=$('<div></div>');
    let RestaurantStatus=$('<p></p>',{
        class:"restaurant-status",
        text:restaurant.restaurantStatus
    });
    let RestaurantType=$('<p></p>',{
        text:restaurant.restaurantType
    })

    let locationDiv=$('<div></div>');
    let locationImage=$('<img/>',{
        src:"pictures/lokacija-removebg-preview.png",
        css:{
            "width":"30px",
            "height":"30px",
            "margin": "15px"
        }
        
    })
    let locationValue=$('<p></p>',{
        text:restaurant.location.address.street+" "+restaurant.location.address.streetNumber+" "+restaurant.location.address.city
    })

    function hasClass(elem, className) {
        return elem.classList.contains(className);
    }

    
    let buttonDiv=document.createElement('div');
    let detailsButton=document.createElement('button');
    detailsButton.innerHTML="Detalji";
    detailsButton.className+='details-button';
    detailsButton.addEventListener('click',createHandler(restaurant));
    buttonDiv.append(detailsButton);
    locationDiv.append(locationImage,locationValue);
    StatusAndTypeDiv.append(RestaurantStatus,RestaurantType);
    titleAndRatingDiv.append(restaurantTitle,raitingValue);
    Card.append(imageDiv).append(titleAndRatingDiv).append(StatusAndTypeDiv).append(locationDiv).append(detailsButton);
    $('#restaurants-list').append(
      Card
    )};

    function createHandler(restaurant){
        return function(){
           window.location.href = "http://localhost:8080/WebProject/RestaurantView.html?name="+restaurant.name;
           console.log(restaurant.name);
        }
    }
    /*$("#restaurants-list").append('<div class="card">\
        
        <div class="fishes">\
            <img src="../pictures/slika1.jpg">\
        </div>\
        <div style="overflow: hidden;">\
            <p class="restaurant-title">restaurant.name</p>\
            <p class="raiting-value">4.5</p>\
        </div>\
        <div>\
            <p class="restaurant-status">restaurant.restaurantType</p>\
            <p >restaurant.restaurantType</p>\
        </div>\
        <div>\
            <img src="../pictures/lokacija-removebg-preview.png" width="30px" height="30px" style="margin: 15px;">\
            <p >Alekse Šantića 4 Novi Sad</p>\
        </div>\
        <div>\
            <button class="details-button">Detalji</button>\
        </div>\
    </div>')*/
