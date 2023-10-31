const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let todos = [];

app.get('/', (req, res) => {
  res.render('index', { todos: todos });
});

app.post('/add', (req, res) => {
  const newTodo = req.body.newTodo;
  todos.push(newTodo);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const taskToDelete = req.body.taskToDelete;
  todos = todos.filter(task => task !== taskToDelete);
  res.redirect('/');
});

app.post('/edit', (req, res) => {
  const taskToEdit = req.body.taskToEdit;
  const editedTask = req.body.editedTask;

  if (taskToEdit && editedTask) {
    const index = todos.indexOf(taskToEdit);
    if (index !== -1) {
      todos[index] = editedTask;
    }
  }

  res.redirect('/');
});

app.listen(5500, () => {
  console.log('Server started on port 5500');
});
