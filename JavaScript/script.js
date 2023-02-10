let bigData = [];


function extractUniqueContinents(duplicatedContinents){
    let newStr = duplicatedContinents.join(' ');
    newStr = newStr.split(' ');
    let uniqueContinents = [...new Set(newStr)];
    uniqueContinents = uniqueContinents.filter((el) => el !== 'North' && el !== 'South');
    bigData.push(uniqueContinents); 
}

function getContinentName(data){
    let duplicatedContinents = [];
    data.forEach( obj => {
        duplicatedContinents.push(obj.continents);
    });
    extractUniqueContinents(duplicatedContinents);
}

async function getAllData(){
    try{
        const res = await fetch('https://restcountries.com/v3.1/all');
        if(res.ok){
            const data = await res.json();
            getContinentName(data);
        } else {
            throw new Error(res.status);
        }
    } catch(err){
        console.log('Error: ', err);
    }
}

getAllData();
console.log('bigData: ', bigData);