/**
 * 
 */

defaultOrders=[];
loadedOrders=[];

$(document).ready(function(){
	 $.get({
	 	url:"rest/deliverer/getAllOrders",
	 	dataType:"json",
	 	success: function(orders){
	 	for(order of orders){
 			loadedOrders.push(order);
 			defaultOrders.push(order);
 		}		 
 		 fillTable(orders);
	 	},
	 	error:function(){
	 		alert("Interna server greska");
	 	}
	 
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
		alert("Uspjesna odjava.");	
	})
	 
	  $('#searchButton').click(function(){
        searchOrders();
    })
    
    $("#filterStatus").change(function(){
        filterOrdersByStatus();
    })
    
    $("#filterType").change(function(){
		filterOrdersByType();
    })
    
    $("#sort").change(function(){
		sortOrders(loadedOrders);
        filterOrdersByStatus();
		filterOrdersByType();
    })

	$("#myOrdersView").click(function(){
		window.location.href='/WebProject/delivererPersonalOrders.html';
	})
	
})

 function fillTable(orders){
 	var table = $("#tableBody");
 	var duzina = orders.length;
 	let i;
 	for(i=0; i<duzina;i++){
 		let tr = $("<tr></tr>");
	 	let td1 = $("<td></td>");
	 	let td2 = $("<td></td>");
	 	let td3 = $("<td></td>");
	 	let td4 = $("<td></td>");
	 	let td5 = $("<td></td>");
	 	let td6 = $("<td></td>");
	 	td1.append(orders[i].id);
	 	let date =orders[i].dateAndTime;
	 	let formatedDate= formatDate(date);
	 	td2.append(formatedDate);
	 	td3.append(orders[i].price);
	 	td4.append(orders[i].buyerName);
	 	td5.append(getOrderStatus(orders[i]));
	 	if(getOrderStatus(orders[i])==="Ceka dostavljaca"){
	 	    let button = $("<button></button>", {id:"changeStatusButton"});
	 	    button.append("Zatrazi dostavu");
	 		td6.append(button);
			td6.attr("id",orders[i].id);
	 		td6.click(function(){
	 			i--;
	 			zatraziDostavu(td6.attr("id"));
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
 
 function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }
    
    
  function searchOrders(){
 	 $("#tableBody").empty();
	 let name = $("#name").val().toLowerCase();
	 let priceFrom =$("#priceFrom").val();
	 let priceTo = $("#priceTo").val();
	 let dateFromE = $("#dateFrom").val();
	 let dateToE = $("#dateTo").val();
	 let dateFrom = new Date(dateFromE).getTime();
	 let dateTo = new Date(dateToE).getTime();
	
 	 loadedOrders.length=0;
     loadedOrders=JSON.parse(JSON.stringify(defaultOrders));

 	 if(name===""||priceFrom==="" || priceTo==="" || dateFrom==="" ||dateTo==="")
	 {
	 	alert("Popunite sve kriterijume pretrage");
	 	return;
	 }
	 let i;
	 let duzina = defaultOrders.length;
	 
	 for(i=0;i<duzina;i++){
		if(defaultOrders[i].restaurant.name.toLowerCase().includes(name)){
	 	if(defaultOrders[i].price>priceTo || defaultOrders[i].price<priceFrom ||defaultOrders[i].dateAndTime>dateTo || defaultOrders[i].dateAndTime<dateFrom)
	 	{
	 		loadedOrders.splice(i,1);			
	 	}
	 }
	}
	fillTable(loadedOrders);	 	 
 }
 
 function filterOrdersByType(){   
 	$("#tableBody").empty();
	loadedOrders=[];
 	var filterType = $("#filterType").val();
 	let i;
 	let duzina = defaultOrders.length;
 	if(filterType!=""){
 	for(i=0; i<duzina;i++){
 		if(defaultOrders[i].restaurant.restaurantType===filterType){
 			loadedOrders.push(defaultOrders[i]);
 		} else if(filterType==="AllOrders"){
 			loadedOrders=defaultOrders;
 		}
 	}
 	}
	fillTable(loadedOrders);
 }
 
   function filterOrdersByStatus(){
 	$("#tableBody").empty();
 	loadedOrders=[];
 	var filterStatus = $("#filterStatus").val();
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
	fillTable(loadedOrders);
 }
 
 function sortOrders(){
 	$("#tableBody").empty();
 	var sortType = $("#sort").val();
 	
 	if(sortType==null){
 		return;
 	}
 	if(sortType==="name-ascending"){
 		nameAscSort();
 	}else if(sortType==="name-descending"){
 		nameDescSort();
 	}else if(sortType==="price-ascending"){
 		priceAscSort();
 	}else if(sortType==="price-descending"){
 		priceDescSort();
 	}else if(sortType==="date-ascending"){
 		dateAscSort();
 	}else if(sortType==="date-descending"){
 		dateDescSort();
 	}else { loadedOrders=defaultOrders;}
	fillTable(loadedOrders);
 	
 }
 
 function nameAscSort(){
 	return loadedOrders.sort((a,b)=> (a.name>b.name) ? 1 :(b.name>a.name) ? -1:0);
 }
 function nameDescSort(){
 	return loadedOrders.sort((a,b)=> (a.name<b.name) ? 1 :(b.name<a.name) ? -1:0);
 }
 function priceAscSort(){
 	return loadedOrders.sort(function(a,b){return a.price-b.price;});
 }
 function priceDescSort(){
 	return loadedOrders.sort(function(a,b){return b.price-a.price;});
 }
 function dateAscSort(){
 	return loadedOrders.sort(function(a,b){return a.dateAndTime-b.dateAndTime});
 }
 function dateDescSort(){
 	return loadedOrders.sort(function(a,b){return b.dateAndTime-a.dateAndTime});
 }
 
 function zatraziDostavu(orderID){
 	$.post({
 		url:'rest/deliverer/requireDeliver',
 		contentType:'application/json',
 		data: orderID,
 		success: function(response){
 			alert(response);			
 		},
 		error: function(){
 			alert("Interna server greska.");
 		}
 	
 	})
 	$("#orderID").html='';
 }
 