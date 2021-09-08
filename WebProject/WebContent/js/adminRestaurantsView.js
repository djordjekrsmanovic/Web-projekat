loadedRestaurants=[];
recomendedView=[];
$(document).ready(function(){

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
    loadRestaurants();
    $("#sort").change(function(){
        filterRestaurants();
        searchRestaurant();
        sortRestaurants(loadedRestaurants);
        formTable(loadedRestaurants);
    })

    $("#filter").change(function(){
        filterRestaurants();
        searchRestaurant();
        sortRestaurants(loadedRestaurants);
        formTable(loadedRestaurants);
    })

    $('#searchButton').click(function(){
        filterRestaurants();
        searchRestaurant();
        sortRestaurants(loadedRestaurants);
        formTable(loadedRestaurants);
    })

})

function loadRestaurants(){
    $.get({
		url:'rest/restaurant/load-admin-restaurants',
		contentType:'application/json',
		success:function(restaurants){
			loadedRestaurants.length=0;
            recomendedView.length=0;
			for(restaurant of restaurants){
				loadedRestaurants.push(restaurant);
                recomendedView.push(restaurant);
			}

            formTable(loadedRestaurants);
		},
		error:function(data){
				alert("greska");
		}
	});
}

function formTable(restaurants){
    $('#tableBody').empty();
    for (restaurant of restaurants){
        let tr=$('<tr></tr>');
        let logoTd=$('<td></td>')
        var src=restaurant.picturePath.replaceAll(' ','_');
        let imageSrc=$('<img />',{
            src:src
        })
        logoTd.append(imageSrc);
        let nameTd=$('<td>'+restaurant.name+'</td>');
        let restaurantTypeTd=$('<td>'+getType(restaurant)+'</td>');
        let statusTD=$('<td>'+getRestaurantStatus(restaurant)+"</td>");
        let gradeTd=$('<td>'+restaurant.raiting+"</td>");
        let location=restaurant.location.address.street+" "+restaurant.location.address.streetNumber+" "+restaurant.location.address.city;
        let locationTD=$('<td>'+location+'</td>');
        let changeManagerButton=document.createElement('button');
        changeManagerButton.innerHTML="Izmijeni menadžera";
        changeManagerButton.addEventListener('click',createManagerHandler(restaurant));
        let changeManagerTD=$('<td></td>');
        changeManagerTD.append(changeManagerButton);
        let deleteRestaurantButton=document.createElement('button');
        deleteRestaurantButton.innerHTML="Obriši restoran";
        deleteRestaurantButton.addEventListener('click',createDeleteHandler(restaurant));
        let deleteTd=$('<td></td>');
        deleteTd.append(deleteRestaurantButton);
        let managerTD=$('<td></td>');
        let managerName;
        if (restaurant.manager!=null){
            managerName=restaurant.manager.firstName+" "+restaurant.manager.lastName;
        }else{
            managerName="Ne postoji";
        }
        
        managerTD.append(managerName);
        tr.append(logoTd,nameTd,restaurantTypeTd,statusTD,locationTD,gradeTd,managerTD,changeManagerTD,deleteTd);
        $('#tableBody').append(tr);
    }
}

function createManagerHandler(restaurant){
    return function(){
        console.log(restaurant.name);
        window.location.href="http://localhost:8080/WebProject/adminChangeRestaurantManager.html?name="+restaurant.name;
    }
}

function createDeleteHandler(restaurant){
    return function(){
        let url="rest/restaurant/delete-restaurant/"+restaurant.name;
        $.ajax({
            url:url,
            type:'DELETE',
            contentType:'application/json',
            success:function(data){
                alert('Restoran je izbrisan');
                loadRestaurants();
            },
            error:function(){
                alert('Greska prilikom brisanja restorana');
            }
        })

    }
}

function getType(restaurant){
    /*ITALIAN,
	JAPANESE,
	GRILL,
	ETNO*/
    if (restaurant.restaurantType=='ITALIAN'){
        return "Italijanski restoran";
    }else if(restaurant.restaurantType=='JAPANESE'){
        return "Japanski restoran";
    }else if(restaurant.restaurantType=="GRILL"){
        return "Roštiljnica";
    }else{
        return "Etno restoran";
    }
}

function getRestaurantStatus(restaurant){
    if (restaurant.restaurantStatus=="CLOSED"){
        return "Zatvoren";
    }else{
        return "Otvoren";
    }
}

function sortRestaurants(){
    let value=$('#sort').val();
    let filterCriterium=$("#filter").val();
    let searchCriterium=$("#value").val().toLowerCase();
    
    if (value==null){
        return;
    }

    if (value==='name-ascending'){
        sortNameAscending();
    }else if(value=='name-descending'){
        sortNameDescending();
    }else if(value==='location-ascending'){
        sortLocationAscending();
    }else if(value==='location-descending'){
        sortLocationDescending();
    }else if(value==='average-grade-ascending'){
        sortGradeAscending();
    }else if (value=='average-grade-descending'){
        sortGradeDescending();
    }else if (value=='default' && filterCriterium=="" && searchCriterium==""){
        loadedRestaurants.length=0;
        loadedRestaurants=JSON.parse(JSON.stringify(recomendedView));
    }
}

function sortNameAscending(){
    loadedRestaurants.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
}

function sortNameDescending(){
    loadedRestaurants.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
    
}

function sortLocationAscending(){
    loadedRestaurants.sort((a,b) => (a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city > b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city) ? 1 : ((b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city > a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city) ? -1 : 0));

}

function sortLocationDescending(){
    loadedRestaurants.sort((a,b) => (a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city < b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city) ? 1 : ((b.location.address.street+" "+b.location.address.streetNumber+" "+b.location.address.city < a.location.address.street+" "+a.location.address.streetNumber+" "+a.location.address.city) ? -1 : 0));
    
}

function sortGradeAscending(){
    loadedRestaurants.sort((a,b) => (parseFloat(a.raiting) > parseFloat(b.raiting)) ? 1 : ((parseFloat(b.raiting) > parseFloat(a.raiting)) ? -1 : 0));
    
}

function sortGradeDescending(){
    loadedRestaurants.sort((a,b) => (parseFloat(a.raiting) < parseFloat(b.raiting)) ? 1 : ((parseFloat(b.raiting) < parseFloat(a.raiting)) ? -1 : 0));
    
}

function filterRestaurants(){
    let filterCriterium=$("#filter").val();
    
    loadedRestaurants.length=0;
    loadedRestaurants=JSON.parse(JSON.stringify(recomendedView));
    

    if (filterCriterium=="OPEN" || filterCriterium=="CLOSED"){
        openRestaurnatsFilter();
        return;
    }
    if (filterCriterium!=""){
        for (let i=0;i<loadedRestaurants.length;i++){
            if (loadedRestaurants[i].restaurantType!=filterCriterium){
                loadedRestaurants.splice(i,1);
                i--;
            }
        }
    }
    
}

function openRestaurnatsFilter(){
    let filterCriterium=$("#filter").val();
    for (let i=0;i<loadedRestaurants.length;i++){
        if (loadedRestaurants[i].restaurantStatus!=filterCriterium){
            loadedRestaurants.splice(i,1);
            i--;
        }
    }
}

function searchRestaurant(){
    $('#tableBody').empty();
    let value=$("#value").val().toLowerCase();
    let filterCriterium=$("#filter").val();
    if(filterCriterium==""){
        loadedRestaurants.length=0;
        loadedRestaurants=JSON.parse(JSON.stringify(recomendedView));
    }
      
    for (let i=0;i<loadedRestaurants.length;i++){
        let restaurantLocation=loadedRestaurants[i].location.address.street+" "+loadedRestaurants[i].location.address.streetNumber+" "+loadedRestaurants[i].location.address.city
        
        if (!loadedRestaurants[i].name.toLowerCase().includes(value) && !restaurantLocation.toLowerCase().includes(value)){
            loadedRestaurants.splice(i,1);
            i--;
        }
    }
}
