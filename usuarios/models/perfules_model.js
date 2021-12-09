const conexion = require("../config/conexion");
const fs = require('fs');
const path = require('path');
const { resolve } = require("path");
//CRUD - Create,READ, UPDATE, DELETE
module.exports = {
	insertar(titulo, acerca, idUsuario,face,twitter,inst) {
		return new Promise((resolve, reject) => {
			conexion.query('insert into perfil (titulo,acerca,idUsuario,face,twitter,inst)' +
				' values (?,?,?,?,?,?)', [titulo, acerca, idUsuario,face,twitter,inst], (err, resultado) => {
					if (err) reject(err);
					else resolve(resultado.insertId)
				})
		})
	},
	obtener(id) {
		return new Promise((resolve, reject) => {
			conexion.query('select * from perfil WHERE idPerfil=?', [id], (err, resultados) => {
				if (err) reject(err);
				else resolve(resultados);
			})
		})
	},
	obtenertodos(id) {
		return new Promise((resolve, reject) => {
			conexion.query('select * from perfil WHERE idUsuario=?',[id], (err, resultados) => {
				if (err) reject(err);
				else resolve(resultados);
			})
		})
	},

	actualizar(id, titulo, acerca,face,twitter,inst) {
		return new Promise((resolve, reject) => {
			conexion.query('update perfil set titulo =?, acerca=?,face=?,twitter=?,inst=? where idPerfil=?', [titulo, acerca, face, twitter, inst, id], (err, resultados) => {
				if (err) reject(err);
				else resolve(resultados.insertId);
			})
		})
	},
	agregarlike(id, like) {
		return new Promise((resolve, reject) => {
			conexion.query('update perfil set perlike =? where idPerfil=?', [like, id], (err) => {
				if (err) reject(err);
				else resolve();
			})
		})
	},
	agregardislike(id, dislike) {
		return new Promise((resolve, reject) => {
			conexion.query('update perfil set dislike =? where idPerfil=?', [dislike, id], (err) => {
				if (err) reject(err);
				else resolve();
			})
		})
	},
	eliminar(id) {
		return new Promise(async (resolve, reject) => {
			conexion.query('delete from perfil where idPerfil =?', [id],
				(err) => {
					if (err) reject(err);
					else resolve();
				})
		})
	},
	agregarFoto(idPerfil, nombreFoto) {
		return new Promise((resolve, reject) => {
			conexion.query('update perfil set foto =? where idPerfil=?', [nombreFoto, idPerfil], (err, resultados) => {
					if (err) reject(err);
					else resolve(resultados.insertId);
				})
		})
	},
}