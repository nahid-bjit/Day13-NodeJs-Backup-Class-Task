const events = require("events");
const emitter = new events();
const path = require("path");
const fs = require("fs");
const { CLIENT_RENEG_LIMIT } = require("tls");
const { clearScreenDown } = require("readline");

const dataPath = path.join(__dirname, "data", "manga.json");
const backupPath = path.join(__dirname, "backup", "manga.json")

emitter.on("backup", ()=> {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8")); // Read the main file ;
    const backup = JSON.parse(fs.readFileSync(backupPath, "utf-8")); // Read the backup file
    // console.log(data.length, backup.length);
    if (JSON.stringify(data) === JSON.stringify(backup)) {
        // console.log("You're all set! Nothing to update!!")
    }
    else {
        fs.writeFileSync(backupPath, JSON.stringify(data));
        console.log(`Last updated on : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
        // the log taking code will be here
    }
});

// log file storing


setInterval(() => {
    emitter.emit("backup");
}, 1000);
