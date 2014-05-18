function validar(id_input, tipo, minimo, maximo, id_igual_a, requerido){

	//pasando las id y valores a jquery
	j_id_input = '#'+id_input;
	j_id_input = $(j_id_input);			//nombre en jquery para id_input
	j_id_input_val = j_id_input.val(); //valor de id_input
	
	if ( id_igual_a != false ){
	j_id_igual_a = '#'+id_igual_a;
	j_id_igual_a = $(j_id_igual_a);			//nombre en jquery para id_igual_a
	j_id_igual_a_val = j_id_igual_a.val(); //valor de id_igual_a
	}
	
	//variable de errores vacia
	errores = "";
	
	//Comprobacion si es requerido y si esta vacio
	if( requerido == true ){
		if( j_id_input_val == null || j_id_input_val.length == 0 || /^\s+$/.test(j_id_input_val) ){
			errores = "Campo obligatorio";
		}
	}
	
	//Comprobacion si no es requerido no dar error
	if( requerido == false ){
		if( j_id_input_val == null || j_id_input_val.length == 0 || /^\s+$/.test(j_id_input_val) ) {
			errores = "no requerido";
		}
	}
	
	//Comprobacion solo texto permitido
	if( tipo == "texto" && errores == "" ){
		if( !/^[A-Za-z]+$/.test(j_id_input_val) ) {
			errores = "Ingrese solo texto";
		}
	}
	
	//Comprobacion solo numeros permitidos
	if( tipo == "numeros" && errores == "" ){
		if( !/^[0-9]+$/.test(j_id_input_val) ) {
			errores = "Ingrese solo numeros";
		}
	}
	
	//Comprobacion de numeros y texto permitidos
	if( tipo == "texto-numeros" && errores == "" ){
		if( !/^[A-Za-z0-9]+$/.test(j_id_input_val) ) {
			errores = "Ingrese solo texto y numeros";
		}
	}
	
	//Comprobacion email
	if( tipo == "email" && errores == "" ){
		if( !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(j_id_input_val) ) {
			errores = "Ingrese un correo valido";
		}
	}
	
	//Comprobacion de numero minimo de caracteres
	if( j_id_input_val.length < minimo && errores == "" ) {
		errores = "Ingrese mas de "+minimo+" caracteres";
	}
	
	//Comprobacion de numero maximo de caracteres
	if( j_id_input_val.length > maximo && errores == "" ) {
		errores = ["Has sobrepasado el maximo de "+maximo+" caracteres"];
	}
	
	if( id_igual_a != false && errores == "" ){
		if( j_id_input_val != j_id_igual_a_val ) {
			errores = "No coincide";
		}
	}
	
	//Define el contenido de los Div de error y success
	div_html_error = '<div id="'+id_input+'-error" class="alert-box-error"><a data-toggle="tooltip" data-placement="left" title="'+errores+'"><i class="fa fa-exclamation-circle"></i></a></div>';
	div_html_success = '<div id="'+id_input+'-success" class="alert-box-success"><a data-toggle="tooltip" data-placement="left" title="Ok!"><i class="fa fa-check-circle"></i></a></div>';
	
	//mas variables facilitadas a jquery
	j_id_error = '#'+id_input+'-error';
	j_id_error = $(j_id_error);
	j_id_error_a = '#'+id_input+'-error';

	j_id_success = '#'+id_input+'-success';
	j_id_success = $(j_id_success);
	j_id_success_a = '#'+id_input+'-success';
	
	//Acciones a tomar dependiendo del valor de la variable errores
	if(errores != ""){
	  if(errores == "no requerido"){
		j_id_input.removeAttr("valid");
		j_id_error.remove();
		j_id_success.remove();
		j_id_input.removeClass("input-error");
		j_id_input.removeClass("input-success");
		j_id_input.attr("valid", 1);
		return true;
	  }else{
		j_id_input.removeAttr("valid");
		j_id_error.remove();
		j_id_success.remove();
		j_id_input.before(div_html_error);
		j_id_input.addClass("input-error").removeClass("input-success");
		$(j_id_error_a+" a").tooltip(); //activa el bootstrap Tooltip
		j_id_input.attr("valid", 0);
		return false;
	  }
	}else{
		j_id_input.removeAttr("valid");
		j_id_error.remove();
		j_id_success.remove();
		j_id_input.before(div_html_success);
		j_id_input.addClass("input-success").removeClass("input-error");
		$(j_id_success_a+" a").tooltip(); //activa el bootstrap Tooltip
		j_id_input.attr("valid", 1);
		return true;
	}
	//FIN de Acciones a tomar dependiendo del valor de la variable errores
}

function inicia_validacion(id_input, tipo, minimo, maximo, id_igual_a, requerido){

	//pasando las id y valores a jquery
	j_id_input = '#'+id_input;
	j_id_input = $(j_id_input);			//nombre en jquery para id_input
	j_id_input_val = j_id_input.val(); //valor de id_input
	
	if ( id_igual_a != false ){
	j_id_igual_a = '#'+id_igual_a;
	j_id_igual_a = $(j_id_igual_a);			//nombre en jquery para id_igual_a
	j_id_igual_a_val = j_id_igual_a.val(); //valor de id_igual_a
	}
	
	j_id_input.attr("valid", 0);
	
	j_id_input.keyup(function(){
		validar(id_input, tipo, minimo, maximo, id_igual_a, requerido);
	}); //keyup
		
	j_id_input.focusout(function(){
		validar(id_input, tipo, minimo, maximo, id_igual_a, requerido);
	}); //keyup
		
	j_id_input.focusout( function(){
		j_id_igual_a.keyup(function(){
			validar(id_input, tipo, minimo, maximo, id_igual_a, requerido);
		}); //keyup
	}); //focusout
}

//acomodar desde aca
function activar_boton(id_btn, comprobar){

	//pasando id del boton a jquery
	btn = '#'+id_btn;
	btn = $(btn);
	
	//creando array para almacenar el valor del atrubuto valid de los input
	valid = [];
	
	//cargando atributos valid a el array
	for(i=0; i<comprobar.length; i++){
		j_id = '#'+comprobar[i];
		valid[i] = $(j_id).attr("valid");
	}
	
	//si no encuentra ningun 0 en el array es que no hay errores y activa el boton,
	//pero si encuentra algun 0 es que hay un error y desactiva el boton.
	if(valid.indexOf("0") == -1 ){
		btn.removeAttr("disabled");
	}else{
		btn.attr("disabled", "true");
	}

}

function comprobar_boton(id_btn, comprobar){
	
	//para cada id del array comprobar asigna que en su keyup y focusout ejecute la funcion activar_boton(),
	//intenta activar el boton en keyup y focusout
	for(i=0; i<comprobar.length; i++){
		j_id = '#'+comprobar[i];
		$(j_id).keyup(function(){
			activar_boton(id_btn, comprobar);
		});
		$(j_id).focusout(function(){
			activar_boton(id_btn, comprobar);
		});
	}
	
}
