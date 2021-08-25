/**
 * 
 */

defaultOrders=[];
loadedOrders=[];
searchResults=[];

$(document).ready(function(){
	$.get({
		url:"rest/deliverer/getMyOrders",
		dataType:"json",
		success: function(orders){
			for(order of orders){
 			loadedOrders.push(order);
 			defaultOrders.push(order);
 		}		 
 		 fillTable(orders);
		},
		error: function(){
			alert("Interna greska servera.");
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
	})
	
	 $('#searchButton').click(function(){
        searchOrders();
        fillTable(searchResults);
    })
    
    $("#filterStatus").change(function(){
        filterOrdersByStatus();
        fillTable(loadedOrders);
    })
    
    $("#filterType").change(function(){
        filterOrdersByType();
        fillTable(loadedOrders);
    })
    
    $("#sort").change(function(){
        sortOrders(loadedOrders);
        fillTable(loadedOrders);
    })
		
})

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
	 	let date =orders[i].dateAndTime;
	 	let formatedDate= formatDate(date);
	 	td2.append(formatedDate);
	 	td3.append(orders[i].price);
	 	td4.append(orders[i].buyerName);
	 	td5.append(getOrderStatus(orders[i]));
	 	if(getOrderStatus(orders[i])==="U transportu"){
	 	    let button = $("<button></button>", {id:"changeStatusButton"});
	 	    button.append("Zavrsi dostavu");
	 		td6.append(button);
	 		td6.click(function(){
	 			i--;
	 			dostavi(orders[i]);
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
 	 searchResults=[];
	 let name = $("#name").val().toLowerCase();
	 let priceFrom =$("#priceFrom").val();
	 let priceTo = $("#priceTo").val();
	 let dateFrom = $("#dateFrom").val();
	 let dateTo = $("#dateTo").val();
 
 	if(name===""||priceFrom==="" || priceTo==="" || dateFrom==="" ||dateTo==="")
	 {
	 	alert("Popunite sve kriterijume pretrage");
	 	return;
	 }
	 let i;
	 let duzina = loadedOrders.length;
	 
	 for(i=0;i<duzina;i++){
	 	if(loadedOrders[i].restaurant.name.toLowerCase().includes(name) && loadedOrders[i].price<priceTo &&loadedOrders[i].price>priceFrom)
	 	{
	 	if(loadedOrders[i].date<dateTo && loadedOrders[i].date>dateFrom){
	 		searchResults.push(loadedOrders[i]);
	 		}
	 	}
	 }	 	 
 }
 
 function filterOrdersByType(){
   loadedOrders=[];
 	$("#tableBody").empty();
 	var filterType = $("#filterType").val();
 	let i;
 	let duzina = defaultOrders.length;
 	if(filterType!=""){
 	for(i=0; i<duzina;i++){
 		if(defaultOrders[i].restaurant.type===filterType){
 			loadedOrders.push(defaultOrders[i]);
 		} else if(filterType==="AllRestaurants"){
 			loadedOrders=defaultOrders;
 		}
 	}
 	}
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
 	
 }
 
 function nameAscSort(){
 	loadedOrders.sort(function(a,b){return a.toLowerCase().name-b.toLowerCase().name;});
 }
 function nameDescSort(){
 	loadedOrders.sort(function(a,b){return b.toLowerCase().name-a.toLowerCase().name;});
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

function dostavi(order){
	$.post({
		url:"rest/deliverer/deliverOrder",
		contentType:"application/json",
		data: JSON.stringify(order),
		success: function(){
			alert("Dostava zavrsena.");
			$("#changeStatusButton").disable();
		},
		error: function(){
			alert("Interna server greska.");
		}
	})
}