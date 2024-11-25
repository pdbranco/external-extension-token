const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const authUrl = "https://us.fsm.cloud.sap/api/oauth2/v2/token";

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/token', async (req, res) => {
    const clientId = process.env.CLIENT_ID; // Variável de ambiente
    const clientSecret = process.env.CLIENT_SECRET; // Variável de ambiente

    try {
        const response = await axios.post(authUrl, {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials',
        });

        const token = response.data.access_token;
        res.json({ token });
    } catch (error) {
        console.error('Erro ao obter o token:', error.message);
        res.status(500).send('Erro ao obter o token');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
