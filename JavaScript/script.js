


async function getAllData(){
    try{
        const res = await fetch('https://restcountries.com/v3.1/all');
        if(res.ok){
            const data = await res.json();
            console.log(data);          
        } else {
            throw new Error(res.status);
        }
    } catch(err){
        console.log('Error: ', err);
    }
}

getAllData();

