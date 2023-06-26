let ID =() => {
    return Math.random().toString(36).substr(2,9);
}

let createCarouselOuter =(id,innerId) =>{
    return`
    <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
     <div class="carousel-inner"  id="${innerId}"></div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
}

let createCarouselInner = (id, active) =>{
 // console.log(active)
    return `
    <div class="carousel-item ${active ? "active" :""}" id="${id}">
    </div>`;
};

let createCard = (item) => {
     return `
    <div class="card d-block">
      <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${item["title"]}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h5>
        <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
        <p class="card-text">${item["description"]}</p>
        <a href="${item["link"]}"class="stretched-link" target="_blank"></a>
      </div>
    </div>
    `
  };

let createAccordian = (title, id) => {
    return `   
    <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
    <button class="accordion-button accordion-arrow collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}" id="accordian${id}">
      ${title}
    </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse" data-bs-parent="#accordionId" aria-labelledby="heading${id}"></div>
    </div>`;
}

let addContent = async() =>{
    for(let i=0; i<magazines.length; i++){
        let url = magazines[i];

        let response = await fetch(
            ` https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`  
        );
        let data = await response.json();

        let accordionId = ID();
        let accordion = createAccordian(data["feed"]["title"], accordionId);
        document.getElementById("accordionId").innerHTML +=accordion;

        if (i==0) {
            document.getElementById(`collapse${accordionId}`).classList.add("show");
            document.querySelector(`#heading${accordionId} > button`).setAttribute("aria-expanded" , "true")
            document.getElementById(`accordian${accordionId}`).classList.remove('collapsed');
        }
        let carouselId = ID();
        let carouselInnerId = ID();
        let carousel = createCarouselOuter(carouselId, carouselInnerId);

        document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

        let items = data["items"];
        for ( j in items) {
            let card = createCard(items[j]);
            let innerCarouselCardId =ID();
            let innerCarouselCard = createCarouselInner(innerCarouselCardId, j === "0");
            document.getElementById(`${carouselInnerId}`).innerHTML += innerCarouselCard;
            document.getElementById(`${innerCarouselCardId}`).innerHTML +=card;
        }
    }
}
addContent();