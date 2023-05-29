
let tareas = []

const title = document.getElementById('title')

const desc = document.getElementById('desc')

const cant = document.getElementById('cant')

const boton = document.getElementById('boton')

const tabla = document.getElementById('cuerpoTabla')

const form = document.getElementById('form')

const actualizar = document.getElementById('actualizar')


traerLS()
listar()

let editMode = false;
let idEditing = null;

boton.addEventListener('click', crear)

function crear (e) {
  e.preventDefault()

  let id = Date.now()

  const tarea= {
    id,
    title: title.value,
    desc: desc.value,
    cant: cant.value,
  }

  tareas.push(tarea)
  listar()
  resetForm()

  saveLS()
  
}

function traerLS () {

  tareas = JSON.parse(localStorage.getItem('tareas'))

  if(tareas) {
    tareas = tareas
  } else {
    tareas = []
  }
}

function saveLS () {
  localStorage.setItem('tareas',JSON.stringify(tareas))
}


function listar () {
  tabla.innerHTML = ''

  tareas.forEach( tarea => {
    tabla.innerHTML += `
    <td>${tarea.title}</td>
    <td>${tarea.desc}</td>
    <td>${tarea.cant}</td>
    <td>
    <img onclick="editarFila(${tarea.id})" src="assets/images/editar.gif"
    width="50"
    height="50">
    <img onclick="eliminarFila(${tarea.id})" src="assets/images/basura.gif"
    width="50"
    height="50">

    </td>
    `
  })

}

function resetForm () {
  form.reset()
}

function eliminarFila (id) {

  const index = tareas.findIndex((el) => el.id == id)

  tareas.splice(index, 1)

  saveLS()
  traerLS()
  listar()

}

function editarFila (id) {

  editMode = true;
  idEditing = id;

  boton.classList.add('hide');
  actualizar.classList.remove('hide');

  const index = tareas.findIndex((el) => el.id == id)

  const tarea = tareas[index]

  title.value = tarea.title
  desc.value = tarea.desc
  cant.value = tarea.cant
}

function edit (e) {
  e.preventDefault()

  const index = tareas.findIndex((el) => el.id == idEditing)

  const tarea = {
    id: idEditing,
    title: title.value,
    desc: desc.value,
    cant: cant.value,

  }

  tareas[index] = tarea

  saveLS()
  traerLS()
  listar()
  resetForm()

  editMode = false;
  idEditing = null;

  boton.classList.remove('hide');
  actualizar.classList.add('hide');
}

actualizar.addEventListener('click', edit)