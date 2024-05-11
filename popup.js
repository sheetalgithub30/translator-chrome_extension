document.addEventListener("DOMContentLoaded",load);
let select = document.querySelector("select");





function load(){
  

}



//Get Languages from the api
const getList = async()=>{
    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e334eb9947mshbf3f37c572d7872p1d7f6fjsn95cdf7028778',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
        // console.log(result);
    } catch (error) {
        console.error(error);
    }
};

// getList();



const createList = async() =>{
    const respone = await getList();
    console.log(respone);
    respone.data.languages.forEach((ele)=>{
        let list = createOptions(ele.code, ele.name);
        select.append(list);
      });
};


createList();


//create option 
const createOptions = (code,name)=>{
const list = document.createElement("option");
  list.setAttribute("value", code);
  list.innerText = `${name}`;
  return list;
}