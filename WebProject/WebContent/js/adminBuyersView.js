var loadedUsers=[];
var loadedUsersDefault=[];
$(document).ready(function(){

    loadUsers();
    

    $("#searchButton").click(function(){
        filterUsers();
        searchUsers();
        sortUsers();
        formTable(loadedUsers);
    })

    $("#sort").change(function(){
        filterUsers();
        searchUsers();
        sortUsers();
        formTable(loadedUsers);
    })
    $("#filter").change(function(){
        filterUsers();
        searchUsers();
        sortUsers();
        formTable(loadedUsers);
    })
})

function loadUsers(){
    $('#tableBody').empty();
    loadedUsers.length=0;
    loadedUsersDefault.length=0;
    $.get({
        url:'rest/users/load-buyers',
        contentType:'application/json',
        success:function(users){
            for(user of users){
                loadedUsers.push(user);
                loadedUsersDefault.push(user);
            }
            filterUsers();
            formTable(loadedUsers);
        }
    })
}

function sortUsers(){
    let value=$("#sort").val();
    let filterCriterium=$("#filter").val();
    let searchCriterium=$("#value").val().toLowerCase();
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
    }else if(value=="pointsASC"){
        sortPointsASC();
    }else if(value=="pointsDSC"){
        sortPointsDSC();
    }
    else if(filterCriterium=="" && searchCriterium==""){
        loadedUsers.length=0;
        loadedUsers=JSON.parse(JSON.stringify(loadedUsersDefault));
    }

    
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

function sortPointsASC(){
    return loadedUsers.sort((a,b)=> (a.points>b.points) ? 1 :(b.points>a.points) ? -1:0);
}

function sortPointsDSC(){
    return loadedUsers.sort((a,b)=> (a.points<b.points) ? 1 :(b.points<a.points) ? -1:0);
}

function filterUsers(){
    let filterCriterium=$("#filter").val();
    loadedUsers.length=0;
    loadedUsers=JSON.parse(JSON.stringify(loadedUsersDefault));
    if (filterCriterium!=""){
        for (let i=0;i<loadedUsers.length;i++){
            if (loadedUsers[i].buyerType.buyerRank!=filterCriterium){
                loadedUsers.splice(i,1);
                i--;
            }
        }
    }
    
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
        console.log(!loadedUsers[i].firstName.toLowerCase().includes(value),!loadedUsers[i].lastName.toLowerCase().includes(value),!loadedUsers[i].username.toLowerCase().includes(value))
        if (!loadedUsers[i].firstName.toLowerCase().includes(value) && !loadedUsers[i].lastName.toLowerCase().includes(value) && !loadedUsers[i].username.toLowerCase().includes(value)){
            loadedUsers.splice(i,1);
            i--;
        }
    }

    

}
function formTable(users){
    $('#tableBody').empty();
    for (user of users){
        let tr=$('<tr></tr>');
        
        let nameTd=$('<td>'+user.firstName+'</td>');
        let lastNameTd=$('<td>'+user.lastName+'</td>');
        let userNameTd=$('<td>'+user.username+'</td>');
        let role=getRole(user);
        let roleTd=$('<td>'+role+'</td>');
        let pointsTd=$('<td>'+user.points+'</td>');
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
        tr.append(nameTd,lastNameTd,userNameTd,roleTd,pointsTd,blockButtonTd,buttonTd);
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
    if (user.buyerType.buyerRank=='GOLD'){
        return 'Zlatni kupac';
    }else if(user.buyerType.buyerRank=='BRONZE'){
        return 'Bronzani kupac';
    }else if(user.buyerType.buyerRank=='SILVER'){
        return 'Srebrni kupac';
    }
    return 'Početnik';
}