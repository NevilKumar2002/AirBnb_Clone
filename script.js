
console.log("hello")
let submit=document.getElementById("submit-button")
let card_container= document.getElementById("card-container-1");
let container_2= document.getElementById("container-2")
let cardContainer= document.getElementById("card-container-1")
// let corouselImage1=document.getElementById("corousel-item-image-1");
// let corouselImage1=document.getElementById("corousel-item-image-1");
let mapArr=[];
function displayDetails(result){
	console.log(result)
	let a=result.results;  
	
	for(let i=0 ;i<a.length ;i++)
	{
		container_2.style.display="none";
		 const div= document.createElement("div");
		 div.className="card-container";
		 div.innerHTML=`<div id="carouselExample" class="carousel slide">
		 <div class="carousel-inner">
		   <div class="carousel-item active">
			 <img src="${result.results[i].images[1]}" class="d-block corousel-image" id="corousel-image1" alt="...">
		   </div>
		   <div class="carousel-item">
			 <img src="${result.results[i].images[2]}" class="d-block corousel-image" id="corousel-image2" alt="...">
		   </div>
		   <div class="carousel-item">
			 <img src="${result.results[i].images[3]}" class="d-block corousel-image" alt="...">
		   </div>
		 </div>
		 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
		   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		   <span class="visually-hidden">Previous</span>
		 </button>
		 <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
		   <span class="carousel-control-next-icon" aria-hidden="false"></span>
		   <span class="visually-hidden">Nevil</span>
		 </button>
	   </div>
	   <div class="card-container-heading d-flex justify-content-around align-items-center pt-2">
		 <h5>${result.results[i].name}</h5>
		 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
			 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
		   </svg>
		   <p>${result.results[i].rating}</p>
	   </div>
	   <div class="card-description">
		 <p>${result.results[i].type}</p>
	   </div>
	   <div class="card-bottom d-flex justify-content-between">
		 <p><b>${result.results[i].price.priceItems[0].title}</b></p>
		 <p> ${result.results[i].price.total} Total</p>
	   </div>
      </div>`;
	  			
	  div.addEventListener('click',()=>{
		window.open("http://127.0.0.1:5501/house.html")
		console.log("You clicked a Card");
		fetchDetails(result.results[i].id)
	
	
	})

	 card_container.append(div);
	}
	
	

}
function fetchDetails(hotelId)
{
	console.log(hotelId);
	document.cookie=`id=${hotelId}`;
}


let location2=document.getElementById("location-going");


submit.addEventListener('click', function(event){
	event.preventDefault();
	async function hi(){
			let location1=document.getElementById("location-going").value;
		    let check_in= document.getElementById("check-in-date").value;
		    let check_out= document.getElementById("check-out-date").value;
		    let Guest= document.getElementById("guest").value;
			const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location1}&checkin=${check_in}&checkout=${check_out}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': 'bcc4204f1amsha4811874c52b1a6p15bc2bjsnfd42743f2c5b',
					'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
				}
			};
			
			try {
				const response = await fetch(url, options);
				const result = await response.json();
				console.log(result);
				displayDetails(result);
				for(let i=0 ;i<result.results.length;i++){
					let a= result.results[i].lat;
				let b= result.results[i].lng;
				let c= result.results[i].city;
				displayMap(a,b,c)
				mapArr.push([a,b,c])
				}
				

			
			} catch (error) {
				console.log(error);
			}
		}
		hi();
		
		console.log(mapArr);
		
});


// let map=document.getElementById("map");
let mapDiv= document.getElementById("map-container")
function displayMap(latitude,longitude,Place){
    var map = L.map('map');
    map.setView([latitude,longitude], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([latitude, longitude]).addTo(map);
var circle = L.circle([latitude, longitude], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius:50
}).addTo(map);
marker.bindPopup(`Welcome to ${Place}`).openPopup();
circle.bindPopup("I am a circle.");
mapDiv.style.display="block";
document.getElementById("map").append(map);
}

