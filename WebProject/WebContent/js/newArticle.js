/**
 * 
 */

var fileInput;

$(document).ready(function(){
	$("#dodaj").submit(function(event){
			
		var id = $("input[name=ArticleName]").val();
		var price=$("input[name=Price]").val();
		var articleName = $("input[name=ArticleName]").val();
		if($("input[name=ArticleType]").val()=="FOOD"){
		var articleType = "FOOD"} else { var articleType="DRINK";}
		var amoun = $("input[name=Amount]").val();
		var descriptio = $("input[name=Description]").val();
		var photoName = $("#photo").val();
		
		
		if(articleName==="" || articleType==="" || price==="" || photoName===""){
		alert("Ime, cijena, tip i slika moraju biti popunjeni i dodati");
		return;
		}
		
		var article = {id:id, name:articleName, price:price, type:articleType, amount:amoun, description:descriptio, photoPath:photoName, binaryPhoto: fileInput};
		var jsonArticle= JSON.stringify(article);
		$.post({
			url:"rest/manager/newArticle",	
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
	
	$("#photo").change(function(){
		var file = $("#photo")[0].files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
		fileInput = reader.result;
		};
		reader.onerror = function(e) {
		console.log('Error : ' + e.type);
		};
		
	})
});