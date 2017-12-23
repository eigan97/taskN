function login(){
	var us = document.getElementById('elemento').value;
	var contra = document.getElementById('contrasena').value;
	ajaxLogin = new XMLHttpRequest();
	ajaxLogin.onreadystatechange = function(){
		if (ajaxLogin.readyState==4 && ajaxLogin.status == 200) {
			var response = ajaxLogin.responseText;
			if (us.length == 0 || contra.length == 0) {
				alert('Por favor completa los campos señalados');
			}else{
				if(response > 0) {
					alert('Bievenido :)');
					// alert(response);
					localStorage.setItem('id',response);
					location.href = 'index.html';
				} else {
					alert("Lo sentimos, usuario o contraseña incorrectos");
					return false;
				}
			}
		}
	}
	ajaxLogin.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/login.php?user='+us+'&pass='+contra);
	ajaxLogin.send();
}

function logout(){
	logoutAjax = new XMLHttpRequest();
	logoutAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/logout.php?');
	logoutAjax.send();
	logoutAjax.onreadystatechange=function(){
		if (logoutAjax.readyState==4 && logoutAjax.status==200){
			localStorage.clear();
			location.href = 'login.html';
		}
	}
}

// function logout(){
// 	localStorage.clear();
// 	cambio('login.html');
// }

function validarSesion(){
	ajaxVal = new XMLHttpRequest();
	ajaxVal.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/validarSesion.php?');
	ajaxVal.send();
	ajaxVal.onreadystatechange=function(){
		if (ajaxVal.readyState==4 && ajaxVal.status==200){
			var resp = JSON.parse(ajaxVal.responseText);
			// alert(resp);
			if (resp != 0) {
				location.assign('login.html');
				return false;
			}
		}
	}
}

function validarLog(){
	// var us = localStorage.getItem('id');

	// if(us == "" || us == null){
	// 	cambio('login.html');
	// }
}

function registrar(){
	var nombre = document.getElementById('nombre').value;
	var apellidos = document.getElementById('apellidos').value;
	var correo = document.getElementById('correo').value;
	var telefono = document.getElementById('telefono').value;
	var contrasena = document.getElementById('contrasena').value;
	var recontrasena = document.getElementById('recontrasena').value;
	//var fotoUsuario = document.getElementById('fotoUsuario').value;

	if (contrasena == recontrasena && (contrasena != "" && contrasena != "")) {
		
		registrarAjax = new XMLHttpRequest();
		registrarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/usuarios/agregar.php?nombre='+nombre+'&apellidos='+apellidos+'&correo='+correo+'&contrasena='+contrasena+'&telefono='+telefono);
		registrarAjax.send();
		registrarAjax.onreadystatechange = function(){
			if (registrarAjax.readyState==4 && registrarAjax.status == 200) {
				return registrarAjax.responseText;
			}
		}
		localStorage.setItem('telefono',telefono);
		cambio("uploadFoto.html");
	}else{
		alert("Las contraseñas no coinciden");
		navigator.vibrate(300);
	}
	
}

function cambio(url){
		location.assign(url);
}

function registrarFoto(){
	
	var fotoUsuario = document.getElementById('hello').value;
	var tel = localStorage.getItem('telefono')

	registrarAjax = new XMLHttpRequest();
	registrarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/usuarios/agregarFoto.php?fotoUsuario='+fotoUsuario+'$tel='+tel);
	registrarAjax.send();
	registrarAjax.onreadystatechange = function(){
		if (registrarAjax.readyState==4 && registrarAjax.status == 200) {
			return registrarAjax.responseText;
		}
		cambio('index.html');
		alert('Su cuenta se a generado de manera exitoda! :D')
	}
}


//NO FUNCIONO
function verDatosIndex(){
	var idU = localStorage.getItem('id');
	var nombreP = document.getElementById('nombreP');

	verDAjax = new XMLHttpRequest();
	verDAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verUsuario.php?idU='+idU);
	verDAjax.send();
	verDAjax.onreadystatechange = function(){
		if (verDAjax.readyState == 4 && verDAjax.status == 200){
			dato = JSON.parse(verDAjax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<p>'+dato[i].nombre+' '+dato[i].apellidos+'</p>';
			}
			nombreP.innerHTML+= div;
		}
	}
}

function verDatos(){
	var idU = localStorage.getItem('id');

	var menuEdicion = document.getElementById('menuEdicion');

	verDAjax = new XMLHttpRequest();
	verDAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verUsuario.php?idU='+idU);
	verDAjax.send();
	verDAjax.onreadystatechange = function(){
		if (verDAjax.readyState == 4 && verDAjax.status == 200){
			dato = JSON.parse(verDAjax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<div class="option-edit-perfil" onclick="cambio(\'editarNombre.html\')"><div class="info-edit-option">'+
					'<p class="info-edit-title">Nombre</p><p>'+dato[i].nombre+' '+dato[i].apellidos+'</p></div>'+
					'<p class="info-edit-red">></p></div><div class="option-edit-perfil" onclick="cambio(\'editarCorreo.html\')">'+
					'<div class="info-edit-option"><p class="info-edit-title">Correo</p><p>'+dato[i].correo+'</p></div>'+
					'<p class="info-edit-red">></p></div><div class="option-edit-perfil" onclick="cambio(\'editarTelefono.html\')">'+
					'<div class="info-edit-option"><p class="info-edit-title">Telefono</p><p>'+dato[i].telefono+'</p></div>'+
					'<p class="info-edit-red">></p></div><div class="option-edit-perfil" onclick="cambio(\'editarContrasena.html\')">'+
					'<p>Cambiar Contraseña</p><p class="info-edit-red">></p></div><!-- ESPERARME!!!!!!!!! -->'+
					'<div class="option-edit-perfil" onclick=""><p>Eliminar mi cuenta</p><p class="info-edit-red">></p></div>'
			}
			menuEdicion.innerHTML+= div;
		}
	}
}

function verDatosNombre(){
	var idU = localStorage.getItem('id');
	var info = document.getElementById('info');

	verDAjax = new XMLHttpRequest();
	verDAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verUsuario.php?idU='+idU);
	verDAjax.send();
	verDAjax.onreadystatechange = function(){
		if (verDAjax.readyState == 4 && verDAjax.status == 200){
			dato = JSON.parse(verDAjax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<div class="campo-edit"><p class="info-edit-title"> Nombre</p><input type="text" value="'+dato[i].nombre+
				'" class="input-edicion" id="nombre"></div><div class="campo-edit"><p class="info-edit-title"> Apellido</p>'+
				'<input type="text" value="'+dato[i].apellidos+'" class="input-edicion" id="apellidos"></div>'+
				'<div class="mensaje-edit-general"><p><b>Recuerda:'+
				'</b> No podras cambiar tu nombre dentro de los proximos 60 dias. Asegurate de escribir tu nombre de la forma correcta.</p>	</div>'
			}
			info.innerHTML+= div;
		}
	}
}

function verDatosCorreo(){
	var idU = localStorage.getItem('id');
	var info = document.getElementById('info');

	verDAjax = new XMLHttpRequest();
	verDAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verUsuario.php?idU='+idU);
	verDAjax.send();
	verDAjax.onreadystatechange = function(){
		if (verDAjax.readyState == 4 && verDAjax.status == 200){
			dato = JSON.parse(verDAjax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<p class="info-edit-title"> Correo</p>'+
					'<input type="text" value="'+dato[i].correo+'" class="input-edicion" id="correo">'
			}
			info.innerHTML+= div;
		}
	}
}

function verDatosTelefono(){
	var idU = localStorage.getItem('id');
	var info = document.getElementById('info');

	verDAjax = new XMLHttpRequest();
	verDAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verUsuario.php?idU='+idU);
	verDAjax.send();
	verDAjax.onreadystatechange = function(){
		if (verDAjax.readyState == 4 && verDAjax.status == 200){
			dato = JSON.parse(verDAjax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<p class="info-edit-title"> Telefono</p>'+
					'<input type="text" value="'+dato[i].telefono+'" class="input-edicion" id="telefono">'
			}
			info.innerHTML+= div;
		}
	}
}

//ESPERATE NO LA VALLAS A CAGAR
function verDatosindex(){
	var idU = localStorage.getItem('id');
	var nombreP = document.getElementById('nombreP');

	verDAjax = new XMLHttpRequest();
	verDAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verUsuario.php?idU='+idU);
	verDAjax.send();
	verDAjax.onreadystatechange = function(){
		if (verDAjax.readyState == 4 && verDAjax.status == 200){
			dato = JSON.parse(verDAjax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<p>'+dato[i].nombre+' '+dato[i].apellidos+'</p>'
			}
			nombreP.innerHTML+= div;
		}
	}
}

function actualizarDatosNombre(){

	var idU = localStorage.getItem('id');
	var nombre = document.getElementById('nombre').value;
	var apellidos = document.getElementById('apellidos').value;

	actualizarAjax = new XMLHttpRequest();
	actualizarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/usuarios/modificarNombre.php?idU='+idU+'&nombre='+nombre+'&apellidos='+apellidos);
	actualizarAjax.send();
	actualizarAjax.onreadystatechange = function(){
		if (actualizarAjax.readyState==4 && actualizarAjax.status == 200) {
			console.log(actualizarAjax.responseText);
			alert("Modificaciones exitosas");
			cambio('editarInformacion.html');
		}
	}
}

function actualizarDatosCorreo(){

	var idU = localStorage.getItem('id');
	var correo = document.getElementById('correo').value;

	actualizarAjax = new XMLHttpRequest();
	actualizarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/usuarios/modificarCorreo.php?idU='+idU+'&correo='+correo);
	actualizarAjax.send();
	actualizarAjax.onreadystatechange = function(){
		if (actualizarAjax.readyState==4 && actualizarAjax.status == 200) {
			console.log(actualizarAjax.responseText);
			alert("Modificaciones exitosas");
			cambio('editarInformacion.html');
		}
	}
}

function actualizarDatosTelefono(){

	var idU = localStorage.getItem('id');
	var telefono = document.getElementById('telefono').value;

	actualizarAjax = new XMLHttpRequest();
	actualizarAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/usuarios/modificarTelefono.php?idU='+idU+'&telefono='+telefono);
	actualizarAjax.send();
	actualizarAjax.onreadystatechange = function(){
		if (actualizarAjax.readyState==4 && actualizarAjax.status == 200) {
			console.log(actualizarAjax.responseText);
			alert("Modificaciones exitosas");
			cambio('editarInformacion.html');
		}
	}
}

function cambiarContra(){
	var idU = localStorage.getItem('id');
	var contrasena = document.getElementById('contrasena').value;
	var recontrasena = document.getElementById('recontrasena').value;

	if (contrasena == recontrasena && contrasena != "" && recontrasena != "") {
		cambioCAjax = new XMLHttpRequest();
		cambioCAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/usuarios/modificarC.php?idU='+idU+'&contra='+contrasena);
		cambioCAjax.send();
		cambioCAjax.onreadystatechange = function(){
			if (cambioCAjax.readyState==4 && cambioCAjax.status == 200) {
				console.log(cambioCAjax.responseText);
				alert("Cambio de contraseña exitoso");
				cambio('editarInformacion.html');
			}
		}
	}else{
		alert("Las contraseñas no coinciden");
		navigator.vibrate(300);
	}
}

function eliminarCuenta(){
	var idU = localStorage.getItem('id');

	eliminarAjax =new XMLHttpRequest();
	eliminarAjax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/eliminar.php?idU='+idU);
	eliminarAjax.send();
	eliminarAjax.onreadystatechange = function(){
		if (eliminarAjax.readyState==4 && eliminarAjax.status == 200) {
			console.log(eliminarAjax.responseText);
			alert("Su cuenta se a eliminado con exito :(");
		}
	}
}


////////// TARJETAS //////////
function agregarTarjeta(){

	var idU = localStorage.getItem('id');
	var numTarjeta = document.getElementById('numTarjeta').value;
	var claveS = document.getElementById('claveS').value;
	var fechaExpiracion = document.getElementById('fechaExpiracion').value;
	var titular = document.getElementById('titular').value;

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/agregarTarjeta.php?idU='+idU+'&numTj='+numTarjeta+'&claveS='+claveS+'&fechaEx='+fechaExpiracion+'&titu='+titular);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			alert("Tarjeta vinculada de manera exitosa");
			cambio('metodosPago.html')
		}
	}
}

function listarTarjetas() { //Al listar dar su id a cada una
	var idU = localStorage.getItem('id');
	var tar = document.getElementById('metodoP');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/listarTarjetas.php?idU='+idU);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			tarjeta = JSON.parse(ajax.responseText);
			console.log(tar);
			for(i=0; i<tarjeta.length; i++){
				div = '<div class="tarjeta-metodo center-row"><div class="metodos-tarjeta-top center-row-bw"><p class="name">'+tarjeta[i].titular+'</p>'+
					'<div class="check-metodo center-row checked"><p>/</p></div></div><div class="metodos-tarjeta-mid center-row-ar">'+
					'<div class="icon-card center-row"></div><div class="last-number-card center-row"><p>'+tarjeta[i].numTarjeta+'</p>'+
					'</div><div class="card-vencimiento center-column"><p>Expira</p><p>'+tarjeta[i].fechaEx+'</p></div></div>'+
					'<div class="metodos-tarjeta-end center-row-ar"><button class="button-inicial metodo-editar-button" value="'+tarjeta[i].idTarjeta+'" id="'+tarjeta[i].idTarjeta+
					'" onclick="almacenar(this.id); cambio(\'editarMetodo.html\')">Editar</button>'+
					'<button class="button-del metodo-del-button" value="'+tarjeta[i].idTarjeta+
					'" id="tarjeta" onclick="almacenar(this.id); eliminarTarjeta()">Eliminar</button>'+
					'</div></div>';
					tar.innerHTML += div;				
			}
			div2 = '<div class="add-metodo center-row"><a href="addMetodo.html">'+
				'<p class="resaltar">+ Agregar otro metodo de pago</p></a></div>';

			tar.innerHTML += div2;
		}
	}
}

function almacenar(id){
	var a = document.getElementById(id).value;
	localStorage.setItem('tarjeta',a);
}

function verTarjeta() {
	var idU = localStorage.getItem('id');
	var idTj = localStorage.getItem('tarjeta');
	var cont = document.getElementById('contTarj');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/verTarjeta.php?idU='+idU+'&idTj='+idTj);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				//nombreP.innerHTML=dato[i].nombre;
				div = '<div class="campo-edit campo-edit-especial"><p class="info-edit-title"> Titular de la tarjeta</p>'+
				'<input type="text" value="'+dato[i].titular+'" class="input-edicion" id="titular"></div><div class="campo-edit">'+
				'<p class="info-edit-title"> Vencimiento</p><input type="month" class="input-edicion-white" id="fechaEx" id="'+dato[i].fechaEx+'"></div>'
			}
			cont.innerHTML += div;
			
		}
	}
}

function modificarTarjeta() {
	var idU = localStorage.getItem('id');
	var idTj = localStorage.getItem('tarjeta');
	var fechaExpiracion = document.getElementById('fechaEx').value;
	var titular = document.getElementById('titular').value;

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/editarTarjeta.php?idU='+idU+'&idTj='+idTj+'&fechaEx='+fechaExpiracion+'&titu='+titular);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			alert("Datos de tarjeta modificados correctamente");
		}
		cambio('metodosPago.html')
	}
}

function eliminarTarjeta() {
	var idU = localStorage.getItem('id');
	var idTj = document.getElementById('tarjeta').value;

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/eliminarTarjeta.php?idU='+idU+'&idTj='+idTj);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			alert("Tarjeta desvinculada");
			cambio('metodosPago.html');
		}
	}
}


////////// Historico Cliente //////////
function historialC() {
	var idU = localStorage.getItem('id');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/usuarios/historicoC.php?idU='+idU);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}