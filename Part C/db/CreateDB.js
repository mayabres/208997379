var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const CreateTableAreas = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `areas`(area VARCHAR(255) primary key not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created areas table');
    })
    next();     
}

const CreateTableLong = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `longoftrips`(longoftrip VARCHAR(255) primary key not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created longs table');
    })
    next();     
}

const CreateTableDifficulty = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `difficulties`(difficulty VARCHAR(255) primary key not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created difficulties table');
    })
    next();     
}

const CreateTableYesOrNo = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `yesorno`(yesorno VARCHAR(255) primary key not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created yesorno table');
    })
    next();     
}

const CreateTableUsers = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `users`(email VARCHAR(255) primary key,firstname VARCHAR(255) not null,lastname VARCHAR(255) not null,dob date not null,phoneNumber VARCHAR(10) not null,password VARCHAR(255) not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created users table');
    })
    next();     
}

const CreateTableTrips = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `trips`(id INT(11) not null primary key auto_increment,tripname VARCHAR(255) not null,area VARCHAR(255) not null,longoftrip VARCHAR(255) not null,difficulty VARCHAR(255) not null,water VARCHAR(2) not null,shadow VARCHAR(2) not null,description VARCHAR(1500) not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created trips table');
    })
    next();     
}

const CreateTableGroups = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `groups`(id INT(11) not null primary key auto_increment,creationdate DATE not null,name VARCHAR(50) not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created groups table');
    })
    next();     
}

const CreateTableWillTrips = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `willTrips`(tripID INT(11)  not null references trips(id),userEmail VARCHAR(255) not null references users(email),primary key (tripID ,userEmail))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created willTrips table');
    })
    next();     
}

const CreateTableDidTrips = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `didTrips`(tripID INT(11)  not null references trips(id),userEmail VARCHAR(255) not null references users(email),commitDate DATE not null,primary key (tripID ,userEmail))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created didTrips table');
    })
    next();     
}

const CreateTableGroupMembers = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `groupMembers`(groupID INT(11) not null,userEmail VARCHAR(255) not null references users(email),primary key (groupID , userEmail ))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created groupMembers table');
    })
    next();     
}

const CreateTableRecommendations = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `recommendations`(user VARCHAR(255) not null references users(email),tripID INT(11) not null references trips(id),recdate DATETIME not null,content VARCHAR(255) not null,primary key(user,tripID,recdate))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created recommendations table');
    })
    next();     
}

const CreateTableContactUs = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `contactus`(email VARCHAR(255) not null,firstname VARCHAR(255) not null,lastname VARCHAR(255) not null,recdate DATETIME not null,content VARCHAR(255) not null,primary key (email,recdate))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created contactus table');
        res.send("all tables created");
        return;
    })
}

const InsertDataAreas = (req,res,next)=>{
    var Q2 = "INSERT INTO areas SET ?";
    const csvFilePath= path.join(__dirname, "/content/areas.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "area": element.area
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataLongOfTrips = (req,res,next)=>{
    var Q2 = "INSERT INTO longoftrips SET ?";
    const csvFilePath= path.join(__dirname, "/content/longoftrip.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "longoftrip": element.longoftrip
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataDifficulty = (req,res,next)=>{
    var Q2 = "INSERT INTO difficulties SET ?";
    const csvFilePath= path.join(__dirname, "/content/difficulty.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "difficulty": element.difficulty
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataYesOrNo = (req,res,next)=>{
    var Q2 = "INSERT INTO yesorno SET ?";
    const csvFilePath= path.join(__dirname, "/content/yesorno.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "yesorno": element.yesorno
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataUsers = (req,res,next)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "/content/users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email,
            "firstname": element.firstname,
            "lastname": element.lastname,
            "dob": element.dob,
            "phoneNumber": element.phoneNumber,
            "password": element.password
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataTrips = (req,res,next)=>{
    var Q2 = "INSERT INTO trips SET ?";
    const csvFilePath= path.join(__dirname, "/content/trips.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "tripname": element.tripname,
            "area": element.area,
            "longoftrip": element.longoftrip,
            "difficulty": element.difficulty,
            "water": element.water,
            "shadow": element.shadow,
            "description": element.description
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataWillTrips = (req,res,next)=>{
    var Q2 = "INSERT INTO willTrips SET ?";
    const csvFilePath= path.join(__dirname, "/content/willTrips.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "tripID": element.tripID,
            "userEmail": element.userEmail
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataDidTrips = (req,res,next)=>{
    var Q2 = "INSERT INTO didTrips SET ?";
    const csvFilePath= path.join(__dirname, "/content/didTrips.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "tripID": element.tripID,
            "userEmail": element.userEmail,
            "commitDate": element.commitDate
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataGroups = (req,res,next)=>{
    var Q2 = "INSERT INTO `groups` SET ?";
    const csvFilePath= path.join(__dirname, "/content/groups.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "creationdate": element.creationdate,
            "name":element.name
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataRecommendations = (req,res,next)=>{
    var Q2 = "INSERT INTO recommendations SET ?";
    const csvFilePath= path.join(__dirname, "/content/recommendations.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "user": element.user,
            "tripID": element.tripID,
            "recdate":element.recdate,
            "content":element.content
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataContactUs = (req,res,next)=>{
    var Q2 = "INSERT INTO contactus SET ?";
    const csvFilePath= path.join(__dirname, "/content/contactus.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email,
            "firstname": element.firstname,
            "lastname":element.lastname,
            "recdate":element.recdate,
            "content":element.content
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    next()
};

const InsertDataGroupMembers = (req,res)=>{
    var Q2 = "INSERT INTO groupMembers SET ?";
    const csvFilePath= path.join(__dirname, "/content/groupMembers.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "groupID": element.groupID,
            "userEmail": element.userEmail
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    res.send("data inserted");

};

const DropTableGroupCreation = (req, res, next)=>{
    var Q4 = "DROP TABLE IF EXISTS groupcreation";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table groupcreation dropped");
    })
    next()
}

const DropTableContactUs = (req, res, next)=>{
    var Q4 = "DROP TABLE contactus";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table contactus dropped");
    })
    next()
}

const DropTableRecommendations = (req, res, next)=>{
    var Q4 = "DROP TABLE recommendations";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table recommendations dropped");
    })
    next()
}

const DropTableGroupMembers = (req, res, next)=>{
    var Q4 = "DROP TABLE groupMembers";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table groupMembers dropped");
    })
    next()
}

const DropTableDidTrips = (req, res, next)=>{
    var Q4 = "DROP TABLE didTrips";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table didTrips dropped");
    })
    next()
}

const DropTableWillTrips = (req, res, next)=>{
    var Q4 = "DROP TABLE willTrips";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table willTrips dropped");
    })
    next()
}

const DropTableGroups = (req, res, next)=>{
    var Q4 = "DROP TABLE `groups`";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table groups dropped");
    })
    next()
}

const DropTableTrips = (req, res, next)=>{
    var Q4 = "DROP TABLE trips";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table trips dropped");
    })
    next()
}

const DropTableAreas = (req, res, next)=>{
    var Q4 = "DROP TABLE areas";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table areas dropped");
    })
    next()
}

const DropTableLongOfTrips = (req, res, next)=>{
    var Q4 = "DROP TABLE longoftrips";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table longoftrips dropped");
    })
    next()
}

const DropTableDifficulties = (req, res, next)=>{
    var Q4 = "DROP TABLE difficulties";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table difficulties dropped");
    })
    next()
}

const DropTableYesOrNo = (req, res, next)=>{
    var Q4 = "DROP TABLE yesorno";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table yesorno dropped");
    })
    next()
}

const DropTableUsers = (req, res)=>{
    var Q4 = "DROP TABLE users";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table users drpped");
        res.send("tables dropped");
        return;
    })
}

const ShowTableAreas = (req,res)=>{
    var Q3 = "SELECT * FROM areas";
    SQL.query(Q3, (err, mySQLres1)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table areas");
        res.send({mySQLres1});
        return;
    })};

const ShowTableLongOfTrips = (req,res)=>{
    var Q3 = "SELECT * FROM longoftrips";
    SQL.query(Q3, (err, mySQLres1)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table longoftrips");
        res.send({mySQLres1});
        return;
    })};

const ShowTableDifficulties = (req,res)=>{
    var Q3 = "SELECT * FROM difficulties";
    SQL.query(Q3, (err, mySQLres1)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table difficulties");
        res.send({mySQLres1});
        return;
    })};

const ShowTableYesOrNo = (req,res)=>{
    var Q3 = "SELECT * FROM yesorno";
    SQL.query(Q3, (err, mySQLres1)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table yesorno");
        res.send({mySQLres1});
        return;
    })};

const ShowTableUsers = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres1)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table users");
        res.send({mySQLres1});
        return;
    })};

const ShowTableTrips = (req,res)=>{
    var Q3 = "SELECT * FROM trips";
    SQL.query(Q3, (err, mySQLres2)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table trips");
        res.send({mySQLres2});
        return;
    })};

const ShowTableGroups = (req,res)=>{
    var Q3 = "SELECT * FROM groups";
    SQL.query(Q3, (err, mySQLres3)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table `groups`");
        res.send({mySQLres3});
        return;
    })};

const ShowTableWillTrips = (req,res)=>{
    var Q3 = "SELECT * FROM willTrips";
    SQL.query(Q3, (err, mySQLres4)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table wiltrips");
        res.send({mySQLres4});
        return;
    })};

const ShowTableDidTrips = (req,res)=>{
    var Q3 = "SELECT * FROM didTrips";
    SQL.query(Q3, (err, mySQLres5)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table didtrips");
        res.send({mySQLres5});
        return;
    })};

const ShowTableGroupMembers = (req,res)=>{
    var Q3 = "SELECT * FROM groupMembers";
    SQL.query(Q3, (err, mySQLres6)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table groupmembers");
        res.send({mySQLres6});
        return;
    })};

const ShowTableRecommendations = (req,res)=>{
    var Q3 = "SELECT * FROM recommendations";
    SQL.query(Q3, (err, mySQLres7)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table recommendations");
        res.send({mySQLres7});
        return;
    })};

const ShowTableContactUs = (req,res)=>{
    var Q3 = "SELECT * FROM contactus";
    SQL.query(Q3, (err, mySQLres8)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table contactus");
        res.send({mySQLres8});
        return;
    })};

const ShowTable = (req,res,next)=>{
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres1)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        Q3 = "SELECT * FROM trips";
        SQL.query(Q3, (err, mySQLres2)=>{
            if (err) {
                console.log("error in showing table ", err);
                res.send("error in showing table ");
                return;
            }
            Q3 = "SELECT * FROM `groups`";
            SQL.query(Q3, (err, mySQLres3)=>{
                if (err) {
                    console.log("error in showing table ", err);
                    res.send("error in showing table ");
                    return;
                }
                Q3 = "SELECT * FROM willTrips";
                SQL.query(Q3, (err, mySQLres4)=>{
                    if (err) {
                        console.log("error in showing table ", err);
                        res.send("error in showing table ");
                        return;
                    }
                    Q3 = "SELECT * FROM didTrips";
                    SQL.query(Q3, (err, mySQLres5)=>{
                        if (err) {
                            console.log("error in showing table ", err);
                            res.send("error in showing table ");
                            return;
                        }
                        Q3 = "SELECT * FROM groupMembers";
                        SQL.query(Q3, (err, mySQLres6)=>{
                            if (err) {
                                console.log("error in showing table ", err);
                                res.send("error in showing table ");
                                return;
                            }
                            Q3 = "SELECT * FROM recommendations";
                            SQL.query(Q3, (err, mySQLres7)=>{
                                if (err) {
                                    console.log("error in showing table ", err);
                                    res.send("error in showing table ");
                                    return;
                                }
                                Q3 = "SELECT * FROM contactus";
                                SQL.query(Q3, (err, mySQLres8)=>{
                                    if (err) {
                                        console.log("error in showing table ", err);
                                        res.send("error in showing table ");
                                        return;
                                    }
                                    console.log("showing tables");
                                    res.send({mySQLres1,mySQLres2,mySQLres3,mySQLres4,mySQLres5,mySQLres6,mySQLres7,mySQLres8});
                            });
                        });
                    });
                });
            });
        });
    });
})};
module.exports = {CreateTableAreas,CreateTableLong,CreateTableDifficulty,CreateTableYesOrNo,
    CreateTableUsers, CreateTableTrips, CreateTableGroups, CreateTableWillTrips,CreateTableDidTrips,CreateTableGroupMembers,
    CreateTableRecommendations,CreateTableContactUs,
    InsertDataAreas,InsertDataLongOfTrips,InsertDataDifficulty,InsertDataYesOrNo,
    InsertDataUsers,InsertDataTrips,InsertDataWillTrips,InsertDataDidTrips,InsertDataGroups,InsertDataRecommendations,InsertDataContactUs,
    InsertDataGroupMembers,
    DropTableAreas,DropTableLongOfTrips,DropTableDifficulties,DropTableYesOrNo,
    DropTableGroupCreation,DropTableContactUs,DropTableRecommendations,DropTableGroupMembers,DropTableDidTrips,DropTableWillTrips,
    DropTableGroups,DropTableTrips,DropTableUsers,
    ShowTableAreas,ShowTableLongOfTrips,ShowTableDifficulties,ShowTableYesOrNo,
    ShowTableUsers,ShowTableTrips,ShowTableGroups,ShowTableWillTrips,ShowTableDidTrips,ShowTableGroupMembers,ShowTableRecommendations,
    ShowTableContactUs,ShowTable
};
