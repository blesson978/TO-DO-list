
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const category = document.getElementById('todo-category');
const due = document.getElementById('todo-due');
const list = document.getElementById('todo-list');
const toggleTheme = document.getElementById('toggle-theme');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let isDark = localStorage.getItem('dark') === 'true';

if (isDark) document.body.classList.add('dark');

toggleTheme.onclick = () => {
  document.body.classList.toggle('dark');
  isDark = !isDark;
  localStorage.setItem('dark', isDark);
};

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.draggable = true;
    li.className = todo.completed ? 'completed' : '';

    li.ondragstart = (e) => {
      e.dataTransfer.setData('text/plain', index);
    };

    li.ondragover = (e) => {
      e.preventDefault();
    };

    li.ondrop = (e) => {
      e.preventDefault();
      const from = e.dataTransfer.getData('text/plain');
      const to = index;
      const moved = todos.splice(from, 1)[0];
      todos.splice(to, 0, moved);
      saveAndRender();
    };

    const top = document.createElement('div');
    top.className = 'item-top';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'text';
    span.style.cursor = 'pointer';
    span.onclick = () => {
      todos[index].completed = !todos[index].completed;
      saveAndRender();
    };

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => {
      const newText = prompt('Edit task:', todo.text);
      if (newText !== null) {
        todos[index].text = newText.trim();
        saveAndRender();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveAndRender();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    top.appendChild(span);
    top.appendChild(actions);

    const bottom = document.createElement('div');
    bottom.className = 'item-bottom';
    bottom.innerHTML = `<span>📂 ${todo.category}</span> <span>📅 ${todo.due || '-'}</span>`;

    li.appendChild(top);
    li.appendChild(bottom);
    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({
      text,
      category: category.value,
      due: due.value,
      completed: false
    });
    input.value = '';
    due.value = '';
    saveAndRender();
  }
};

renderTodos();
