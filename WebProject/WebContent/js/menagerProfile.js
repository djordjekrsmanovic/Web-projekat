/**
 * 
 */
 
 function fillProfileData(user) {
    $("#managerUserame").val(user.username);
    $("#managerName").val(user.name);
    $("#managerSurname").val(user.surname);
    $("#managerSex").val(getSexSelectionString(user.sex));  
    $("#oldPassword").val(user.password);
    $("#datum").val(user.birthDate);
}
 
  $(document).ready(function(){
 	$.get({
 		url:"rest/login/menagerProfile",
		dataType:"json",
 		success: function(response){
 			fillProfileData(response);
 		},
 	});	
 	event.preventDefault();
 });