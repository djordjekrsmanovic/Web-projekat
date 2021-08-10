loadedRestaurants=[];
$(document).ready(function(){
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
            text:restaurant.location.address.street
        })

        function hasClass(elem, className) {
            return elem.classList.contains(className);
        }
        let detailsButton="<div> <button class='details-button'id="+restaurant.name+">Detalji</button> </div>";
        document.addEventListener('click', function (e) {
            if (hasClass(e.target, 'details-button')) {
                alert(e.target.id);
                window.location.href = "http://localhost:8080/WebProject/RestaurantView.html?name="+e.target.id;
            
            } else if (hasClass(e.target, 'test')) {
                // .test clicked
                // Do your other thing
            }
        }, false);
        locationDiv.append(locationImage,locationValue);
        StatusAndTypeDiv.append(RestaurantStatus,RestaurantType);
        titleAndRatingDiv.append(restaurantTitle,raitingValue);
        Card.append(imageDiv).append(titleAndRatingDiv).append(StatusAndTypeDiv).append(locationDiv).append(detailsButton);
        $('#restaurants-list').append(
          Card
        )};
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
	})
	
	
})