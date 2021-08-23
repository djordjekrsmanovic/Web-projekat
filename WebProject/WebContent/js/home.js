loadedRestaurants=[];
recomendedView=[];
$(document).ready(function(){
	
	$.get({
		url:'rest/restaurant/load-restaurants',
		contentType:'application/json',
		success:function(restaurants){
			
			for(restaurant of restaurants){
				loadedRestaurants.push(restaurant);
                recomendedView.push(restaurant);
                formRestaurantCard(restaurant);
			}
		},
		error:function(data){
				alert("greska");
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
				$('#pregledKomentara').append('Pregled Komentara');
				$('#pregledKomentara').attr('href','managerCommentsView.html');
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
	
	$("#logoutButton").click(function(){
		if(window.confirm("Da li zaista zelite da se odjavite?")){
			$.get({
			url:'rest/login/logout',
			dataType:'text',
			success: function(response){
			alert(response);
			document.location.reload();
			},
			})
		} else {
			return;
		}	
	})

    $(".search-button").click(function(){
        $('#restaurants-list').empty();
        searchRestaurant();
        sortRestaurants();
        showAfterSort();
    })

    $('#SortType').change(function(){
        $('#restaurants-list').empty();
        sortRestaurants();
        showAfterSort();
    })

    

    $("#opened").change(function(){
        $('#restaurants-list').empty();
        sortRestaurants();
        showAfterSort();
    })
	
	
})

function searchRestaurant(){
    let name=$("#search-name").val()==null ? "" : $("#search-name").val();
    let location=$("#search-location").val()==null ? "" : $("#search-location").val();
    let type=$("#search-type").val()==null ? "" : $("#search-type").val();
    let grade=$("#search-grade").val()==null ? "" : $("#search-grade").val();
    let deleted=false;
    loadedRestaurants.length=0;
    loadedRestaurants=JSON.parse(JSON.stringify(recomendedView));
    for (let i=0;i<loadedRestaurants.length;i++){
        deleted=false;
        let restaurantLocation=loadedRestaurants[i].location.address.street+" "+loadedRestaurants[i].location.address.streetNumber+" "+loadedRestaurants[i].location.address.city
        console.log(!loadedRestaurants[i].name.includes(name),!restaurantLocation.includes(location),!loadedRestaurants[i].restaurantType.includes(type));
        if (!loadedRestaurants[i].name.toLowerCase().includes(name.toLowerCase()) || !restaurantLocation.toLowerCase().includes(location.toLowerCase()) || !loadedRestaurants[i].restaurantType.toLowerCase().includes(type.toLowerCase()) ){
            loadedRestaurants.splice(i,1);
            i--;
            deleted=true;
        }

        if (grade!="" && deleted==false){
            if ((parseFloat(grade)-1 <= parseFloat(loadedRestaurants[i].raiting) < parseFloat(grade))){
                loadedRestaurants.splice(i,1);
                i--;
            } 
        }
    }


    

}


function sortRestaurants(){
    let value=$('#SortType').val();
    
    if (value==null){
        return;
    }

    if (value==='name-ascending'){
        sortNameAscending();
    }else if(value=='name-descending'){
        sortNameDescending();
    }else if(value==='location-ascending'){
        sortLocationAscending();
    }else if(value==='location-descending'){
        sortLocationDescending();
    }else if(value==='average-grade-ascending'){
        sortGradeAscending();
    }else if (value=='average-grade-descending'){
        sortGradeDescending();
    }else if (value=='default'){
        loadedRestaurants.length=0;
        loadedRestaurants=JSON.parse(JSON.stringify(recomendedView));
    }
}

function sortNameAscending(){
    loadedRestaurants.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}

function sortNameDescending(){
    loadedRestaurants.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
    
}

function sortLocationAscending(){
    loadedRestaurants.sort((a,b) => (a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city > b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city) ? 1 : ((b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city > a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city) ? -1 : 0));

}

function sortLocationDescending(){
    loadedRestaurants.sort((a,b) => (a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city < b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city) ? 1 : ((b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city < a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city) ? -1 : 0));
    
}

function sortGradeAscending(){
    loadedRestaurants.sort((a,b) => (a.grade > b.grade) ? 1 : ((b.grade > a.grade) ? -1 : 0));
    
}

function sortGradeDescending(){
    loadedRestaurants.sort((a,b) => (a.grade < b.grade) ? 1 : ((b.grade < a.grade) ? -1 : 0));
    
}





function showAfterSort(){
    for(restaurant of loadedRestaurants){
        if (document.getElementById('opened').checked){
            if (restaurant.restaurantStatus=='CLOSED'){
                continue;
            }
        }
        formRestaurantCard(restaurant);
    }
}
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
        text:restaurant.raiting
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
