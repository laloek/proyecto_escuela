const conexion = require("../config/conexion");
const fs = require('fs');
const path = require('path');
const { resolve } = require("path");
//CRUD - Create,READ, UPDATE, DELETE
module.exports = {
	insertar(nombre, apellidoP, apellidoM, edad, ubicacion) {
		return new Promise((resolve, reject) => {
			conexion.query('insert into usuarios (nombre,apellidoP,apellidoM,edad,ubicacion)' +
				' values (?,?,?,?,?)', [nombre, apellidoP, apellidoM, edad, ubicacion], (err, resultado) => {
					if (err) reject(err);
					else resolve(resultado.insertId)
				})
		})
	},
	obtener() {
		return new Promise((resolve, reject) => {
			conexion.query('select idUsuario,nombre,apellidoP,apellidoM,edad,ubicacion from usuarios', (err, resultados) => {
				if (err) reject(err);
				else resolve(resultados);
			})
		})
	},
	obtenerporid(id) {
		return new Promise((resolve, reject) => {
			conexion.query('select idUsuario,nombre,apellidoP,apellidoM,edad,ubicacion from usuarios where idUsuario=?',[id], (err, resultados) => {
				if (err) reject(err);
				else resolve(resultados);
			})
		})
	},
	actualizar(id, nombre, apellidoP, apellidoM, edad, ubicacion) {
		return new Promise((resolve, reject) => {
			conexion.query('update usuarios set nombre =?, apellidoP=?, apellidoM=?, edad=?, ubicacion=? where idUsuario=?', [nombre, apellidoP, apellidoM, edad, ubicacion, id], (err) => {
					if (err) reject(err);
					else resolve();
				})
		})
	},
	eliminar(id) {
		return new Promise(async (resolve, reject) => {
			conexion.query('delete from usuarios where idUsuario =?', [id],
				(err,res) => {
					if (err) reject(err);
					else resolve(res);
				})
		})
	},
}