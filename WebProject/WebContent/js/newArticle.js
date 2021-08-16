/**
 * 
 */

$(document).ready(function(){
	$("#dodaj").submit(function(event){
		var price=$("input[name=price]").val();
		var articleName = $("input[name=ArticleName]").val();
		var articleType = $("input[name=ArticleType]").val();
		var amoun = $("input[name=Amount]").val();
		var descriptio = $("input[name=Description]").val();
		var article = {id:"12345", name:articleName, price:price, type:articleType, amount:amoun, description:descriptio, photoPath:""};
		var jsonArticle= JSON.stringify(article);
		$.ajax({
			url:"rest/menager/newArticle",
			type: "POST",
			data:jsonArticle,
			contentType:"application/json",
			dataType:"json",
			complete: function(response){					
          	if (document.getElementById("errorMessage").innerHTML == "") {
            $("#errorMessage").append(
              '<td colspan="2" class="error-message"><div>Artikal vec postoji.</div></td>'
            );
            }       
			},
		});
		event.preventDefault();
	})
	
	
});