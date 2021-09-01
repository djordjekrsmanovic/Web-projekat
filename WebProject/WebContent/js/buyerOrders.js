var loggedUser;
var orders=[];
var unchangedOrders=[];
var filteredOrders=[];
var name;
var priceFrom;
var priceTo;
var dateFrom;
var dateTo;
var restaurantType;
var orderStatus;
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

    if (  loggedUser==null || loggedUser==undefined || loggedUser.role!='BUYER' ){
        alert("Potrebno je da se prijavite kao kupac");
        window.location.href="http://localhost:8080/WebProject/home.html";
    }

    $.ajax({
        url:'rest/buying/get-orders/'+loggedUser.username,
        contentType:'application/json',
        type:'GET',
        success:function(data){
            orders=data;
            unchangedOrders=JSON.parse(JSON.stringify(orders));
            formTable(orders);
        },
        error:function(data){
            alert('Greska prilikom ucitavanja porudzbina');
        }
    })

    $("#searchButton").click(function(){


        searchOrders();
        formTable(orders);
        
    })

    $('#filterType').change(function(){
        filterType();
        filterStatus();
        filterPrice();
        filterDate();
        filterName();
        filteredOrders.length=0;
        filteredOrders=JSON.parse(JSON.stringify(orders));
        sort();
        formTable(orders);
    })

    $('#filterStatus').change(function(){
        filterType();
        filterStatus();
        filterPrice();
        filterDate();
        filterName();
        filteredOrders.length=0;
        filteredOrders=JSON.parse(JSON.stringify(orders));
        sort();
        formTable(orders);
    })

    $('#sort').change(function(){
        filterType();
        filterStatus();
        filterPrice();
        filterDate();
        filterName();
        filteredOrders.length=0;
        filteredOrders=JSON.parse(JSON.stringify(orders));
        sort();
        formTable(orders);
    })
})

function sort(){
    let sortCriterium=$('#sort').val();
    if (sortCriterium==""){
        orders.length=0;
        orders=JSON.parse(JSON.stringify(filteredOrders));
    }else if(sortCriterium=="name-ascending"){
        sortNameAscending();
    }else if(sortCriterium=="name-descending"){
        sortNameDescending();
    }else if(sortCriterium=="price-ascending"){
        sortPriceAscending();
    }else if(sortCriterium=="price-descending"){
        sortPriceDescending();
    }else if(sortCriterium=="date-ascending"){
        sortDateAscending();
    }else if(sortCriterium=="date-descending"){
        sortDateDescending();
    }
}

function formTable(orders){
    $('#tableBody').empty();
    for (order of orders){
        let tr=$('<tr></tr>');
        let restaurantID=$('<td>'+order.id+'</td>');
        let restraurantTD=$('<td>'+order.restaurant.name+'</td>');
        let date=new Date(order.dateAndTime);
        date=date.toLocaleString();
        let parts=date.split('/');
        let newDate=parts[0]+'.'+parts[1]+'.'+parts[2];
        let dateTD=$('<td>'+newDate+'</td>');
        let priceTD=$('<td>'+order.price+'</td>');
        let statusTD=$('<td>'+getStatus(order)+'</td>');
        let cancelButton=$('<button>'+'Otkaži porudžbinu'+'</button>');
        if (order.status=='OBRADA'){
            cancelButton.prop("disabled",false);

        }else{
            cancelButton.prop("disabled",true);
            cancelButton.text('');
        }
        cancelButton[0].addEventListener('click',createDeleteHandler(order));
        let buttonTD=$('<td></td>').append(cancelButton);
        tr.append(restaurantID,restraurantTD,dateTD,priceTD,statusTD,buttonTD);
        $('#tableBody').append(tr);
    }
}

function createDeleteHandler(order){
    return function(){
        $.ajax({
            url:'rest/buying/cancel-order/'+order.id,
            contentType:'application/json',
            type:'DELETE',
            success:function(data){
                alert('Narudžbina je uspješno otkazana');
                orders=data;
                unchangedOrders=JSON.parse(JSON.stringify(orders));
                filterType();
                filterStatus();
                filterPrice();
                filterDate();
                filterName();
                filteredOrders.length=0;
                filteredOrders=JSON.parse(JSON.stringify(orders));
                sort();
                formTable(orders);
            },
            error:function(data){
                alert('Greska prilikom otkazivanja narudzbine');
            }

        })
    }
}

function getStatus(order){
    if (order.status=='OBRADA'){
        return 'U statusu obrade';
    }else if(order.status=='U_PRIPREMI'){
        return 'U pripremi';
    }else if(order.status=='CEKA_DOSTAVLJACA'){
        return 'Čeka dostavljača'
    }else if(order.status=='U_TRANSPORTU'){
        return 'U transportu';
    }else if(order.status=='DOSTAVLJENA'){
        return 'Dostavljena';
    }else if (order.status=='OTKAZANA'){
        return 'Otkazana';
    }
}

function searchOrders(){
        name=$('#name').val();
        priceFrom=$('#priceFrom').val();
        priceTo=$('#priceTo').val();
        dateFrom=$('#dateFrom').val();
        dateTo=$('#dateTo').val();
        filterType();
        filterStatus();
        filterPrice();
        filterDate();
        filterName();
        filteredOrders.length=0;
        filteredOrders=JSON.parse(JSON.stringify(orders));
        sort();
        
}


function filterType(){
    restaurantType=$('#filterType').val();
    orderStatus=$('#filterStatus').val();
    orders.length=0;
    orders=JSON.parse(JSON.stringify(unchangedOrders));

    if (restaurantType==""){
        return;
    }
    for(let i=0;i<orders.length;i++){
        if (orders[i].restaurant.restaurantType!=restaurantType){
            orders.splice(i,1);
            i--;
        }
    }
    
}

function filterStatus(){
    restaurantType=$('#filterType').val();
    orderStatus=$('#filterStatus').val();
    
    if (orderStatus==""){
        return;
    }
    for(let i=0;i<orders.length;i++){
        if (orders[i].status!=orderStatus){
            orders.splice(i,1);
            i--;
        }
    }
}

function filterPrice(){
    priceFrom=$('#priceFrom').val();
    priceTo=$('#priceTo').val();

    if (priceFrom=="" && priceTo==""){
        return;
    }

    if (priceTo==""){
        priceTo=Number.MAX_VALUE;
    }
    if (priceFrom==""){
        priceFrom=0;
    }
    for(let i=0;i<orders.length;i++){
        if (!(parseFloat(orders[i].price) >= parseFloat(priceFrom) && parseFloat(orders[i].price)<=parseFloat(priceTo))){
            orders.splice(i,1);
            i--;
        }
    }
}

function filterDate(){
    dateFrom=$('#dateFrom').val();
    dateTo=$('#dateTo').val();

    if (dateFrom=="" && dateTo==""){
        return;
    }
    if (dateTo==""){
        filterWithFromDate();
    }else if(dateFrom==""){
        filterWithToDate();
        
    }else{
        fromDate=new Date(dateFrom);
        toDate=new Date(dateTo);
        for (let i=0;i<orders.length;i++){
            date=new Date(orders[i].dateAndTime);
            if (!date.inRange(fromDate,toDate)){
                orders.splice(i,1);
                i--;
            }
        }
    }
}

Date.prototype.inRange = function(dateFrom,dateTo) {
    return this>=dateFrom && this<=dateTo;
}

function filterWithFromDate(){
    fromDate=new Date(dateFrom);
    for (let i=0;i<orders.length;i++){
        date=new Date(orders[i].dateAndTime);
        if (date<fromDate){
            orders.splice(i,1);
            i--;
        }
    }
}

function filterWithToDate(){
    toDate=new Date(dateTo);
    for (let i=0;i<orders.length;i++){
        date=new Date(orders[i].dateAndTime);
        if (date>toDate){
            orders.splice(i,1);
            i--;
        }
    }
}

function filterName(){
    name=$('#name').val().toLowerCase();
    for (let i=0;i<orders.length;i++){
        if (!orders[i].restaurant.name.toLowerCase().includes(name)){
            orders.splice(i,1);
            i--;
        }
    }
}


function sortNameAscending(){
    return orders.sort((a,b)=> (a.restaurant.name>b.restaurant.name) ? 1 :(b.restaurant.name>a.restaurant.name) ? -1:0);
}

function sortNameDescending(){
    return orders.sort((a,b)=> (a.restaurant.name<b.restaurant.name) ? 1 :(b.restaurant.name<a.restaurant.name) ? -1:0);
}

function sortPriceAscending(){
    return orders.sort((a,b)=> (parseFloat(a.price)>parseFloat(b.price)? 1 : (parseFloat(b.price)>parseFloat(a.price))? -1 :0));
}

function sortPriceDescending(){
    return orders.sort((a,b)=> (parseFloat(a.price)<parseFloat(b.price)? 1 : (parseFloat(b.price)<parseFloat(a.price))? -1 :0));
}

function sortDateAscending(){
    return orders.sort((a,b)=> (new Date(a.dateAndTime)>new Date(b.dateAndTime))? 1 : (new Date(b.dateAndTime)>new Date(a.dateAndTime))? -1:0);
}

function sortDateDescending(){
    return orders.sort((a,b)=> (new Date(a.dateAndTime)<new Date(b.dateAndTime))? 1 : (new Date(b.dateAndTime)<new Date(a.dateAndTime))? -1:0);
}