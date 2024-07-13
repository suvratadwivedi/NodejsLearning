//Import fs(file system) module
const fs = require("fs");

//Sync Writing operation
fs.writeFileSync("./textSync.js", "Hello! This is synchronous file writing operation");

//Async Writing operation
fs.writeFile("./textAsync.js","Hello! This is an asynchronous file writing operation", "utf8",(err)=>{
    if(err){
        return;
    }
    console.log("Write operation complete");
});

//Sync file reading operation ---> sync function return something 
const result = fs.readFileSync("./contacts.txt","utf8");
console.log("File contents: "+result);

//Async file reading operation  -----> async always requires a callback, it does not return anything
fs.readFile("./contacts.txt","utf-8",(err,data)=>{
     if(err){
        console.log("Error "+err);
     }
     else{
        console.log("Data: "+data);
     }
});

//Sync file append operation 
fs.appendFileSync("./textSync.js",new Date().getDate().toLocaleString());
fs.appendFileSync("./textSync.js",`\n ${Date.now()} Hey There \n`);

//Async file append operation
fs.appendFile("./textAsync.js","\n This is an async append operation",(err)=>{
     if(err){
        console.log("Error "+err);
     }
     console.log("Append complete");
});

//Copy file sync operation
fs.cpSync("./textSync.js","./copyFile.js");

//Delete file async operation
fs.unlinkSync("./copyFile.js");

//Create new directory
fs.mkdirSync("my-docs");

fs.mkdirSync("my-docs1/a/b",{recursive:true});  //recursive propery needs to be set true to create folder inside folder

//stat function to check stats of a file
console.log(fs.statSync("./textSync.js"));