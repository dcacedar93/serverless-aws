const { getJedi } = require("../../src/getJedi");

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

describe("getJedi", () => {
  afterEach(() => {
    mock.reset();
  });

  it("debería retornar datos de un Jedi con parámetros traducidos", async () => {
    // Simula una respuesta falsa de la API SWAPI
    const fakeResponseData = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "Tatooine",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "timestamp",
      edited: "timestamp",
      url: "https://swapi.py4e.com/api/people/1",
    };

    mock.onGet("https://swapi.py4e.com/api/people/1").reply(200, fakeResponseData);

    const event = {};
    const response = await getJedi(event);

    expect(response.statusCode).toBe(200);

    const expectedTranslatedData = {
      nombre: "Luke Skywalker",
      altura: "172",
      masa: "77",
      color_cabello: "blond",
      color_piel: "fair",
      color_ojos: "blue",
      año_nacimiento: "19BBY",
      genero: "male",
      planeta_natal: "Tatooine",
      peliculas: [],
      especies: [],
      vehiculos: [],
      naves_estelares: [],
      creado: "timestamp",
      editado: "timestamp",
      enlace: "https://swapi.py4e.com/api/people/1",
    };

    expect(JSON.parse(response.body)).toEqual(expectedTranslatedData);
  });
});