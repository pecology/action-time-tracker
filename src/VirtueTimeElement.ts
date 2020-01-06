import { Action } from "./core/Action";
import { Duration } from "./core/Duration";
import { TrackingLog } from "./core/TrackingLog";

export class VirtueTimeElement {
    private _div: HTMLDivElement;
    constructor(private _actions: Array<Action>) {
        this._div = document.createElement('div');

        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.htmlFor = "today-only-checkbox";
        checkBoxLabel.innerText = "today only";
        this._div.appendChild(checkBoxLabel);

        const todayOnlyCheckBox = document.createElement('input');
        todayOnlyCheckBox.type = "checkbox";
        todayOnlyCheckBox.id = "today-only-checkbox";
        this._div.appendChild(todayOnlyCheckBox);

        const h1 = document.createElement('h1');
        this._div.appendChild(h1);

        setInterval(() => {
            const virtualTime = this.calcVirtualTime(todayOnlyCheckBox.checked);
            h1.innerText = `Virtue Time : ${virtualTime.toString()}`;
            if (virtualTime.msec < 0) {
                h1.setAttribute("class", "Negative");
            } else {
                h1.setAttribute("class", "Positive");
            }
        }, 123);
    }

    calcVirtualTime(todayOnly: boolean) {
        return this._actions.reduce((prev, curr) => {
            const currTime = todayOnly ? this.todayElapsedTime(curr.logs) : curr.elapsedTime;
            switch (curr.desirability) {
                case "Good":
                    return prev.add(currTime);
                case "Bad":
                    return prev.subtract(currTime);
                default:
                    return prev;
            }
        }, new Duration(0));
    }

    private todayElapsedTime(logs: Array<TrackingLog>) {
        return logs.reduce((prev, curr) => {
            const isTodayLog = curr.start.toDateString() === new Date().toDateString();
            return isTodayLog ? prev.add(curr.duration) : prev;
        }, new Duration(0))
    }

    get div() { return this._div; };
}