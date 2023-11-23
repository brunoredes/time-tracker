import { createInterface } from 'readline';
import { Timer } from './timer.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const timer = new Timer();
const tasks = [];
let taskCounter = 1;

console.log("Commands: start, pause, stop, exit");

const promptTaskName = (callback) => {
    rl.question("Enter task name (leave blank for default): ", (name) => {
        callback(name.trim());
    });
};

rl.on('line', (input) => {
    switch(input.trim()) {
        case 'start':
            promptTaskName((name) => {
                if (!name) {
                    name = `task#${taskCounter++}`;
                }
                timer.start();
                tasks.push({ name, time: 0 });
                console.log(`Timer started for ${name}`);
            });
            break;
        case 'pause':
            if (timer.timerRunning) {
                timer.pause();
                console.log("Timer paused");
            } else {
                console.log("Timer is not running");
            }
            break;
        case 'stop':
            if (timer.timerRunning) {
                const time = timer.stop();
                const lastTask = tasks[tasks.length - 1];
                lastTask.time = time;
                console.log(`Timer stopped for ${lastTask.name}, time recorded`);
            } else {
                console.log("Timer is not running");
            }
            break;
        case 'exit':
            console.log("Exiting and printing tasks:");
            tasks.forEach(task => {
                console.log(`${task.name}: ${task.time / 1000} seconds`);
            });
            process.exit(0);
            break;
        default:
            console.log("Invalid command");
    }
});