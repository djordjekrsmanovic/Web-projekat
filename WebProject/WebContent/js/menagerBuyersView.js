/**
 * 
 */
 
 $(document).ready(function(){
 
	 $.get({
	 	url:"rest/manager/getBuyers",
	 	dataType:"json",
	 	success: function(buyers){
	 		var table = $("#buyersTable");
	 		fillTable(table,buyers);
	 		
	 	}, 
	 })  
 
 });
 
 
 function fillTable(table, buyers){
 	var lenght = buyers.length;
 	
 	let i;
 	for(i=0; i<lenght; i++){
	 	let tr = $("<tr></tr>");
	 	let td1 = $("<td></td>");
	 	let td2 = $("<td></td>");
	 	let td3 = $("<td></td>");
	 	let td4 = $("<td></td>");
	 	let td5 = $("<td></td>");
 		td1.append(buyers[i].firstName);
 		td2.append(buyers[i].lastName);
 		td3.append(buyers[i].username);
 		td4.append(buyers[i].points);
 		if(buyers[i].buyerType.buyerRank=="GOLD"){
 		td5.append("Zlatni");
 		} 
 		else if(buyers[i].buyerType.buyerRank=="SILVER"){
 		td5.append("Srebrni");
 		} else {
 		td5.append("Bronzani");
 		}
 		tr.append(td1);
 		tr.append(td2);
 		tr.append(td3);
 		tr.append(td4);
 		tr.append(td5);
 		table.append(tr);
 	}
 	
 }