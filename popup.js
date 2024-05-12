let select = document.querySelector("select");
let from = document.querySelector("#from");
let to = document.querySelector("#to");

select.addEventListener("change",async()=>{
    let language = select.value;
    console.log(language);
    // console.log(from.value);
    let translated_text = await getTranslate(language);
    // console.log(translated_text.data.translatedText)
     let value = translated_text.data.translatedText;
    to.value = value;
})



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


//get translated string

const getTranslate = async(target)=>{
    console.log(from.value);
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e334eb9947mshbf3f37c572d7872p1d7f6fjsn95cdf7028778',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: target,
            text: from.value
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
        // console.log(result);
    } catch (error) {
        console.error(error);
    }
}