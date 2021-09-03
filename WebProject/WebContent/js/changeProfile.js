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
                                    window.location.href="http://localhost:8080/WebProject/home.html";
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
                /*<li><a href="home.html">Početna strana</a></li>
                      <li><a href="buyerCart.html">Korpa</a></li>
                      <li><a href="buyerOrders.html">Porudžbine</a></li>
                      <li><a href="buyerProfileView.html">Profil</a></li>
                      <li><a href="" id='logout'>Odjava</a></li>*/
                $('#loginMenu').hide();
                $('#registrationMenu').hide();
                let homeLi=$('<li></li>').append('<a href="home.html">Početna strana </a>');
                let restaurantViewLi=$('<li></li>').append('<a href="buyerCart.html">Korpa</a>');
                let buyersViewLi=$('<li></li>').append('<a href="buyerOrders.html">Porudžbine</a>');
                let profileView=$('<li></li>').append('<a href="buyerProfileView.html">Profil</a>');
                let logout=$('<a id="logout" href="">Odjava</a>');
                logout.click(function(){
                   
                        $.get({
                            url:'rest/login/logout',
                            contentType:'application/json',
                            success:function(data){
                                if (data=="Loged out successfully!"){
                                    window.location.href="http://localhost:8080/WebProject/home.html";
                                }else{
                                    alert('Greska prilikom odjave sa profila');
                                }
                            }
                        })
                    
                })
                let logOut=$('<li></li>').append(logout);
                $('#ul-menu').append(homeLi,restaurantViewLi,buyersViewLi,profileView,logOut);
                fillProfileData();
				
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

    $('#editProfile').submit(function(event){
        event.preventDefault();
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

        let lastNameChecked=checkLastName();
        let nameChecked=checkName();
        wrongUsername=checkUserName();
        if(lastNameChecked==false){
            alert("Prezime moze samo da sadrzi slova");
            return;
        }
        
        if (nameChecked==false){
            alert('Ime moze samo da sadrzi slova');
            return;
        } 
        if (wrongUsername==true){
            alert('Korisnicko ime je vec u upotrebi');
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
                window.location.href="http://localhost:8080/WebProject/home.html";
                
            },
            error:function(data){
                alert('Greska prilikom izmjene korisnika');
            },
            async:true
           
        })
        
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

        let lastNameChecked=checkLastName();
        let nameChecked=checkName();
        wrongUsername=checkUserName();
        if(lastNameChecked==false){
            alert("Prezime moze samo da sadrzi slova");
            return;
        }
        
        if (nameChecked==false){
            alert('Ime moze samo da sadrzi slova');
            return;
        } 
        if (wrongUsername==true){
            alert('Korisnicko ime je vec u upotrebi');
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
                window.location.href="http://localhost:8080/WebProject/home.html";
                
            },
            error:function(data){
                alert('Greska prilikom izmjene korisnika');
            },
            async:true
           
        })
        
}

function checkUserName(){
    let validUser="rest/registration/get-usernames/"+$('#userName').val();
    var returnValue;
    $.get({
        url:validUser,
        contentType:'application/json',
        success:function(ret){
            if (ret==false){
                if(loadedUserName!=$('#userName').val()){
                    returnValue=true;
                }else{
                    returnValue=false;
                }
                
            }else{
                returnValue=true;
            }

            
        },
        error:function(data){
            alert('Greska prilikom provjere validnosti korisnickog imena');
        },
        async:false
    });
    return returnValue;
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
    /*let date=new Date(loggedUser.birthDate);
    date=date.toLocaleDateString();
    date=date.split('/');
    let newDate=date[2]+'-'+date[0]+'-'+date[1]; */
    let date =  new Date(loggedUser.birthDate);
    let formatedDate=formatDate(date);
    
    $('#datapicker').val(formatedDate);
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