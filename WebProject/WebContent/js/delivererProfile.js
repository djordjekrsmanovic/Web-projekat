/**
 * 
 */
 
 
$(document).ready(function(){
	
$.get({
 		url:"rest/deliverer/delivererProfile",
		dataType:"json",
 		success: function(response){
 			fillProfileData(response);
 		},
 	});	
 	
 	$("#editProfile").submit(function(event){
 		let name=$('#delivererName').val();
        let surname=$('#delivererSurname').val();
        let date=$('#datum').val();       
        let userName=$('#delivererUsername').val();
        let password=$('#NewPassword').val();
        let repeatedPassword=$('#RepeatedNewPassword').val();
        let gender=$("#delivererSex option:selected").val();
        if (name===''||surname===''||date===''||userName==''||gender==''){
            alert("Sva polja trebaju biti popunjena");
            return;
        }

        if (password!=repeatedPassword){
			alert("Lozinke se ne podudaraju.");
            return;
        }

        $.post({
            url:'rest/deliverer/editProfile',
            contentType:'application/json',
            data:JSON.stringify({username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:date}),
            success:function(data){
				document.location.reload();
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
			success: function(){
			window.location.href='/WebProject/home.html';			
			},
			})
		} else {
			return;
		}	
	})
 	
 });
 
function fillProfileData(user) {
    $("#delivererUsername").val(user.username);
    $("#delivererName").val(user.firstName);
    $("#delivererSurname").val(user.lastName);
    if(user.gender=="male"){
    $("#delivererSex").val("male"); } 
    else {  $("#delivererSex").val("female");}
    $("#oldPassword").val(user.password);
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