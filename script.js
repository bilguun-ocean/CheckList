console.log("HELLO WORLD!");


function initializeTimer() {
  // Timer Handler
const timer = document.getElementById("minutes");
const mm = document.getElementById("mm");
const timerDot = document.querySelector(".day_dot");
const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const timerDisplay = document.querySelector('#timer-display');

let isTimerRunning = false;

let userDefinedTime = 25;

let remainingTime = null;

let timerInterval = null

const startTimer = () => {

  if (isTimerRunning) {
    return;
  }


  isTimerRunning = true;


  let time;
  if(remainingTime !== null) {
     time = remainingTime;
    remainingTime = null
  }else{
     time = 1000 * 60 * userDefinedTime;
  }


  const startTime = new Date().getTime();


  displayTime(time);

  timerInterval = setInterval(() => {
  
    remainingTime = time - (new Date().getTime() - startTime);
  
    displayTime(remainingTime);
  
    if (remainingTime <= 1) {
      clearInterval(timerInterval);
      console.log('Time is up!');

    
      isTimerRunning = false;

    
      remainingTime = null
      timerInterval = null
      pauseButton.style.display = 'none';

    
      playButton.style.display = 'inline';

      mm.style.strokeDashoffset = 440;

      timer.textContent = `${userDefinedTime}:00`;

    }
  }, 1000);


    playButton.style.display = 'none';


    pauseButton.style.display = 'inline';
  };

  const pauseTimer = () => {

    if (!isTimerRunning) {
      return;
    }


    clearInterval(timerInterval);



    isTimerRunning = false;


    pauseButton.style.display = 'none';


    playButton.style.display = 'inline';
  };

  const displayTime = (time) => {

    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);


    timer.textContent = `${minutes}:${seconds.padStart(2, '0')}`;
    
      const percentage = (time / (1000 * 60 * userDefinedTime)) * 100;

    
      const offset = 440 - (percentage / 100) * 440;
    
    
      mm.style.strokeDashoffset = offset;
  };

  const refreshTimer = () => {
    isTimerRunning = false;
    remainingTime = null;
    timerInterval = null;
    time = 1000 * 60 * userDefinedTime;
    displayTime(time);
  }

  playButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);

  return {
    pauseTimer: pauseTimer,
    startTimer: startTimer,
    refreshTimer: refreshTimer
  };
}

const timerObj = initializeTimer();


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

  // completed task deer