var managers=[];
$(document).ready(function(){
    loadManagers();

    
    
    $('#confirm').click(function(){
        var managerName=$('#selectedManager').val();
        var restaurantName=getUrlParameters("name");
        $.post({
            url:'rest/restaurant/change-manager',
            contentType:'application/json',
            data:JSON.stringify({restaurantName:restaurantName,managerUserName:managerName}),
            success:function(data){
                if (data!=null){
                    alert("Menadzer je uspjesno promjenjen");
                    window.location.href="http://localhost:8080/WebProject/adminRestaurantsView.html";
                }else{
                    alert('Greska prilikom izmjene menadzera');
                    window.location.href="http://localhost:8080/WebProject/adminRestaurantsView.html";
                }
            },
            error:function(data){
                alert("Greska prilikom promjene menadzera");
            }
        })
    });

    $('#cancel').click(function(){
        window.location.href="http://localhost:8080/WebProject/adminRestaurantsView.html";
    })
})

function formView(){
    for (manager of managers){
        let managerLi=$('<option value='+manager.username+'>'+manager.firstName+' '+manager.lastName+'</option>');
        $('#selectedManager').append(managerLi);
    }
}

function loadManagers(){
    $.get({
        url:'rest/manager/get-managers',
        contentType:'application/json',
        success:function(data){
            for(manager of data){
                managers.push(manager);
            }

            formView();
        },
        error:function(data){
            formData();
        }

    })
}

function getUrlParameters(paramName){
    var PageURL = window.location.search.substring(1),
        URLVariable=PageURL.split("&"),
        sParametarName;
    for(let i=0;i<URLVariable.length;i++){
        sParametarName=URLVariable[i].split("=");
        if (sParametarName[0]===paramName){
            
            let decodedParam=decodeURIComponent( sParametarName[1].replace(/\+/g, '%20') );
            return decodedParam;
        }
    }
    return undefined;
}