var loggedUser;
var changePasswordClicked=false;
var loadedUserName;
var wrongUsername=false;
$(document).ready(function(){
    $.get({
		url:'rest/login/get-loged-user',
		contentType:'application/json',
		success: function(user){
            loggedUser=user;
            loadedUserName=user.username;
			if(loggedUser.role=="ADMIN"){
                /*	<li><a href="home.html">Početna strana</a></li>
                     <li><a href="adminRestaurantsView.html">Restorani</a></li>
                    <li><a href="adminBuyersView.html">Kupci</a></li>
                    <li><a href="adminUsersView.html">Korisnici</a></li>
                    <li><a href="adminAddRestaurant.html">Dodaj restoran</a></li>
                    <li><a href="adminAddUser.html">Dodaj korisnika</a></li>
					<li><a href="adminProfile.html">Profil</a></li>*/
				$('#loginMenu').hide();
                $('#registrationMenu').hide();
                let homeLi=$('<li></li>').append('<a href="home.html">Početna strana </a>');
                let restaurantViewLi=$('<li></li>').append('<a href="adminRestaurantsView.html">Restorani</a>');
                let buyersViewLi=$('<li></li>').append('<a href="adminBuyersView.html">Kupci</a>');
                let usersViewLi=$('<li></li>').append('<a href="adminUsersView.html">Korisnici</a>');
                let addRestaurantLi=$('<li></li>').append('<a href="adminAddRestaurant.html">Dodaj restoran</a>');
                let addUserLi=$('<li></li>').append('<a href="adminAddUser.html">Dodaj korisnika</a>');
                let profileView=$('<li></li>').append('<a href="adminProfileView.html">Profil</a>');
                let logout=$('<a id="logout" href="">Odjava</a>');
                logout.click(function(){
                   
                        $.get({
                            url:'rest/login/logout',
                            contentType:'application/json',
                            success:function(data){
                                if (data=="Loged out successfully!"){
                                    window.location.replace="http://localhost:8080/WebProject/home.html";
                                }else{
                                    alert('Greska prilikom odjave sa profila');
                                }
                            }
                        })
                    
                })
                let logOut=$('<li></li>').append(logout);
                $('#ul-menu').append(homeLi,restaurantViewLi,buyersViewLi,usersViewLi,addRestaurantLi,addUserLi,profileView,logOut);
                fillProfileData();
							
			} else if(loggedUser.role=="BUYER"){
                //dodati podatke za ovu ulogo po uzoru na prethodne
				
			} else if(loggedUser.role=="MANAGER"){
                //dodati podatke za ovu ulogo po uzoru na prethodne
				
			} else if(loggedUser.role=="DELIVERER"){
                //dodati podatke za ovu ulogo po uzoru na prethodne
				
			} else {
				$('#logoutMenu').hide();
				$('#profileMenu').hide();
				$('#pregledMenu').hide();
			}
		},
        error:function(data){
            alert("Greska prilikom ucitavanja korisnika");
        }
		
	});

    
    $('#userName').focusout(function(){
        checkUserName();
    })

    
    $('#name').focusout(function(){
        checkName();
        
    })



    $('#lastname').focusout(function(){
        checkLastName();
        
    })

    $('#submitButton').click(function(){

        changeUser();
        
    })

    
});

function changeUser(){
    var username=$("#userName").val();
        var name=$("#name").val();
        var lastname=$("#lastname").val();
        
        var sex=$("#managerSex").val();
        var password=$("#oldPassword").val();
        var date=$("#datapicker").val();
        var datearray = date.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
        if(username==""||name==""||lastname==""||password==""||date==""){
            $('#error').text="Sva polja trebaju biti popunjena";
            return;
        }

        if(checkLastName()==false || checkName()==false || wrongUsername==true){
            return;
        }
        

        var changedUser={username:username,password:password,firstName:name,lastName:lastname,gender:sex,birthDate:newdate,oldUsername:loadedUserName,role:loggedUser.role};

        $.ajax({
            type:'POST',
            url:'rest/users/change-user',
            contentType:'application/json',
            data:JSON.stringify(changedUser),
            success:function(user){
                if (user==null){
                    alert('Greska prilikom promjene profila');
                }else{
                    alert('Korisnik je uspjesno izmjenjen');
                }
                if (loggedUser.role=='ADMIN'){
                    window.location.replace="http://localhost:8080/WebProject/home.html";
                }else if(loggedUser.role=='DELIVERER'){
                    //redirekicja na stranicu
                }else if(loggedUser.role=='MANAGER'){
                    //redirekcija na stranicu
                }else if(loggedUser.role=='BUYER'){
                    //redirekcija na stranicu
                }
                
            },
            error:function(data){
                alert('Greska prilikom izmjene korisnika');
            },
            async:false
        })
        window.location.href="http://localhost:8080/WebProject/home.html";
}

function checkUserName(){
    let validUser="rest/registration/get-usernames/"+$('#userName').val();
    $.get({
        url:validUser,
        contentType:'application/json',
        success:function(ret){
            if (ret==false){
                if(loadedUserName!=$('#userName').val()){
                    $('#userName').addClass('wrongUsername');
                    $('#error').text('Korisnicko ime je vec u upotrebi');
                    wrongUsername=true;
                }else{
                    $('#userName').removeClass('wrongUsername');
                    $('#error').text('');
                    wrongUsername=false
                }
                
            }else{
                $('#userName').removeClass('wrongUsername');
                $('#error').text('');
                wrongUsername=true;
            }

            
        }
    })
}

function checkLastName(){
    let name=$('#lastname').val();
    let regex=RegExp('^[A-Za-z]+$');
    if (!regex.test(name)){
        $('#error').text("Prezime moze samo da sadrzi slova");
        $('#lastname').addClass('wrongUsername');
        return false;
    }else{
        $('#error').text("");
        $('#lastname').removeClass('wrongUsername');
        return true;
    }
}

function checkName(){
    let name=$('#name').val();
    let regex=RegExp('^[A-Za-z]+$');
    if (!regex.test(name)){
        $('#error').text("Ime moze samo da sadrzi slova");
        $('#name').addClass('wrongUsername');
        return false;
    }else{
        $('#error').text("");
        $('#name').removeClass('wrongUsername');
        return true;
    }
}


function fillProfileData(){
    $("#userName").val(loggedUser.username);
    $("#name").val(loggedUser.firstName);
    $("#lastname").val(loggedUser.lastName);
    if(loggedUser.gender=="male"){
        $("#managerSex").val("male");
    } else 
    {  
        $("#managerSex").val("female");
    }
    $("#oldPassword").val(loggedUser.password);
    let date=new Date(loggedUser.birthDate);
    date=date.toLocaleDateString();
    date=date.split('/');
    let newDate=date[2]+'-'+date[0]+'-'+date[1];
    $('#datapicker').val(newDate);
}