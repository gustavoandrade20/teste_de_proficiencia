// --- SEU CÓDIGO ORIGINAL ---
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

// botão adicionar
btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

// --- AQUI COMEÇA O QUE FOI ADICIONADO ---

// marcar como concluída
document.addEventListener('click', function (e) {
    const el = e.target;

    if (el.tagName === 'LI') {
        el.classList.toggle('concluida');
        salvarTarefas();
    }

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

// salvar concluídas também
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const ListaDeTarefas = [];

    for (let tarefa of liTarefas) {
        ListaDeTarefas.push({
            texto: tarefa.innerText.replace('Apagar', '').trim(),
            concluida: tarefa.classList.contains('concluida')
        });
    }

    const tarefasJSON = JSON.stringify(ListaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (!tarefasSalvas) return;

    const ListaDeTarefas = JSON.parse(tarefasSalvas);

    for (let tarefa of ListaDeTarefas) {
        criaTarefa(tarefa.texto);

        const itens = tarefas.querySelectorAll('li');
        const ultimo = itens[itens.length - 1];

        if (tarefa.concluida) {
            ultimo.classList.add('concluida');
        }
    }
}
adicionaTarefasSalvas();

// botão limpar lista
const btnLimpar = document.querySelector('.btn-limpar');
btnLimpar.addEventListener('click', () => {
    tarefas.innerHTML = '';
    localStorage.clear();
});
