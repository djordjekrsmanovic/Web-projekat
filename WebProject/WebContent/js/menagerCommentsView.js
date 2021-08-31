/**
 * 
 */

$(document).ready(function(){
	
	$.get({
		url:"rest/manager/getComments",
		dataType:"json",
		success:function(comments){
			fillCommentSection(comments);
		},
		error:function(){
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
	})
	
})

function fillCommentSection(comments){
	var commSection = $("#komentari");
	let i;
	for(i=0; i<comments.length;i++){
	let dcomm=$("<div></div>");
	dcomm.attr("class","comment");
	let d1=$("<div></div>");
	let d2=$("<div></div>");
	let d3=$("<div></div>");
	let d4=$("<div></div>");
	let d5=$("<div></div>");
	d5.attr("class","dugmad");
	let d6=$("<div></div>");
	let d7=$("<div></div>");
	let h2Podaci = $("<h2>Korisnik: </h2>");
	h2Podaci.attr("id","podaci");
	h2Podaci.attr("class","userData");
	h2Podaci.append(comments[i].buyer.username);
	d1.append(h2Podaci);
	if(getStatus(comments[i].commentState)!="Odobren"){
	let button1=$("<button></button>");
	button1.append("Odobri komentar");
	button1.attr("id","dugmeOdobri");
	button1.attr("class","dugme");
	button1.click(function(){
		odobri(comments[i]);
	});
	let button2=$("<button></button>");
	button2.append("Odbij komentar");
	button2.attr("id","dugmeOdbij");
	button2.attr("class","dugme");
	button2.click(function(){
		odbij(comments[i]);
	});
	d6.append(button1); d7.append(button2);
	d5.append(d6); d5.append(d7);
	}
	let statusKom=$("<p></p>");
	statusKom.append("Status komentara: ");
	statusKom.append(getStatus(comments[i].commentState));
	d4.append(statusKom);
	let tekstKomentara = $("<p></p>");
	tekstKomentara.attr("class", "naslovZaTekst");
	tekstKomentara.append(comments[i].comment);
	d3.append(tekstKomentara);
	let h2tekst = $("<h2></h2>");
	h2tekst.append("Tekst komentara:");
	d2.append(h2tekst);
	
	dcomm.append(d1);
	dcomm.append(d2);
	dcomm.append(d3);
	dcomm.append(d4);
	dcomm.append(d5);
	
	commSection.append(dcomm);
	}
}


function getStatus(commentState){
	if(commentState==="APPROVED"){
		return "Odobren";
	} else if (commentState==="WAITING"){
		return "Na cekanju";
	} else {return "Odbijen";}
}

function odobri(comment){
	$.post({
		url:"rest/manager/odobri",
		contentType:"application/json",
		data:comment,
		success:function(){
			alert("Komentar odobren.");
			document.location.reload();
		},
		error: function(){
			alert("Interna server greska.");
		}
	})
}

function odbij(comment){
	$.post({
		url:"rest/manager/odbij",
		contentType:"application/json",
		data:comment,
		success:function(){
			alert("Komentar odbijen.");
			document.location.reload();
		},
		error: function(){
			alert("Interna server greska.");
		}
	})
}