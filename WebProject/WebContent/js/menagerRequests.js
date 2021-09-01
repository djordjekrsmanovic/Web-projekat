/**
 * 
 */
$(document).ready(function(){
	$.get({
		url:"rest/manager/getRequests",
		dataType:"json",
		success: function(data){
			fillTable(data);
		},
		error: function(){
			alert("Interna server greska.");
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
		alert("Uspjesno ste se odjavili.");
	})
	
})

function fillTable(data){
	let tabela = $("#requestsTable");
	tabela.empty();
	let duzina = data.length;
	let i;
	for(i=0; i<duzina; i++){
		let tr = $("<tr></tr>");
		let td1 = $("<td></td>");
		let td2 = $("<td></td>");
		let td3 = $("<td></td>");
		let td4 = $("<td></td>");
		let td5 = $("<td></td>");
		td1.append(data[i].deliverer.username);
		td2.append(data[i].order.price);
		let formatedDate = formatDate(data[i].order.dateAndTime);
		td3.append(formatedDate);
		let dugme = $("<button>Odobri</button>");
		td4.attr("id",data[i].requestID);
		td4.append(dugme);
		td4.click(function(){
			odobri(td4.attr("id"));
		})
		let dugmei = $("<button>Odbij</button>");
		td5.attr("id",data[i].requestID);
		td5.append(dugmei);
		td5.click(function(){
			odbij(td5.attr("id"));
		})
		tr.append(td1,td2,td3,td4,td5);
		tabela.append(tr);
	}
	
}

function odobri(requestID){
	$.post({
		url:"rest/manager/odobriZahtjev",
		contentType:"application/json",
		data:requestID,
		success: function(){
			let td= document.getElementById(requestID);
			window.location.reload();
		},
		error: function(){
			alert("Interna server greska.");
		}
	})
}

function odbij(requestID){
	$.post({
		url:"rest/manager/odbijZahtjev",
		contentType:"application/json",
		data:requestID,
		success: function(){
			let td= document.getElementById(requestID);
			window.location.reload();
		},
		error: function(){
			alert("Interna server greska.");
		}
	})
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