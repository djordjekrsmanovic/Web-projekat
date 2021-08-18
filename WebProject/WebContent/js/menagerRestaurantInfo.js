/**
 * 
 */
 
 
$(document).ready(function(){

	$("#editArticleButton").submit(function(event){
	event.preventDefault();
	window.location.href='/WebProject/managerEditArticle.html';
	});
	
	$.ajax({
		url:"rest/manager/restaurant",
		type:"GET",
		contentType:"application/json",
		success: function(restaurant, response){
			console.log(response.responseText);
			$("restaurantName").append(restaurant.name);
			//if(restaurant!=null){
			//for(let article of restaurant.products){
			//$("articles").append('<div class="card"><div class="fishes"><img src="pictures/slika1.jpg"></div>');
            //$("articles").append('<div style="overflow: hidden;"><p class="restaurant-title">'article'</p><p class="raiting-value">4.5</p></div>');
            //$("articles").append('<div><p class="restaurant-status">Sastojci:</p><p>Svinjeće meso, sir, tragovi soje...</p></div>');
            //$("articles").append('<div><button id="editArticleButton" class="details-button">Izmjeni artikal</button></div>');	
			//}			
			//}
		},	
	
	});
});


