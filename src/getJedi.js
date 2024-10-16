const axios = require("axios");

const traducirParametros = (data) => {
  const mapeo = {
    name: "nombre",
    height: "altura",
    mass: "masa",
    hair_color: "color_cabello",
    skin_color: "color_piel",
    eye_color: "color_ojos",
    birth_year: "año_nacimiento",
    gender: "genero",
    homeworld: "planeta_natal",
    films: "peliculas",
    species: "especies",
    vehicles: "vehiculos",
    starships: "naves_estelares",
    created: "creado",
    edited: "editado",
    url: "enlace",
  };

  const resultado = {};

  for (const clave in data) {
    if (mapeo.hasOwnProperty(clave)) {
      resultado[mapeo[clave]] = data[clave];
    } else {
      resultado[clave] = data[clave];
    }
  }

  return resultado;
};

const getJedi = async (event) => {

  //const {id} = event.pathParameters;

  const response = await axios.get(
    `https://swapi.py4e.com/api/people/1`//+id
  );
  const data = response.data;

  const dataJediSwapi = traducirParametros(data);

  return {
    statusCode: 200,
    body: JSON.stringify(dataJediSwapi),
  };
};

module.exports = {
  getJedi,
};