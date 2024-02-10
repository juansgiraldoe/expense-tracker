//Variables y selectores.

const formulario = document.querySelector('#agregar-gasto');
const gastoLista = document.querySelector('#gastos ul');





//Eventos.
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
  formulario.addEventListener('submit',agregarGasto)
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
  };

  imprimirAlerta(mensaje, tipo){
    const alerta = document.querySelector('.alert')
    if ( alerta ) {
      alerta.remove();
    };

    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert');
    
    if ( tipo === 'error' ) {
      divMensaje.classList.add('text-center', 'alert-danger');
    } else {
      divMensaje.classList.add('text-center', 'alert-succes');
    };

    divMensaje.textContent = mensaje;

    document.querySelector('.primario').insertBefore(divMensaje, formulario);
  
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  };

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
    return;
  };
  
  //Pasando la validación.
  presupuesto = new Presupuesto(presupuestoUsuario);

  ui.insertarPresupuesto(presupuesto);
};

//Añadir gastos
function agregarGasto(e) {
  e.preventDefault();

  //Leer los datos del form.
  const gasto = document.querySelector('#gasto').value;
  const cantidad = document.querySelector('#cantidad').value;

  //Validar

  if ( gasto === '' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios.', 'error');
    return;
  } else if ( cantidad <= 0 || isNaN(cantidad) ) {
    ui.imprimirAlerta('La cantidad no es valida.', 'error');
    return;
  };



};
