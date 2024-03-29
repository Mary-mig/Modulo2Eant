class Producto {

	//Constructor: es una funcion que recibe los datos y los asigna a propiedades
	constructor(id,n,s,p,i,d = true){
		//Atributos
		this.ID = id
		this.nombre = n
		this.stock = s
		this.precio = p
		this.imagen = i
		this.disponibilidad = d //<-- por default asigna "true"
		this.vDOM = document.createElement("article")//<- creo la etiqueta article<article></article>
		this.state = {
			anexado : false, 
			version : 0,
		}
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

		let accion = value ? "habilitar" : "deshabilitar"

		if(confirm(`Desea ${accion} el producto"${this.nombre}"`))
			this.disponibilidad = value

		this.sincronizar()
	}	


	//Metodos de Instancia
	Mostrar(selector){ //<- Ej: "#productos-destacados"
		/*let ficha = document.querySelector(".producto").cloneNode(true)
			ficha.querySelector(".card-title a").innerText = this.nombre
			ficha.querySelector(".card-body h5").innerText = this.Precio
			ficha.querySelector(".card-img-top").src = this.imagen
			ficha.classList.remove("d-none")*/
		/*let fondo = "bg-white"
		let texto = "text-dark"

		if(this.stock<= 0){
			fondo = "bg-dark"
			texto = "text-light"
		}*/

		let estilo = this.disponibilidad ? "bg-white text-dark" : "bg-dark text-light"
		let botones = this.disponibilidad ?"btn-danger" : "btn-success"

					
			// Manipulacion de estructura
			this.vDOM.classList.add("col-lg-4","col-md-6","mb-4","producto")//<- le creo el class <article class=col-lg-4 col-md-6 mb-4 d-none producto>

			this.vDOM.id = `prod-${this.ID}`

			// Manipulacion de Contenido
			this.vDOM.innerHTML = `<div class="card h-100 ${estilo}">
									<a href="#">
									<img class="card-img-top img-fluid" src="${this.imagen}" alt="${this.nombre}">
			  						</a>
									<div class="card-body">
										<h4 class="card-title">
					  					<a href="#">${this.nombre}</a>
										</h4>
										<h5 class="btn btn-warning  btn-precio m-0"> ${this.Precio}</h5>
										
										<button class="btn  ${botones} btn-disponible">${this.disponibilidad ?"Desactivar":"Activar"}</button>
										<button class = "btn btn-primary btn-descuento"> Aplicar descuento </button>
										<p class="card-text">${this.stock} unid.</p>
									</div>
							 	  </div>`
	
			// Manipulacion de Comportamiento
			this.vDOM.querySelector(".btn-disponible").onclick = (e)=>{
				this.Disponibilidad= !this.disponibilidad
				
				this.Mostrar() //<-- este this remite al producto que tiene nombre, precio, stock, etc

				console.log(this)//<-- El objeto padre
				console.log (e.target)//<-- El objeto que provoca el evento
			}

			this.vDOM.querySelector(".btn-precio").onclick = () =>{
				this.Precio = prompt (`Por favor indique el nuevo valor del articulo ${this.nombre}`)
				
				this.Mostrar()
				this.sincronizar()
			}

		/*	this.vDOM.querySelector(".btn-descuento").onclick =  function() {
				let valor =  prompt(`Indique el % de descuento para ${this.nombre}`)
				this.aplicarDescuento(valor)
				this.Mostrar()
			}
		*/

			this.vDOM.querySelector(".btn-descuento").onclick = this.aplicarDescuento.bind(this)

			this.vDOM.querySelector("img").onclick = () => {
				this.imagen = prompt("Ingrese la URL de una nueva imagen:")
				this.Mostrar()
				this.sincronizar()
			}

			//Anexarlo (mostrarlo) en la interfaz
			if (!this.state.anexado ){	
			document.querySelector(selector).appendChild(this.vDOM)
			this.state.anexado = true
		}

			//this.sincronizar()
	}
	aplicarDescuento(valor = false){
			
			valor = isNaN(valor) ? prompt(`Indique el % de descuento para ${this.nombre}`) : valor
			
			let importe = (this.precio * valor)/100
			this.precio =  this.precio - importe
			
			this.Mostrar()
			this.sincronizar()
		}

	sincronizar(){
		//¿como?
		
		let storage = JSON.parse( localStorage.getItem("PRODUCTOS") )//<-- de JSON a object

		//let foundItem = storage.findIndex(item => item.idProducto == this.ID)
		let foundIndex = storage.find(item => item.idProducto == this.ID)
		
		storage[foundIndex].Precio = this.precio
		storage[foundIndex].Disponibilidad = this.disponibilidad
		storage[foundIndex].Imagen = this.imagen

		console.log(storage[foundItem])

/*     storage.forEach(item => {

			if ( item.idProducto == this.ID ){

				item.Nombre = this.nombre
		        item.Stock = this.stock
		        item.Precio = this.precio
				item.Disponibilidad = this.disponibilidad
				return
			}
		})
*/

	localStorage.setItem("PRODUCTOS", JSON.stringify(storage) )//<-- de Object a JSON
	}	

	// Metodos de Clase (estatico)
	static parse(json){ //<-- Ej: '[{"nombre":"Café Torrado","stock":600,"precio":85.65,"disponible":false},{"nombre":"Jugo de Naranja","stock":450,"precio":15.45,"disponible":true}]'
    //Acá hay que h acer magia para que se conviertan en objetos 'Producto'
    //let datos = JSON.parse(json) //<-- de JSON a Object
    //let datos = json //<-- de JSON a Object
    let datos = (typeof json == "string") ? JSON.parse(json) : json

    if( datos instanceof Array ){

      //1) Recorrer el Array de Object para instanciar objetos Producto y retornarlos
      return datos.map(item => new Producto(item.idProducto, item.Nombre, item.Stock, item.Precio, item.Imagen,item.Disponibilidad) ) //2) <-- Instanciar un objeto Producto con los datos de cada Object

    } else if( datos instanceof Object ){

      return new Producto(datos.idProducto, datos.Nombre, datos.Stock, datos.Precio, datos.Imagen,datos.Disponibilidad)

    } else {
      console.error("Ya fue... no convierto nada en Producto")
    }

  }
}