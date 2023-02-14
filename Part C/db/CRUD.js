const sql = require('./db');

const selectOptionsToCombo = (req,res)=>{
    const Q1 = "SELECT * FROM areas"; 
    const Q2 = "SELECT * FROM longoftrips"; 
    const Q3 = "SELECT * FROM difficulties"; 
    const Q4 = "SELECT * FROM yesorno"; 
    sql.query(Q1, (err, mysqlres1)=>{
        if (err) {
            res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
            return;
        };
        sql.query(Q2, (err, mysqlres2)=>{
            if (err) {
                res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                return;
            };
            sql.query(Q3, (err, mysqlres3)=>{
                if (err) {
                    res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                    return;
                };
                sql.query(Q4, (err, mysqlres4)=>{
                    if (err) {
                        res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                        return;
                    };
                    res.render('SearchTrips', {
                        areas: mysqlres1,
                        longoftrips: mysqlres2,
                        difficulties: mysqlres3,
                        yesorno: mysqlres4,
                        presentation:"Presentation",
                        pageTitle: "Search Trips",
                        picture:"Trips"
                    });
                    return;
    
                });
            });
        });
    });
}

const selectTripsByCategories = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    let Q1 = "";
    const user = req.cookies.sign_in_user;
    let area = req.query.optionsAreas;
    let longof = req.query.optionsLong;
    let dif = req.query.optionsDif;
    let shadow = req.query.optionsShadow;
    let water = req.query.optionsWater;
    if(req.cookies.recommendation == 2){
        area = req.cookies.search_area;
        longof = req.cookies.search_long;
        dif = req.cookies.search_dif;
        shadow = req.cookies.search_shadow;
        water = req.cookies.search_water;
    }
    res.cookie("search_area",area);
    res.cookie("search_long",longof);
    res.cookie("search_dif",dif);
    res.cookie("search_water",water);
    res.cookie("search_shadow",shadow);
    if(water != '' & shadow != ''){
        Q1 = "SELECT * FROM trips WHERE area like '"+ area+"' AND longoftrip like '"+ longof +"' AND difficulty like '"+ dif +"' AND water like '"+ req.query.optionsWater + "' AND shadow like '" +shadow+"' AND id NOT IN (SELECT t.id FROM willTrips as w RIGHT JOIN trips as t ON w.tripID=t.id JOIN didTrips as d ON d.tripID=t.id WHERE w.userEmail LIKE ? OR d.userEmail LIKE ?)";
    } 
    else if(water != '' & shadow == ''){
        Q1 = "SELECT * FROM trips WHERE area like '"+ area+"' AND longoftrip like '"+ longof +"' AND difficulty like '"+ dif +"' AND water like '"+ water+"' AND id NOT IN (SELECT t.id FROM willTrips as w RIGHT JOIN trips as t ON w.tripID=t.id JOIN didTrips as d ON d.tripID=t.id WHERE w.userEmail LIKE ? OR d.userEmail LIKE ?)";
    }
    else if(water == '' & shadow != ''){
        Q1 = "SELECT * FROM trips WHERE area like '"+ area+"' AND longoftrip like '"+ longof +"' AND difficulty like '"+ dif +"' AND shadow like '"+ shadow +"' AND id NOT IN (SELECT t.id FROM willTrips as w RIGHT JOIN trips as t ON w.tripID=t.id JOIN didTrips as d ON d.tripID=t.id WHERE w.userEmail LIKE ? OR d.userEmail LIKE ?)";
    }else{
        Q1 = "SELECT * FROM trips WHERE area like '"+ area+"' AND longoftrip like '"+ longof +"' AND difficulty like '"+ dif+"' AND id NOT IN (SELECT t.id FROM willTrips as w RIGHT JOIN trips as t ON w.tripID=t.id JOIN didTrips as d ON d.tripID=t.id WHERE w.userEmail LIKE ? OR d.userEmail LIKE ?)"; 
    }

    res.cookie("recommendation",1);
    sql.query(Q1, [user,user],(err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"חיפוש המסלולים לא התאפשר כתוצאה משגיאה"});
            return;
        };
        res.render('tripsResults', {
            pple: mysqlres,
            picture:"Trips",
            presentation:"presentationTrips",
            pageTitle: "Search Results"
        });
        return;
    });
};

const selectTripsIDid = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const user = req.cookies.sign_in_user;
    const Q1 = "SELECT * FROM didTrips as d join trips as t on d.tripID=t.id WHERE d.userEmail =? ORDER BY d.commitDate"; 
    sql.query(Q1,user, (err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"המסלולים שביצעת לא הועלו כתוצאה משגיאה"});
            return;
        };
        res.render('TripsThatIDid', {
            trips: mysqlres,
            picture: "Trips",
            presentation:"presentationTrips",
            pageTitle: "Trips That I Did"
        });
        return;
    });
}

const IdidItNow = (req,res)=>{
    const user = req.cookies.sign_in_user;
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const didIt = {
        "tripID": req.body.tripThatIDidNow,
        "userEmail": user,
        "commitDate":req.body.commitionDate
    };
    const Q1 = "INSERT INTO didTrips SET ?"
    const Q2 = "DELETE FROM willTrips WHERE tripID=? AND userEmail=?"
    sql.query(Q1, didIt,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"עדכון הביצוע לא התאפשר"});
            return;
        }
        sql.query(Q2,[req.body.tripThatIDidNow,user],(err,mysqlres) =>{
            if(err){
                console.log("error:", err);
                res.status(400).send({message:"עדכון הביצוע לא התאפשר"});
                return;
            }
            res.redirect('TripsThatIWillDo');
            return;
        });
    });
}

const IdidItNowResults = (req,res)=>{
    const user = req.cookies.sign_in_user;
    if(!req.body){
        res.status(400).send({message: "אנא הכנס תאריך מתאים"});
        return;
    }
    const didIt = {
        "tripID": req.body.tripThatIDidNow1,
        "userEmail": user,
        "commitDate":req.body.commitionDate1
    };
    const Q1 = "INSERT INTO didTrips SET ?"
    sql.query(Q1,didIt ,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"עדכון הביצוע לא התאפשר"});
            return;
        }
        res.cookie("recommendation",2);
        res.redirect('tripsResults');
        return;
    });
}

const selectTripsIWillDo = (req,res)=>{
    const user = req.cookies.sign_in_user;
    const Q1 = "SELECT * FROM willTrips as w join trips as t on w.tripID=t.id WHERE w.userEmail=?"; 
    sql.query(Q1,user, (err, mysqlres)=>{
        if (err) {
            console.log("פרטי המסלולים שתרצה לבצע לא הועלו כתוצאה משגיאה");
            res.status(400).send("פרטי המסלולים שתרצה לבצע לא הועלו כתוצאה משגיאה");
            return;
        };
        res.render('TripsThatIWillDo', {
            trips: mysqlres,
            picture: "Trips",
            presentation:"presentationTrips",
            pageTitle: "Trips That I Did"
        });
        return;
    });
};

const IWantToDoIt = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const trip = req.body.tripThatIWant;
    const user = req.cookies.sign_in_user;
    const todo = {
        "tripID": trip,
        "userEmail": user
    }
    const Q1="INSERT INTO willTrips SET ?";
    sql.query(Q1,todo,(err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send("המסלול לא התווסף כתוצאה משגיאה");
            return;
        };
        res.cookie("recommendation",2);
        res.redirect('tripsResults');
        return;
    });
};

const IDontWantToDoIt = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const trip = req.body.tripThatIWontDo;
    console.log(trip);
    const user = req.cookies.sign_in_user;
    const Q1="DELETE FROM willTrips where userEmail=? and tripID=?";
    sql.query(Q1,[user,trip],(err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"עדכון הביצוע לא התאפשר"});
            return;
        };
        res.redirect('TripsThatIWillDo');
        return;
    });
};

const readRecommendations = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    res.cookie("recommendation",2);
    const id= req.query.recommendations;
    const Q1="SELECT * FROM recommendations WHERE tripID =?";
    sql.query(Q1,id,(err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"עדכון הביצוע לא התאפשר"});
            return;
        };
        res.render('TripRecomendations',{
            rec: mysqlres,
            presentation:"presentationTrips",
            pageTitle: "Trip Recommendations"
        });
        return;
    });
};

const selectTripName = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const Q1 = "SELECT tripname,id FROM trips WHERE id=?"; 
    const trip=req.query.wantToRecommandID;
    sql.query(Q1,trip, (err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"לא הועברת לדף כתיבת ההמלצה כתוצאה משגיאה"});
            return;
        };
        res.render('WriteRecommendation', {
            trip: mysqlres[0].tripname,
            tripID: mysqlres[0].id,
            picture: "Trips",
            presentation:"presentationTrips",
            pageTitle: "Write Recommendation"
        });
        return;
    });
}

const createUser = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const newUser = {
        "email": req.body.emailSignUp,
        "firstname": req.body.firstNameSignUp,
        "lastname":req.body.lastNameSignUp,
        "dob":req.body.dobSignUp,
        "phoneNumber": req.body.phoneNumberSignUp,
        "password": req.body.passwordSignUp
    };
    const Q1 = "INSERT INTO users SET ?"
    sql.query(Q1, newUser,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).render('SignIn',{
                v1:"המייל נמצא בשימוש, התחבר במקום",
                picture:"SignIn"
            });
            return;
        }
        res.cookie("sign_in_user", req.body.emailSignUp);
        const Q2 = "SELECT * FROM areas"; 
            const Q3 = "SELECT * FROM longoftrips"; 
            const Q4 = "SELECT * FROM difficulties"; 
            const Q5 = "SELECT * FROM yesorno"; 
            sql.query(Q2, (err, mysqlres1)=>{
                if (err) {
                    res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                    return;
                };
                sql.query(Q3, (err, mysqlres2)=>{
                    if (err) {
                        res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                        return;
                    };
                    sql.query(Q4, (err, mysqlres3)=>{
                        if (err) {
                            res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                            return;
                        };
                        sql.query(Q5, (err, mysqlres4)=>{
                            if (err) {
                                res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                                return;
                            };
                            res.render('SearchTrips',{
                                v1: "ברוכה הבאה " + req.body.emailSignUp,
                                areas: mysqlres1,
                                longoftrips: mysqlres2,
                                difficulties: mysqlres3,
                                yesorno: mysqlres4,
                                presentation:"Presentation",
                                pageTitle: "Search Trips",
                                picture:"Trips",
                                func: "addOptions()"
                            });
                            return;
                        });
                    });
                });
            });
    });
};

const validateUser = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    console.log(req.body);
    const Q1 = "SELECT * FROM users WHERE email=? AND password=?";
    sql.query(Q1, [req.query.emailSignIn,req.query.passwordSignIn], (err, mysqlres) => {
        if(mysqlres.length>0){
            res.cookie("sign_in_user",req.query.emailSignIn);
            const Q2 = "SELECT * FROM areas"; 
            const Q3 = "SELECT * FROM longoftrips"; 
            const Q4 = "SELECT * FROM difficulties"; 
            const Q5 = "SELECT * FROM yesorno"; 
            sql.query(Q2, (err, mysqlres1)=>{
                if (err) {
                    console.log("error:", err);
                    res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                    return;
                };
                sql.query(Q3, (err, mysqlres2)=>{
                    if (err) {
                        console.log("error:", err);
                        res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                        return;
                    };
                    sql.query(Q4, (err, mysqlres3)=>{
                        if (err) {
                            console.log("error:", err);
                            res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                            return;
                        };
                        sql.query(Q5, (err, mysqlres4)=>{
                            if (err) {
                                console.log("error:", err);
                                res.status(400).send({message:"לא ניתן לחפש מסלולים כתוצאה משגיאה"});
                                return;
                            };
                            res.render('SearchTrips', {
                                v1: "ברוכה הבאה " + req.query.emailSignIn,
                                areas: mysqlres1,
                                longoftrips: mysqlres2,
                                difficulties: mysqlres3,
                                yesorno: mysqlres4,
                                presentation:"Presentation",
                                pageTitle: "Search Trips",
                                picture:"Trips"
                            });
                            return;
                        });
                    });
                });
            });
        }
        else{
            console.log("error: ", err);
            res.status(400).render('SignIn',{
                v1:"הפרטים שהזנת שגויים",
                picture:"SignIn"
            });
            return;
        }
    });
};

const selectUserDetails = (req, res)=>{
    const user = req.cookies.sign_in_user;
    if(!req.body){
        res.status(400).send({message: "אנא מלא את כל השדות"});
        return;
    }
    const Q1 = "select * FROM users where email=?"
    sql.query(Q1,user,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"פרטי הפרופיל שלך לא הועלו כתוצאה משגיאה"});
            return;
        }
        const dobDate = new Date(mysqlres[0].dob);
        console.log("פרטי המשתמש הועלו בהצלחה");
        console.log(mysqlres);
        res.render('MyProfile',{
            email:mysqlres[0].email,
            firstname:mysqlres[0].firstname,
            lastname:mysqlres[0].lastname,
            phonenumber:mysqlres[0].phoneNumber,
            dob:dobDate,
            picture: "MyProfile",
            presentation:"Presentation",
            pageTitle: "My Profile"
        });
        return;
    });
}

const updateUserDetails = (req,res)=>{
    const user = req.cookies.sign_in_user;
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const user_email = req.body.mail;
    const userData = {
        "firstname": req.body.firstName,
        "lastname":req.body.lastName,
        "phoneNumber": req.body.phoneNumber
    };
    const Q1 = "update users SET ? where email = ?"
    sql.query(Q1,[userData,user],(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"פרטי הפרופיל שלך לא עודכנו כתוצאה משגיאה"});
            return;
        }
        res.redirect('MyProfileDetails');
        return;
    });
};

const selectAllGroups = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const user = req.cookies.sign_in_user; 
    sql.query("SELECT * FROM `groupMembers` as gm LEFT JOIN `groups` as gr on gm.groupID=gr.id where gm.userEmail=? ORDER BY gr.creationdate", user,(err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"פרטי הקבוצות שאתה חבר בהן לא הועלו כתוצאה משגיאה"});
            return;
        };
        sql.query("create table if not exists `groupcreation`(email varchar(255) primary key,firstname varchar(255) not null,lastname varchar(255) not null, groupID int(11) not null)",(err, resul)=>{
            if (err) {
                console.log("error:", err);
                res.status(400).send({message:"פרטי הקבוצות שאתה חבר בהן לא הועלו כתוצאה משגיאה"});
                return;
            };
            sql.query("SELECT * FROM users where email<>? AND email NOT IN (SELECT email FROM groupcreation)", user,(err, results )=>{
                if (err) {
                    console.log("error:", err);
                    res.status(400).send({message:"פרטי הקבוצות שאתה חבר בהן לא הועלו כתוצאה משגיאה"});
                    return;
                };
                sql.query("SELECT * FROM users WHERE email=?",user,(err, details)=>{
                    if (err) {
                        console.log("error:", err);
                        res.status(400).send({message:"פרטי הקבוצות שאתה חבר בהן לא הועלו כתוצאה משגיאה"});
                        return;
                    };
                    sql.query("SELECT * FROM groupcreation",(err, resu)=>{
                        if (err) {
                            console.log("error:", err);
                            res.status(400).send({message:"פרטי הקבוצות שאתה חבר בהן לא הועלו כתוצאה משגיאה"});
                            return;
                        };
                        res.cookie("fromWhere",1);
                        res.cookie("firstnameUser",details[0].firstname);
                        res.cookie("lastnameUser",details[0].lastname);
                        if(req.cookies.createGroup == 1){
                            res.render('MyGroups', {
                                userEmail:user,
                                firstName: details[0].firstname,
                                lastName: details[0].lastname,
                                pple: results,
                                groups: mysqlres,
                                groupMembers: resu,
                                func:"addFriendFormGroup()",
                                picture:"MyGroups",
                                presentation:"presentationTrips",
                                pageTitle: "My Groups"
                        });
                        return; 
                        }
                        res.render('MyGroups', {
                            userEmail:user,
                            firstName: details[0].firstname,
                            lastName: details[0].lastname,
                            pple: results,
                            groups: mysqlres,
                            groupMembers: resu,
                            picture:"MyGroups",
                            presentation:"presentationTrips",
                            pageTitle: "My Groups"
                    });
                    return;
                });
            });
            
        });
    });
});
};

const removeMembership = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const Q1 = "delete FROM `groupMembers` as gm where gm.userEmail=? and gm.groupID=?";
    const user = req.cookies.sign_in_user;
    const group = req.body.removeMembership; 
    sql.query(Q1, [user,group],(err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message:"החברות בקבוצה לא הוסרה"});
            return;
        };
        res.redirect('MyGroups');
        return;
        });
};

const createContact = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "אנא מלא את השדות הרלוונטיים"});
        return;
    }
    const Q1 = "INSERT INTO contactus SET ?";
    const dateToday = new Date();
    const contact = {
        "email":req.body.emailContUs,
        "firstname":req.body.firstNameContUs,
        "lastname":req.body.lastNameContUs,
        "recdate":dateToday,
        "content":req.body.textContUs
    }
    sql.query(Q1, contact,(err, mysqlres)=>{
        if (err) {
            res.status(400).send({message:"פרטי ההודעה לא הועברו להנהלת האתר כתוצאה משגיאה"});
            return;
        };
        res.redirect('HomePage');
        return;
    });
};

const createContactAfterSign = (req, res)=>{
    const user = req.cookies.sign_in_user;
    if(!req.body){
        res.status(400).send({message: "אנא מלא את תוכן ההודעה"});
        return;
    }
    const Q1 = "select * FROM users where email=?";
    const Q2="INSERT INTO contactus(email,firstname,lastname,recdate,content) VALUES(?,?,?,?,?)";
    const dateToday = new Date();
    sql.query(Q1,user,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"פרטי ההודעה לא הועברו להנהלת האתר כתוצאה משגיאה"});
            return;
        }
        const details = [mysqlres[0].email,mysqlres[0].firstname,mysqlres[0].lastname,dateToday, req.body.contUsSignIn];
        sql.query(Q2,details,(err,results) =>{
            if(err){
                console.log("error:", err);
                res.status(400).send({message:"פרטי ההודעה לא הועברו להנהלת האתר כתוצאה משגיאה"});
                return;
            }
            console.log("תוכן ההודעה הועבר בהצלחה להנהלת האתר");
            res.redirect('SearchTrips');
            return;
        });
    });
};

const writeRecommendation = (req, res)=>{
    const user = req.cookies.sign_in_user;
    if(!req.body){
        res.status(400).send({message: "אנא הזן את תוכן ההמלצה"});
        return;
    }
    const Q1="INSERT INTO recommendations SET ?";
    const dateToday = new Date();
    const recommendation={
        "user":user,
        "tripID":req.body.recommendTrip,
        "recdate":dateToday,
        "content":req.body.bigTextBox
    }
    sql.query(Q1,recommendation,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"תוכן ההמלצה לא הועלה בעקבות שגיאה"});
            return;
        }
        console.log("פרטי ההמלצה הועלו בהצלחה");
        res.redirect('TripsThatIDid');
        return;
    });
};

const createAddGroupMember = (req, res,next)=>{
    const add = req.body.optionsMembers;
    console.log(add);
    if(!req.body){
        res.status(400).send({message: "אנא הוסף חבר לקבוצה"});
        return;
    }
    const Q1="SELECT * FROM users WHERE email= ?";
    sql.query(Q1,add,(err,mysqlres1) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"החבר החדש לא התווסף לקבוצה בעקבות שגיאה"});
            return;
        }
        console.log(mysqlres1);
        const Q2 = "SELECT * FROM `groups` ORDER BY id DESC";
        sql.query(Q2,(err,mysqlres2) =>{
            if(err){
                console.log("error:", err);
                res.status(400).send({message:"החבר החדש לא התווסף לקבוצה בעקבות שגיאה"});
                return;
            }
            console.log(mysqlres2);
            const Q3="INSERT INTO groupcreation SET ?";
            const newMember = {
                "email": mysqlres1[0].email,
                "firstname": mysqlres1[0].firstname,
                "lastname": mysqlres1[0].lastname,
                "groupID": mysqlres2[0].id+1
            }
            sql.query(Q3,newMember,(err,mysqlres) =>{
                if(err){
                    console.log("error:", err);
                    res.status(400).send({message:"החבר החדש לא התווסף לקבוצה בעקבות שגיאה"});
                    return;
                }
                res.cookie("createGroup",1);
                res.redirect('MyGroups');
                return;
        });
    });
});

};

const cancelCreation = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const Q1="DROP TABLE IF EXISTS groupcreation;";
    sql.query(Q1,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"הטבלה לא הוסרה"});
            return;
        }
        res.cookie("createGroup",2);
        res.redirect('MyGroups');
        return;
    });

};

const createGroup = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const name = req.body.groupName;
    const dateToday = new Date();
    const newGroup = {
       "creationdate": dateToday,
       "name": name 
    };
    console.log(newGroup);
    const Q1="INSERT INTO `groups` SET ?";
    sql.query(Q1,newGroup,(err,mysqlres1) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"הקבוצה החדשה לא נוצרה בעקבוץ שגיאה"});
            return;
        }
        const Q2 = "SELECT * FROM users WHERE email=?";
        sql.query(Q2,req.cookies.sign_in_user,(err,mysqlres2) =>{
            if(err){
                console.log("error:", err);
                res.status(400).send({message:"הקבוצה החדשה לא נוצרה בעקבות שגיאה"});
                return;
            }
            const Q3 = "SELECT * FROM `groups` ORDER BY id DESC";
            sql.query(Q3,(err,mysqlres3) =>{
                if(err){
                    console.log("error:", err);
                    res.status(400).send({message:"הקבוצה החדשה לא נוצרה בעקבות שגיאה"});
                    return;
                }
                const Q4 = "INSERT INTO  groupcreation SET ?";
                const me = {
                    "email": req.cookies.sign_in_user,
                    "firstname": mysqlres2[0].firstname,
                    "lastname": mysqlres2[0].lastname,
                    "groupID": mysqlres3[0].id
                }
                sql.query(Q4,me,(err,mysqlres4) =>{
                    if(err){
                        console.log("error:", err);
                        res.status(400).send({message:"הקבוצה החדשה לא נוצרה בעקבות שגיאה"});
                        return;
                    }
                    const Q5="INSERT INTO groupMembers(groupID ,userEmail) SELECT groupID,email FROM groupcreation;";
                    sql.query(Q5,(err,mysqlres5) =>{
                        if(err){
                            console.log("error:", err);
                            res.status(400).send({message:"הקבוצה החדשה לא נוצרה בעקבות שגיאה"});
                            return;
                        }
                        const Q6="DROP TABLE IF EXISTS groupcreation;";
                        sql.query(Q6,(err,mysqlres6) =>{
                            if(err){
                                console.log("error:", err);
                                res.status(400).send({message:"הקבוצה החדשה לא נוצרה בעקבות שגיאה"});
                                return;
                            }
                            res.cookie("createGroup",2);
                            res.redirect('MyGroups');
                            return;
                        });
                    });
                });
            });
        });
    });
};

const WatchGroupData = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    let group;
    if(req.cookies.fromWhere == 1){
        group = req.query.groupData;
        res.cookie("group",group)
    }
    else{
        group= req.cookies.group;
    }
    const Q1="SELECT * FROM users as u RIGHT JOIN groupMembers as g on g.userEmail=u.email HAVING g.groupID=?";
    sql.query(Q1,group,(err,mysqlres1) =>{
        if(err){
            console.log("error:", err);
            res.status(400).send({message:"1לא ניתן לצפות בפרטי הקבוצה כתוצאה משגיאה"});
            return;
        }
        const Q2 = "SELECT * FROM trips WHERE id in (SELECT tripID FROM (SELECT w.tripID,g.groupID,count(*) as numofmembers FROM groupMembers as g LEFT JOIN willTrips as w on g.userEmail=w.userEmail WHERE g.groupID=? GROUP BY g.groupID,w.tripID HAVING numofmembers=(SELECT count(*) FROM groupMembers WHERE groupID=?)) as r)"
        sql.query(Q2,[group,group],(err,mysqlres2) =>{
            if(err){
                console.log("error:", err);
                res.status(400).send({message:"2לא ניתן לצפות בפרטי הקבוצה כתוצאה משגיאה"});
                return;
            }
            const Q3="SELECT * FROM users WHERE email NOT IN (SELECT userEmail FROM groupMembers WHERE groupID=?)";
            sql.query(Q3,group,(err, mysqlres3 )=>{
                if (err) {
                    console.log("error:", err);
                    res.status(400).send({message:"3לא ניתן לצפות בפרטי הקבוצה כתוצאה משגיאה"});
                    return;
                };
                res.render('GroupData',{
                    groupMembers: mysqlres1,
                    trips: mysqlres2,
                    users: mysqlres3,
                    picture:"MyGroups",
                    presentation:"presentationTrips",
                    pageTitle: "Group Data"
                });
                return;
            });
        });
    });
};

const addMemberAfterCreation = (req, res)=>{
    const Q1="INSERT INTO groupMembers SET ?;";
    const member = {
        "groupID": req.cookies.group,
        "userEmail": req.body.optionsMembers
    }
    sql.query(Q1,member,(err,mysqlres) =>{
        if(err){
            console.log("error:", err);
            res.status(400).render("GroupData",{message:"החבר החדש לא התווסף לקבוצה כתוצאה משגיאה"});
            return;
        }
        res.cookie("fromWhere",2)
        res.redirect('GroupData');
        return;
    });
};

module.exports= {selectTripsByCategories,createUser,validateUser, updateUserDetails,selectUserDetails,selectTripsIDid,selectTripsIWillDo,
    IDontWantToDoIt,IdidItNow,selectTripName,selectAllGroups,removeMembership,createContact,createContactAfterSign,writeRecommendation,IdidItNowResults,
IWantToDoIt,readRecommendations,createAddGroupMember,cancelCreation,createGroup,WatchGroupData,addMemberAfterCreation,selectOptionsToCombo};