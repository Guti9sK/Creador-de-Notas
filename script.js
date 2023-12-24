const btnNota = document.getElementById("btn");
const notasContainer = document.getElementById("notas");

obtenerNotas().forEach((nota) => {
  const notaElement = crearNota(nota.id, nota.content);
  notasContainer.insertBefore(notaElement, btnNota);
});

function crearNota(id, content) {
  const newElement = document.createElement("textarea");
  newElement.classList.add("nota");
  newElement.placeholder = "Escribe una nota";
  newElement.value = content;

  newElement.addEventListener("dblclick", () => {
    const alerta = confirm("¿Quieres borrar esta nota?");
    if (alerta) {
      eliminarNota(id, newElement);
    }
  });

  newElement.addEventListener("input", () => {
    actualizarNota(id, newElement.value);
  });

  return newElement;
}

function eliminarNota(id, newElement) {
  const notas = obtenerNotas().filter((nota) => nota.id !== id);
  GuardarNota(notas);
  notasContainer.removeChild(newElement);
}

function actualizarNota(id, content) {
  const notas = obtenerNotas();
  const target = notas.filter((nota) => nota.id === id)[0];
  target.content = content;
  GuardarNota(notas);
}

function agregarNota() {
  const notas = obtenerNotas();

  const noteObj = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };
  const nota = crearNota(noteObj.id, noteObj.content);
  notasContainer.insertBefore(nota, btnNota);

  notas.push(noteObj);

  GuardarNota(notas);
}

function GuardarNota(notas) {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function obtenerNotas() {
  return JSON.parse(localStorage.getItem("notas") || "[]");
}

btnNota.addEventListener("click", agregarNota);
