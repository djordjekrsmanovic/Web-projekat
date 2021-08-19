/**
 * 
 */
 
 
$(document).ready(function(){

	$("#editArticleButton").click(function(event){
	event.preventDefault();
	var articleName = $("#articleName").text();
	
	$.post({
		url:'rest/manager/productName',
		contentType:'application/json',
		data: JSON.stringify({productName:articleName}),		
		success: function(){
			window.location.href='/WebProject/managerEditArticle.html';
		},
	})

	});
	
	$.get({
		url:"rest/manager/restaurant",
		type:"GET",
		dataType:"json",
		success: function(restaurant, response){
			$("#restaurantName").append(restaurant.name);
			var products = restaurant.products;
			let numOfElements = products.lenght;
			let i;
			for(i=0; i<numOfElements; i++){
			$("#articles").append('<div class="card"><div class="fishes"><img src="pictures/slika1.jpg"></div>');
            $("#articles").append('<div style="overflow: hidden;"><p class="restaurant-title">'+products[i]+'</p><p class="raiting-value">4.5</p></div>');
            $("#articles").append('<div><p class="restaurant-status">Sastojci:</p><p>Svinjeće meso, sir, tragovi soje...</p></div>');
            $("#articles").append('<div><button id="editArticleButton" class="details-button">Izmjeni artikal</button></div>');
			}
		},	
	
	});
});


