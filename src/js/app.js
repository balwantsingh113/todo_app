let tasks = [];
const api="http://localhost:3000"
function addTask() {
    const taskInput = document.getElementById('taskInput');

fetch(api+"/addTask", {
  method: "POST",
  body: JSON.stringify({
    description:taskInput.value,
    completed:false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then(res=>{
    updateTaskList();
    taskInput.value = '';
});
}

function updateTaskList() {
var tasks=[];
fetch(api+"/getTasks")
  .then(res =>
    res.json())
    .then(d => {
        tasks = d;
        const taskList = document.getElementById('taskList');
        const taskCount = document.getElementById('taskCount');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompleted(${task.id})">
                <span>${task.description}</span>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
        const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
    })
  .catch(function (err) {
    console.log("Unable to fetch -", err);
  });   
}

function toggleCompleted(taskId) {
    fetch(api+"/updateTask/"+taskId, {
        method: "POST",
      }).then(res=>{
          updateTaskList();
      });
}

function deleteTask(taskId) {
    fetch(api+"/deleteTask/"+taskId, {
      method: "DELETE",
    }).then(res=>{
        updateTaskList();
    });
}

function clearCompleted() {
    fetch(api+"/deleteCompletedTasks/", {
        method: "DELETE",
      }).then(res=>{
          updateTaskList();
      });
}

updateTaskList();
