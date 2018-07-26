import * as $ from 'jquery';
import TodoItem from './TodoItem';

export default class TodoList {
    todolist: any;
    items: Array<TodoItem>;
    errors: Array<string>;

    constructor(selector) {
        this.todolist = $(selector);

        this.items = [];
        this.errors = []

        this.render();
        this.eventHandler();
    }

    validate(input): boolean {
        const inputValue = input.value;
        if(inputValue.length < 3) {
            this.errors.push(`Can't be less than 3 chars.`);
        }

        if(this.errors.length > 0) {
            this.todolist.addClass('todolist-error');
            return false;
        } else {
            this.todolist.removeClass('todolist-error');
        }
        return true;
    }

    eventHandler() {
        this.todolist.on('keyup', '.todolist-input', (e) => {
            if(e.keyCode == 13) { // Pressed enter
                if(this.validate(e.currentTarget)) {
                    this.items.push(new TodoItem(e.currentTarget.value));
                }
                this.render();
            }
        });
        this.todolist.on('click', '.todolist-item-body', (e) => {
            const item = e.target.parentElement; // Index is on parent not the body message.
            this.items[item.dataset.index].toggleDone();
            this.render();
        });
        this.todolist.on('click', '.todolist-remove', (e) => {
            const item = e.target.parentElement; // Index is on parent not the remove button.
            this.items.splice(item.dataset.index, 1); // remove the index from items.
            this.render();
        });
    }

    render() {
        this.todolist.html(this.template());
        this.todolist.find('.todolist-input').focus(); // Set focus to the input.
        this.errors = [];
    }

    template() {
        return `<div class="todolist-input-wrapper">
                    <input class="todolist-input" type="text" placeholder="what todo?">
                    <div class="todolist-errors">${this.errors.map((item, i) => `<p>${item}</p>`).join('')}</div>
                </div>
                <div class="todolist-list-wrapper">
                    <h3>${(this.items.length === 0) ? 'Add something to your list!': 'Your todo:'}</h3>
                    <ul class="todolist-items">
                    ${this.items.map((item, i) => `
                        <li class="${ (item.getDone()) ? 'todolist-done' : 'todolist-notdone' }" data-index="${i}">
                            <span class="todolist-item-body">${item.getBody()}</span> <span class="todolist-remove">X</span>
                        </li>
                    `).join('')}
                    </ul>
                </div>`;
    }
}