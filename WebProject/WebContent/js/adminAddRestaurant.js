
var usernameInvalid=false;
var managers=[];
var newManagerCreated=false;
var createdManager;
var createdRestaurant;
var managerExists=false;
var pictureURL="";
var srcData="";

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
    
    loadManagers();
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

        createManager();
        
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

    $('#addManager').show();
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

    $('#addManager').click(function(){
        $(".registration-card").show();
        window.scroll(0,0);
        
    })

    $('#confirmRestaurant').click(function(){
        let restaurantName=$('#restaurantName').val();
        let restaurantType=$('#restaurantType').val();
        let restaurantStatus=$('#restaurantStatus').val();
        let restaurantStreet=$('#restaurantStreet').val();
        let restaurantNumber=$('#restaurantNumber').val();
        let restaurantCity=$('#restaurantCity').val();
        let restuarantPostalNumber=$('#restuarantPostalNumber').val();
        let selectedManager=$('#selectManager').val();
        if (restaurantName=="" || restaurantType=="" || restaurantStatus=="" || restaurantStreet=="" || restaurantNumber=="" || restaurantCity=="" || restuarantPostalNumber=="" || getExtension()==""){
            if(selectedManager==undefined && newManagerCreated==false){
                alert("Potrebno je da kreirate novog menadžera");
            }else{
                alert("Popunite sva polja");
            }
            
            return;
        }

        if(newManagerCreated==true){
            createdRestaurant={restaurantName:restaurantName,
                restaurantType:restaurantType,
                restaurantStatus:restaurantStatus,
                restaurantStreet:restaurantStreet,
                restaurantNumber:restaurantNumber,
                restaurantCity:restaurantCity,
                restuarantPostalNumber:restuarantPostalNumber,
                selectedManager:createdManager.username,
                username:createdManager.username,
                password:createdManager.password,
                firstName:createdManager.firstName,
                lastName:createdManager.lastName,
                gender:createdManager.gender,
                birthDate:createdManager.birthDate,
                URL:"pictures/logos/"+restaurantName+"."+getExtension()
            };
        }else{
            createdRestaurant={
                restaurantName:restaurantName,
                restaurantType:restaurantType,
                restaurantStatus:restaurantStatus,
                restaurantStreet:restaurantStreet,
                restaurantNumber:restaurantNumber,
                restaurantCity:restaurantCity,
                restuarantPostalNumber:restuarantPostalNumber,
                selectedManager:selectedManager,
                username:"",
                password:"",
                firstName:"",
                lastName:"",
                gender:"",
                birthDate:"",
                URL:"pictures/logos/"+restaurantName+"."+getExtension()
            }
        }

        $.post({
            url:'rest/restaurant/add-restaurant',
            contentType:'application/json',
            data:JSON.stringify(createdRestaurant),
            success:function(data){
                if (data!=null){
                    alert('Restoran je uspješno kreiran');
                    writePictureOnServer();
                }else{
                    alert('Greska');
                }
            },
            error:function(data){
                alert('Greska');
            }
        })


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
        newManagerCreated=true;
        createdManager={username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:newdate}
        $(".registration-card").hide();
        window.scroll(0,300);
        $('#manager-option').text(createdManager.firstName+" "+createdManager.lastName );
        $('#addManager').hide();
    /*$.post({
        url:'rest/registration/add-manager',
        contentType:'application/json',
        data:JSON.stringify({username:userName,password:password,firstName:name,lastName:surname,gender:gender,birthDate:newdate,userType:"MANAGER"}),
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
    }) */
}

function loadManagers(){
    $.get({
        url:'rest/manager/get-managers',
        contentType:'application/json',
        success:function(data){
            for(manager of data){
                managers.push(manager);
            }

            formData();
        },
        error:function(data){
            formData();
        }

    })
}

function formData(){
    if (managers.length==0){
        $('#manager-option').append('<p>Ne postoje slobodni menadžeri</p>');
        $('#addManager').show();
    }else{
        managerExists=true;
        $('#addManager').hide();
        let select=$('<select id="selectManager"></select>');
        for (manager of managers){
            let option=$('<option value='+manager.username+'>'+manager.firstName+' '+manager.lastName+'</option>');
            select.append(option);
        }
        $('#manager-option').append(select);
    }
}

function encodeImageFileAsURL() {

   
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        srcData = fileLoadedEvent.target.result; // <--- data: base64
        let extension=getExtension();
        if(extension!="png" && extension!="jpg" && extension!="jpeg"){
            alert("Dozvoljene su samo slike u png jpg i jpeg formatu");
        }
        console.log("Converted Base64 version is " + srcData);
        var urlServer='rest/images/upload-restaurant-logo';
        
      }
      fileReader.readAsDataURL(fileToLoad);
    }
}

function getExtension(){
    var parts=srcData.split(",");
    let extension=parts[0].split(";")[0].split("/")[1]; 
    return extension;
}

function writePictureOnServer(){
    var data=
    $.post({
        url:'rest/images/upload-restaurant-logo',
        contentType:'application/json',
        data:JSON.stringify({name:createdRestaurant.restaurantName,pictureData:srcData}),

        success:function(data){
            console.log("Success");
        },
        error:function(data){
            console.log("Error");
        }
    })
}