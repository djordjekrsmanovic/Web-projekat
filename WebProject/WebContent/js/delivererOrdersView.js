/**
 * 
 */

defaultOrders=[];
loadedOrders=[];
searchResults=[];

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
	})
	 
	  $('#searchButton').click(function(){
        searchOrders();
        fillTable(searchResults);
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
	 	td4.append(orders[i].buyerID);
	 	td5.append(getOrderStatus(orders[i]));
	 	if(getOrderStatus(orders[i])==="Ceka dostavljaca"){
	 	    let button = $("<button></button>", {id:"changeStatusButton"});
	 	    button.append("Zatrazi dostavu");
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
 	var filterType = $("#RestaurantTypeFilter").val();
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
 
 