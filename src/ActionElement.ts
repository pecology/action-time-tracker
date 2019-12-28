import { Action } from "./core/Action";
import { DeleteActionDialog } from "./DeleteActionDialog";

export class ActionElement {
    private _tr: HTMLTableRowElement;
    constructor(private _action: Action) {
        this._tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.innerText = _action.name;
        nameTd.setAttribute("class", _action.desirability);
        this._tr.appendChild(nameTd);

        const timeTd = document.createElement('td');
        timeTd.innerText = _action.elapsedTime.toString();
        timeTd.setAttribute("class", _action.desirability);
        this._tr.appendChild(timeTd);

        const buttonTd = document.createElement('td');
        const button = document.createElement('button');
        button.innerText = "Start";
        buttonTd.appendChild(button);
        this._tr.appendChild(buttonTd);
        
        const deleteTd = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("class", "button button-clear");
        deleteButton.setAttribute("id", "delete-button");
        deleteButton.textContent = "×";
        deleteTd.appendChild(deleteButton);
        this._tr.appendChild(deleteTd);
        deleteButton.onclick = async () => {
            const deleteActionDialog = new DeleteActionDialog(_action);
            document.querySelector(".wrapper")?.appendChild(deleteActionDialog.element);
            if(await deleteActionDialog.open()) {
                var event = new Event('ondelete');
                this._tr.dispatchEvent(event);
            }
        }

        let handle: NodeJS.Timeout;
        buttonTd.onclick = () => {
            if (this._action.isActive) {
                this._action.stop();
                button.innerText = "Start";
                clearInterval(handle)
            } else {
                this._action.start();
                button.innerText = "Stop";
                handle = setInterval(() => {
                    const duration = this._action.elapsedTime;
                    timeTd.innerText = duration.toString();
                }, 110);
            }
        }
    }

    get tr() { return this._tr; };
    get action() {return this._action}
}