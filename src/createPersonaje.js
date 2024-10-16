const { v4 } = require('uuid');
const AWS = require("aws-sdk");

const createPersonaje = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const {
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    año_nacimiento,
    genero,
    nave_estelar,
    vehiculo
  } = JSON.parse(event.body);
  const id = v4();
  const fechaCreacion = Date.now();

  console.log("Id: ", id);

  const nuevoPersonaje = {
    id,
    fechaCreacion,
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    año_nacimiento,
    genero,
    nave_estelar,
    vehiculo
  };

  await dynamodb
    .put({
      TableName: "SwapiTable",
      Item: nuevoPersonaje,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(nuevoPersonaje),
  };
};

module.exports = {
  createPersonaje,
};