const input = document.getElementById("countdownInput");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const display = document.getElementById("displayTime");
const formatSelector = document.getElementById("timeFormat");
let countdown;
let timeLeft;

function convertTimeToSeconds(time, format) {
    return format === 'minutes' ? time * 60 : format === 'hours' ? time * 3600 : time;
}

function formatDisplayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${remainingSeconds}s`;
}

startBtn.addEventListener("click", () => {
    const inputValue = parseInt(input.value);
    const format = formatSelector.value;
    timeLeft = convertTimeToSeconds(inputValue, format);
    
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Enter a valid number!");
        return;
    }

    startBtn.disabled = true;
    display.textContent = formatDisplayTime(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        display.textContent = formatDisplayTime(timeLeft);

        if (timeLeft <= 10) display.classList.add("red");
        else display.classList.remove("red");

        if (timeLeft <= 0) {
            clearInterval(countdown);
            display.textContent = "Time is up!";
            playSound();
            startBtn.disabled = false;
        }
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(countdown);
    display.textContent = "Timer stopped";
    startBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
    clearInterval(countdown);
    input.value = "";
    display.textContent = "0";
    display.classList.remove("red");
    startBtn.disabled = false;
});

function playSound() {
    const sound = new Audio('mixkit-retro-game-notification-212.mp3');
    sound.play();
}
