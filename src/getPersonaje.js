const AWS = require("aws-sdk");

const getPersonaje = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb.scan({ TableName: "SwapiTable"}).promise();

  const personajes = result.Items;
  console.log(personajes)
  return {
    status: 200,
    body: {
      personajes,
    },
  };
};

module.exports = {
  getPersonaje,
};