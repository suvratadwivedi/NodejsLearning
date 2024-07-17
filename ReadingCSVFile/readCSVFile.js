const fs = require("fs");
const csv = require("csv-parser");

const inputFileName = 'sample.csv';

async function readCSVFile(inputFileName){
    try{
        const results = [];
        let sum =Number(0);
        await  new Promise((resolve,reject)=>{
            const readFileStream = fs.createReadStream(inputFileName);
            readFileStream.pipe(csv())
            .on('data',(data)=>{
                try{
                    console.log("Name: "+data.firstname);
                    console.log("Age: "+data.age);
                    sum = sum + Number(data.age);
                    
                    results.push(data.age);
                }
                catch(err){
                    reject(error);
                }  
            })
            .on('end',()=>{
                resolve(results);
            })
            .on('error',(error)=>{
                reject(error);
            })
        });
        console.log('CSV processing completed:', results);

        return sum;
        
    }
    catch(err){
        console.error("Error while reading csv file "+err.message);
        throw Error;
    }

}

readCSVFile(inputFileName)
.then((data)=>{
     console.log("Data processing complete",data);
})
.catch((error)=>{
    console.error("Error "+error);
});