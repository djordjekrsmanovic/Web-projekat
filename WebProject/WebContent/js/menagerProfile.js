/**
 * 
 */
 
 function fillProfileData() {
  if (user != undefined) {
    $("#managerUserame").val(user.username);
    $("#managerName").val(user.name);
    $("#managerSurname").val(user.surname);
    $("#managerSex").val(getSexSelectionString(user.sex));
  }
}
 
 $(document).ready(function(){
 	fillProfileData();
 });