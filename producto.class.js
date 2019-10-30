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
	Mostrar(selector){ //<- Ej: "#productos-destacados"
		/*let ficha = document.querySelector(".producto").cloneNode(true)
			ficha.querySelector(".card-title a").innerText = this.nombre
			ficha.querySelector(".card-body h5").innerText = this.Precio
			ficha.querySelector(".card-img-top").src = this.imagen
			ficha.classList.remove("d-none")*/

		let ficha = document.createElement("article")//<- creo la etiqueta article<article></article>
			ficha.classList.add("col-lg-4","col-md-6","mb-4","producto")//<- le creo el class <article class=col-lg-4 col-md-6 mb-4 d-none producto>

			ficha.innerHTML = `<div class="card h-100 bg-dark text-light">
								<a href="#">
								<img class="card-img-top" src="${this.imagen}" alt="${this.nombre}">
		  						</a>
								<div class="card-body">
									<h4 class="card-title">
				  					<a href="#">${this.nombre}</a>
									</h4>
									<h5 class="btn-warning"> ${this.Precio}</h5>
									<p class="card-text">${this.stock} unid.</p>
								</div>
							 </div>`
	
			
		document.querySelector(selector).appendChild(ficha)

		console.log (ficha)

	 }

	// Metodos de Clase (estatico)
	static parse(json){//<-- Aca ingresan los datos del json y se convierten en obtejos "Producto"
		
		//let datos = JSON.parse (json)//<-- de JSON a Object

		//let datos = json

		let datos = (typeof json == "string") ? JSON.parse(json) : json

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