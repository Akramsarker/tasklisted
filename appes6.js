class Book {
  constructor(name) {
    this.name = name;
  }

  // Display Book
  displayBook(task) {
    // Create List
    const li = document.createElement('li');
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(task));

    // Create List
    const link = document.createElement('a');
    link.href = "#";
    link.className = "delete-item secondary-content";
    // Create I
    const i = document.createElement('i');
    i.className = "fa fa-remove";

    link.appendChild(i);
    li.appendChild(link);
    // Ul Selected
    const ul = document.querySelector('.collection');

    ul.appendChild(li);

  }

  // Show Alert
  showAlert(message, className) {
    // Create Div
    const div = document.createElement('div');
    div.className = `show-alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const main = document.querySelector('#main');

    const card = document.querySelector('.card-content');

    main.insertBefore(div, card);

    // Set Time Out
    setTimeout(function () {
      document.querySelector('.show-alert').remove()
    }, 2000)
  }

  // Fields Clear
  clearFields() {
    document.querySelector('#task').value = '';
  }

  // Remove Btn
  removeBtn(target) {
    if (target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are you sure you want to delete')) {
        target.parentElement.parentElement.remove()
      }

    }

  }

  // Clear Tasks
  clearTasks() {
    document.querySelector('.collection').innerHTML = '';
  }

  // Filter Tasks 
  filterTasks(key) {
    const text = key.toLowerCase();
    // List Items
    const lists = document.querySelectorAll('.collection-item');
    lists.forEach(function (tasks) {
      const item = tasks.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        tasks.style.display = 'block'
        tasks.style.display = 'flex'
        tasks.style.justifyContent = 'space-between';
      } else {
        tasks.style.display = 'none'
      }
    })
  }
}

// Store tasks
class Store {
  static getTasks() {
    let tasked;
    if (localStorage.getItem('tasked') === null) {
      tasked = [];
    } else {
      tasked = JSON.parse(localStorage.getItem('tasked'));
    }
    return tasked;
  }

  // Display Task Book
  static displayBookTasks() {
    const tasked = Store.getTasks();
    tasked.forEach(function (task) {
      const book = new Book();

      // Add Book To ui
      book.displayBook(task);
    });
  }

  // Display Show In Task
  static addDisplayBookLocalStorage(task) {
    const tasked = Store.getTasks();
    tasked.push(task);

    localStorage.setItem('tasked', JSON.stringify(tasked));

  }

  // Remove Task List
  static removeTaskFromLocalStorage(targets) {
    console.log(targets);
    const tasked = Store.getTasks();
    tasked.forEach(function (book) {
      if (book.targets === targets) {

        tasked.splice(index, 1);
      }
    });

    localStorage.setItem('tasked', JSON.stringify(tasked));
  }


  // All Clear Tasks
  static clearTasksLocalStorage() {
    const tasked = Store.getTasks();
    localStorage.clear(tasked);
  }
}

// Dom Load Event
document.addEventListener('DOMContentLoaded', Store.displayBookTasks);

// Book Add Event Listeners
document.querySelector('#task-form').addEventListener('submit', function (e) {

  const task = document.querySelector('#task').value;

  // New Book Object0
  const book = new Book(task);

  // Condition Logick
  if (task === '') {
    book.showAlert('Please in the task', 'error')
  } else {
    // ADD TO DISPLAY SHOW
    book.displayBook(task);

    // Add Local Storage
    Store.addDisplayBookLocalStorage(task);

    // Add Book Save
    book.showAlert('Task Save!', 'success')
  }

  // Clear Fields
  book.clearFields();

  e.preventDefault();
})


// Remove Task
document.querySelector('.collection').addEventListener('click', function (e) {

  // New Book Object
  const book = new Book();

  book.removeBtn(e.target);


  Store.removeTaskFromLocalStorage(e.target);

  e.preventDefault();
})


// Clear Task
document.querySelector('.clear-tasks').addEventListener('click', function () {

  // New Book Object0
  const book = new Book();

  // Clear Task
  book.clearTasks();

  // Show Alert
  book.showAlert('Task Clear', 'success');

  // Clear Local Storage
  Store.clearTasksLocalStorage()
})

// Filter Tasks
document.querySelector('#filter').addEventListener('keyup', function (e) {

  // New Book Object0
  const book = new Book();

  // Filter Tasks Function
  book.filterTasks(e.target.value);
})




