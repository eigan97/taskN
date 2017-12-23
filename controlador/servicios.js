function agregarServicio() {
	var idU = localStorage.getItem('id');
	var idTecS = localStorage.getItem('idTecS');
	var idSol = localStorage.getItem('idSol');
	//var fyh = document.getElementById('fyh').value;
	//var cost = document.getElementById('costo').value;

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/agregarServicio.php?idU='+idU+'&idTecS='+idTecS+'&idSol='+idSol);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function editarServicio() {
	var idSer = localStorage.getItem('idSer');
	var cost = document.getElementById('costo').value;

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/editarServicio.php?idSer='+idSer+'&fyh='+fyh+'&cost='+cost);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function eliminarServicio() {
	var idSer = localStorage.getItem('idSer');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/eliminarServicio.php?idSer='+idSer);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function getServicioPeticion() {
	// body...
}

function misServicios(){
	var idU = localStorage.getItem('id');

	var cont = document.getElementById('miTarea');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/getBandejaTareas.php?idU='+idU);
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
				div = '<div class="tarjeta-top"><div class="info-main center-row-bw"><div class="title" id="'+dato[i].idSolicitud+'" value="'+dato[i].idSolicitud+'" onclick="guardar(this.id)"><p>'+dato[i].titulo+'</p>'+
						'</div><div class="close"><p>x</p></div></div><div class="description-total"><span></span>'+
						'<p class="fecha-vencimiento">Expira en 1 dia</p></div></div><div class="tarjeta-end center-row-ar"><div class="boton-informacion estado">'+
						'<p>Pendiente</p></div><div class="button-inicial editar"></div><div class="republicar center-row-end"><p>MXN $'+dato[i].estimado+'</p></div></div>';
				cont.innerHTML+= div;
			}
		}
	}
}

function guardar(id){
	localStorage.setItem('solicitud', id);
	cambio('tareaTecnico-component/detalleTareaTecnicoAsignada.html');
}

function finalizarServicio() {
	var idSer = localStorage.getItem('idSer');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/finalizarServicio.php?idSer='+idSer);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			//Agregar alert y redireccionar a la pagina para evaluar
		}
	}
}

function evaluarTecnico() {
	var idTecS = localStorage.getItem('idTecS');
	var idSer = localStorage.getItem('idSer');
	var calAsig = document.getElementById('calificacionAsignada').value;
	var comentario = document.getElementById('comentario').value;

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/evaluarTecnico.php?idTecS='+idTecS+'&idSer='+idSer+'&calAsig='+calAsig+'&verComentarios='+verComentarios);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function registrarComentario() {
	var idTecS = localStorage.getItem('idTecS');
	var idEval = localStorage.getItem('idEval');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/registrarComentario.php?idTecS='+idTecS+'&idEval='+idEval);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function verComentarios() {
	var idTecS = document.getElementById('idTecS');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/verComentarios.php?idTecS='+idTecS);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}

function registrarHistorico() {
	var idSer = localStorage.getItem('idSer');
	var fter = Date.now();

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/servicios/registrarHistorico.php?idSer='+idSer+'&fter='+fter);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}