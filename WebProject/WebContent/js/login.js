/**
 * 
 */
var user = new User();
user.username=$("input#username");
user.password=$("input#pass");
user.firstName="";
user.lastName="";
user.gender=0;
user.birthDate=null;
user.banned=false;
user.deleted=false;
$(document).ready(function(){
	$("button#dugme_prijava").click(function(){
		$.post(
			url:'rest/login/loginTry',
			contentType:'application/json',
			data : user,
			success:function(returnedUser){
			if(returnedUser===null){
				allert("Unijeto pogrjesno korisnicko ime ili sifra");
			} else {
				allert("Logovanje uspjesno!");
			}
			},
			error:function(data){
				allert("Doslo je do greske!");
			})
	});
});