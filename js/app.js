//Variables y selectores.

const formulario = document.querySelector('#agregar-gasto');
const gastoLista = document.querySelector('#gastos ul');





//Eventos.
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
};






//Clases.
class Presupuesto {
  constructor( presupuesto ){
    this.presupuesto = Number( presupuesto );
    this.restante = Number( presupuesto );
    this.gastos = [];
  };
};

class UI {
  insertarPresupuesto( cantidades ){
    // Extraemos los valores.
    const {presupuesto, restante} = cantidades;
    //Agregamos al html.
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;

  }
};

//Instancias.
const ui = new UI();
let presupuesto;





//Funciones.

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('¿Cual es tu presupuesto?')
  // console.log(presupuestoUsuario);

  if ( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
    window.location.reload();
  };

  //Pasando la validación.
  presupuesto = new Presupuesto(presupuestoUsuario);

  ui.insertarPresupuesto(presupuesto)
};