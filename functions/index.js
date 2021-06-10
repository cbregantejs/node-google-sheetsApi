const functions = require('firebase-functions');
const { appendToSheet } = require('./sheets');
const cors = require('cors')
const express = require('express');

const app = express();
app.use(cors({ origin: true }));


const handler = async (req, res) => {
  console.log('==INICIA REGISTRO==');
  console.log(req.body);
  const reply = {};
  reply.headers = req.headers;
  reply.body = req.body;
  await appendToSheet([
    ...Object.values(req.body),
    new Date(),
  ]);
  console.log('==FINALIZA==');
  return res.status(200).send({
    status: 'success',
    message: 'Registrado correctamente.',
  });
};

app.post('/', handler);

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello word.',
  });
})

 
exports.app = functions.https.onRequest(app);