/**
 * 
 */
 
 $(document).ready(function(){
 	$.get({
 	url:"rest/manager/productData",
 	dataType:"json",
 	success: function(response){
 		populateArticleData(response);
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
 
 
 });
 
 function populateArticleData(article){
 	$("#ArticleName").val(article.name);
 	$("#Price").val(article.price);
 	if(article.type=="food"){
 	$("#ArticleType").val("food");
 	} else {$("#ArticleType").val("drink");} 
 	$("#Amount").val(article.amount);
 	$("#Description").val(article.description);
 }