var registredUserName=[];
$(document).ready(function(){

    
    $('#registration-form').submit(function(event){
        event.preventDefault();
        let name=$('#name').val();
        let surname=$('#lastname').val();
        let date=$('#date').val();
        var datearray = date.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
  
        let userName=$('#userName').val();
        let password=$('#password').val();
        let repeatedPassword=$('#repeatedPassword').val();
        let gender=document.querySelector('input[name="gender"]:checked').value;

        if (name===''||surname===''||date===''||userName==''||password==''||repeatedPassword==''||gender==''){
            $('#error').text="Sva polja trebaju biti popunjena";
            return;
        }

        let regex=RegExp('[a-zA-Z]+');
        if (!regex.test(name) || !regex.test(surname) || password!=repeatedPassword){
            return;
        }

        $.post({
            url:'rest/registration/register',
            contentType:'application/json',
            data:JSON.stringify({username:name,password:password,firstName:name,lastName:surname,gender:gender,birthDate:newdate}),
            success:function(data){
                alert("Uspjesno ste registrovani");
            },
            error:function(data){
                alert("Greska prilikom registracije");
            }
        })


    })

    $('#userName').focusout(function(){
        alert('fokus');
        let validUser="rest/registration/get-usernames/"+$('#userName').val();
        $.get({
            url:validUser,
            contentType:'application/json',
            success:function(ret){
                if (ret==false){
                    $('#userName').addClass('wrongUsername');
                    $('.error').text('Korisnicko ime je vec u upotrebi');
                }else{
                    $('#userName').removeClass('wrongUsername');
                    $('.error').text('');
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
			$('.error').text("Ime moze samo da sadrzi slova");
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

