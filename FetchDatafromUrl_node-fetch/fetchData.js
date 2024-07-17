import fetch from 'node-fetch';
const url = "https://tools.learningcontainer.com/sample-json.json";

async function fetchUrl(url){
     try{
        const response = await fetch(url);
      
        if(!response.ok){
           throw new Error(`Error in fetching data from url ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

     }
     catch(err){
        console.error("Error fetching url "+err.message);
     }
      
} 

fetchUrl(url);
