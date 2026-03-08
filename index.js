const express = require('express');
const { Client } = require('discord.js-selfbot-v13');
const app = express();
const port = process.env.PORT || 3000;

// --- SERVIDOR PARA RENDER (PERSISTENCIA) ---
app.get('/', (req, res) => {
  res.send('¡El bot está operando al 100%!');
});

app.listen(port, () => {
  console.log('Servidor de persistencia activo en puerto: ' + port);
});

// --- LÓGICA DEL BOT ---
const client = new Client({ checkUpdate: false });

client.on('ready', async () => {
  console.log('¡Éxito! Bot conectado como: ' + client.user.tag);
  
  // Aquí puedes agregar funciones de spam si las tienes listas
});

// El bot usará el TOKEN que pegaste en la pestaña Environment de Render
client.login(process.env.TOKEN);
