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
        let userName=$('#managerUsername').val();
        let password=$('#NewPassword').val();
        let repeatedPassword=$('#RepeatedNewPassword').val();
        let gender=$("#managerSex option:selected").val();
        if (name===''||surname===''||date===''||userName==''||password==''||repeatedPassword==''||gender==''){
            $("#error").append=('Sva polja trebaju biti popunjena');
            return;
        }

        if (password!=repeatedPassword){
			alert("Lozinke se ne podudaraju.");
            return;
        }

		if(password===""){
			password=$("#oldPassword").val();
		}

        $.post({
            url:'rest/manager/editProfile',
            contentType:'application/json',
            data:JSON.stringify({username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:date}),
            success:function(data){
				if(data==="f"){
				alert("Postoji korisnik sa ukucanim korisnickim imenom.");
				} else {
                document.location.reload();
				}
            },
            error:function(data){
                alert("Greska prilikom izmjene.");
            }
        })
 	
 	event.preventDefault();
 	
 	});
 	
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
		alert("Uspjesna odjava");
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
	let date =  new Date(user.birthDate);
    let formatedDate=formatDate(date);
    $("#datum").val(formatedDate);
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