let params = new URLSearchParams(window.location.search);
let id = params.get("id");

fetch("https://hp-api.onrender.com/api/character/" + id)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayDetails(data[0]);
  });

function checkValue(value) {
  if (value == "" || value == null) {
    return "Inconnu";
  }
  return value;
}

function displayDetails(character) {
  document.querySelector("#name").textContent = character.name;
  document.querySelector("#actor").textContent = checkValue(character.actor);
  document.querySelector("#gender").textContent = checkValue(character.gender);
  document.querySelector("#eye").textContent = checkValue(character.eyeColour);
  document.querySelector("#hair").textContent = checkValue(character.hairColour);
  document.querySelector("#birth").textContent = checkValue(character.dateOfBirth);
  document.querySelector("#patronus").textContent = checkValue(character.patronus);

  let nicknames = "Aucun";
  if (character.alternate_names.length > 0) {
    nicknames = character.alternate_names.join(", ");
  }
  document.querySelector("#nicknames").textContent = nicknames;

  let image = document.querySelector("#image");
  image.alt = character.name;
  if (character.image == "") {
    image.src = "./images/troll.jpg";
  } else {
    image.src = character.image;
  }

  if (character.alive == false) {
    image.classList.add("dead");
  }

  let houseLogo = document.querySelector("#house-logo");
  if (character.house == "") {
    houseLogo.style.display = "none";
  } else {
    houseLogo.src = "./images/logo/" + character.house + ".png";
    houseLogo.alt = character.house;
  }
}
