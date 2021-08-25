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
                
							
			} else if(userType==="buyer"){
				//add for buyer
			} else if(userType==="manager"){
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
			} else if(userType==="deliverer"){
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
