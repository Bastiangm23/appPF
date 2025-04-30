const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

const fetchTasks = async () => {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "tarea";
    div.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description || ""}<br>
      <button onclick="deleteTask('${task._id}')">Eliminar</button>
    `;
    taskList.appendChild(div);
  });
};

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  taskForm.reset();
  fetchTasks();
});

const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
};
fetchTasks();
