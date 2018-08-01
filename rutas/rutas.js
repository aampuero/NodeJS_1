var usuario= require('../controlador/controlador'),
	fs= require('fs');

var rutas= function (app, swig) {
	app.get('/', function(req, res){
		res.render('login');
	});

	app.get('/registro', function(req, res){
		res.render('registro');
	});

	app.get('/user', function(req, res){
		var imagenes= [];
		fs.readdir(__dirname+ '/../public/galeria/', function(err, archivos){
			if (!err) {
				for(var i=0; i<archivos.length; i++){
					imagenes.push('galeria/'+ archivos[i]);
					}
			}else{
				console.log(err);
			}
		});
		
		swig.renderFile(__dirname + '/../vistas/main.html', {usuario: req.session.passport.user.nombre, imagenes: imagenes}, function (err, output) {
            if (err) {
                throw err;
            }
            res.send(output);
            res.end();
        });
	});

	app.get('/subir-archivo', function(req, res){
		swig.renderFile(__dirname+ '/../vistas/cargar-img.html', {usuario: req.session.passport.user.nombre}, function(err, output){
			if (err) {
                throw err;
            }
            res.send(output);
            res.end();
		});
	});

	app.get('/error', function (req, res){
		res.send(req.session.flash.error[0]);
	});

	app.post('/registro', usuario.registro, function(req, res){
		res.redirect('/');
	});

	app.post('/uploadFile', usuario.cargarImg, function(req, res){
		res.redirect('/user');
	});

	app.post('/edit', function(req, res){
		swig.renderFile(__dirname+ '/../vistas/editar-img.html', {idImagen: req.body.idImagen, usuario: req.session.passport.user.nombre}, function(err, output){
			if (err) {
                throw err;
            }
            res.send(output);
            res.end();
		})
	})
};

module.exports= rutas;