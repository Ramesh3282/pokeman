
var pokemanDataList=[]
var perPageRecord=10
var currentPage=1
var nextBtn=document.querySelector("#next-btn")
let previousBtn=document.querySelector("#previous-btn")

function pokemanDisplay(){
       
        let data=`<table class="table table-bordered" ><tr><th scope="col">Name</th><th scope="col">Ability</th><th scope="col">Weight</th><th scope="col">Moves</th><tr>`
       for(let i=(currentPage-1)*perPageRecord;i<perPageRecord*currentPage;i++){
            
            data+=`
            <tr scope="row">
            <td class="align-middle text-capitalize">${pokemanDataList[i].name}</td>
            <td class="align-middle">${pokemanDataList[i].ability}</td>
            <td class="align-middle">${pokemanDataList[i].weight}</td>
            <td id="moves">${pokemanDataList[i].moves}</td></tr>`;
          
       }   
       document.getElementById("pokeman-list").innerHTML = data;
      
   
}
nextBtn.addEventListener("click",()=>{
    if (currentPage===5){
        currentPage=5;
    }else{
        currentPage++;
    }
    
    pokemanDisplay()
})

previousBtn.addEventListener("click",()=>{
    if (currentPage === 1){
        currentPage=1;
    }else{
        currentPage--;
    }
    
    pokemanDisplay()
})

function pushPokeRecords(records){
    pokemanDataList.push(records)
}



async function getAPI(API){
    try{
 
         let response=await fetch(API)
         let reponseData=await response.json()
         let resultData=reponseData.results
         for(i=0;i<resultData.length;i++){
            let pokemanResponse= await (await fetch(resultData[i].url)).json()
            let reponseObjData={
                name:resultData[i].name,    
                ability:pokemanResponse.abilities.map(ability => ability.ability.name).join(','),
                moves:pokemanResponse.moves.map(move => move.move.name).join(','),
                weight:pokemanResponse.weight
    
                }
            
                pushPokeRecords(reponseObjData)
            
            }
            pokemanDisplay()
        
    }catch(error){
        console.log(error)

    }
  
}

let API="https://pokeapi.co/api/v2/pokemon?limit=50"

getAPI(API)


