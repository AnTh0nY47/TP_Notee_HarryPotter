const API_URL = "https://hp-api.onrender.com/api/characters";

let characters = [];
let currentList = [];

fetch(API_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    characters = data;
    showList(characters);
  });


function createCard(character) {
  let name = character.name || "Inconnu";
  let image = character.image || "./images/troll.jpg";
  let house = character.house.toLowerCase();

  return `
    <div class="${house}">
      <a href="details.html?id=${character.id}">
        <img src="${image}" alt="${name}" />
        <p>${name}</p>
      </a>
    </div>
  `;
}

function showList(list) {
  currentList = list;

  let studentsHtml = "";
  let staffHtml = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].hogwartsStudent) {
      studentsHtml += createCard(list[i]);
    } else if (list[i].hogwartsStaff) {
      staffHtml += createCard(list[i]);
    }
  }

  document.querySelector("#students").innerHTML = studentsHtml || "<p>Aucun personnage</p>";
  document.querySelector("#staff").innerHTML = staffHtml || "<p>Aucun personnage</p>";
}


function getSortedByName(list) {
  let copy = list.slice();
  copy.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  return copy;
}

function getSortedByAge(list) {
  let copy = list.slice();
  copy.sort(function (a, b) {
    if (a.yearOfBirth == null) {
      return 1;
    }
    if (b.yearOfBirth == null) {
      return -1;
    }
    return b.yearOfBirth - a.yearOfBirth;
  });
  return copy;
}


function sortByName() {
  showList(getSortedByName(currentList));
}

function sortByAge() {
  showList(getSortedByAge(currentList));
}

function filterAlive(alive) {
  let result = [];

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].alive == alive) {
      result.push(characters[i]);
    }
  }

  showList(result);
}

function filterHouse(house) {
  let result = [];

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].house == house) {
      result.push(characters[i]);
    }
  }

  showList(getSortedByName(result));
}

function searchByName() {
  let text = document.querySelector("#search").value.toLowerCase();
  let result = [];

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].name.toLowerCase().includes(text)) {
      result.push(characters[i]);
    }
  }

  showList(result);
}

function showAll() {
  document.querySelector("#search").value = "";
  showList(characters);
}
