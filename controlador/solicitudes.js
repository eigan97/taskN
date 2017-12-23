function cambio(url){
		location.assign(url);
}

function crearSolicitud(){
	var idU = localStorage.getItem('id');
	var titulo = document.getElementById('titulo').value;
	var estado = localStorage.getItem('estado');
	var necesidad = localStorage.getItem('necesidad');
	var descripcion = document.getElementById('descripcion').value;
	var foto = document.getElementById('hello').value;
	var colonia = document.getElementById('colonia').value;
	var categoria = document.getElementById('categoria').value;
	//var expiracion = document.getElementById('expiracion');
	var fechaPublicacion = Date.now();

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/crearSolicitud.php?idU='+idU+'&tit='+titulo+'&nec='+necesidad+'&edo='+estado+
						'&des='+descripcion+'&foto='+foto+'&colonia='+colonia+'&cat='+categoria+'&fPu='+fechaPublicacion);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			alert('Solicitud generada correctamente');
			cambio('../index.html')
		}
	}
}

function verTarea(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('conTare');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verTarea.php?idSol='+idSol);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				div = '<div class="campo-edit campo-edit-especial"><p class="info-edit-title"> Titulo</p><input type="text" value='+dato[i].titulo+' class="input-edicion" id="titulo">'+
				'</div><div class="tarjeta-end center-row-start"><p class="info-edit-title"> Tipo de publicacion</p><div class="buttons-add-tarea center-row-ar">'+
				'<div class="button-inicial tarea-add center-row" id="gratis-id-selction" onclick="subrayar(this)"><p>Gratis</p></div>'+
				'<div class="button-inicial tarea-add center-row"  id="premium-id-selction" onclick="subrayar(this)"><p>Premieum</p></div></div></div>'+
				'<div class="tarjeta-end center-row-start"><p class="info-edit-title"> Necesidad</p><div class="buttons-add-tarea center-row-ar">'+
				'<div class="button-inicial tarea-add center-row"  id="urgente-id-selction" onclick="subrayar(this)"><p>Urgente</p></div>'+
				'<div class="button-inicial tarea-add center-row" id="tiempo-id-selction" onclick="subrayar(this)"><p>A tiempo</p></div></div>'+
				'</div><div class="campo-edit">	<p class="info-edit-title"> Categoria</p><select class="input-edicion-white" id="categoria" value= '+dato[i].categoria+'>'+
				'<option value="Albañileria">Albañileria</option><option value="Costureria">Costureria</option>	<option value="Carpinteria">Carpinteria</option>'+
				'<option value="Elictricidad">Elictricidad</option><option value="Herreria">Herreria</option><option value="Jardineria">Jardineria</option>'+
				'<option value="Mecanica">Mecanica</option><option value="Pintura">Pintura</option><option value="Plomeria">Plomeria</option></select></div>'+
				'<div class="campo-edit"><p class="info-edit-title"> Colonia</p><select class="input-edicion-white" id="colonia" value= '+dato[i].colonia+'>'+
				'<option value="Arboledas">Arboledas</option><option value="Benito Juárez">Benito Juárez</option><option value="Casa Blanca">Casa Blanca</option>'+
				'<option value="Cimatario">Cimatario</option><option value="Desarrollo San Pablo">Desarrollo San Pablo</option>	<option value="Felipe Ángeles">Felipe Ángeles</option>'+
				'<option value="Ignacio Zaragoza">Ignacio Zaragoza</option><option value="Jurica">Jurica</option><option value="Las Torres">Las Torres</option>'+
				'</select></div><div class="campo-edit"><div class="title-description-textarea center-row-bw"><p class="info-edit-title"> Descripcion</p>'+
				'<p>0/260</p></div><textarea class="textarea-edicion" value='+dato[i].descripcion+' id="descripcion"></textarea>'+
				'</div><div class="upload-image center-row"><div class="upload-first"><p>Imagen</p><button class="upload-image-button"><label for="hello">Agregar Imagen</label>'+
				'</button><input type="file"  id="hello" style="display: none;"></div><p id="mensaje-foto">No se ha adjuntado una imagen.</p></div>';
				cont.innerHTML += div;
			}
	}	}
}

function verDetalle(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('conDeta')

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verTarea.php?idSol='+idSol);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				var necesidad;
				if( dato[i].necesidad == 1){
					necesidad = "Urgente"
				}else{
					necesidad = "A tiempo"
				}
				var estado;
				if( dato[i].estado == 1){
					estado = "Premium"
				}else{
					estado = "Gratuito"
				}
				//nombreP.innerHTML=dato[i].nombre;
				div = '<p><h2>'+dato[i].titulo+'</h2></p></div><div class="descripcion-iconografica center-row-bw">'+
					'<div class="boton-informacion detalle-botton-description center-row estado"><p>'+dato[i].categoria+'</p></div>'+
					'<div class="boton-informacion detalle-botton-description center-row urgente-boton-info"><p>'+necesidad+'</p>'+
					'</div><div class="boton-informacion detalle-botton-description center-row tipo"><p>'+estado+'</p>'+
					'</div></div><div class="descripcion-detalle-tarea"><span>'+dato[i].descripcion+'</span>'+
					'</div><div class="posicion-detalle-tarea center-row-bw"><div class="icon"></div><p>'+dato[i].colonia+'</p>';
					cont.innerHTML+= div;
			}
			
			var idU = localStorage.getItem('id');
			var cont2 = document.getElementById('postulantes');

			ajax = new XMLHttpRequest()
			ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol='+idSol)
			ajax.send()
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					dato = JSON.parse(ajax.responseText);
					console.log(dato);
					ultimaNot = dato.length;
					for(i=0; i<dato.length; i++){
						div = '<div class="tecnico-detalle-tarea center-row"><div class="foto-detalle-tarea"></div>'+
							'<div class="info-tecnico-detalle center-column"><p class="resaltar">'+dato[i].tecnico+'</p>'+
							'<div class="ranking-little"><p>5/5</p></div><div class="estado-tarea-detalle"><p class="resaltar">Asignada</p>'+
							'</div></div><div class="tecnico-opciones-detalle center-row"><p>Estimado</p><p>MXN$'+dato[i].estimado+'</p>'+
							'<input type="submit" class="button-inicial tecnico-detalle-chat-button" value="Chat" id="'+dato[i].idTec+'"'+
							' onclick="guardarIdTec(this.id), cambio(\'../chat-component/chat-solicitante.html\')"></div></div>'
						cont2.innerHTML+= div;
					}
					longPollingNot();		
				}
			}
		}
	}
}

function guardarIdTec(id){
	localStorage.setItem('tecnico', id);
}

function editarSolicitud(){
	var idSol = localStorage.getItem('idSol');
	var titulo = document.getElementById('titulo');
	var necesidad = document.getElementById('necesidad');
	var descripcion = document.getElementById('descripcion');
	var foto = document.getElementById('foto');
	var colonia = document.getElementById('colonia');
	var categoria = document.getElementById('categoria');
	var expiracion = document.getElementById('expiracion');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/editarSolicitud.php?idSol='+idSol+'&tit='+titulo+'&nec='+necesidad+
						'&des='+descripcion+'&foto='+foto+'&colonia='+colonia+'&cat='+categoria+'&expi='+expiracion);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			alert('Solicitud editada correctamente');
		}
	}
}

function eliminarSolicitud(){
	var idSol = localStorage.getItem('solicitud');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/EliminarSolicitud.php?idSol='+idSol);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			alert('Solicitud eliminada');
			cambio('index.html');
		}
	}
}

//////////
function misTareas(){
	var idU = localStorage.getItem('id');
	var contT = document.getElementById('conTareas');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/misTareas.php?idU='+idU);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				if(dato[i].estado == 1){
					var edo = "PREMIUM"
				}else{
					var edo = "GRATUITA"
				}
				//nombreP.innerHTML=dato[i].nombre;
				div = '<div class="tarjeta-top"><div class="info-main center-row-bw"><div class="title" id="'+dato[i].idSol+'" onclick="almacenar(this.id), cambio(\'tarea-component/detalleTarea.html\')"><p>'+dato[i].titulo+'</p>'+
					'</div><div class="tipo-publicacion center-row"><div class="boton-informacion tipo"><p>'+edo+'</p></div></div>'+
					'<div class="close" value="'+dato[i].idSol+'" id="'+dato[i].idSol+'" onclick="almacenar(this.id); eliminarSolicitud()"><p>X</p></div></div><div class="description-total">'+
					'<span>'+dato[i].descripcion+'</span><p class="fecha-vencimiento">Expira en 1 dia</p></div></div><div class="tarjeta-end center-row-ar">'+
					'<div class="boton-informacion estado"><p>Pendiente</p></div><div class="button-inicial editar" id="'+dato[i].idSol+'" value="'+dato[i].idSol+'" onclick="almacenar(this.id); cambio(\'tarea-component/editTarea.html\')">'+
					'Editar</div></div><br><br>'
					contT.innerHTML+= div;
			}
			var cont = document.getElementById('contNot');

			ajax = new XMLHttpRequest()
			ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario.php?idU='+idU)
			ajax.send()
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					dato = JSON.parse(ajax.responseText);
					console.log(dato);
					ultimaNot = dato.length;
					for(i=0; i<dato.length; i++){
						div = '<div class="info-noti-total center-row-bw" id="'+dato[i].idSol+'" onclick="almacenar(this.id); cambio(\'tarea-component/detalleTarea.html\')">'+
								'<div class="foto-tecnico-chat"></div><div class="info-notificacion">'+
								'<p>'+dato[i].tecnico+' ha <span class="resaltar">solicitado</span> tu tarea <span class="resaltar">'+
								dato[i].titulo+'</span></p></div></div>'
						cont.innerHTML+= div;
					}
					longPollingNot();
					cargarConversacionesA();
					cargarConversaciones();

				}
			}
		}
	}
}

function almacenar(id){

	localStorage.setItem('solicitud',id);
}



////////// Para el Tecnico 

function tareasDisponibles(){
	var idU = localStorage.getItem('id');
	//var idTec = localStorage.getItem('idUT');+'&idTec='+idTec
	var colonia = document.getElementById('colonia').value;
	var palabra = document.getElementById('busqueda').value;
	var contTD = document.getElementById('tareasDisponibles');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/tareasDisponibles.php?idU='+idU+'&col='+colonia+'&palabra='+palabra);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				if(dato[i].necesidad == 1){
					var edo = "URGENTE"
				}else{
					var edo = "A TIEMPO"
				}
				//nombreP.innerHTML=dato[i].nombre;
				div = '<div class="tarjeta-top"><div class="info-main center-row-bw"><div class="title" id="'+dato[i].idSol+'" onclick="almacenar(this.id); cambio(\'tareaTecnico-component/detalleTareaTecnico.html\')"><p>'+dato[i].titulo+'</p>'+
					'</div><div class="tipo-publicacion center-row"></div>'+
					'<div class="close" value="'+dato[i].idSol+'" id="'+dato[i].idSol+'" onclick="almacenar(this.id); eliminarSolicitud()"><p>X</p></div></div><div class="description-total">'+
					'<span>'+dato[i].descripcion+'</span></div></div><div class="tarjeta-end center-row-ar"><div class="boton-informacion estado"><p>'+
					edo+'</p></div><div class="button-inicial editar" id="'+dato[i].idSol+'" value="'+dato[i].idSol+'" onclick="almacenar(this.id); cambio(\'tareaTecnico-component/detalleTareaTecnico.html\')">'+
					'Ver Detalles</div></div><br><br>'
					/*'<div class="tarjeta-historico"><div class="tarjeta-top"><div class="info-main center-row-bw"><div class="title-historico">'+
					'<p>Tuberia rota del fregadero</p></div></div><div class="description-historico"><p>El lavabo gotea a pesar de cerrar</p>'+
					'</div><div class="info-historico center-row-ar"><div class="boton-informacion urgente-boton-info search-boton-info">'+
					'<p>Urgente</p></div><div class="boton-informacion estado search-boton-info"><p>Completada</p></div></div></div></div>'*/
				contTD.innerHTML+= div;
			}
			cargarConversacionesT();
			cargarConversacionesTA()
		}
	}

}

function verDetalle2(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('conDeta')

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verTarea.php?idSol='+idSol);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				var necesidad;
				if( dato[i].necesidad == 1){
					necesidad = "Urgente"
				}else{
					necesidad = "A tiempo"
				}
				var estado;
				if( dato[i].estado == 1){
					estado = "Premium"
				}else{
					estado = "Gratuito"
				}
				div = '<p><h2>'+dato[i].titulo+'</h2></p></div><div class="descripcion-iconografica center-row-bw">'+
					'<div class="boton-informacion detalle-botton-description center-row estado"><p>'+dato[i].categoria+'</p></div>'+
					'<div class="boton-informacion detalle-botton-description center-row urgente-boton-info"><p>'+necesidad+'</p>'+
					'</div><div class="boton-informacion detalle-botton-description center-row tipo"><p>'+estado+'</p>'+
					'</div></div><div class="descripcion-detalle-tarea"><span>'+dato[i].descripcion+'</span>'+
					'</div><div class="posicion-detalle-tarea center-row-bw"><div class="icon"></div><p>'+dato[i].colonia+'</p>';
					cont.innerHTML+= div;
			}
			
			ajax = new XMLHttpRequest();
			ajax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/infoSolicitante.php?idSol='+idSol);
			ajax.send();
			ajax.onreadystatechange = function(){
				if(ajax.readyState==4 && ajax.status==200){
					dato = JSON.parse(ajax.responseText);
					console.log(dato);
					for(i=0; i<dato.length; i++){
						div = '<div class="seguimiento-perfil center-column"><div class="foto-sguimiento"><div class="foto"><div class="content">'+
								'</div></div></div><div class="name-seguimiento center-row"><p class="resaltar">'+dato[i].nombre+' '+dato[i].apellidos+
								'</p></div><p>Solicitante</p></div>';
						cont.innerHTML+= div;
					}
				}
			}
		}
	}	
}



////////// NOTIFICACIONES
function crearNotificacion(){
	var idUT = localStorage.getItem('id')
	var idSol = localStorage.getItem('solicitud')
	var esti = document.getElementById('estimado').value;

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/crearNotificacion.php?idUT='+idUT+'&idSol='+idSol+'&esti='+esti)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			console.log(ajax.responseText);
			alert('Se ha solicitado la tarea');
			cambio('../mainTecnico.html')
		}
	}
}


function longPollingNot(){
	var idU = localStorage.getItem('id')
	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario.php?idU='+idU)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			
			ultimaNot++
						
		}
	}
	setTimeout(function(){
		longPollingNot()
	}, 30000)

}



function verNotificacionTecnico(){
	
}


//////////
function obtenerCategorias(){
	var categoria = document.getElementById('categoria'); 

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/obtenerCategorias.php?cat='+categoria);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function obtenerColonias(){
	var colonia = document.getElementById('colonia');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/obtenerColonias.php?col='+colonia);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}
