import { Action } from "./core/Action";
import { Duration } from "./core/Duration";

export class VirtueTimeElement {
    private _h1: HTMLHeadingElement;
    constructor(private _actions: Array<Action>) {
        this._h1 = document.createElement('h1');


        setInterval(() => {
            const virtualTime = this.calcVirtualTime();
            this._h1.innerText = `Virtue Time : ${virtualTime.toString()}`;
            if (virtualTime.msec < 0) {
                this._h1.setAttribute("class", "Negative");
            } else {
                this._h1.setAttribute("class", "Positive");
            }
        }, 123);
    }

    calcVirtualTime() {
        return this._actions.reduce((prev, curr) => {
            switch (curr.desirability) {
                case "Good":
                    return prev.add(curr.elapsedTime);
                case "Bad":
                    return prev.subtract(curr.elapsedTime);
                default:
                    return prev;
            }
        }, new Duration(0));
    }

    get h1() { return this._h1; };
}