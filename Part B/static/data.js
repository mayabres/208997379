//active navbar
var activePage = window.location.pathname;

const activeNav = document.querySelectorAll('nav a').forEach(link =>{
    if(link.href.includes(`${activePage}`)){
        link.classList.add("activePage");
    }
});

//validation check sign up
function validationSignUp(){
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;
    const dob = document.getElementById("dob").value;
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
    else{
       alert("נרשמת לאתר בהצלחה!");
    }
}

function alertContBeforeSignIn(){
    alert("תוכן ההודעה נשלח בהצלחה לבעלי האתר");

}

function alertSignIn(){
    alert("התחברת לאתר, מיד תועבר לעמוד חיפוש המסלולים");

}

 function clearMemory(){
    window.localStorage.clear();
 }

//trip class
class Trip{
    constructor(ID, tripName, area, long, difficulty, water, shadow, description) {
        this.ID = ID;
        this.tripName = tripName;
        this.area = area;
        this.long = long;
        this.difficulty = difficulty;
        this.water = water;
        this.shadow = shadow;
        this.description = description;
    }
}

const trip1 = new Trip(12345 ,'מסלול בעקבות הגיבורים - בנחל מעפילים', 'צפון','4 קמ', 'קל', 'כן', 'כן',
        'מכביש 672 יורדים לכביש 7212 הצר והיפה היורד לנשר, או שמטפסים בכביש זה מנשר. קרוב לסימון הקילומטר השלישי, פונים מזרחה לדרך העפר הנופית. כ-2.5 ק״מ מהכביש מגיעים לחניון נחל פעיל, בו ניתן לחנות, ומתחילים בטיול בשביל המסומן המוליך לנחל. ניתן לחנות גם בנקודת היציאה או בקצה המסלול ביגור. מסלול לא מאוד ארוך ומתאים לטיולי משפחות.')
const trip2 = new Trip(45678, 'רכס באצבע', 'צפון','3 קמ','קל','לא','לא',
        'בצומת אורן בכביש 4 פונים מזרחה (ימינה לבאים מדרום) לכביש 721. אחרי כקילומטר פונים ימינה (דרומה), לחניון הגדול והמסודר של פתחת נחל אורן, בתוך כרם זיתים. נגישות לתחבורה ציבורית: צומת אורן על כביש 4, חצי ק"מ מהחניון.')
const trip3 = new Trip('14278','נווה במדבר - בין עין פרת לעין מבוע', 'דרום', '7 קמ', 'בינוני', 'כן', 'לא',
    'מירושלים נוסעים לכיוון מעלה אדומים וים המלח בכביש המנהרות החדש. עוברים את מחסום חיזמה, ועולים על כביש 437 מזרחה, בכיוון עלמון (ענתות). ניתן גם לנסוע לכיוון מעלה אדומים, וליד הכניסה לאזור התעשייה מעלה אדומים לפנות מערבה לכביש 437 לעלמון.');
const trip4 = new Trip(42513,'קסם לבן בחווארי מצדה', 'דרום', '2 קמ', 'קל', 'לא','לא',
    'מתחילים את ההליכה בחניון האוטובוסים הנמצא מתחת למרכז המבקרים מצדה. מדרום מערב רואים שביל בסימון שחור, ממנו יורדים לנחל.\n' +
    'לאחר כ-250 מטר מגיעים לצומת בין השביל בסימון השחור שבו הלכנו לשביל בסמין ירוק. מכיוון שזהו מסלול מעגלי, ניתן לפנות ימינה עם הסימון ירוק ואז לחזור בחזרה דרך השביל השחור. אך מומלץ להמשיך בהליכה בנחל על השביל השחור.\n' +
    'אחרי שממשיכים ללכת בשביל השחור כ-400 מטר, מגיעים לצומת נוספת בין אותם השבילים. כאן יש לפנות ימינה לכיוון השביל הירוק, וללכת לכיוון מערב.\n' +
    'בחלק זה חשוב מאוד לשים לב לסימון השבילים. לאחר הליכה של כ-500 מטר על השביל הירוק, חוזרים לפיצול השבילים הראשון מתחילת המסלול. בנקודה זאת פונים שמאלה על השביל השחור במעלה הנחל, וחוזרים כפי שבאתם לכיוון חניון האוטובוסים.');
const trip5 = new Trip(23947, 'נחל חווארים', 'דרום','4 קמ', 'בינוני', 'לא', 'לא',
    'ניסע בכביש 40 מכיוון שדה בוקר למצפה רמון. כ-2 ק״מ דרומית לפנייה למדרשת שדה בוקר, נראה שלט המפנה שמאלה לבור חווארים, כאן נחנה את הרכב. חשוב לציין כי זהו מסלול לא מעגלי המחייב הקפצת רכב.\n' +
    'מהחנייה של בור חווארים (בוייז: בור חווארים) נלך מערבה לפי סימון שבילים כחול, נרד לערוץ נחל חווארים, מייד משמאל נראה בור מים נבטי החצוב בסלע. הבור הוא שריד לשבט הנבטים הנודדים שחיו בנגב יותר מ-1,000 שנים, הם חצבו בורות מים שאספו את מי גשמי החורף ובזכותם שלטו על דרך הבשמים הידועה.\n' +
    'מהבור נמשיך בערוץ, ונגיע לשער הצור – שני קירות סלע חום כהה היוצרים מעין שער גדול, סלע הצור קשה ועמיד יותר משאר הסלעים באזור ולכן יצר כאן שני קירות סלע בולטים. מעבר לשער הצור מתרחב הערוץ, נלך עוד כמה דקות עד שנגיע לגבעה שמראשה נשקפת תצפית מרהיבה על האזור נוף הבתרונות.\n' +
    'נמשיך עם השביל היורד מזרחה וחוזר לערוץ, בקטע זה ערוץ הנחל עושה פיתול גדול, נלך בשלוחת סכין בין הערוץ הראשי לערוץ משני המתחבר לנחל. נרד שוב לערוץ הראשי. בהמשך הדרך מתרחב הנחל, כאן המסלע משתנה והופך לחוואר שהינו חומר רך המתפורר בקלות ויוצר נוף של מדרונות תלולים. לאחר הליכה של קילומטר נוסף נגיע לחניון הסרפנטינות כאן מסתיים הטיול – ולכאן יש להקפיץ רכב לאיסוף (בוייז: חניון הסרפנטינות).');
const trip6 = new Trip(49307, 'שביל החורש שתולה', 'צפון', '2 קמ', 'קל', 'לא','כן',
    'מסלול 1 (מעגלי, מסומן באדום ולאחר מכן בשחור, כ-1 ק״מ): מתחילים ומסיימים בכביש 8993, מזרחית למושב שתולה, בצד הכביש ליד גדר בקר. מסלול 2 (מעגלי, מסומן בשחור, כ-1.5 ק״מ): מתחילים ומסיימים בשער בגדר ההיקפית של מושב שתולה. מסלול 3 (קווי, מסומן בשחור ולאחר מכן בכחול): מתחילים במושב שתולה, וממשיכים דרך נחל בצת עילי עד לחניון הסרנים. הליכה של כ-2 ק"מ, או 1 ק"מ עד העיקול בכביש. דורש שני רכבים.');
const trip7 = new Trip(38495, 'שפך נחל שורק וחוף פלמחים', 'מרכז','5 קמ', 'בינוני', 'כן', 'כן',
    'נתחיל את ההליכה בשביל הסלול, שעובר מתחת לגשר כביש לפלמחים. השביל שמגיע עד סכר הסלעים מוביל אותנו אל אי הצבים, אותו יצרה רשות הטבע והגנים בשנת 2002. בקטע זה של הנחל קיימת אוכלוסייה יציבה של צב הביצות. זהו צב בעל שריון שטוח שאורכו מגיע עד 23 ס"מ. הצבים מבלים את רוב זמנם במים, אך מעת לעת יוצאים "להשתזף" בשמש בגדות הנחל והאי. כאשר הצבים חשים בסכנה, הם קופצים מיד למים. אוכלוסיית צב הביצות שרדה בנחל שורק משום שהוא מצליח, מעשה קסמים, להתקיים במים מזוהמים.');
const trip8 = new Trip(39283,'פארק השרון ויער חדרה', 'מרכז', '6 קמ', 'בינוני', 'לא', 'כן',
    'בין רכסי הכורכר של ישובי השרון מסתתר לו פארק השרון, גן לאומי פתוח עם מרחבי צמחייה, פרדסים, אקליפטוסים ובריכות חורף, שהגדולה בהן היא בריכת יער שבחורף מגיעות אליה ציפורים רבות ביניהן עופות מים נדירים ובאביב סביב הבריכה פורחים פרחים בשלל צבעים');
let tripsThatIDid = [trip3,trip4];
let tripsThatIllDo = [trip1,trip2];
let trips = [trip5, trip6, trip7, trip8];

//add trips to trip results page
function addTrips() {
    addDataResults();
    let rows = document.querySelectorAll('tr');
    rows.forEach(row =>{
        row.addEventListener("click", function (){
            row.classList.add("big");
            setTimeout(function (){
            window.location = 'TripReccomendations.html';
            },2000);

        });
    });
}

//add data to trips that i did page
function addDataDid() {
    for (i = 0; i<tripsThatIDid.length; i++) {
        addRowDid(i, tripsThatIDid[i]);
    }
}

//add data to trips that i will do page
function addDataDo() {
    for (i = 0; i<tripsThatIllDo.length; i++) {
        addRowDo(i, tripsThatIllDo[i]);
    }
}

//add data to trips that i will do page
function addDataGroup() {
    for (i = 0; i<tripsThatIllDo.length; i++) {
        addRowGroup(i, tripsThatIllDo[i]);
    }
}

//help function to add data to trip results page
function addDataResults() {
    for (i = 0; i<trips.length; i++) {
        addRowResults(i, trips[i]);
    }
}

//insert trips to the table
function addRowDid(i, trip) {
    let table = document.getElementById("table_body");
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = '11-11-22';
    cell2.innerHTML = trip.tripName;
    cell3.innerHTML = trip.area;
    cell4.innerHTML = trip.description;
    cell5.innerHTML = `<button id='${i}' onclick="openRecommendation('${trip.ID}')">כתוב המלצה</button>`;
}

//insert trips to the table
function addRowDo(i, trip) {
    let table = document.getElementById("table_body1");
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    cell1.innerHTML = trip.tripName;
    cell2.innerHTML = trip.area;
    cell3.innerHTML = trip.difficulty;
    cell4.innerHTML = trip.long;
    cell5.innerHTML = trip.water;
    cell6.innerHTML = trip.shadow;
    cell7.innerHTML = trip.description;
    cell8.innerHTML = `<form action='' id='re${i}' onsubmit="return false">`+
        `<input type='date' id="didDate${i}" placeholder='DD-MM-YYYY' onclick="preventAction()" required>`+
        `<button type='button' class="rtl btnTable" onclick='IdidIt("re${i}","didDate${i}")'>אישור</button>`+
        `</form>`+
        `<button type='submit' class="rtl btnTable" id='re${i}' onclick="removeMembership(this)">הסר</button></form>`;
}

//insert trips to the table
function addRowGroup(i, trip) {
    let table = document.getElementById("table_body1");
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    cell1.innerHTML = trip.tripName;
    cell2.innerHTML = trip.area;
    cell3.innerHTML = trip.difficulty;
    cell4.innerHTML = trip.long;
    cell5.innerHTML = trip.water;
    cell6.innerHTML = trip.shadow;
    cell7.innerHTML = trip.description;
    cell8.innerHTML = `<form action='' id='re${i}' onsubmit="return false">`+
        `<input type='date' id="didDate${i}" placeholder='DD-MM-YYYY' onclick="preventAction()" required>`+
        `<button type='button' class="rtl btnTable" onclick='IdidIt("re${i}","didDate${i}")'>אישור</button>`+
        `</form>`;
}

function goBack(){
    window.location = 'tripsResults.html';
}

//insert trips to the table
function addRowResults(i, trip) {
    let table = document.getElementById("table_body1");
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    cell1.innerHTML = trip.tripName;
    cell2.innerHTML = trip.area;
    cell3.innerHTML = trip.difficulty;
    cell4.innerHTML = trip.long;
    cell5.innerHTML = trip.water;
    cell6.innerHTML = trip.shadow;
    cell7.innerHTML = trip.description;
    cell8.innerHTML = `<button type='button' id='re${i}' class="rtl btnTable" onclick='Idid("${i}")'>ביצעתי</button>`+
      `<form action='' id='rec${i}' style="display: none;" onsubmit="return false">`+
        `<input type='date' id="didDate${i}" placeholder='DD-MM-YYYY' onclick="preventAction()" required>`+
        `<button type='button' class="rtl btnTable" onclick='IdidIt("re${i}","didDate${i}")'>אישור</button>`+
        `</form>`+
        `<button type='button' class="rtl btnTable" onclick='Ido(this)' >ארצה לבצע</button>`;
}


function IdidIt(t,i){
    let date = document.getElementById(i).value;
    const inputDate = new Date(date);
    const dateToday = new Date();
    if(inputDate > dateToday){
        alert("אנא הכנס תאריך מתאים");
        event.stopImmediatePropagation();
    }
    else{
         var k = document.getElementById(t).parentNode.parentNode.rowIndex;
        document.getElementById('results').deleteRow(k);
        event.stopImmediatePropagation();
    }

}

function Ido(t){
        var k = t.parentNode.parentNode.rowIndex;
        document.getElementById('results').deleteRow(k);
        event.stopImmediatePropagation();
}

function Idid(t){
    console.log(`rec${t}`);
    let form = document.getElementById(`rec${t}`);
    form.style.display = "block";
    event.stopImmediatePropagation();
}

function preventAction(){
    event.stopImmediatePropagation();
}

//open reccomendation page to specific trip
function openRecommendation(trip) {
     window.localStorage.setItem('tripOfRec',trip);
     window.location = "WriteRecommendation.html";
}

//create sutable headline to recommendation page
function writeRecommendation(){
     let headLine = document.getElementById("headerPage");
     let trip1 = String(JSON.parse(window.localStorage.getItem('tripOfRec')));
     let trip2 = '';
     tripsThatIDid.forEach(trip =>{
         if(trip.ID == trip1){
             trip2=trip.tripName;
         }
     });
     console.log(trip1.tripName);
     headLine.innerHTML = "המלצה על מסלול - " + trip2;
}
//my profile
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const dob = document.getElementById("dob");
const email = document.getElementById("mail");

//my profile edit content
function edit(){
    firstName.contentEditable = true;
    lastName.contentEditable = true;
    phoneNumber.contentEditable = true;
    dob.contentEditable = false;
    email.contentEditable = true;

    firstName.style.backgroundColor = 'aliceblue';
    lastName.style.backgroundColor = 'aliceblue';
    phoneNumber.style.backgroundColor = 'aliceblue';
    dob.style.backgroundColor = 'aliceblue';
    email.style.backgroundColor = 'aliceblue';
}

//save details after edit
function saveProfileDetails(){
    let mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(firstName.textContent === '' || lastName.textContent === '' || phoneNumber.textContent === '' || email.textContent === ''){
        alert("אנא מלא את השדות הריקים");
    }
    else if(firstName.textContent.length < 2 || lastName.textContent.length < 2){
        alert("שם צריך לכלול לפחות 2 תווים");
    }
    if(phoneNumber.textContent.length != 10){
        alert("מספר טלפון צריך לכלול 10 תווים");
    }
    else if(!/^\d+$/.test(phoneNumber.textContent)){
      alert("טלפון צריך לכלול רק מספרים");
    }
    else if(phoneNumber.textContent.length != 10){
      alert("טלפון צריך לכלול 10 תווים");
    }
    else if(!email.textContent.match(mailFormat)){
        alert("אנא הכנס כתובת מייל באופן תקין");
    }
    else{
        firstName.contentEditable = false;
        lastName.contentEditable = false;
        phoneNumber.contentEditable = false;
        dob.contentEditable = false;
        email.contentEditable = false;

        firstName.style.backgroundColor = 'lightsteelblue';
        lastName.style.backgroundColor = 'lightsteelblue';
        phoneNumber.style.backgroundColor = 'lightsteelblue';
        dob.style.backgroundColor = 'lightsteelblue';
        email.style.backgroundColor = 'lightsteelblue';

        alert("הפרטים עודכנו בהצלחה!");
    }
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

function cancelCreateGroup(){
        let form = document.getElementById("hiddenForm");
        form.style.display = "none";
        let btn = document.getElementById("createBtn");
        btn.style.display = "inline-block";
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

// //remove my membership from specific group
function removeMembership(t){
     var i = t.parentNode.parentNode.rowIndex;
     document.getElementById('myGroups1').rows.item(i).classList.remove("clickable");
     document.getElementById('myGroups1').deleteRow(i);
     alert("הרשומה הוסרה מטבלה זו");
     event.stopImmediatePropagation();
}

//watch group data by click on the row
function watchGroupData(){
    let rows = document.querySelectorAll('.clickable');
    rows.forEach(row =>{
        row.addEventListener("click", function (){
            row.classList.add("big");
            setTimeout(function (){
                window.location = 'GroupData.html';
            },2000);

        });
    });
}

//combobox data
 const areas = ["צפון","מרכז","דרום"];
 const difs = ["קל", "בינוני", "קשה"];
 const longs = ["2 קמ","3 קמ","4 קמ","5 קמ","6 קמ","7 קמ","8 קמ","9 קמ","10 קמ"];
 const waters = ["כן","לא"];
 const shadows = ["כן","לא"];
 const users = [{'lilach@post.bgu.ac.il':'לילך מויאל'},{'liel@post.bgu.ac.il': 'ליאל מוגמי'},
     {'tsoof@post.bgu.ac.il':'צוף בר אור'},{'malialo@post.bgu.ac.il':'אלון מאלי'},{'lofsky@post.bgu.ac.il':'אלמוג לופסקי'},
     {'mayha@post.bgu.ac.il':'מאי חכים'},{'galibir@post.bgu.ac.il':'גלי בירמן'},{'yarden@post.bgu.ac.il':'ירדן עיני'},
     {'furman@post.bgu.aac.il':'עדן פורמן'},{'moshe8@post.bgu.ac.il':'מושיקו כהן'},{'stavdr@post.bgu.ac.il':'סתו דרטבה'},
     {'briman@post.bgu.ac.il':'איל ברימן'}];

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

//insert users to combobox
 function optionsMembers() {
    let selectElement = document.getElementById("optionsMembers");
    let option = document.createElement("option");
    option.value = '';
    option.text = 'בחר';
    selectElement.add(option);
    for(let i=0; i<users.length; i++) {
            let obj = users[i];
            for(var key in obj) {
                let value = key;
                let option = document.createElement("option");
                option.value = value;
                option.text = obj[key]+ ' - ' + value;
                selectElement.add(option);
            }
        }
}

//add users to the group table
function addUserToGroup(){
     let user = document.getElementById("optionsMembers").value;
     let table = document.getElementById("groupMembers");
     if(user === ''){
         alert("אנא בחר חבר שתרצה להוסיף")
     }
     else if(table.rows.length >= 9){
        alert("אין אפשרות להוסיף חברים נוספים, קבוצה יכולה להכיל עד 8 חברים");
     }
     else{
            for(let i=0; i<users.length; i++) {
            let obj = users[i];
            for(let ke in obj) {
                if(ke === user){
                    let key = ke;
                    let value = obj[key];
                    let row = table.insertRow(table.rows.length);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    cell1.innerHTML = `${value}`;
                    cell2.innerHTML = `${key}`;
                   document.querySelectorAll("option").forEach(opt =>{
                       if(opt.value === user){
                           document.getElementById("optionsMembers").remove(opt.index);
                       }
                   });
                   user.text = 'בחר';
                }
            }
        }
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
     else{
        const date = new Date();
         let day = date.getDate();
         let month = date.getMonth() + 1;
         let year = date.getFullYear();

         // This arrangement can be altered based on how we want the date's format to appear.
         let currentDate = `${day}-${month}-${year}`;
         let row = table.insertRow(table.rows.length);
         let cell1 = row.insertCell(0);
         let cell2 = row.insertCell(1);
         let cell3 = row.insertCell(2);
         cell1.innerHTML = `${currentDate}`;
         cell2.innerHTML = `${name}`;
         cell3.innerHTML = `<button @onclick:stopPropagation="true" onclick="removeMembership(this)">הסר חברות</button>`;
         //reset table of group members
        row.addEventListener("click", function (){
            row.classList.add("big");
            setTimeout(function (){
                window.location = 'GroupData.html';
            },2000);

        });
         for(let i=2; i<table1.rows.length;i++){
           table1.deleteRow(i);
        }
        let form = document.getElementById("hiddenForm");
        form.style.display = 'none';
     }
}



