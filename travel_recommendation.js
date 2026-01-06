let travel  = []
let gbeaches = []
let gtemples = []
let gcities = []
let gcountries = []
const popover = document.getElementById('search-results');  
const results = document.getElementById('results-list');
    trsearch = document.getElementById('travelSearch');
let travelAPI = () => {
            fetch('./travel_recommendation_api.json')
            .then(response => response.json())
            .then( data =>{

            let cities  = []
            let { beaches } = data 
            let { temples } = data 
            let { countries } = data
            for( i = 0; countries.length > i; i++ ){
                for( j = 0; countries[i].cities.length > j; j++ ){
                travel.push({
                    "name" : data.countries[i].cities[j].name,
                    "imageUrl": data.countries[i].cities[j].imageUrl,
                    "description": data.countries[i].cities[j].description
                })                                                          
                }        
            }
            travelSearch = document.getElementById('travelSearch').value.trim()
            cities = travel.filter(tr => tr.name.includes(travelSearch));      

            if (cities.length === 0){
                travelsrc = travelSearch.charAt(0).toUpperCase() + travelSearch.slice(1)
                citi = travel.filter(tr => tr.name.includes( travelsrc ))
                cities.push(...citi)
            }

            gbeaches = beaches
            gtemples = temples
            gcountries = countries
            gcities = cities

            })
            .catch(error => {
                alert("Error : " + error)          
          });
}

function thankyou(){
        if (!document.getElementById('name').value){
            alert('Please enter Name ')
        }else if(!document.getElementById('email').value) {
                 alert('Please enter Email ID ')
        }else if(!document.getElementById('message').value){
            alert('Please enter Message ')
        }else{
            alert(`Thank you ${ document.getElementById('name').value } for contacting us!`)
        }
    }

    trsearch.addEventListener('keydown', function(event) {    
  // Check if the key pressed is the 'Enter' key
  if (event.key === 'Enter') {

    // Prevent the default action (e.g., form submission and page refresh)
    event.preventDefault();
    // Trigger the button's click event programmatically
    document.getElementById('btnSearch').click();
  }
})

    document.getElementById('btnSearch').addEventListener('click',(e)=>{
      try {
                    travel=[]
            e.preventDefault(); // Stop form submission
            e.stopPropagation();
            travelAPI();
            const rect = trsearch.getBoundingClientRect();
            results.innerHTML = "";
            popover.style.display = "block"
//             if (e.key === 'Enter') {
            popover.style.top = ( rect.top - 200 ) + "px"
            popover.style.left = (rect.left  ) + "px"
//             } else {
//            popover.style.top = ( e.pageY - 200 ) + "px"
//            popover.style.left = (e.pageX - 200 ) + "px"                
//             }
            popover.style.width = "300px"
            popover.style.height = "400px"
            //popover.textContent = "Loading…" // temporary state
            let travelSearch = document.getElementById('travelSearch').value.trim().toLowerCase();
                let i=0;
            switch (travelSearch){
             case 'beach' :
                 for( const beach of gbeaches ){
                    const li = document.createElement("li");
                    i++;
                    li.innerHTML = `<label for="label-${i}">${beach.name}</label>      
                    <img src="${beach.imageUrl}" alt="${beach.name}" width="200px" height="200px">
                    <textarea id="message-${i}" name="message-${i}" rows="5" readonly>${beach.description}</textarea>`                   
                    results.appendChild(li);
                    }     
                    break;                              
             case 'beaches':
                    i=0;
                 for( const beach of gbeaches ){
                    const li = document.createElement("li");
                    i++;
                    li.innerHTML = `<label for="label-${i}">${beach.name}</label>      
                    <img src="${beach.imageUrl}" alt="${beach.name}" width="200px" height="200px">
                    <textarea id="message-${i}" name="message-${i}" rows="5" readonly>${beach.description}</textarea>`                   
                    results.appendChild(li);                    
                    }     
                    break;                 
             case 'temple':
                    i=0;
                for(const temple of gtemples ){
                    const li = document.createElement("li");
                                       i++;
                    li.innerHTML = `<label for="label-${i}">${temple.name}</label>      
                    <img src="${temple.imageUrl}" alt="${temple.name}" width="200px" height="200px">
                    <textarea id="message-${i}" name="message-${i}" rows="5" readonly>${temple.description}</textarea>`                   
                    results.appendChild(li);                             
                }         
                break;         
             case 'temples':
                i=0;
                for(const temple of gtemples ){     
                    const li = document.createElement("li");
                    li.innerHTML = `<label for="label-${i}">${temple.name}</label>      
                    <img src="${temple.imageUrl}" alt="${temple.name}" width="200px" height="200px">
                    <textarea id="message-${i}" name="message-${i}" rows="5" readonly>${temple.description}</textarea>`                   
                    results.appendChild(li);                    
                }     
                break;                         
                default:
                    i=0;
                    for(const city of gcities){
                    const li = document.createElement("li");
                    li.innerHTML = `<label for="label-${i}">${city.name}</label>      
                    <img src="${city.imageUrl}" alt="${city.name}" width="200px" height="200px">
                    <textarea id="message-${i}" name="message-${i}" rows="5" readonly>${city.description}</textarea>`                       
                    results.appendChild(li);                            
                    }
                break;
            }
            if(!popover){
            setTimeout(() => {
                popover.showPopover();
            }, 2000);                
            }

      } catch(error) {
        alert("Error: "+error);
      }
    })

    document.getElementById('Reset').addEventListener('click', (e) => {
        travel  = []
        gbeaches = []
        gtemples = []
        gcities = []
        gcountries = []
        results.innerHTML = "";
        popover.hidePopover();
        e.stopPropagation();
    })
/*
    document.getElementById('travelSearch').addEventListener('change', (e) => {
    if(!popover){
    setTimeout(() => {
        popover.showPopover();
         e.stopPropagation();
    }, 2000);                
    }        
    })
*/
