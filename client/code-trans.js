
document.addEventListener('DOMContentLoaded',function(){
  const btn= document.getElementById("btn");
  const form = document.querySelector('form');
  const reponseid = document.getElementById("xx");
  
  // console.log("from "+ lang1 + " to "+lang2);
  

  



function typetext(element,text){// type d'ecriture, lettre par lettre
  let index = 0;
  element.innerHTML=" ";
  let interval = setInterval(() => {
    if(index < text.length ){
      element.innerHTML+=text.charAt(index);
      index++;
    }else{
      clearInterval(interval);
    }
  },20)
}



// value is the ai generated message
function reponseai(value){
  // return `<div class="message" style="color:white"> ${value} </div> `;
  return value;
}


const handlesubmit = async(e) => {
// async function handlesubmit(e){
  e.preventDefault();// prevent the default behavior of the browser(the form submit will not reload the page)
  // const data = new FormData(form);

  //bot div to write the answer

  var lang1 = document.getElementById("1").value;
  var lang2 = document.getElementById("2").value;
  console.log("from "+ lang1 + " to "+lang2);

  const data = new FormData(form);
  // console.log("forme data"+data);
  const response = await fetch("https://code-translator.onrender.com/",{// sends
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      prompt: "#"+ lang1 +" to "+ lang2+" :\n"+data.get("prompt")// c'est ca le prompt qu'on doit modifier
    })
  })
  
 

  if(response.ok){//response
    const datat = await response.json();
    const da = datat.bot.trim();
    // console.log("reponse dyal server "+da);
    reponseai(typetext(reponseid,da));
   
    // console.log(response.data.choices[0].text);
    // reponseid.innerHTML = reponseai(da+ " daata ");
    //  console.log("la reponse:"+ reponseai(da));
  }
  else{
    console.log("wrong here");
  }

}



/// fonction to fetch the info from the server at the port 5300 (this one is taken from the api doc)

  


form.addEventListener('submit', handlesubmit);


// console.log(reponseid);




})
// npm run dev
//  npm run server