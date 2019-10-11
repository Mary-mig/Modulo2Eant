class Producto {

	//Constructor: es una funcion que recibe los datos y los asigna a propiedades
	constructor(n,s,p,d = true){
		this.nombre = n
		this.stock = s
		this.precio = p
		this.disponibilidad = d //<-- por default asigna "true"
	}


	//Propiedades Lectura/Escritura (getters & setters)



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