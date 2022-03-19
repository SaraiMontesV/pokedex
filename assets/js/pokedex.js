function hideDiv() {
  divById.style.display = "none";
}

hideDiv();

function onChange() {
  var select = document.getElementById("searchBy");
  var option = select.options[select.selectedIndex];

  const divById = document.getElementById("divById");
  const divByName = document.getElementById("divByName");
  if (option.value === "searchByID") {
    divById.style.display = "block";
    divByName.style.display = "none";
  } else {
    divById.style.display = "none";
    divByName.style.display = "block";
  }
}

const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("name-input");
  const msgLoad = document.getElementById("msgLoad");
  msgLoad.innerHTML = "Cargando...";

  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      const msgError = document.getElementById("msgError");

      if (res.status != "200") {
        console.log(res);
        const pokePhoto = document.getElementById("pokeImg");
        pokePhoto.src = "./assets/imgs/pokemon-sad.gif";
        pokePhoto.style.width = "112px";
        pokePhoto.style.height = "80px";
        pokePhoto.style.marginTop = "8%";
        msgLoad.innerHTML = "";
        msgError.innerHTML = "El pokémon no se encontró";
      } else {
        msgError.innerHTML = "";
        msgLoad.innerHTML = "";
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        setData(data);
      }
    });
};

const fetchPokemonById = () => {
  const pokeIdInput = document.getElementById("id-input");
  const msgLoad = document.getElementById("msgLoad");
  msgLoad.innerHTML = "Cargando...";

  const url = `https://pokeapi.co/api/v2/pokemon/${pokeIdInput.value}`;
  fetch(url)
    .then((res) => {
      const msgError = document.getElementById("msgError");

      if (res.status != "200") {
        console.log(res);
        const pokePhoto = document.getElementById("pokeImg");
        pokePhoto.src = "./assets/imgs/pokemon-sad.gif";
        pokePhoto.style.width = "112px";
        pokePhoto.style.height = "80px";
        pokePhoto.style.marginTop = "8%";
        msgLoad.innerHTML = "";
        msgError.innerHTML = "El pokémon no se encontró";
      } else {
        msgError.innerHTML = "";
        msgLoad.innerHTML = "";
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        setData(data);
      }
    });
};

const setData = (pokedata) => {
  const pokeName = document.getElementById("name-screen");
  const pokePhoto = document.getElementById("pokeImg");
  const pokeType = document.getElementById("type-screen");
  const pokeId = document.getElementById("id-screen");
  const pokeHeightWeight = document.getElementById("about-screen");
  var table = document.getElementById("stats").getElementsByTagName("tbody")[0];
  var tableMoves = document
    .getElementById("moves")
    .getElementsByTagName("tbody")[0];

  pokeName.innerHTML = pokedata.name;
  pokeType.innerHTML = pokedata.types[0].type.name;
  pokeHeightWeight.innerHTML = ` Height: ${pokedata.height}cm Weight: ${pokedata.weight}kg`;
  pokeId.innerHTML = `#${pokedata.id}`;
  pokePhoto.src = pokedata.sprites.front_default;
  for (let index = 0; index < pokedata.stats.length; index++) {
    const element = pokedata.stats[index];
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = `${element.stat.name}`;
    cell2.innerHTML = `${element.base_stat}`;
  }

  for (let index = 0; index <= pokedata.moves.length; index++) {
    const element = pokedata.moves[index];
    if (element) {
      var row = tableMoves.insertRow(0);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = `${element.move.name}`;
    }
  }
};
