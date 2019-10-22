class Producto {

	//Constructor: es una funcion que recibe los datos y los asigna a propiedades
	constructor(n,s,p,i,d = true){
		//Atributos
		this.nombre = n
		this.stock = s
		this.precio = p
		this.imagen = i
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
		let ficha = document.querySelector(".producto").cloneNode(true)

			ficha.querySelector(".card-title a").innerText = this.nombre
			ficha.querySelector(".card-body h5").innerText = this.Precio
			ficha.querySelector(".card-img-top").src = this.imagen
			ficha.classList.remove("d-none")
			
		document.querySelector("#productos-destacados").appendChild(ficha)

		console.log (ficha)

	 }

	// Metodos de Clase (estatico)
	static parse(json){//<-- Aca ingresan los datos del json
		let datos = JSON.parse (json)//<-- de JSON a Object

		console.log("Estos son los datos")
		console.log(datos)

		if(datos instanceof Array){
			 
		//1) Recorrer el array de object para instanciar objetos producto y retornarlos
		 return datos.map(item => new Producto(item.Nombre,item.Stock,item.Precio,item.Imagen))
			
		}else if (datos instanceof Object){
		 
		 return new Producto(datos.Nombre,datos.Stock,datos.Precio,datos.Imagen)//<-- Si el JSON tuviera un solo dato no hace falta armar el array ni el for each
			
		}else {
			console.error("ya fue.. no convierto nada en Producto")
		}
		
	}
}