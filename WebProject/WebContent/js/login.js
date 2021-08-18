/**
 * 
 */
 

$(document).ready(function(){
	$("#login").submit(function(event){
	
		var usernam=$("input[name=username]").val();
		var passwo=$("input[name=pass]").val();
		
		if(!usernam){
            $("input[name='username']").css("border-bottom", "2px solid red")
        } 
        
        if(!passwo){
            $("input[name='password']").css("border-bottom", "2px solid red")
        }
        
		var user={username: usernam, password: passwo, firstName: "", lastName: "",
		gender: "male",birthDate: "1999-01-21", deleted: false, banned: false};
		var jsonUser = JSON.stringify(user);
		
		$.post({
			url:"rest/login/loginTry",
			contentType:"application/json",
			data:jsonUser,			
			success: function(response){	
			if(response=="s"){
			changeWindowAfterLog();
			} else {
			if (document.getElementById("errorMessage").innerHTML == "") {
            $("#errorMessage").append(
              '<td colspan="2" class="error-message"><div>Unijeli ste pogrešno korisničko ime ili šifru.</div></td>'
            );
            }
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

