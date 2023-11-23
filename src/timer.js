export class Timer {
    #startTime;
    #elapsedTime;
    constructor() {
        this.#startTime = null;
        this.#elapsedTime = 0;
        this.timerRunning = false;
    }

    start() {
        if (!this.timerRunning) {
            this.#startTime = Date.now() - this.#elapsedTime;
            this.timerRunning = true;
        }
    }

    pause() {
        if (this.timerRunning) {
            this.#elapsedTime = Date.now() - this.#startTime;
            this.timerRunning = false;
        }
    }

    stop() {
        this.#elapsedTime = this.timerRunning ? Date.now() - this.#startTime : this.#elapsedTime;
        this.timerRunning = false;
        return this.#elapsedTime;
    }
}
