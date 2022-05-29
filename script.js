const listaTarefas = document.querySelector('#lista-tarefas');
const btnTarefas = document.querySelector('#criar-tarefa');
const apagaTudo = document.querySelector('#apaga-tudo');
const removerFinalizados = document.querySelector('#remover-finalizados');
const salvarTarefas = document.querySelector('#salvar-tarefas');
const moverCima = document.querySelector('#mover-cima');
const moverBaixo = document.querySelector('#mover-baixo');
const removerSelecionado = document.querySelector('#remover-selecionado');

window.onload = () => {
    loadTarefasLista();
    
    btnTarefas.addEventListener('click', criarTarefa);
    listaTarefas.addEventListener('click', paintBackground);
    listaTarefas.addEventListener('dblclick', completarTarefa);

    apagaTudo.addEventListener('click', clearTarefas);
    removerFinalizados.addEventListener('click', clearTarefasFinalizadas);
    salvarTarefas.addEventListener('click', salvarTarefasLista);
    removerSelecionado.addEventListener('click', removerSelecionadoFunction);

    moverCima.addEventListener('click', moverCimaFunction)
    moverBaixo.addEventListener('click', moverBaixoFunction)
}

function criarTarefa() {
    const textoTarefa = document.querySelector('#texto-tarefa')
    if(textoTarefa.value != '' || textoTarefa.value != null){
        const tarefa = document.createElement('li');
        tarefa.textContent = textoTarefa.value;
        listaTarefas.appendChild(tarefa);
    }
    clearTextoTarefa();
}

function clearTextoTarefa() {
    const textoTarefa = document.querySelector('#texto-tarefa');
    textoTarefa.value = '';
}

function paintBackground(e) {
    const elementos = document.querySelectorAll('li');
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].classList.contains('selected')) {
            elementos[i].classList.remove('selected');
        }
    }
    e.target.classList.add('selected');
}

function completarTarefa(e) {
    if(e.target.classList.contains('completed')) {
        e.target.classList.remove('completed');
    } else {
        e.target.classList.add('completed');
    }
}

function clearTarefas(){
    listaTarefas.innerHTML = '';
}

function clearTarefasFinalizadas() {
    const elementos = document.querySelectorAll('li');
    for(let i = 0; i < elementos.length; i++) {
        if(elementos[i].classList.contains('completed')) {
            listaTarefas.removeChild(elementos[i]);
        }
    }
}

function salvarTarefasLista() {
    const elementos = document.querySelectorAll('li');
    let tarefas = [];
    for(let i = 0; i < elementos.length; i++) {
        tarefas.push({text: elementos[i].innerText, completed: elementos[i].classList.contains('completed')});
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function loadTarefasLista() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if(tarefas !== null) {
        tarefas.forEach(tarefa => {
            const tarefaElement = document.createElement('li');
            tarefaElement.textContent = tarefa.text;
            if(tarefa.completed) {
                tarefaElement.classList.add('completed');
            }
            listaTarefas.appendChild(tarefaElement);
        });
    }
}

function moverCimaFunction() {
    const selected = document.querySelector('.selected');
    if(!selected) return
    const elementoAntes = selected.previousElementSibling;
    if(elementoAntes !== null) {
        listaTarefas.insertBefore(selected, elementoAntes);
    }

}

function moverBaixoFunction(){
    const selected = document.querySelector('.selected');
    if(!selected) return
    const elementoDepois = selected.nextElementSibling;
    if(elementoDepois !== null) {
        listaTarefas.insertBefore(elementoDepois, selected);
    }

}

function removerSelecionadoFunction() {
    const elementos = document.querySelectorAll('li');
    for(let i = 0; i < elementos.length; i++) {
        if(elementos[i].classList.contains('selected')) {
            listaTarefas.removeChild(elementos[i]);
        }
    }
}