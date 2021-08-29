/**
 * 
 */
 var product;
 var fileInput;

 function collectData(){
 	product.name=$("#ArticleName").val();
 	product.price=$("#Price").val();
 	if($("#ArticleType").val()==="FOOD"){
 	product.type="FOOD";
 	} else {product.type="DRINK";}
 	product.amount=$("#Amount").val();
 	product.description=$("#Description").val();
	product.photoPath=$("#photo").val();
	product.photoPath = product.photoPath.substring(product.photoPath.lastIndexOf("\\") + 1, product.photoPath.length); 	
	product.binaryPhoto=fileInput;
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
 
	$("#photo").change(function(){
		var file = $("#photo")[0].files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
		fileInput = e.target.result;
		};
		reader.onerror = function(e) {
		console.log('Error : ' + e.type);
		};
		
	})
 
 });
 
 function populateArticleData(article){
 	$("#ArticleName").val(article.name);
 	$("#Price").val(article.price);
 	if(article.type=="FOOD"){
 	$("#ArticleType").val("FOOD");
 	} else {$("#ArticleType").val("DRINK");} 
 	$("#Amount").val(article.amount);
 	$("#Description").val(article.description);
 }
 
 