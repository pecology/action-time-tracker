import { Action } from "./core/Action";

export class ActionElement {
    private _tr: HTMLTableRowElement;
    constructor(private action: Action) {
        this._tr = document.createElement('tr');

        const clazz = action.desirability;

        const nameTd = document.createElement('td');
        nameTd.innerText = action.name;
        nameTd.setAttribute("class", clazz);
        this._tr.appendChild(nameTd);

        const timeTd = document.createElement('td');
        timeTd.innerText = action.elapsedTime.toString();
        timeTd.setAttribute("class", clazz);
        this._tr.appendChild(timeTd);

        const buttonTd = document.createElement('td');
        const button = document.createElement('button');
        button.innerText = "Start";
        buttonTd.appendChild(button);
        this._tr.appendChild(buttonTd);

        let handle: NodeJS.Timeout;
        buttonTd.onclick = () => {
            if (this.action.isActive) {
                this.action.stop();
                button.innerText = "Start";
                clearInterval(handle)
            } else {
                this.action.start();
                button.innerText = "Stop";
                handle = setInterval(() => {
                    const duration = this.action.elapsedTime;
                    timeTd.innerText = duration.toString();
                }, 110);
            }
        }
    }

    get tr() { return this._tr; };
}