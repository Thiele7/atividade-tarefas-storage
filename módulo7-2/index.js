const inputDescricao = document.getElementById('descricao');
const btnAdicionar = document.getElementById('adicionar');
const listaTarefas = document.getElementById('lista-tarefas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizarTarefas() {
  listaTarefas.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.status;
    checkbox.addEventListener('change', () => {
      tarefa.status = checkbox.checked;
      salvarTarefas();
      renderizarTarefas();
    });

    const span = document.createElement('span');
    span.textContent = tarefa.descricao;
    span.className = 'tarefa';
    if (tarefa.status) {
      span.classList.add('concluida');
    }

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'excluir-btn';
    btnExcluir.addEventListener('click', () => {
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnExcluir);
    listaTarefas.appendChild(li);
  });
}

btnAdicionar.addEventListener('click', () => {
  const descricao = inputDescricao.value.trim();
  if (descricao === '') return;

  tarefas.push({ descricao: descricao, status: false });
  salvarTarefas();
  renderizarTarefas();
  inputDescricao.value = '';
});

renderizarTarefas();
