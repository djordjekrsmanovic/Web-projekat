/**
 * 
 */
 loadedOrders = [];
 defaultOrders=[];
 
 $(document).ready(function(){
 
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

 	$.get({
 		url:"rest/manager/getOrders",
 		dataType:"json",
 		success: function(orders){
 		for(order of orders){
 			loadedOrders.push(order);
 			defaultOrders.push(order);
 			$("#restaurantName").append(order.restaurant.name);
 		}		 
 		 fillTable(orders);
 		},
 		error: function(response){
 			alert("Interna server greska");
 		}
 	
 	})
 	
 	$("#SortType").change(function(){
        sortOrders(loadedOrders);
        fillTable(loadedOrders);
    })
    
    $("#OrderStatusFilter").change(function(){
        filterOrdersByStatus();
        fillTable(loadedOrders);
    })

    $('#searchButton').click(function(){
        searchOrders();
    })
    
   
 
 });
 
 function fillTable(orders){
 	var table = $("#tableBody");
 	var duzina = orders.length;
 	let i;
 	for(i=0; i<duzina;i++){
 		let tr = $("<tr></tr>");
 		tr.attr("id",orders[i].id);
	 	let td1 = $("<td></td>");
	 	let td2 = $("<td></td>");
	 	let td3 = $("<td></td>");
	 	let td4 = $("<td></td>");
	 	let td5 = $("<td></td>");
	 	let td6 = $("<td></td>");
	 	td1.append(orders[i].id);
	 	td2.append(orders[i].dateAndTime);
	 	td3.append(orders[i].price);
	 	td4.append(orders[i].buyerID);
	 	td5.append(getOrderStatus(orders[i]));
	 	if(getOrderStatus(orders[i])==="U pripremi"){
	 	    let button = $("<button></button>", {id:"changeStatusButton"});
	 	    button.append("Zavrsi pripremu");
	 		td6.append(button);
	 		td6.click(function(){
	 			i--;
	 			changeStatus(orders[i]);
	 			i++;
	 		})
	 	} else {td6.append("Nedostupno");}
	 	
	 	tr.append(td1);
 		tr.append(td2);
 		tr.append(td3);
 		tr.append(td4);
 		tr.append(td5);
 		tr.append(td6);
 		table.append(tr);
 	}
 
 }
 
 
 function getOrderStatus(order){
 	if(order.status==="OBRADA"){return "Obrada";}
 	else if(order.status==="U_PRIPREMI"){return "U pripremi";}
 	else if(order.status==="CEKA_DOSTAVLJACA"){return "Ceka dostavljaca";}
 	else if(order.status==="U_TRANSPORTU"){return "U transportu";}
 	else if(order.status==="DOSTAVLJENA"){return "Dostavljena";}
 	else { return "Otkazana";}
 }
 
 function searchOrders(){
 	$("#tableBody").empty();
	 let name = $("#name").val().toLowerCase();
	 let priceFrom =$("#priceFrom").val();
	 let priceTo = $("#priceTo").val();
	 let dateFrom = $("#dateFrom").val();
	 let dateTo = $("#dateTo").val();

 	 loadedOrders.length=0;
     loadedOrders=JSON.parse(JSON.stringify(defaultOrders));

 	 if(name===""||priceFrom==="" || priceTo==="" || dateFrom==="" ||dateTo==="")
	 {
	 	alert("Popunite sve kriterijume pretrage");
	 	return;
	 }
	 let i;
	 let duzina = loadedOrders.length;
	 
	 for(i=0;i<duzina;i++){
	 	if(!defaultOrders[i].restaurant.name.toLowerCase().includes(name) && !defaultOrders[i].price<priceTo && !defaultOrders[i].price>priceFrom)
	 	{
	 	if(!defaultOrders[i].date<dateTo && !defaultOrders[i].date>dateFrom){
	 		loadedOrders.splice(i,1);
			i--;
	 		}
	 	}
	 }
	fillTable(loadedOrders);	 	 
 }
 
  function filterOrdersByStatus(){
 	$("#tableBody").empty();
 	loadedOrders=[];
 	var filterStatus = $("#OrderStatusFilter").val();
 	let i;
 	let duzina = defaultOrders.length;
 	if(filterStatus!=""){
 	for(i=0; i<duzina;i++){
 		if(defaultOrders[i].status===filterStatus){
 			loadedOrders.push(defaultOrders[i]);
 		} else if(filterStatus==="AllOrders"){
 			loadedOrders=defaultOrders;
 		}
 	}
 	}
 }
 
  function sortOrders(){
 	$("#tableBody").empty();
 	var sortType = $("#SortType").val();
 	
 	if(sortType==null){
 		return;
 	}
 	if(sortType==="price-ascending"){
 		priceAscSort();
 	}else if(sortType==="price-descending"){
 		priceDescSort();
 	}else if(sortType==="date-ascending"){
 		dateAscSort();
 	}else if(sortType==="date-descending"){
 		dateDescSort();
 	}else { loadedOrders=defaultOrders;}
 	
 }
 
 function priceAscSort(){
 	loadedOrders.sort(function(a,b){return a.price-b.price;});
 }
 function priceDesscSort(){
 	loadedOrders.sort(function(a,b){return b.price-a.price;});
 }
 function dateAscSort(){
 	loadedOrders.sort(function(a,b){return a.date-b.date});
 }
 function dateDescSort(){
 	loadedOrders.sort(function(a,b){return b.date-a.date});
 }
 
 function changeStatus(orderS){
 	$.post({
 	url:"rest/manager/changeOrderStatus",
 	contentType:"application/json",
 	data:JSON.stringify(orderS),
 	success: function(order){
 		var row = document.getElementById(order.id);
 		var tds=row.children;
 		tds[5].innerHTML="";
 		tds[5].append("Nedostupno");
 	},
 	
 	})
 
 
 }
 