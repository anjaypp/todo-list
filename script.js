// DOM elements
const usernameInput = document.getElementById("FormUsername");
const passwordInput = document.getElementById("FormPassword");
const loginError = document.getElementById("loginError");
const loginForm = document.getElementById("loginForm");

// Validation function
function validateLogin(username, password, callback) {
  const validUsername = "admin";
  const validPassword = "12345";

  // Check if username and password are correct
  if (username === validUsername && password === validPassword) {
    callback();
  } else {
    // Show error message if invalid credentials
    loginError.innerHTML = "Invalid Username or Password";
  }
}

// Callback function for redirection
function redirectToHome() {
  // Redirect to home page
  window.location.href = "main.html";
}

// Handle form submission directly
function onFormSubmit() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  
  validateLogin(username, password, redirectToHome);


  return false;
}

// Fetches data from API
// Fetches tasks from the API
async function fetchTasksFromApi() {

      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      
      // Filter out 5 completed and 5 pending tasks
      const completedTasks = data.filter(task => task.completed).slice(0,7);
      const pendingTasks = data.filter(task => !task.completed).slice(0,7);
      
      // Populate tasks in the DOM
      populateTasks('pending-tasks', pendingTasks);
      populateTasks('completed-tasks', completedTasks);
      
}

// Function to populate tasks into the provided section (pending/completed)
function populateTasks(sectionClass, tasks) {
  const section = document.querySelector(`.${sectionClass} .list-group`);
  section.innerHTML = ''; 

  tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');

      const checkbox = document.createElement('input');
      checkbox.classList.add('form-check-input', 'me-1');
      checkbox.type = 'checkbox';
      checkbox.id = `task${task.id}`;
      checkbox.checked = task.completed; 

      // Add an event listener to the checkbox
      checkbox.addEventListener('change', () => {
      taskCompleted(checkbox);
    });

      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.setAttribute('for', `task${task.id}`);
      label.textContent = task.title; 

      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      section.appendChild(listItem);
  });
}

fetchTasksFromApi();

let completedPendingTasks = 0;  // Track pending tasks that are completed

// Function that handles task completion for pending tasks
function taskCompleted(checkbox) {
  return new Promise((resolve) => {
    // Only count task completion for pending tasks being marked as completed
    if (checkbox.checked) {
      completedPendingTasks++;
    } else {
      completedPendingTasks--;
    }
    resolve();  // Resolve the promise when task completion state changes
  }).then(() => {
    // When exactly 5 pending tasks are completed, show the alert
    if (completedPendingTasks === 5) {
      alert("Congrats! 5 Pending Tasks have been Successfully Completed.");
    }
  });
}

taskCompleted();