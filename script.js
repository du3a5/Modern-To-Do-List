const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

document.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  const taskDate = document.getElementById("taskDate").value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <small>${taskDate ? "Due: " + taskDate : ""}</small>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const del = document.createElement("button");
  del.textContent = "X";
  del.className = "del-btn";
  del.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(del);
  list.appendChild(li);

  input.value = "";
  document.getElementById("taskDate").value = "";

  saveTasks();
}

function filterTasks(type) {
  document.querySelectorAll("#taskList li").forEach((li) => {
    const done = li.classList.contains("completed");
    li.style.display =
      type === "all" ||
      (type === "completed" && done) ||
      (type === "pending" && !done)
        ? "flex"
        : "none";
  });
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const date = li.querySelector("small")
      ? li.querySelector("small").textContent.replace("Due: ", "")
      : "";
    const completed = li.classList.contains("completed");
    tasks.push({ text, date, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <small>${task.date ? "Due: " + task.date : ""}</small>
    `;

    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const del = document.createElement("button");
    del.textContent = "X";
    del.className = "del-btn";
    del.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}

const themeToggle = document.getElementById("themeToggle");

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});
