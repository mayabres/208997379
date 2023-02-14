//active navbar
var activePage = window.location.pathname;

const activeNav = document.querySelectorAll('nav a').forEach(link =>{
    if(link.href.includes(`${activePage}`)){
        link.classList.add("activePage");
    }
});

//validation check sign up
function validationSignUp(){
    const password = document.getElementById("passwordSignUp").value;
    const password1 = document.getElementById("passwordValSignUp").value;
    const dob = document.getElementById("dobSignUp").value;
    const inputDate = new Date(dob);
    const inputYear = inputDate.getFullYear();
    const date = new Date();
    const dateYear = date.getFullYear();
    if((dateYear - inputYear) < 15){
        alert("אנא הכנס תאריך לידה מתאים, משתמשי אתר זה יכולים להיות מעל גיל 15");
        return false;
    }
    else if(password != password1){
        alert("ערכי הסיסמאות אינם תואמים, אנא הכנס אותם שנית");
        return false;
    }
}

function alertContBeforeSignIn(){
    alert("תוכן ההודעה נשלח בהצלחה לבעלי האתר");
}

function alertRcommendation(){
    alert("ההמלצה הועלתה בהצלחה!");
}

function minDateToInsert(){
    var today = new Date();
    var minDate = today.toISOString().split("T")[0];
    console.log(minDate);
    const dateInputs=document.querySelectorAll("input[type=date]");
    for (var i = 0; i < dateInputs.length; i++) {
        dateInputs[i].max = minDate;
      }
}

//my profile
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const dob = document.getElementById("dob");
const email = document.getElementById("mail");

//my profile edit content
function edit(){
    const btnAprove = document.getElementById("aprove");
    firstName.disabled = false;
    lastName.disabled = false;
    phoneNumber.disabled = false;
    btnAprove.disabled= false;
}

function addTripToDid(i,j){
    let form = document.getElementById(i);
    let btn = document.getElementById(j);
    form.style.display = "flex";
    form.style.position = "center";
    form.style.flexDirection = "row";
    btn.style.display = "none";
}


//group data page
//show the form of create groups
function addFriendFormGroup(){
        let form = document.getElementById("hiddenForm");
        let btn = document.getElementById("createBtn");
        form.style.display = "flex";
        form.style.position = "center";
        form.style.flexDirection = "row";
        btn.style.display = "none";
}

function addFriendForm(){
    let table = document.getElementById("groupMembers");
    if(table.rows.length >= 9){
        alert("אין אפשרות להוסיף חברים נוספים, קבוצה יכולה להכיל עד 8 חברים");
    }
    else{
        let form = document.getElementById("hiddenForm");
        form.style.display = "block";
    }

}

//combobox data
 const areas = ["צפון","מרכז","דרום"];
 const difs = ["קל", "בינוני", "קשה"];
 const longs = ["2 קמ","3 קמ","4 קמ","5 קמ","6 קמ","7 קמ","8 קמ","9 קמ","10 קמ"];
 const waters = ["כן","לא"];
 const shadows = ["כן","לא"];

 //insert options to combobox in search trips page
function addOptions() {
    myOptionsToSelect(areas, 'optionsAreas');
    myOptionsToSelect(longs, 'optionsLong');
    myOptionsToSelect(difs, 'optionsDif');
    myOptionsToSelect(waters, 'optionsWater');
    myOptionsToSelect(shadows, 'optionsShadow');
 }

 function myOptionsToSelect(arr, id) {
    let selectElement = document.getElementById(id);
    let option = document.createElement("option");
    option.value = '';
    option.text = 'בחר';
    selectElement.add(option);
    arr.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      selectElement.add(option);
    });
}

//add users to the group table
function addUserToGroup(){
     let user = document.getElementById("optionsMembers").value;
     let table = document.getElementById("groupMembers");
     if(user === ''){
         alert("אנא בחר חבר שתרצה להוסיף");
         return false;
     }
     else if(table.rows.length >= 9){
        alert("אין אפשרות להוסיף חברים נוספים, קבוצה יכולה להכיל עד 8 חברים");
        return false;
     }
}

//add the group that you create to groups table
function createGroup(){
     let name = document.getElementById("groupName").value;
     let table = document.getElementById("myGroups1");
     let table1 = document.getElementById("groupMembers");
     if(name.length <2){
         alert("שם הקבוצה חייב לכלול לפחות 2 תווים");
         return false;
     }
     else if(table1.rows.length < 3){
         alert("הקבוצה חייבת לכלול לפחות 2 משתמשים: את/ה ומשתמש/ת נוספ/ת");
         return false;
     }
}



