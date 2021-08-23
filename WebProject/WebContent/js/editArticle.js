/**
 * 
 */
 var product;
 
 function collectData(){
 	product.name=$("#ArticleName").val();
 	product.price=$("#Price").val();
 	if($("#ArticleType").val()==="food"){
 	product.type="FOOD";
 	} else {product.type="DRINK";}
 	product.amount=$("#Amount").val();
 	product.description=$("#Description").val();
 	
 }
 
 $(document).ready(function(){
 	$.get({
 	url:"rest/manager/productData",
 	dataType:"json",
 	success: function(response){
 	product=response;
 		populateArticleData(response);
 	},
 	
 	});
 	
 	
 	$("#izmjeniButton").click(function(){
 		collectData();
 		$.post({
 			url:"rest/manager/editArticle",
 			contentType:"application/json",
 			data: JSON.stringify(product),
 			success:function(){
 				document.location.reload();
 			},
 			error: function(){
 			alert("Interna server greska");
 			}
 		})
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
 
 
 });
 
 function populateArticleData(article){
 	$("#ArticleName").val(article.name);
 	$("#Price").val(article.price);
 	if(article.type=="FOOD"){
 	$("#ArticleType").val("food");
 	} else {$("#ArticleType").val("drink");} 
 	$("#Amount").val(article.amount);
 	$("#Description").val(article.description);
 }
 
 