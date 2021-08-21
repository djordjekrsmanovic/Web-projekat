var loadedUsers=[];
var loadedUsersDefault=[];
$(document).ready(function(){

    loadUsers();
    

    $("#searchButton").click(function(){
        filterUsers();
        searchUsers();
        sortUsers();
    })

    $("#sort").change(function(){
        filterUsers();
        searchUsers();
        sortUsers();
    })
    $("#filter").change(function(){
        filterUsers();
        searchUsers();
        sortUsers();

    })
})

function loadUsers(){
    $('#tableBody').empty();
    loadedUsers.length=0;
    loadedUsersDefault.length=0;
    $.get({
        url:'rest/users/load-users',
        contentType:'application/json',
        success:function(users){
            for(user of users){
                loadedUsers.push(user);
                loadedUsersDefault.push(user);
            }

            formTable(loadedUsers);
        }
    })
}

function sortUsers(){
    let value=$("#sort").val();
    let searchCriterium=$("#value").val().toLowerCase();
    let filterCriterium=$("#filter").val();
    $('#tableBody').empty();
    if (value=="nameASC"){
        sortNameAscending();
    }else if(value=="nameDSC"){
        sortNameDescending();
    }else if(value=="sureNameASC"){
        sortSureNameASC();
    }else if(value=="sureNameDSC"){
        sortSureNameDSC();
    }else if(value=="userNameASC"){
        sortUserNameASC();
    }else if(value=="userNameDSC"){
        sortUserNameDSC();
    }else if(searchCriterium=="" && filterCriterium==""){
        loadedUsers.length=0;
        loadedUsers=JSON.parse(JSON.stringify(loadedUsersDefault));
    }

    formTable(loadedUsers);
}

function sortNameAscending(){
    return loadedUsers.sort((a,b)=> (a.firstName>b.firstName) ? 1 :(b.firstName>a.firstName) ? -1:0);
}

function sortNameDescending(){
    return loadedUsers.sort((a,b)=> (a.firstName<b.firstName) ? 1 :(b.firstName<a.firstName) ? -1:0);
}

function sortSureNameASC(){
    return loadedUsers.sort((a,b)=> (a.lastName>b.lastName) ? 1 :(b.lastName>a.lastName) ? -1:0);
}

function sortSureNameDSC(){
    return loadedUsers.sort((a,b)=> (a.lastName<b.lastName) ? 1 :(b.lastName<a.lastName) ? -1:0);
}

function sortUserNameASC(){
    return loadedUsers.sort((a,b)=> (a.username>b.username) ? 1 :(b.username>a.username) ? -1:0);
}

function sortUserNameDSC(){
    return loadedUsers.sort((a,b)=> (a.username<b.username) ? 1 :(b.username<a.username) ? -1:0);
}

function filterUsers(){
    let filterCriterium=$("#filter").val();
    loadedUsers.length=0;
    loadedUsers=JSON.parse(JSON.stringify(loadedUsersDefault));
    if (filterCriterium!=""){
        for (let i=0;i<loadedUsers.length;i++){
            if (loadedUsers[i].userRole!=filterCriterium){
                loadedUsers.splice(i,1);
                i--;
            }
        }
    }
    formTable(loadedUsers);
}

function searchUsers(){
    $('#tableBody').empty();
    let value=$("#value").val().toLowerCase();
    let filterCriterium=$("#filter").val();
    if (filterCriterium==""){
        loadedUsers.length=0;
        loadedUsers=JSON.parse(JSON.stringify(loadedUsersDefault));
    }
    
    for (let i=0;i<loadedUsers.length;i++){
        if (!loadedUsers[i].firstName.toLowerCase().includes(value) && !loadedUsers[i].lastName.toLowerCase().includes(value) && !loadedUsers[i].username.toLowerCase().includes(value)){
            loadedUsers.splice(i,1);
            i--;
        }
    }

    formTable(loadedUsers);

}
function formTable(users){
    $('#tableBody').empty();
    for (user of users){
        let tr=$('<tr></tr>');
        let role=getRole(user);
        let roleTd=$('<td>'+role+'</td>');
        let nameTd=$('<td>'+user.firstName+'</td>');
        let lastNameTd=$('<td>'+user.lastName+'</td>');
        let userNameTd=$('<td>'+user.username+'</td>');
        let passwordTd=$('<td>'+user.password+'</td>');
        let buttonDelete=document.createElement('button');
        buttonDelete.innerHTML="Obriši";
        buttonDelete.addEventListener('click',createHandler(user));
        let buttonTd=$('<td></td>').append(buttonDelete);
        let blockButtonTd=$('<td></td>');
        let blockButton=document.createElement('button');
        if (user.banned==false){
            blockButton.innerHTML="Blokiraj korisnika";
        }else{
            blockButton.innerHTML="Odblokiraj korisnika";
            tr.addClass("blockedUser");
        }
        
        blockButton.addEventListener('click',createHandlerBlock(user));
        blockButtonTd.append(blockButton);
        tr.append(roleTd,nameTd,lastNameTd,userNameTd,passwordTd,blockButtonTd,buttonTd);
        $('#tableBody').append(tr);
    }
}

function createHandler(user){
    return function(){
        let url="rest/users/"+user.username;
        $.ajax({
        url:url,
        type:'DELETE',
        contentType:'application/json',
        success:function(){
            alert("Korisnik je uspješno obrisan")
            loadUsers();
        },
        error:function(){
            alert("Greška prilikom brisanja")
        }

        })
    }
}

function createHandlerBlock(user){
    return function(){
        let url="rest/users/ban-user/"+user.username;
        $.ajax({
        url:url,
        type:'PUT',
        contentType:'application/json',
        success:function(){
            alert("Korisnik je blokiran")
            loadUsers();
        },
        error:function(){
            alert("Greška prilikom blokiranja korisnika")
        }

        })
    }
}

function deleteUserFromFront(user){
    for(let i=0;i<loadedUsers.length;i++){
        if (loadedUsers[i].username==user.username){
            loadedUsers.splice(i,1);
            break;
        }
    }
    formTable(loadedUsers);
}

function blockUserFromFront(user){
    for(let i=0;i<loadedUsers.length;i++){
        if (loadedUsers[i].username==user.username){
            loadedUsers[i].banned=true;
            break;
        }
    }
    formTable(loadedUsers);
}

function getRole(user){
    if (user.userRole=='ADMIN'){
        return 'Administrator';
    }else if(user.userRole=='MANAGER'){
        return 'Menadzer';
    }else if(user.userRole=='DELIVERER'){
        return 'Dostavljač';
    }
    return 'Kupac';
}