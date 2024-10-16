const { createPersonaje } = require("../../src/createPersonaje");
const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");

describe("createPersonaje", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("debería agregar un personaje a la bbdd", async () => {
    const fakeEventData = {
      body: JSON.stringify({
        nombre: "Diego Caceda",
        altura: 1.80,
        peso: 90,
        color_cabello: "negro",
        color_piel: "negro",
        color_ojos: "marron",
        año_nacimiento: "1993",
        genero: "masculino",    
        nave_estelar:"Halcon Milenario",
        vehiculo: "Speeders"
      }),
    };

    awsMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {});
    });

    const response = await createPersonaje(fakeEventData);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      id: expect.any(String),
      fechaCreacion: expect.any(Number),
      ...JSON.parse(fakeEventData.body),
    });
  });
});