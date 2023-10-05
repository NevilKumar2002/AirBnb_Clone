// console.log(document.cookie=id);
let id = document.cookie;
// let hotelid=id.split("=")[1].split(";")[0];
let hotelid = 830737891899851939;
console.log(hotelid);

let ImageGallery = document.getElementById("image-gallery");
let HotelComments = document.getElementById("hotel-comments");
async function getfulldetails() {
  const url = `https://airbnb-listings.p.rapidapi.com/v2/listing?id=38928433`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d18786f531msh0a0240101423f8cp1c482djsn651e4927606a",
      "X-RapidAPI-Host": "airbnb-listings.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getfulldetails();

function displayUI() {
  const div = document.createElement("div");
}

async function displayComments() {
  const url =
    "https://airbnb-listings.p.rapidapi.com/v2/listingReviews?id=619966061834034729";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d18786f531msh0a0240101423f8cp1c482djsn651e4927606a",
      "X-RapidAPI-Host": "airbnb-listings.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
	console.log(result.results.length)
    for (let i = 0; i < result.results.length; i++) {
      const div = document.createElement("div");
      div.className = "comments-container";
      div.innerHTML = `  <div class="comments-heading">
		<img src="https://picsum.photos/200" class="comment-owner-pic">
	   <div class="comments-owner">
		<h4>Bodhisattva</h4>
		<p>${result.results[i].date_time}</p>
	   </div>
	   <img src="https://media.istockphoto.com/id/1295967422/vector/five-point-star-vector-icon-isolated-gold-star-rating-flat-symbol-vector.jpg?s=612x612&w=0&k=20&c=f9kJnuy_7JluRDG2ZgIPAkI33173kVwOuCBXe-z-w6Y=">
	   <h4>${result.results[i].rating}</h4>
	</div>
	            

	<div class="comment-description">
		<p>${result.results[i].comments}</p>
	</div>`;

      HotelComments.append(div);
    }
  } catch (error) {
    console.error(error);
  }
}
displayComments();
