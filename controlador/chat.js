function cargarDatosChat(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('datosChat');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			ultimaNot = dato.length;
			for(i=0; i<dato.length; i++){
				div = '<div class="foto-chat"></div><div class="chat-info-general"><p class="resaltar">'+dato[i].tecnico+'</p>'+
						'<p>'+dato[i].titulo+'</p></div>'
				cont.innerHTML+= div;
				sessionStorage.setItem('costo',dato[i].estimado)
			}	
		}
	}
}

function cargarChat(){

	idSaliente = localStorage.getItem('id');
	idEntrante = localStorage.getItem('tecnico');
	cargarAjax = new XMLHttpRequest();
	cargarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/chat/chat.php?idS='+idSaliente+'&idE='+idEntrante);
	cargarAjax.send();
	cargarAjax.onreadystatechange = function(){
		if (cargarAjax.readyState == 4 && cargarAjax.status == 200) {
			mensajes = JSON.parse(cargarAjax.responseText);

			ultimoMensaje = mensajes.length;
			//CARGAR CHAT
			for(i = 0; i<mensajes.length; i++){
				if (mensajes[i].idSaliente == idSaliente) {
					bandeja.innerHTML += "<div class=\"mensaje-entrante\"><div class=\"mensaje-entrante-text\">"+mensajes[i].mensaje+"</div></div>";
				}else{
					bandeja.innerHTML += "<div class=\"mensaje-saliente\"><div class=\"mensaje-saliente-text\">"+mensajes[i].mensaje+"</div></div>";
				}
			}
			longPollingChat();
		}
	}
}

function enviarMSJ(){
	mensaje = document.getElementById('mensaje').value;
	if(mensaje!=""){
		bandeja = document.getElementById('bandeja');
		bandeja.innerHTML += "<div class=\"mensaje-entrante\"><div class=\"mensaje-entrante-text\">"+mensaje+"</div></div>";
		document.getElementById('mensaje').value="";
		//ENVIAR A LA BASE DE DATOS
		idSaliente = localStorage.getItem('id');
		idEntrante = localStorage.getItem('tecnico');
		enviarAjax = new XMLHttpRequest();
		enviarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/chat/mensaje.php?idS='+idSaliente+'&idE='+idEntrante+'&msj='+mensaje);
		enviarAjax.send();
		enviarAjax.onreadystatechange = function(){
			if (enviarAjax.readyState == 4 && enviarAjax.status == 200) {
				console.log('ENVIADO!');
			}
		}
	}else{
		navigator.vibrate('300');
	}
}

function longPollingChat(){
	idSaliente = localStorage.getItem('id');

	ultimoAjax = new XMLHttpRequest();
	ultimoAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/chat/ultimoMensaje.php?idS='+idSaliente+'&idE='+idEntrante+'&ultimo='+ultimoMensaje);
	ultimoAjax.send();
	ultimoAjax.onreadystatechange = function(){
		if(ultimoAjax.status == 200 && ultimoAjax.readyState == 4){
			ultimoJSON = JSON.parse(ultimoAjax.responseText);
			if(ultimoJSON.nuevo == "si"){
				if (ultimoJSON.idSaliente == idSaliente) {
					bandeja.innerHTML += "<div class=\"mensaje-entrante\"><div class=\"mensaje-entrante-text\">"+ultimoJSON.mensaje+"</div></div>";
				}else{
					bandeja.innerHTML += "<div class=\"mensaje-saliente\"><div class=\"mensaje-saliente-text\">"+ultimoJSON.mensaje+"</div></div>";
				}
				ultimoMensaje++;
			}
		}
	}
	bandeja.scrollTop = bandeja.scrollHeight;
	setTimeout(function(){
		longPollingChat()
	}, 3000)
}

function cargarConversacionesA(){
	var idU = localStorage.getItem('id');
	var cont = document.getElementById('datosChatA');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversaciones.php?idS='+idU)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);

			for(i=0; i<dato.length; i++){
				idUT = dato[i].idUT;
				nombreT = dato[i].nombre;
				apellidosT = dato[i].apellidos; 

				ajax2 = new XMLHttpRequest()
				ajax2.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversaciones3.php?idUT='+idUT+'&idU='+idU)
				ajax2.send()
				ajax2.onreadystatechange = function(){
					if(ajax2.readyState == 4 && ajax2.status == 200){
						datos = JSON.parse(ajax2.responseText);
						console.log(datos);

						for(i=0; i<datos.length; i++){
							div='<div class="asignacion"><p> Tecnico Asignado</p></div><div class="info-chat-total center-row-bw" id="'+datos[i].idT+
								'" value="'+datos[i].idSol+'" onclick="guardarIdTec2(this.id), cambio(\'chat-component/chat-solicitante.html\')">'+
								'<div class="foto-tecnico-chat"></div><div class="info-chat"><div class="info-principal-chat">'+
								'<p class="name name-asignado">'+datos[i].tecnico+'</p><p class="tarea-chat tarea-chat-asignado">'+datos[i].titulo+'</p>'+
								'</div></div></div><div class="no-mensajes center-row-end"><div class="circulo-chat center-row"><p>'+
								'</p></div></div>';

							cont.innerHTML+= div;
						}
						
					}
				}
			}
		}
	}
}

function cargarConversaciones(){
	var idU = localStorage.getItem('id');
	var cont = document.getElementById('datosChatC');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversaciones.php?idS='+idU)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);

			for(i=0; i<dato.length; i++){
				idUT = dato[i].idUT;
				nombreT = dato[i].nombre;
				apellidosT = dato[i].apellidos; 

				ajax2 = new XMLHttpRequest()
				ajax2.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversaciones2.php?idUT='+idUT+'&idU='+idU)
				ajax2.send()
				ajax2.onreadystatechange = function(){
					if(ajax2.readyState == 4 && ajax2.status == 200){
						datos = JSON.parse(ajax2.responseText);
						console.log(datos);

						for(i=0; i<datos.length; i++){
							div='<div class="info-chat-total center-row-bw" id="'+datos[i].idT+'" value="'+datos[i].idSol+'" onclick="guardarIdTec2(this.id),'+
								' cambio(\'chat-component/chat-solicitante.html\')"><div class="foto-tecnico-chat"></div><div class="info-chat">'+
								'<div class="info-principal-chat"><p class="name">'+datos[i].tecnico+'</p><p class="tarea-chat" id="titulo">'+datos[i].titulo+'</p>'+
								'</div></div></div><div class="no-mensajes center-row-end"><div class="circulo-chat center-row"><p></p></div></div>';

							cont.innerHTML+= div;
						}
						
					}
				}
			}
		}
	}
}

function guardarIdTec2(id){
	localStorage.setItem('tecnico',id)

	idU = localStorage.getItem('id')
	idT = localStorage.getItem('tecnico')

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/obtenerid.php?idU='+idU+'&idT='+idT)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax2.readyState == 4 && ajax2.status == 200)
			datos = JSON.parse(ajax2.responseText);
			console.log(datos);

			for(i=0; i<datos.length; i++){
				localStorage.setItem('solicitud',datos[i].idSol)
			}
	}
}


////////// tecnico

/*function cargarConversacionesTA(){
	var idU = localStorage.getItem('id');
	var cont = document.getElementById('contConA');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversacionesT.php?idS='+idU)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);

			for(i=0; i<dato.length; i++){
				idUT = dato[i].idUT;
				nombreT = dato[i].nombre;
				apellidosT = dato[i].apellidos; 

				ajax2 = new XMLHttpRequest()
				ajax2.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversaciones3T.php?idUT='+idU+'&idU='+idUT)
				ajax2.send()
				ajax2.onreadystatechange = function(){
					if(ajax2.readyState == 4 && ajax2.status == 200){
						datos = JSON.parse(ajax2.responseText);
						console.log(datos);

						for(i=0; i<datos.length; i++){
							div='<div class="asignacion"><p>Tarea Asignada</p></div><div class="info-chat-total center-row-bw">'+
								'<div class="foto-tecnico-chat"></div><div class="info-chat"><div class="info-principal-chat">'+
								'<p class="name name-asignado">'+nombreT+'</p><p class="tarea-chat tarea-chat-asignado">'+datos[i].titulo+'</p>'+
								'</div></div></div>	<div class="no-mensajes center-row-end"><div class="circulo-chat center-row">'+
								'<p></p></div></div>';

							cont.innerHTML+= div;
						}
						
					}
				}
			}
		}
	}
}*/


function cargarConversacionesT(){
	var idU = localStorage.getItem('id');
	var cont = document.getElementById('contCon');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversacionesT.php?idS='+idU)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);

			for(i=0; i<dato.length; i++){
				idUT = dato[i].idUT;
				nombreT = dato[i].nombre;
				apellidosT = dato[i].apellidos; 

				ajax2 = new XMLHttpRequest()
				ajax2.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/conversaciones2.php?idUT='+idU+'&idU='+idUT)
				ajax2.send()
				ajax2.onreadystatechange = function(){
					if(ajax2.readyState == 4 && ajax2.status == 200){
						datos = JSON.parse(ajax2.responseText);
						console.log(datos);

						for(i=0; i<datos.length; i++){
							div='<div class="mensaje center-row" id="'+datos[i].idSol+'" onclick="guardarIdTec3(this.id),'+
								' cambio(\'../chat-component/chat-tec.html\')"><div class="info-chat-total center-row-bw"><div class="foto-tecnico-chat">'+
								'</div><div class="info-chat"><div class="info-principal-chat"><p class="name">'+nombreT+'</p>'+
								'<p class="tarea-chat">'+datos[i].titulo+'</p></div></div></div><div class="no-mensajes center-row-end">'+
								'<div class="circulo-chat center-row"><p></p></div></div></div>';

							cont.innerHTML+= div;
						}
						
					}
				}
			}
		}
	}

}

function guardarIdTec3(id){
	localStorage.setItem('solicitud', id)

	idUT = localStorage.getItem('id')
	idSol = localStorage.getItem('solicitud')

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/chat/obteneridT.php?idUT='+idUT+'&idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax2.readyState == 4 && ajax2.status == 200)
			datos = JSON.parse(ajax2.responseText);
			console.log(datos);

			for(i=0; i<datos.length; i++){
				localStorage.setItem('cliente',datos[i].idU)
			}
	}
}

function cargarDatosChatTec(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('datosChatT');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			ultimaNot = dato.length;
			for(i=0; i<dato.length; i++){
				div = '<div class="foto-chat"></div><div class="chat-info-general"><p class="resaltar">'+dato[i].cliente+'</p>'+
						'<p>'+dato[i].titulo+'</p></div>'
				cont.innerHTML+= div;
			}	
		}
	}
}

function cargarChatTec(){
	idSaliente = localStorage.getItem('id');
	idEntrante = localStorage.getItem('cliente');
	cargarAjax = new XMLHttpRequest();
	cargarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/chat/chatT.php?idS='+idSaliente+'&idE='+idEntrante);
	cargarAjax.send();
	cargarAjax.onreadystatechange = function(){
		if (cargarAjax.readyState == 4 && cargarAjax.status == 200) {
			mensajes = JSON.parse(cargarAjax.responseText);

			ultimoMensaje = mensajes.length;
			//CARGAR CHAT
			for(i = 0; i<mensajes.length; i++){
				if (mensajes[i].idSaliente == idSaliente) {
					bandeja.innerHTML += "<div class=\"mensaje-entrante\"><div class=\"mensaje-entrante-text\">"+mensajes[i].mensaje+"</div></div>";
				}else{
					bandeja.innerHTML += "<div class=\"mensaje-saliente\"><div class=\"mensaje-saliente-text\">"+mensajes[i].mensaje+"</div></div>";
				}
			}
			longPollingChat();
		}
	}
}

function enviarMSJTec(){
	mensaje = document.getElementById('mensaje').value;
	if(mensaje!=""){
		bandeja = document.getElementById('bandeja');
		bandeja.innerHTML += "<div class=\"mensaje-entrante\"><div class=\"mensaje-entrante-text\">"+mensaje+"</div></div>";
		document.getElementById('mensaje').value="";
		//ENVIAR A LA BASE DE DATOS
		idSaliente = localStorage.getItem('id');
		idEntrante = localStorage.getItem('cliente');
		enviarAjax = new XMLHttpRequest();
		enviarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/chat/mensajeT.php?idS='+idSaliente+'&idE='+idEntrante+'&msj='+mensaje);
		enviarAjax.send();
		enviarAjax.onreadystatechange = function(){
			if (enviarAjax.readyState == 4 && enviarAjax.status == 200) {
				console.log('ENVIADO!');
			}
		}
	}else{
		navigator.vibrate('300');
	}
}








function validar(){
	var idSol = localStorage.getItem('solicitud')
	var sol = localStorage.getItem(idSol)

	if (sol == 'asignado') {
		cambio('../tarea-component/seguimiento-tarea.html')
	}
}

function agregarServicio(){
	var idSol = localStorage.getItem('solicitud');	
	var idU = localStorage.getItem('id');
	var idTec = localStorage.getItem('tecnico');
	//var fyh = Date.now();
	var costo = sessionStorage.getItem('costo');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/agregarServicio.php?idSol='+idSol+'&idU='+idU+'&idTec='+idTec+'&fyh=&costo='+costo);
	ajax.send();
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			return ajax.responseText;
			
		} 
	}
	localStorage.setItem(idSol, 'asignado')
}

function datos1(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('datosTec');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			ultimaNot = dato.length;
			for(i=0; i<dato.length; i++){
				div = '<div class="foto-sguimiento"><div class="foto"><div class="content"></div></div></div>'+
					'<div class="name-seguimiento center-row"><p class="resaltar">'+dato[i].tecnico+'</p></div>'
				cont.innerHTML+= div;
			}
		}
	}
}

function datos2(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('negociacion');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			ultimaNot = dato.length;
			for(i=0; i<dato.length; i++){
				div = '<div class="seguimiento-perfil center-column"><div class="foto-sguimiento"><div class="foto"><div class="content">'+
					'</div></div></div><div class="name-seguimiento center-row"><p class="resaltar">'+dato[i].tecnico+'</p></div></div>'+
					'<div class="seguimiento-buttons"><div class="seguimiento-confirmacion center-row"><p>El tecnico estimo para tu tarea:</p>'+
					'<div class="estimado-seguimiento center-row"><p style="font-size: 1.5em;">$</p><input type="number" class="input-edicion seguimiento-costo" value="'+dato[i].estimado+'" id="precio">'+
					'</div></div><div class="seguimiento-confirmacion center-row"><p>¿Ya llego el tecnico a tu domicilio?</p>'+
					'<p>Si es asi, confirma su asistencia.</p><input type="submit" class="button-inicial button-seguimiento" value="Confirmar"'+
					'onclick="actualizarCosto(), cambio(\'seguimientoPago.html\')"></div><div class="seguimiento-confirmacion center-row"><p>Aun no llega el tecnico</p>'+
					'<input type="submit" class="upload-image-button button-seguimiento" value="Reasignar" onclick="reasignar(), cambio(\'../index.html\')"></div></div>'+
					'<p style="color: #525252; margin-bottom: 20px;">Esta opcion NO tiene costo</p>'
				cont.innerHTML+= div;
			}
		}
	}
}

function datos3(){
	var idSol = localStorage.getItem('solicitud');
	var cont = document.getElementById('confirmacion');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			ultimaNot = dato.length;
			for(i=0; i<dato.length; i++){
				div = '<div class="seguimiento-perfil center-column"><div class="foto-sguimiento"><div class="foto"><div class="content">'+
					'</div></div></div><div class="name-seguimiento center-row"><p class="resaltar">'+dato[i].tecnico+'</p></div></div>'+
					'<div class="seguimiento-buttons"><div class="seguimiento-confirmacion center-row"><p style="width: 100%; text-align: center;">El tecnico y tu acrodaron</p>'+
					'<p style="font-size: 2em;">$'+dato[i].estimado+'</p></div><div class="seguimiento-confirmacion center-row"><p>¿El tecnico ya termino la tarea?</p>'+
					'<input type="submit" class="button-inicial button-seguimiento" value="Pagar" onclick="pagar()"></div></div>'
				cont.innerHTML+= div;
			}
		}
	}
}

function actualizarCosto(){
	var idSol = localStorage.getItem('solicitud');
	var cost = document.getElementById('precio').value;

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/actualizarCosto.php?idSol='+idSol+'&cost='+cost)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			return ajax.responseText
		}

		sessionStorage.setItem('costo', cost);
	}
}

function pagar(){
	var idSol = localStorage.getItem('solicitud');

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/finalizarServicio.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){

		}
	}
	var s = localStorage.getItem('solicitud')
	localStorage.removeItem(s)
	sessionStorage.clear()
	localStorage.removeItem('solicitud')
	localStorage.removeItem('tecnico')
	cambio('../index.html')
}

function reasignar(){

	var idSol = localStorage.getItem('solicitud');

	localStorage.removeItem(idSol)
	sessionStorage.clear()

	ajax = new XMLHttpRequest()
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/eliminarServicio.php?idSol='+idSol)
	ajax.send()
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){

		}
	}

}










//https://eiganzuag.000webhostapp.com/task/modelo/solicitudes/verNotificacionUsuario2.php?idSol=