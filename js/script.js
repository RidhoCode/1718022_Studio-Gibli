const baseUrl = "https://ghibliapi.herokuapp.com/";
const filmView = `${baseUrl}films`;
const peopleView =`${baseUrl}people`;
const locationsView =`${baseUrl}locations`;
const speciesView=`${baseUrl}species`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const ViewModal = document.querySelector(".modal");


function getFilms() {
    title.innerHTML = "Daftar Anime "
    fetch(filmView)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(films => {
                data += `
                <li class="collection-item avatar">
                  
                    <p><span class="title"><b><h5>${films.title}</h5></b></span>
					<b>Description </b> : ${films.description} <br>
                    <b>director </b> : ${films.director} <br>
                    <b>Producer </b> : ${films.producer} <br>
                    <b>Date Release </b> : ${films.release_date} <br>
                    <b>Score Rate </b> : ${films.rt_score} <br>
                    <b>URL Films </b> :  <a href="${films.url}">URL</a> <br>
                   
					</p>
                    <a href="#modal1" data-id="${films.id}" class="secondary-content modal-trigger"><i class="material-icons" data-id="${films.id}">info</i></a>
                    </li>
                    `
                });
                contents.innerHTML = '<ul class="collection">' + data + '</ul>'
                const detil = document.querySelectorAll('.secondary-content');
                detil.forEach(btn => {
                    btn.onclick = (event) => {
                        showFilmsInfo(baseUrl + "films/" + event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}
function getPeople() {
    title.innerHTML = "Daftar People "
    fetch(peopleView)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(people => {
                data += `
                <li class="collection-item avatar">
                  
                   
					<b>Name </b> : ${people.name} <br>
                    <b>Gender</b> : ${people.gender} <br>
                    <b>Age</b> : ${people.age} <br>
					</p>
                    
                    `
                });
                contents.innerHTML = '<ul class="collection">' + data + '</ul>'
                const detil = document.querySelectorAll('.secondary-content');
                detil.forEach(btn => {
                    btn.onclick = (event) => {
                        showFilmsInfo(baseUrl + "people/" + event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}
function getLocations() {
    title.innerHTML = "Daftar Locations "
    fetch(locationsView)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(locations => {
                data += `
                <li class="collection-item avatar">
                  
                   
					<b>Name </b> : ${locations.name} <br>
                    <b>Climate</b> : ${locations.climate} <br>
                    <b>Terrain</b> : ${locations.terrain} <br>
                    
					</p>
                   
                    `
                });
                contents.innerHTML = '<ul class="collection">' + data + '</ul>'
                const detil = document.querySelectorAll('.secondary-content');
                detil.forEach(btn => {
                    btn.onclick = (event) => {
                        showFilmsInfo(baseUrl + "locations/" + event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}
function getSpecies() {
    title.innerHTML = "Daftar Species "
    fetch(speciesView)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(species => {
                data += `
                <li class="collection-item avatar">
                  
                   
					<b>Name </b> : ${species.name} <br>
                    <b>Classification</b> : ${species.classification} <br>
                    <b>Eye Color</b> : ${species.eye_colors} <br>
                    <b>Hair Color</b> : ${species.hair_colors} <br>
					</p>
                    
                    `
                });
                contents.innerHTML = '<ul class="collection">' + data + '</ul>'
                const detil = document.querySelectorAll('.secondary-content');
                detil.forEach(btn => {
                    btn.onclick = (event) => {
                        showFilmsInfo(baseUrl + "species/" + event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}
function showFilmsInfo(id){
    fetch(id)
    .then(response => response.json())
        .then(resJson => {
                ViewModal.innerHTML=`
                            
                        <div class="modal-content "align="center">
                            <h4>${resJson.title}</h4>
                                <p>
                                <b>Description </b> : ${resJson.description} <br>
                                <b>director </b> : ${resJson.director} <br>
                                <b>Producer </b> : ${resJson.producer} <br>
                                <b>Date Release </b> : ${resJson.release_date} <br>
                                <b>Score Rate </b> : ${resJson.rt_score} <br>
                                </p>
                                </p>
                        </div>
                        <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                     
                    </div>` ;
        }).catch(err => {
            console.error(err);
        })
    
}


function loadPage(page){
	switch(page){
		case "films":
			getFilms();
			break;
		case "people":
			getPeople();
			break;
		case "locations":
			getLocations();
			break;
		case "species":
			getSpecies();
			break;
	
	}
}

document.addEventListener('DOMContentLoaded', function (){
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems);
	getFilms();

	document.querySelectorAll(".sidenav a, .topnav a").forEach(elm=>{
		elm.addEventListener("click", evt=>{
			let sideNav = document.querySelector(".sidenav");
			M.Sidenav.getInstance(sideNav).close();
			page = evt.target.getAttribute("href").substr(1);
			loadPage(page);
		})
	})

	var page = window.location.hash.substr(1);
	if (page === "" || page === "!" ) page = "films";

	var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);

	loadPage(page); 
});