class Timer {
  constructor() {
    this.timer = document.getElementById("minutes");
    this.mm = document.getElementById("mm");
    this.timerDot = document.querySelector(".day_dot");
    this.playButton = document.querySelector('#play-button');
    this.pauseButton = document.querySelector('#pause-button');
    this.replayButton = document.querySelector('#replay-button');
    this.breakButton = document.querySelector('#break-button');
    this.timerDisplay = document.querySelector('#timer-display');

    this.isTimerRunning = false;
    this.userDefinedTime = 25;
    this.remainingTime = null;
    this.timerInterval = null;
    this.isBreakRunning = false;

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.refreshTimer = this.refreshTimer.bind(this);
    this.breakTime = this.breakTime.bind(this);

    this.playButton.addEventListener("click", this.startTimer);
    this.pauseButton.addEventListener("click", this.pauseTimer);
    this.replayButton.addEventListener("click", this.refreshTimer);
    this.breakButton.addEventListener("click", this.breakTime);
  }

  startTimer() {
    if (this.isTimerRunning) {
      this.resumeTimer();
      return;
    }
  
    this.isTimerRunning = true;
  
    let time;
    if (this.remainingTime !== null) {
      time = this.remainingTime;
    } else {
      time = 1000 * 60 * this.userDefinedTime;
    }
  
    const startTime = new Date().getTime();
    this.displayTime(time, this.userDefinedTime);
  
    this.timerInterval = setInterval(() => {
      this.remainingTime = time - (new Date().getTime() - startTime);
      this.displayTime(this.remainingTime, this.userDefinedTime);
  
      if (this.remainingTime <= 1) {
        clearInterval(this.timerInterval);
        console.log('Time is up!');
  
        this.isTimerRunning = false;
        this.remainingTime = null;
        this.timerInterval = null;
        this.pauseButton.style.display = 'none';
        this.playButton.style.display = 'inline';
        this.mm.style.strokeDashoffset = 440;
        this.timer.textContent = `${this.userDefinedTime}:00`;
      }
    }, 1000);
  
    this.playButton.style.display = 'none';
    this.pauseButton.style.display = 'inline';
  }
  
  resumeTimer() {
    if (this.isTimerRunning || this.remainingTime === null) {
      return;
    }
    const startTime = new Date().getTime();
  
    this.timerInterval = setInterval(() => {
      this.remainingTime = this.remainingTime - (new Date().getTime() - startTime);
      if(this.isBreakRunning){
        console.log("Break is resumed");
        this.displayTime(this.remainingTime, 5);
      }
      else
      this.displayTime(this.remainingTime, this.userDefinedTime);
  
      if (this.remainingTime <= 1) {
        clearInterval(this.timerInterval);
        console.log('Time is up!');
        
        if(this.isBreakRunning)
        this.isBreakRunning = false;
        this.isTimerRunning = false;
        this.remainingTime = null;
        this.timerInterval = null;
        this.pauseButton.style.display = 'none';
        this.playButton.style.display = 'inline';
        this.mm.style.strokeDashoffset = 440;
        this.timer.textContent = `${this.userDefinedTime}:00`;
      }
    }, 1000);
  
    this.playButton.style.display = 'none';
    this.pauseButton.style.display = 'inline';
  }
  
  pauseTimer() {
    if (!this.isTimerRunning) {
      return;
    }

    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.pauseButton.style.display = 'none';
    this.playButton.style.display = 'inline';
  }

  breakTime() {
    if (this.isTimerRunning) {
      return;
    }
    this.isBreakRunning = true;
    this.isTimerRunning = true;
    const breakDuration = 1000 * 60 * 5; // 5 minutes break time

    const startTime = new Date().getTime();
    this.displayTime(breakDuration, 5);

    this.timerInterval = setInterval(() => {
      this.remainingTime = breakDuration - (new Date().getTime() - startTime);
      this.displayTime(this.remainingTime, 5);

      if (this.remainingTime <= 1) {
        clearInterval(this.timerInterval);
        console.log('Break time is up!');

        this.isTimerRunning = false;
        this.isBreakRunning = false;
        this.remainingTime = null;
        this.timerInterval = null;
        this.pauseButton.style.display = 'none';
        this.playButton.style.display = 'inline';
        this.mm.style.strokeDashoffset = 440;
        this.timer.textContent = `${this.userDefinedTime}:00`;
      }
    }, 1000);

    this.playButton.style.display = 'none';
    this.pauseButton.style.display = 'inline';
  }

  refreshTimer() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.remainingTime = null;
    this.timerInterval = null;
    this.pauseButton.style.display = 'none';
    this.playButton.style.display = 'inline';
    this.mm.style.strokeDasharray = 440;
    this.timer.textContent = `${this.userDefinedTime}:00`;
  }

  displayTime(time, interval) {
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(seconds).padStart(2, '0');

    this.timer.textContent = `${minutesString}:${secondsString}`;

    const mmOffset = ((1000 * 60 * interval - time) / (1000 * 60 * interval)) * 440;
    this.mm.style.strokeDashoffset = mmOffset;
  }
}

export const timerObj = new Timer();
