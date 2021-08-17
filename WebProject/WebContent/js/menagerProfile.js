/**
 * 
 */
 
 function fillProfileData(user) {
    $("#managerUserame").val(user.username);
    $("#managerName").val(user.name);
    $("#managerSurname").val(user.surname);
    //$("#managerSex").val(getSexSelectionString(user.sex));  
    $("#oldPassword").val(user.password);
    $("#datum").val(user.birthDate);
}
 
  $(document).ready(function(){
 	$.get({
 		url:"rest/manager/managerProfile",
		dataType:"json",
 		success: function(response){
 			var resp=response;
 			fillProfileData(resp);
 		},
 	});	
 	
 	$("#editProfile").submit(function(event){
 		let name=$('#managerName').val();
        let surname=$('#managerSurname').val();
        let date=$('#datum').val();       
        let userName=$('#managerUserame').val();
        let password=$('#newPassword').val();
        let repeatedPassword=$('#RepeatedNewPassword').val();
        let gender=$("managerSex option:selected").val();
        if (name===''||surname===''||date===''||userName==''||password==''||repeatedPassword==''||gender==''){
            $('#error').text="Sva polja trebaju biti popunjena";
            return;
        }

        if (password!=repeatedPassword){
            return;
        }

        $.post({
            url:'rest/manager/editProfile',
            contentType:'application/json',
            data:JSON.stringify({username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:date}),
            success:function(data){
                alert("Uspjesno ste izmjenili podatke svog profila");
            },
            error:function(data){
                alert("Greska prilikom registracije");
            }
        })
 	
 	event.preventDefault();
 	document.location.reload();
 	});
 });