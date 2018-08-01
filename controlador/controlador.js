var Usuario= require('../modelos/usuarios')
	fs= require('fs'),
	uniqid = require('uniqid');

exports.registro= function (req, res, next) {
	var user= new Usuario({
		nombre: req.body.nombre,
		usuario: req.body.usuario,
		password: req.body.pass
	});

	user.save(function(err, user){
		if (!err) {
			res.status(201);
			next();
		}else{
			res.status(400);
			res.send('Sucedio encontro un problema!');
		}
	});
};

exports.cargarImg= function(req, res, next){
	try {
        var imgPath = '',
            galleryPath = __dirname + '/../public/galeria/',
            extension = '.' + req.files.inpUpload.originalFilename.split('.')[1];
        imgPath = galleryPath + uniqid() + extension;
        tmpFile = req.files.inpUpload.path;
        var writeStream = fs.createWriteStream(imgPath);
        var readStream = fs.createReadStream(tmpFile);
        readStream.pipe(writeStream);
        res.status(201);
        next();        
    } catch (err) {
        res.status(400);
        res.send('Sucedio un error al subir la iamgen : ' + err);     
    }
};

