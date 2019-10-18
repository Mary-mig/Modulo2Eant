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

	// Metodos de Clase (estatico)
	static parse(json){//<-- Aca ingresan los datos del json
		let datos = JSON.parse (json)//<-- de JSON a Object

		console.log("Estos son los datos")
		console.log(datos)

		if(datos instanceof Array){
			//1) Crear un Array nuevo para guardar los Objetos Producto
			let productos = new Array () 

			//2) Recorrer el array de object para instanciar objetos producto
			datos.forEach(item => {
			
			//3) Instanciar Objeto Producto con los datos de cada Object
				let producto = new Producto(item.nombre,item.stock,item.precio,item.disponible)
			
			//4) Guardar el objeto Producto instanciado en el Array	nuevo
				productos.push(producto) //<-- meter items adentro de una coleccion

			})
			//5) Retornar el Array nuevo una vez que se hayan  instanciado todos los objetos Producto
			return productos

		}else if (datos instanceof Object){
			let producto = new Producto(datos.nombre,datos.stock,datos.precio,datos.disponibilidad)//<-- Si el JSON tuviera un solo dato no hace falta armar el array ni el for each
			return producto
		}else {
			console.error("ya fue.. no convierto nada en Producto")
		}
		
	}
}