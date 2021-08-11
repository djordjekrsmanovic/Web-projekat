$(document).ready(function(){
    function getUrlParameters(paramName){
        var PageURL = window.location.search.substring(1),
            URLVariable=PageURL.split("&"),
            sParametarName;
        for(let i=0;i<URLVariable.length;i++){
            sParametarName=URLVariable[i].split("=");
            if (sParametarName[0]===paramName){
                return sParametarName[1];
            }
        }
        return undefined;
    }

    var restauranName=getUrlParameters("name");
    if (restauranName===undefined || restauranName===""){
        alert("Restoran ne postoji");
        window.location.replace("http://localhost:8080/WebProject/home.html");
    }else{
        alert("Restoran postoji");
    }
});