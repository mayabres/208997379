const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const CRUD = require('./db/CRUD');
const CreateDB = require('./db/CreateDB');
const port = 3000;
const cookieParser = require('cookie-parser');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');


//create DB
app.get('/CreateTable',[CreateDB.CreateTableAreas,
                        CreateDB.CreateTableLong,
                        CreateDB.CreateTableDifficulty,
                        CreateDB.CreateTableYesOrNo,
                        CreateDB.CreateTableUsers,
                        CreateDB.CreateTableTrips,
                        CreateDB.CreateTableGroups,
                        CreateDB.CreateTableWillTrips,
                        CreateDB.CreateTableDidTrips,
                        CreateDB.CreateTableGroupMembers,
                        CreateDB.CreateTableRecommendations,
                        CreateDB.CreateTableContactUs]);

app.get('/InsertTable',[CreateDB.InsertDataAreas,
                        CreateDB.InsertDataLongOfTrips,
                        CreateDB.InsertDataDifficulty,
                        CreateDB.InsertDataYesOrNo,
                        CreateDB.InsertDataUsers,
                        CreateDB.InsertDataTrips,
                        CreateDB.InsertDataWillTrips,
                        CreateDB.InsertDataDidTrips,
                        CreateDB.InsertDataGroups,
                        CreateDB.InsertDataRecommendations,
                        CreateDB.InsertDataContactUs,
                        CreateDB.InsertDataGroupMembers]);

app.get('/ShowTable',CreateDB.ShowTable);
app.get('/ShowTableAreas',CreateDB.ShowTableAreas);
app.get('/ShowTableLongOfTrips',CreateDB.ShowTableLongOfTrips);
app.get('/ShowTableDifficulties',CreateDB.ShowTableDifficulties);
app.get('/ShowTableYesOrNo',CreateDB.ShowTableYesOrNo);
app.get('/ShowTableUsers',CreateDB.ShowTableUsers);
app.get('/ShowTableTrips',CreateDB.ShowTableTrips);
app.get('/ShowTableGroups',CreateDB.ShowTableGroups);
app.get('/ShowTableWillTrips',CreateDB.ShowTableWillTrips);
app.get('/ShowTableDidTrips',CreateDB.ShowTableDidTrips);
app.get('/ShowTableGroupMembers',CreateDB.ShowTableGroupMembers);
app.get('/ShowTableRecommendations',CreateDB.ShowTableRecommendations);
app.get('/ShowTableContactUs',CreateDB.ShowTableContactUs);

app.get('/DeleteTable',[CreateDB.DropTableGroupCreation,
                        CreateDB.DropTableContactUs,
                        CreateDB.DropTableRecommendations,
                        CreateDB.DropTableGroupMembers,
                        CreateDB.DropTableDidTrips,
                        CreateDB.DropTableWillTrips,
                        CreateDB.DropTableGroups,
                        CreateDB.DropTableTrips,
                        CreateDB.DropTableAreas,
                        CreateDB.DropTableLongOfTrips,
                        CreateDB.DropTableDifficulties,
                        CreateDB.DropTableYesOrNo,
                        CreateDB.DropTableUsers]);

//post queries
app.post('/UpdateUserDetails', CRUD.updateUserDetails);
app.post('/IDontWantToDoIt', CRUD.IDontWantToDoIt);
app.post('/IWantToDoIt', CRUD.IWantToDoIt);
app.post('/IDidTheTrip', CRUD.IdidItNow);
app.post('/IDidTheTripResults', CRUD.IdidItNowResults);
app.post('/RemoveMembership', CRUD.removeMembership);
app.post('/CreateContact', CRUD.createContact);
app.post('/createContactAfterSign', CRUD.createContactAfterSign);
app.post('/sendRecommendation', CRUD.writeRecommendation);
app.post('/createAddMember', CRUD.createAddGroupMember);
app.post('/cancelCreation', CRUD.cancelCreation);
app.post('/createGroup', CRUD.createGroup);
app.post('/addMemberAfterCreation', CRUD.addMemberAfterCreation);
app.post('/createNewUser',CRUD.createUser);

//get queries
app.get('/TripRecomendations', CRUD.readRecommendations);
app.get('/LogIn', CRUD.validateUser);
app.get('/MyProfileDetails', CRUD.selectUserDetails);
app.get('/tripsResults',CRUD.selectTripsByCategories);
app.get('/TripsThatIDid', CRUD.selectTripsIDid);
app.get('/TripsThatIWillDo', CRUD.selectTripsIWillDo);
app.get('/WriteRecommendation', CRUD.selectTripName);
app.get('/MyGroups',CRUD.selectAllGroups);
app.get('/GroupData',CRUD.WatchGroupData);
app.get('/SearchTrips', CRUD.selectOptionsToCombo);

app.get('/Check', (req,res)=>{
    res.redirect('MyGroups');
});

app.get('/ContactUsAfterSignIn', (req,res)=>{
    res.render('ContactUsAfterSignIn',{
        presentation:"Presentation",
        pageTitle: "Contact Us",
        picture:"ContactUs"
    });
});

app.get('/', (req,res)=>{
    res.render('HomePage');
});

app.get('/HomePage', (req,res)=>{
    res.render('HomePage');
});

app.get('/AboutUs', (req,res)=>{
    res.render('AboutUs',{
        picture:"AboutUs",
        footerAbout:"footHomePage"
    });
});

app.get('/ContactUs', (req,res)=>{
    res.render('ContactUs',{
        picture:"ContactUs"
    });
});

app.get('/SignIn', (req,res)=>{
    res.render('SignIn', {
        v1: 'אנא הכנס/י מייל וסיסמה כדי להתחבר לאתר',
        picture: "SignIn"
    });
});

app.get('/SignUp', (req,res)=>{
    res.render('SignUp',{
        picture:"SignUp"
    });
});

app.get('/backToResults', (req,res)=>{
    res.redirect('tripsResults');
});

app.listen(port, () =>{
    console.log("server is running on port ", port);
});
