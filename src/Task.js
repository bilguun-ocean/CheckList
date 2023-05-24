export class Task {
  constructor() {
    this.taskHeader = document.querySelector("#current-task");
    this.tasks = document.querySelectorAll(".item-name-upc");
    this.taskCheckbox = document.querySelectorAll(".checkbox");
    this.taskCompletedSection = document.querySelector(".list-comp");
    this.taskUpcomingSection = document.querySelector(".list-upc");
    this.taskListItems = document.querySelectorAll('.list-upc li');
    this.taskListComp = document.querySelector('.list-comp');
    this.taskList = document.querySelector('.task-list');
    this.draggedItem = null;
    this.isActiveTaskClicked = localStorage.getItem("isActiveTaskClicked") === 'true' || localStorage.getItem("isActiveTaskClicked") === null;
    this.isCompleteTaskClicked = localStorage.getItem("isCompleteTaskClicked") == 'true' || localStorage.getItem("isCompleteTaskClicked") == null;
    this.addTaskBtn = document.querySelector('.task-adder-btn');
    this.taskInputContainer = document.getElementById('task-input-container');
    this.taskInput = document.getElementById('task-input');
    this.saveTaskBtn = document.getElementById('save-task-btn');
    this.cancelTaskBtn = document.getElementById('cancel-task-btn');
    this.initializeTaskListeners();
    this.initializeCheckboxListeners();
    this.initializeTaskHandler();
    this.initializeDragAndDrop();
    this.initializeTaskAdding();
  }

  initializeTaskAdding() {
    this.addTaskBtn.addEventListener('click', () => {
      this.addTaskBtn.classList.add('hidden');
      this.taskInputContainer.classList.remove('hidden');
      this.taskInput.focus();
    });
    
    this.cancelTaskBtn.addEventListener('click', () => {
      this.addTaskBtn.classList.remove('hidden');
      this.taskInputContainer.classList.add('hidden');
      this.taskInput.value = '';
    });
    
    this.saveTaskBtn.addEventListener('click', () => {
      const taskDetails = this.taskInput.value;
      if (taskDetails.trim() !== '') {
        // Process the task details (e.g., save to database, update UI)
        console.log('Task details:', taskDetails);
        this.taskInput.value = '';
        const newItem = document.createElement('li');
        newItem.classList.add('item');
        newItem.setAttribute('draggable', 'true');
        newItem.innerHTML = `
        <input class="checkbox" type="checkbox">
        <span class="item-name-upc">${taskDetails}</span>
        <i class="grip fa-solid fa-grip-vertical"></i>
      `
        this.taskUpcomingSection.appendChild(newItem);
      }
    });
  }

  initializeTaskListeners() {
    this.tasks.forEach((task) => {
      task.addEventListener("click", () => {
        console.log("Task Clicked");
        this.taskHeader.textContent = task.textContent;
        this.timerObj.pauseTimer();
        this.timerObj.refreshTimer();
      });
    });
  }

  initializeCheckboxListeners() {
    this.taskCheckbox.forEach((task) => {
      task.addEventListener("change", () => {
        if (task.parentNode.parentNode.classList.contains("list-upc")) {
          console.log("C");
          const item = document.createElement("li");
          const taskName = task.parentNode.querySelector(".item-name-upc").textContent;
          item.innerHTML = `<span class='item-name-comp'>${taskName}</span> <input class='checkbox' type='checkbox' checked>`;
          this.taskCompletedSection.appendChild(item);
          task.parentNode.remove();
        } else {
          console.log("D");
          const item = document.createElement("li");
          const taskName = task.parentNode.querySelector(".item-name-comp").textContent;
          item.innerHTML = `<span class='item-name-upc'>${taskName}</span> <input class='checkbox' type='checkbox'>`;
          this.taskUpcomingSection.appendChild(item);
          task.parentNode.remove();
        }
      });
    });
  }

  initializeTaskHandler() {
    document.getElementById("active-task").addEventListener("click", () => {
      if (this.isActiveTaskClicked) {
        for (let i = 1; i < this.taskListItems.length; i++) {
          this.taskListItems[i].style.display = 'none';
        }
        this.isActiveTaskClicked = false;
      } else {
        for (let i = 0; i < this.taskListItems.length; i++) {
          this.taskListItems[i].style.display = 'block';
        }
        this.isActiveTaskClicked = true;
      }
      localStorage.setItem("isActiveTaskClicked", this.isActiveTaskClicked.toString());
    });

    document.getElementById("complete-task").addEventListener("click", () => {
      if (this.isCompleteTaskClicked) {
        this.taskListComp.classList.add('hidden');
        this.isCompleteTaskClicked = false;
      } else {
        this.taskListComp.classList.remove('hidden');
        this.isCompleteTaskClicked = true;
        console.log("IM CLICKED");
      }
      localStorage.setItem("isCompleteTaskClicked", this.isCompleteTaskClicked.toString());
    });
  }

  initializeDragAndDrop() {
    this.taskList.addEventListener('dragstart', (e) => {
      this.draggedItem = e.target;
      e.target.classList.add('dragging');
    });

    this.taskList.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(this.taskList, e.clientY);
      const draggableItem = document.querySelector('.dragging');
      if (afterElement == null) {
        this.taskList.appendChild(draggableItem);
      } else {
        this.taskList.insertBefore(draggableItem, afterElement);
      }
    });

    this.taskList.addEventListener('dragend', () => {
      this.draggedItem.classList.remove('dragging');
      this.draggedItem = null;
    });
  }

  getDragAfterElement(container, y) {
    const draggableItems = [...container.querySelectorAll('.item:not(.dragging)')];
    return draggableItems.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}

// Usage
