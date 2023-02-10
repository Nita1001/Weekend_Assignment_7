let bigData = { 
    continents: [],
    // countries: [],
};


function extractUniqueContinents(duplicatedContinents){
    let newStr = duplicatedContinents.join(' ');
    newStr = newStr.split(' ');
    let uniqueContinents = [...new Set(newStr)];
    uniqueContinents = uniqueContinents.filter((el) => el !== 'North' && el !== 'South');
    bigData.continents.push(uniqueContinents); 
}

function getContinentName(data){
    let duplicatedContinents = [];
    data.forEach( obj => {
        duplicatedContinents.push(obj.continents);
    });
    extractUniqueContinents(duplicatedContinents);
}

async function getCountryName(){

    let region = bigData.continents[0][4];
    try{
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}/`);
        if(res.ok){
            const data1 = await res.json();
            console.log('data1', data1);
            data1.forEach((obj) => {
                console.log(obj.population, obj.name.official);
            })
        }else {
            throw new Error(res.status);
        }
  
    }catch (err){
        console.log('error:', err);
    }
    

    // console.log('bigData continent', bigData.continents[0][0]);

    // data.forEach( obj => {

    //     if(obj.continents == bigData.continents[0][1]){
    //         countries.push(obj.name.official);
    //     }

    // });
    // console.log(`countries in ${bigData.continents[0][3]}`, countries);

}


async function getAllData(){
    try{
        const res = await fetch('https://restcountries.com/v3.1/all');
        if(res.ok){
            const data = await res.json();
            getContinentName(data);
            console.log(data);
            getCountryName();
        } else {
            throw new Error(res.status);
        }
    } catch(err){
        console.log('Error: ', err);
    }
}

getAllData();
console.log('bigData: ', bigData);