let characters = [];

fetch("https://hp-api.onrender.com/api/characters")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    characters = data;
    displayCharacters(characters);
  });

function displayCharacters(list) {
  let html = "";

  for (let i = 0; i < list.length; i++) {
    let id = list[i].id;
    let name = list[i].name;
    let image = list[i].image;
    let house = list[i].house.toLowerCase();

    if (name == "") {
      name = "Inconnu";
    }
    if (image == "") {
      image = "./images/troll.jpg";
    }

    html += `
      <div class="${house}">
        <a href="details.html?id=${id}">
          <img src="${image}" alt="${name}" />
          <p>${name}</p>
        </a>
      </div>
    `;
  }

  document.querySelector(".characters").innerHTML = html;
}

function filterHouse(house) {
  let result = [];

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].house == house) {
      result.push(characters[i]);
    }
  }

  result.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  displayCharacters(result);
}
