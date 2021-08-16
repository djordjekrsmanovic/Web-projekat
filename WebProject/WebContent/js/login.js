/**
 * 
 */
 

$(document).ready(function(){
	$("#login").submit(function(event){
	
		var usernam=$("input[name=username]").val();
		var passwo=$("input[name=pass]").val();
		var user={username: usernam, password: passwo, firstName: "", lastName: "",
		gender: "male",birthDate: "1999-01-21", deleted: false, banned: false};
		var jsonUser = JSON.stringify(user);
		
		$.ajax({
			url:"rest/login/loginTry",
			type: "POST",
			data:jsonUser,
			contentType:"application/json",
			dataType:"json",
			complete: function(response){		
			changeWindowAfterLog();
          	if (document.getElementById("errorMessage").innerHTML == "") {
            $("#errorMessage").append(
              '<td colspan="2" class="error-message"><div>Unijeli ste pogrešno korisničko ime ili šifru.</div></td>'
            );
            }       
			},
		});
		event.preventDefault();
	});	
});

function changeWindowAfterLog(){				
			window.location.href='/WebProject/home.html';
						}	

$(document).ready(function(event){
	$("#dugme_registracija").submit(function(event){
		
		$.ajax({
			url:"rest/login/registracija",
			type: "GET",
			data:"",
			contentType: "application/json",
    		dataType: "json",
			complete: function(data,status){
			console.log(data.responseText);			
			},
		});
		event.preventDefault();
	});	
});

