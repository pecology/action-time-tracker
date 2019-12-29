import { Action } from "./core/Action";
import { DeleteActionDialog } from "./DeleteActionDialog";
import { ActionRepository } from "./ActionRepository";

export class ActionElement {
    private readonly _tr: HTMLTableRowElement;

    constructor(private _action: Action) {
        this._tr = document.createElement('tr');

        const nameTd = this.createNameTd()
        this._tr.appendChild(nameTd);

        const timeTd = this.createTimeTd();
        this._tr.appendChild(timeTd);

        const startStopTd = this.createStartStopTd();
        this._tr.appendChild(startStopTd);
        
        const deleteTd = this.createDeleteTd();
        this._tr.appendChild(deleteTd);

        this.setStartStopClickEventHandler(startStopTd, timeTd);
    }

    get tr() { return this._tr; };
    get action() {return this._action}

    private createNameTd() {
        const nameTd = document.createElement('td');
        nameTd.innerText = this._action.name;
        nameTd.setAttribute("class", this._action.desirability);
        return nameTd;
    }

    private createTimeTd() {
        const timeTd = document.createElement('td');
        timeTd.innerText = this._action.elapsedTime.toString();
        timeTd.setAttribute("class", this._action.desirability);
        return timeTd;
    }

    private createStartStopTd() {
        const startStopTd = document.createElement('td');
        const button = document.createElement('button');
        button.innerText = this._action.isActive ? "Stop" : "Start";
        startStopTd.appendChild(button);
        return startStopTd;
    }

    private createDeleteTd() {
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("class", "button button-clear");
        deleteButton.setAttribute("id", "delete-button");
        deleteButton.textContent = "×";
        deleteButton.onclick = async () => {
            const deleteActionDialog = new DeleteActionDialog(this);
            await deleteActionDialog.show();
        }
        
        const deleteTd = document.createElement('td');
        deleteTd.appendChild(deleteButton);

        return deleteTd;
    }

    private setStartStopClickEventHandler(startStopTd: HTMLTableCellElement, timeTd: HTMLTableCellElement) {
        const updateTime = () => {
            timeTd.innerText = this._action.elapsedTime.toString();
        }

        let handle: number;
        if(this.action.isActive) {
            handle = window.setInterval(updateTime, 110);
        }

        startStopTd.onclick = async () => {
            if (!this._action.isActive) {
                this._action.start();
                const repository = new ActionRepository();
                await repository.update(this._action);

                (startStopTd.firstChild as HTMLButtonElement).innerText = "Stop";
                handle = window.setInterval(updateTime, 110);
            } else {
                this._action.stop();
                const repository = new ActionRepository();
                await repository.update(this._action);

                (startStopTd.firstChild as HTMLButtonElement).innerText = "Start";
                clearInterval(handle);
            }
        }
    }
}