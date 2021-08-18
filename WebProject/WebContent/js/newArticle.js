/**
 * 
 */

$(document).ready(function(){
	$("#dodaj").submit(function(event){
		var id = 10001;
		id++; //da uveca id svaki put kad se dodaje novi artikal
		var price=$("input[name=price]").val();
		var articleName = $("input[name=ArticleName]").val();
		var articleType = $("input[name=ArticleType]").val();
		var amoun = $("input[name=Amount]").val();
		var descriptio = $("input[name=Description]").val();
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
});