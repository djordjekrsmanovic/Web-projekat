/**
 * 
 */
 
 
$(document).ready(function(){

	$("#editArticleButton").click(function(event){
	event.preventDefault();
	var articleName = $("#articleName").text();
	
	

	});
	
	$.get({
		url:"rest/manager/restaurant",
		type:"GET",
		dataType:"json",
		success: function(restaurant, response){
			$("#restaurantName").append(restaurant.name);
			var products = restaurant.products;
			let numOfElements = products.length;
			let i;
			for(i=0; i<numOfElements; i++){
			$("#articles").append('<div class="card"><div class="fishes"><img src=\"'+products[i].photoPath+'\"></div>'
			+'<div style="overflow: hidden;"><p class="restaurant-title">'+products[i].name+'</p><p class="raiting-value">Cijena artikla:'+products[i].price+' dinara</p></div>'
			+'<div><p class="restaurant-status">Sastojci:</p><p>'+products[i].description+'</p></div>'
			+'<div><button onclick="izmjenaArtikla(\''+products[i].name+'\')" class="details-button">Izmjeni artikal</button></div>');
			}
		},	
	
	});
	
	$("#logoutButton").click(function(){
		if(window.confirm("Da li zaista zelite da se odjavite?")){
			$.get({
			url:'rest/login/logout',
			success: function(response){
			window.location.href='/WebProject/home.html';
			alert(response);			
			},
			})
		} else {
			return;
		}	
	})
	
	$("#newArticleButton").click(function(){
		window.location.href='/WebProject/newArticle.html';
	})
	
	$("#buyersViewButton").click(function(){
		window.location.href='/WebProject/menagerBuyersView.html';
	})
	
	$("#ordersViewButton").click(function(){
		window.location.href='/WebProject/menagerOrdersView.html';
	})
	
});

function izmjenaArtikla(articleName){
	$.post({
		url:'rest/manager/productName',
		contentType:'application/json',
		data: JSON.stringify({id:"", name:articleName, price:100, type:"FOOD", amount:300, description:"", photoPath:""}),		
		success: function(){
			window.location.href='/WebProject/managerEditArticle.html';
		},
	})
	
}


