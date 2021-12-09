const express = require('express')
const app = express.Router()
const usuariosModel = require("../models/usuarios_model")
const perfilModel = require("../models/perfules_model");
const formidable = require("formidable")
const path = require("path")
fs = require("fs")
const { v4: uuidv4 } = require("uuid")
DIRECTORIO_FOTOS = path.join("D:\\Desktop\\express\\usuarios\\",
  "fotos_usuarios");

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
app.get('/usuarios', async (req, res) => {
  const usuarios = await usuariosModel.obtener();
  res.json(usuarios);
});
app.post('/usuario', async (req, res) => {
  const usuario = req.body;
  const respuesta = await usuariosModel.insertar(usuario.nombre, usuario.apellidoP, usuario.apellidoM, usuario.edad, usuario.ubicacion);
  res.json(respuesta);
});
app.post('/modificarusuario', async (req, res) => {
  const usuario = req.body;
  const respuesta = await usuariosModel.actualizar(usuario.idUsuario, usuario.nombre, usuario.apellidoP, usuario.apellidoM, usuario.edad, usuario.ubicacion);
  res.json(respuesta);
});
app.post('/usuarioporid', async (req, res) => {
  const usuario = req.body;
  const respuesta = await usuariosModel.obtenerporid(usuario.idUsuario);
  res.json(respuesta);
});
app.post('/eliminarusuario', async (req, res) => {
  const usuario = req.body;
  const respuesta = await usuariosModel.eliminar(usuario.idUsuario);
  res.json(respuesta);
});
app.post('/agregarperfil', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.insertar(perfil.titulo, perfil.acerca, perfil.idUsuario,perfil.face, perfil.twitter, perfil.inst);
  res.json(respuesta);
});
app.post('/modificarperfil', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.actualizar(perfil.idPerfil, perfil.titulo, perfil.acerca, perfil.face, perfil.twitter, perfil.inst);
  res.json(respuesta);
});
app.post('/perfiles', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.obtenertodos(perfil.idUsuario);
  res.json(respuesta);
});
app.post('/perfil', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.obtener(perfil.idPerfil);
  res.json(respuesta);
});
app.post('/eliminar', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.eliminar(perfil.idPerfil);
  res.json(respuesta);
});
app.post('/perfil/like', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.agregarlike(perfil.like, perfil.idPerfil);
  res.json(respuesta);
});
app.post('/perfil/dislike', async (req, res) => {
  const perfil = req.body;
  const respuesta = await perfilModel.agregardislike(perfil.dislike, perfil.idPerfil);
  res.json(respuesta);
});
app.post('/fotos_usuarios', (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: DIRECTORIO_FOTOS,
  });

  form.parse(req, async (err, fields, files) => {
    const idPerfil = fields.idPerfil;
    console.log(fields)
    console.log(files)
    for (let clave in files) {
      const file = files[clave];
      const nombreArchivo = file.name;
      await perfilModel.agregarFoto(idPerfil, nombreArchivo)
    }
  });

  form.on("fileBegin", (name, file) => {
    const extension = path.extname(file.name);
    const nuevoNombre = uuidv4().concat(extension);
    file.path = path.join(DIRECTORIO_FOTOS, nuevoNombre);
    file.name = nuevoNombre;
  })

  form.on("end", () => {
    res.json({
      respuesta: true,
    })
  })

});

module.exports = app;
