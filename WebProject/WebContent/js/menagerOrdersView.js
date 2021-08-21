/**
 * 
 */
 loadedOrders = [];
 defaultOrders=[];
 searchResults=[];
 
 $(document).ready(function(){
 	$.get({
 		url:"rest/manager/getOrders",
 		dataType:"json",
 		success: function(orders){
 		for(order of orders){
 			loadedOrders.push(order);
 			defaultOrders.push(order);
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

    $("#RestaurantTypeFilter").change(function(){
        filterOrders();
        fillTable(loadedOrders);
    })
    
    $("#OrderStatusFilter").change(function(){
        filterOrders();
        fillTable(loadedOrders);
    })

    $('#searchButton').click(function(){
        searchOrders();
        fillTable(loadedOrders);
    })
 
 });
 
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
	 	td2.append(orders[i].dateAndTime);
	 	td3.append(orders[i].price);
	 	td4.append(orders[i].buyerID);
	 	td5.append(getOrderStatus(orders[i]));
	 	if(getOrderStatus(orders[i])==="U pripremi"){
	 	    let button = $("<button></button>", {id:"changeStatusButton"});
	 	    button.append("Zavrsi pripremu");
	 		td6.append(button);
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
 
 	if(name===""||priceFrom==="" || priceTo==="" || dateFrom==="" ||dateTo==="")
	 {
	 	alert("Popunite sve kriterijume pretrage");
	 	return;
	 }
	 let i;
	 let duzina = loadedOrders.length;
	 
	 for(i=0;i<duzina;i++){
	 	if(loadedOrders[i].name.toLowerCase().includes(name) && loadedOrders[i].price<priceTo &&loadedOrders[i].price>priceFrom)
	 	{
	 		searchResults.push(loadedOrders[i]);
	 	}
	 }
	 
	 
 }
 
  function filterOrders(){
 $("#tableBody").empty();
 
 
 }
 
  function sortOrders(){
 $("#tableBody").empty();
 
 
 }
 