const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());

//rutas
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.get('/docs', (req,res) =>{
    res.status(200).sendFile(path.join(__dirname, "about-server.html"))
})

app.get("/canciones", (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    res.status(200).json(canciones);
  } catch (error) {
    console.log("Error del servidor", error);
  }
});
app.post("/canciones", (req, res) => {
  try {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));

    if (!cancion) {
      res.status(404).send("Tu canción no existe o no ha sido encontrada");
    }

    canciones.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));

    res.status(200).json({ message: "Canción añadida con éxito" });
  } catch (error) {
    console.log("Error del servidor", error);
  }
});
app.put("/canciones/:id", (req, res) => {
  try {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    const index = canciones.findIndex((item) => item.id == id);
    canciones[index] = cancion;
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
    res.status(200).json({ message: "Canción modificada con éxito" });
  } catch (error) {
    console.log("Error del servidor", error);
  }
});
app.delete("/canciones/:id", (req, res) => {
  try {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    const index = canciones.findIndex((item) => item.id == id);

    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
    res.status(200).json({ message: "Canción borrada con éxito" });
  } catch (error) {
    console.log("Error del servidor", error);
  }
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
