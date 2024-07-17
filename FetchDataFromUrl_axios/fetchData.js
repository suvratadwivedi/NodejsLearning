const axios = require('axios');

const url = "https://tools.learningcontainer.com/sample-json.json";

async function fetchData(url){

    try{
        const response = await axios.get(url);
        if(response.status >=200 && response.status <=300){
            const data = await response.data;
            console.log(data);     
        }
        else{
            throw new Error(`Error fetching data from url ${response.status}`);
        }
    }
    catch(err){
        if(!axios.isAxiosError(err)){
            console.error("Error fetching url "+err.message);
            if(err.response){
                 console.error("Response data: "+err.response.data);
                 console.error("Response status: "+err.response.status);
                 console.error("Response headers: "+err.response.headers);
            }
        }
        else{
            console.error("Unexpected error "+err);
        }
        
    }
}

fetchData(url);