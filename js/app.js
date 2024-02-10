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

  nuevoGasto( gasto ){
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  };

  calcularRestante(){
    const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0)
    this.restante = (this.presupuesto - gastado);
  };

  eliminarGasto(id){
    this.gastos = this.gastos.filter( gasto => gasto.id !== id );
    this.calcularRestante();
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
    
    if ( document.querySelector('.primario').children[1].classList.contains('alert') ) {
      document.querySelector('.primario .alert').remove();
    }
    
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert');
    
    if ( tipo === 'error' ) {
      divMensaje.classList.add('text-center', 'alert-danger');
    } else {
      divMensaje.classList.add('text-center', 'alert-success');
    };
    
    divMensaje.textContent = mensaje;
    
    document.querySelector('.primario').insertBefore(divMensaje, formulario);
    
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  };
  
  mostrarGastos(gastos){
    this.limpiarHtml(gastoLista);
    //Iterar sobre los gastos.
    gastos.forEach( gastoArray => {
      const { cantidad, gasto, id } = gastoArray;
      
      //Crear LI.
      const nuevoGasto = document.createElement('LI');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      nuevoGasto.dataset.id = id;
      
      // Agregar el html del gasto.
      nuevoGasto.innerHTML = `
      ${gasto} <span class="badge badge-primary badge-pill">$${cantidad}</span>
      `;
      
      //Boton para el gasto.
      const btnBorrar = document.createElement('BUTTON');
      btnBorrar.textContent = 'Borrar';
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.onclick = () => {
        eliminarGasto( id );
      }
      nuevoGasto.appendChild(btnBorrar);
      
      //Mostrar en el DOM.
      gastoLista.appendChild(nuevoGasto);
      
      
    });
  };
  
  limpiarHtml(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    };
  };
  
  actualizarRestante(restante){
    document.querySelector('#restante').textContent = restante;
  }
  
  comprobarPresupuesto(presupuestoObj){
    const { presupuesto, restante } = presupuestoObj;
    const restanteDiv = document.querySelector('.restante');
  
    //Comprobar 25%
    if ( (presupuesto / 4 ) >= restante ) {
      restanteDiv.classList.remove('alert-success','alert-warning');
      restanteDiv.classList.add('alert-danger');
    } else if ( (presupuesto / 2 ) >= restante ) {
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-warning');
    } else {
      // Si ninguna de las condiciones anteriores se cumple, agregar la clase alert-success
      restanteDiv.classList.remove('alert-danger', 'alert-warning');
      restanteDiv.classList.add('alert-success');
    }
    
    //Si el total es 0 o menos.
    if ( restante <= 0) {
      ui.imprimirAlerta('El presupuesto se ha agotado.', 'error');
      formulario.querySelector('button[type="submit"]').disabled = true;
    };

  };

};

//Instancias.
const ui = new UI();
let presupuesto;





//Funciones.

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('¿Cual es tu presupuesto?')

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
  const cantidad = Number(document.querySelector('#cantidad').value);

  //Validar

  if ( gasto === '' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios.', 'error');
    return;
  } else if ( cantidad <= 0 || isNaN(cantidad) ) {
    ui.imprimirAlerta('La cantidad no es valida.', 'error');
    return;
  };

  //Generar un objeto para el gasto.
  const gastoObj = {gasto, cantidad, id: Date.now()};
  presupuesto.nuevoGasto(gastoObj);

  ui.imprimirAlerta('Se agergo correctamente.');
  
  //Imprimir gastos en el DOM.
  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
  
  formulario.reset();
};

function eliminarGasto( id ) {
  presupuesto.eliminarGasto(id);
  const { gastos, restante } = presupuesto; 
  ui.mostrarGastos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
};