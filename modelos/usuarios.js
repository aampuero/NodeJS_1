var modelos= require('./modelos'),
	Schema= modelos.Schema;

var usuariosSchema= new Schema({
	nombre: String,
	usuario: String,
	password: String,
	twitter: Schema.Types.Mixed
});

var Usuario= modelos.model('Usuario', usuariosSchema, 'usuario_sesion');

module.exports= Usuario;
