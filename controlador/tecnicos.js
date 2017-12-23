function cambio(url){
		location.assign(url);
}

function cambioRol(){
	var idUT = localStorage.getItem('id')
}

function agregarT(){

	var idU = localStorage.getItem('id');

	registrarTAjax = new XMLHttpRequest();
	registrarTAjax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarTecnico.php?idU='+idU);
	registrarTAjax.send();
	registrarTAjax.onreadystatechange = function agregarTecnicos(){
		if (registrarTAjax.readyState==4 && registrarTAjax.status == 200) {
			console.log(registrarTAjax.responseText);
			//alert("Registo exitoso de: "+nombre+" "+apellidos + " como Tecnico");
			cambio('tecnico-component/categorias-component/seleccionCategorias.html');
		}else{
			cambio('tecnico-component/mainTecnico.html');
		}
	}
}

function miIdTec(){
	var idU = localStorage.getItem('id');

	ajax = new XMLHttpRequest();
	ajax.open('GET','https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/obtenerMiTec.php?idU='+idU);
	ajax.send();
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			dato = JSON.parse(ajax.responseText);
			console.log(dato);
			for(i=0; i<dato.length; i++){
				localStorage.setItem('idUT',dato[i].idUT);
			}					
		}
	}
	tareasDisponibles();
	misServicios();
}

function agregarCatTec(){
	var idU = localStorage.getItem('id');
	if(sessionStorage.getItem('Albañileria') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Albanileria');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Costureria') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Costureria');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Carpinteria') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Carpinteria');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Electricidad') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Electricidad');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Herreria') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Herreria');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Mecanica') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Mecanica');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Pintura') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Pintura');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}
	if(sessionStorage.getItem('Plomeria') == 1){
		ajax = new XMLHttpRequest();
		ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/agregarCatTec.php?idU='+idU+'&cat=Plomeria');
		ajax.send();
		ajax.onreadystatechange = function(){
			if (ajax.readyState==4 && ajax.status == 200) {
				console.log(ajax.responseText);
			}
		}
	}

	sessionStorage.clear();
}

function verPerfil(){

}

function historicoT(){
	var idTec = localStorage.getItem('idTec');

	ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://eiganzuag.000webhostapp.com/task/modelo/tecnicos/historicoT.php?idTec='+idTec);
	ajax.send();
	ajax.onreadystatechange = function(){
		if (ajax.readyState==4 && ajax.status == 200) {
			console.log(ajax.responseText);
			
		}
	}
}



