// Task Event Listeners

const taskHeader = document.querySelector("#current-task")
const tasks = document.querySelectorAll(".item-name-upc");

tasks.forEach(task => {
  task.addEventListener("click", ()=> {
    console.log("Task Clicked");
    taskHeader.textContent =  task.textContent;
    timerObj.pauseTimer()
    timerObj.refreshTimer();
  })
}) 

  // Checkbox listener
  // task deer

const taskCheckbox = document.querySelectorAll(".checkbox");
const taskCompletedSection = document.querySelector(".list-comp");
const taskUpcomingSection = document.querySelector(".list-upc");


taskCheckbox.forEach(task => {
  task.addEventListener("change", ()=> { 

    // upcoming task deer
    if(task.parentNode.parentNode.classList.contains("list-upc"))
    {
      console.log("C")
      const item = document.createElement("li");
      // shine element completed nemeed 
      const taskName = task.parentNode.querySelector(".item-name-upc").textContent;
      item.innerHTML = `<span class='item-name-comp'>${taskName}</span> <input class='checkbox' type='checkbox' checked>`
      taskCompletedSection.appendChild(item);
      // now delete the item itself from the html
      task.parentNode.remove();
      // completed task deer
      
    } else {
      console.log("D")
      const item = document.createElement("li");
      // shine element completed nemeed 
      const taskName = task.parentNode.querySelector(".item-name-comp").textContent;
      item.innerHTML = `<span class='item-name-upc'>${taskName}</span> <input class='checkbox' type='checkbox'>`
      taskUpcomingSection.appendChild(item);
      // now delete the item itself from the html
      task.parentNode.remove();
    }
  })  
})


  // Task handler

  const taskListItems = document.querySelectorAll('.list-upc li');

  // Add click event listener to the "active-task" element
  document.getElementById("active-task").addEventListener("click", function() {
    if (localStorage.getItem("isActiveTaskClicked") === 'true' || localStorage.getItem("isActiveTaskClicked") === null) {
      // Hide all task items except the first one if the "active-task" has been clicked before
      for (let i = 1; i < taskListItems.length; i++) {
        taskListItems[i].style.display = 'none';
      }
      localStorage.setItem("isActiveTaskClicked", 'false');
    } else {
      // Show all task items if the "active-task" has not been clicked before
      for (let i = 0; i < taskListItems.length; i++) {
        taskListItems[i].style.display = 'block';
      }
      localStorage.setItem("isActiveTaskClicked", 'true');
    }
  });

  const taskListComp = document.querySelector('.list-comp');

  // Add click event listener to the "active-task" element
  document.getElementById("complete-task").addEventListener("click", function() {
    if (localStorage.getItem("isCompleteTaskClicked") == 'true' ||localStorage.getItem("isCompleteTaskClicked") == null) {
      // Hide the tasks if the "active-task" has been clicked before
      taskListComp.classList.add('hidden');
      localStorage.setItem("isCompleteTaskClicked", false);
    } else {
      // List the tasks if the "active-task" has not been clicked before
      taskListComp.classList.remove('hidden');
      localStorage.setItem("isCompleteTaskClicked", true);
      console.log("IM CLICKED")
    }
  });

// Item iig drag hiih

const items = document.querySelectorAll(".item");

const taskList = document.querySelector('.task-list');

let draggedItem = null;

taskList.addEventListener('dragstart', (e) => { 
  draggedItem = e.target;
  e.target.classList.add('dragging');
});

taskList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(taskList, e.clientY);
  const draggableItem = document.querySelector('.dragging');
  if (afterElement == null) {
    taskList.appendChild(draggableItem);
  } else {
    taskList.insertBefore(draggableItem, afterElement);
  }
});

taskList.addEventListener('dragend', () => {
  draggedItem.classList.remove('dragging');
  draggedItem = null;
});

function getDragAfterElement(container, y) {
  const draggableItems = [...container.querySelectorAll('.item:not(.dragging)')];
  return draggableItems.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}




// QUOTE heseg

function fetchMotivationalQuotes() {
  return fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => data);
}

function displayRandomQuote(quotes) {
  const quoteContainer = document.querySelector('#quote-container');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteText = document.querySelector("#quote-text")
  const quoteFooter = document.querySelector("#quote-footer");
  quoteText.innerText = randomQuote.text;
  quoteFooter.innerText = randomQuote.author;
  // quoteContainer.innerHTML = `
  //   <blockquote>
  //     <p>${randomQuote.text} </p>
  //     <footer>${randomQuote.author}<button id="quote-btn"><i class="fa-solid fa-rotate-right"></i></button> </p></footer>
  //   </blockquote>
  // `;
}
fetchMotivationalQuotes()
  .then(quotes => displayRandomQuote(quotes))
  .catch(error => console.error(error));

const quoteBtn = document.querySelector('#quote-btn');

quoteBtn.addEventListener("click", () => {
  fetchMotivationalQuotes()
    .then(quotes => displayRandomQuote(quotes))
    .catch(error => console.error(error));
});
