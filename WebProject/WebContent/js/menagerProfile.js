/**
 * 
 */
 
  $(document).ready(function(){
	  
 	$.get({
 		url:"rest/manager/managerProfile",
		dataType:"json",
 		success: function(response){
 			fillProfileData(response);
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
            $("#error").append=('Sva polja trebaju biti popunjena');
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
                alert("Greska prilikom izmjene.");
            }
        })
 	
 	event.preventDefault();
 	document.location.reload();
 	});
 	
 	$("#logoutButton").click(function(){
		if(window.confirm("Da li zaista zelite da se odjavite?")){
			$.get({
			url:'rest/login/logout',
			dataType:'text',
			success: function(response){
			alert(response);
			window.location.href='/WebProject/home.html';
			},
			})
		} else {
			return;
		}	
	})
 	
 });
 
function fillProfileData(user) {
    $("#managerUsername").val(user.username);
    $("#managerName").val(user.firstName);
    $("#managerSurname").val(user.lastName);
    if(user.gender=="male"){
    $("#managerSex").val("male"); } 
    else {  $("#managerSex").val("female");}
    $("#oldPassword").val(user.password);
    $("#datum").val(user.birthDate);
}