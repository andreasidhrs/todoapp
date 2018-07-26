export default class TodoItem {
    body: string;
    done: boolean;

    constructor(body) {
        this.body = body;
        this.done = false;
    }

    toggleDone() {
        this.done = !this.done;
    }

    getBody() {
        return this.body;
    }

    getDone() {
        return this.done;
    }

    setDone(done) {
        this.done = done;
    }
}