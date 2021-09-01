var registredUserName=[];
var usernameInvalid=false;
$(document).ready(function(){

    $('#logout').click(function(){
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

    $.ajax({
        url:'rest/login/get-loged-user',
        contentType:'application/json',
        type:'GET',
        success:function(user){
            loggedUser=user;
        },
        async:false,
    })

    if (  loggedUser==null || loggedUser==undefined || loggedUser.role!='ADMIN' ){
        alert("Potrebno je da se prijavite kao administrator");
        window.location.href="http://localhost:8080/WebProject/home.html";
    }

    $('#registration-form').submit(function(event){
        event.preventDefault();
        var name=$('#name').val();
        var surname=$('#lastname').val();
        let date=$('#date').val();
        var datearray = date.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
  
        var userName=$('#userName').val();
        var password=$('#password').val();
        var repeatedPassword=$('#repeatedPassword').val();
        var gender=document.querySelector('input[name="gender"]:checked').value;
        var type=$('#type').val();
        if (name===''||surname===''||date===''||userName==''||password==''||repeatedPassword==''||gender==''){
            $('#error').text="Sva polja trebaju biti popunjena";
            return;
        }

        let regex=RegExp('[a-zA-Z]+');
        if (!regex.test(name) || !regex.test(surname) || password!=repeatedPassword){
            return;
        }

        if (usernameInvalid){
            return;
        }

        if (type=="MANAGER"){
            createManager();
        }else if(type=="DELIVERER"){
            createDeliverer();
        }
    })

    $('#userName').focusout(function(){
        let validUser="rest/registration/get-usernames/"+$('#userName').val();
        $.get({
            url:validUser,
            contentType:'application/json',
            success:function(ret){
                if (ret==false){
                    $('#userName').addClass('wrongUsername');
                    $('.error').text('Korisnicko ime je vec u upotrebi');
                    usernameInvalid=true;
                }else{
                    $('#userName').removeClass('wrongUsername');
                    $('.error').text('');
                    usernameInvalid=false;
                }
    
                
            }
        })
    })
    $('#name').focusout(function(){
    
        let name=$('#name').val();
        let regex=RegExp('^[A-Za-z]+$');
        if (!regex.test(name)){
			$('.error').text("Ime moze samo da sadrzi slova");
            $('#name').addClass('wrongUsername');
		}else{
            $('.error').text("");
            $('#name').removeClass('wrongUsername');
        }
    })

    $('#lastname').focusout(function(){
    
        let name=$('#lastname').val();
        let regex=RegExp('^[A-Za-z]+$');
        if (!regex.test(name)){
			$('.error').text("Prezime moze samo da sadrzi slova");
            $('#lastname').addClass('wrongUsername');
		}else{
            $('.error').text("");
            $('#lastname').removeClass('wrongUsername');
        }
    })

    $('#repeatedPassword').focusout(function(){
    
        let password=$('#password').val();
        let repeatedPassword=$('#repeatedPassword').val();
        if (password!=repeatedPassword){
			$('.error').text("Lozinke moraju da budu iste");
            $('#repeatedPassword').addClass('wrongUsername');
		}else{
            $('.error').text("");
            $('#repeatedPassword').removeClass('wrongUsername');
        }
    })

});

function createManager(){

    var name=$('#name').val();
        var surname=$('#lastname').val();
        let date=$('#date').val();
        var datearray = date.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
  
        var userName=$('#userName').val();
        var password=$('#password').val();
        var repeatedPassword=$('#repeatedPassword').val();
        var gender=document.querySelector('input[name="gender"]:checked').value;
        var type=$('#type').val();
    $.post({
        url:'rest/registration/add-manager',
        contentType:'application/json',
        data:JSON.stringify({username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:newdate,userType:type}),
        success:function(data){
            if(data==null){
                alert("Greska prilikom registracije");
            }else{
                alert("Uspjesno ste registrovani");
            }
            
        },
        error:function(data){
            alert("Greska prilikom registracije");
        }
    })
}

function createDeliverer(){
    var name=$('#name').val();
        var surname=$('#lastname').val();
        let date=$('#date').val();
        var datearray = date.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
  
        var userName=$('#userName').val();
        var password=$('#password').val();
        var repeatedPassword=$('#repeatedPassword').val();
        var gender=document.querySelector('input[name="gender"]:checked').value;
        var type=$('#type').val();
    $.post({
        url:'rest/registration/add-deliverer',
        contentType:'application/json',
        data:JSON.stringify({username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:newdate,userType:type}),
        success:function(data){
            alert("Uspjesno ste registrovani");
        },
        error:function(data){
            alert("Greska prilikom registracije");
        }
    })
}

