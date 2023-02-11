var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const CreateTableUsers = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `users`(email VARCHAR(255) primary key,firstname VARCHAR(255) not null,lastname VARCHAR(255) not null,dob date not null,phoneNumber VARCHAR(10) not null,password VARCHAR(255) not null)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created users table table');
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
        console.log('created trips table table');
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
        console.log('created groups table table');
    })
    next();     
}

const CreateTableWillTrips = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `willTrips`(tripID INT(11)  not null references trips(id),userEmail VARCHAR(255) not null references users(email),primary key (tripID ,userEmail ))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created willTrips table table');
    })
    next();     
}

const CreateTableDidTrips = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `didTrips`(tripID INT(11)  not null references trips(id),userEmail VARCHAR(255) not null references users(email),commitDate DATE not null,primary key (tripID ,userEmail ))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created didTrips table table');
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
        console.log('created groupMembers table table');
    })
    next();     
}

const CreateTableRecommendations = (req,res,next)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS `recommendations`(user VARCHAR(255) not null references users(email),tripID INT(11) not null references trips(id),recdate DATETIME not null,content VARCHAR(255) not null,primary key(user,tripID))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created recommendations table table');
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
        console.log('created contactus table table');
        res.send("all tables created");
        return;
    })
}

const InsertDataUsers = (req,res,next)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
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
    const csvFilePath= path.join(__dirname, "trips.csv");
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
    const csvFilePath= path.join(__dirname, "willTrips.csv");
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
    const csvFilePath= path.join(__dirname, "didTrips.csv");
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
    const csvFilePath= path.join(__dirname, "groups.csv");
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
    const csvFilePath= path.join(__dirname, "recommendations.csv");
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
    const csvFilePath= path.join(__dirname, "contactus.csv");
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
    const csvFilePath= path.join(__dirname, "groupMembers.csv");
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
        console.log("table groupcreation drpped");
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
        console.log("table contactus drpped");
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
        console.log("table recommendations drpped");
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
        console.log("table groupMembers drpped");
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
        console.log("table didTrips drpped");
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
        console.log("table willTrips drpped");
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
        console.log("table groups drpped");
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
        console.log("table trips drpped");
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
        res.send("tables drpped");
        return;
    })
}

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
module.exports = {CreateTableUsers, CreateTableTrips, CreateTableGroups, CreateTableWillTrips,CreateTableDidTrips,CreateTableGroupMembers,
    CreateTableRecommendations,CreateTableContactUs,
    InsertDataUsers,InsertDataTrips,InsertDataWillTrips,InsertDataDidTrips,InsertDataGroups,InsertDataRecommendations,InsertDataContactUs,
    InsertDataGroupMembers,
    DropTableGroupCreation,DropTableContactUs,DropTableRecommendations,DropTableGroupMembers,DropTableDidTrips,DropTableWillTrips,
    DropTableGroups,DropTableTrips,DropTableUsers,
    ShowTableUsers,ShowTableTrips,ShowTableGroups,ShowTableWillTrips,ShowTableDidTrips,ShowTableGroupMembers,ShowTableRecommendations,
    ShowTableContactUs,ShowTable
};
