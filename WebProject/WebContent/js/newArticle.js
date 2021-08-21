/**
 * 
 */

$(document).ready(function(){
	$("#dodaj").submit(function(event){
			
		var id = 10001;
		var price=$("input[name=price]").val();
		var articleName = $("input[name=ArticleName]").val();
		if($("input[name=ArticleType]").val()=="Hrana"){
		var articleType = "FOOD"} else { var articleType="DRINK";}
		var amoun = $("input[name=Amount]").val();
		var descriptio = $("input[name=Description]").val();
		
		if(articleName==="" || articleType==="" || price===""){
		alert("Ime, cijena, tip i slika moraju biti popunjeni i dodati");
		return;
		}
		
		var article = {id:id, name:articleName, price:price, type:articleType, amount:amoun, description:descriptio, photoPath:""};
		var jsonArticle= JSON.stringify(article);
		$.post({
			url:"rest/menager/newArticle",	
			contentType:'application/json',
			data:jsonArticle,
			success: function(response){					
          	       alert("Novi artikal je napravljen i dodat!");
			},
			error:function(response){
				alert("Doslo je do greske!");
			}
		})
		event.preventDefault();
	
	})
	
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
});