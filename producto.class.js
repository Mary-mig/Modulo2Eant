class Producto {

	//Constructor: es una funcion que recibe los datos y los asigna a propiedades
	constructor(n,s,p,d = true){
		//Atributos
		this.nombre = n
		this.stock = s
		this.precio = p
		this.disponibilidad = d //<-- por default asigna "true"
	}


	//Propiedades Lectura/Escritura (getters & setters)

		get Precio(){
		return "USD" + (this.precio * 1.21).toFixed(2)
		}

		set Precio(value){
			if ( isNaN (value) != true){
			this.precio = value	
		  }else{
		  	console.error("ERROR: Valor ingresado NO válido")
			}
		}

	set Disponibilidad(value){

		if(value == this.disponibilidad){
			alert("La disponibilidad ya esta en: " + value)
			return
		}

		let estado = value ? "habilitar" : "deshabilitar"

		if(confirm(`Desea ${estado} el producto"${this.nombre}"`)){
			this.disponibilidad = value
		}

	}	



	//Metodos de Instancia
	Mostrar(){
		
		let color = this.disponibilidad ? "green" : "red"

		document.write(`<p style="color:${color}">Hay <strong>${this.stock}</strong> unid. de <strong>${this.nombre}</strong> que valen <em>ARG${this.precio}</em> c/u </p>`)
	}

	 aplicarDescuento(valor){
	 	let importe  = (this.precio * valor) /100

	 	this.precio = this.precio - importe

	 }

	// Metodos de Clase
}