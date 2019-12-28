import { Action } from "./core/Action";
import { TrackingLog } from "./core/TrackingLog";
import localForage from "localforage";

export class AddActionDialog {
    private _element: HTMLElement;
    get element(){return this._element};

    constructor() {
        const templateText = `
            <div id="overlay" style="display:none;">
                <div id="dialog-wrapper">
                    <form id="dialog">
                        <fieldset>
                            <label for="name-field">Action name</label>
                            <input type="text" id="action-name-field">
                            <label>Desirability</label>
                            <div>
                                <input type="radio" name="desirability-radio" class="desirability-radio" id="Good" checked>Good
                            </div>
                            <div>
                                <input type="radio" name="desirability-radio" class="desirability-radio" id="Neautoral">Neautoral
                            </div>
                            <div>
                                <input type="radio" name="desirability-radio" class="desirability-radio" id="Bad">Bad
                            </div>
                        </fieldset>
                        <input type="button" id="confirm-button" value="add">
                    </form>
                </div>
            </div>`;
        this._element = this.stringToElement(templateText);
    }

    doModal(): Promise<Action | undefined> {
        this._element.setAttribute("style", "display:inline");

        return new Promise(res => {
            // 閉じるイベントハンドラ設定
            this._element.addEventListener("click", event => {
                if ((<HTMLElement>event.target).id !== "overlay") {
                    return false;
                }
                this.close();
                res(undefined);
            });
    
            // 確認ボタンイベントハンドラ設定
            (this._element.querySelector("#confirm-button") as HTMLElement).onclick = () => {
                const action = this.createAction();
                this.close();
                res(action);
            };
        })
    }

    close() {
        this._element.setAttribute("style", "display:none");
        this._element.remove();
    }

    createAction() {
        const name = (document.querySelector("#action-name-field") as HTMLInputElement).value;
        const desirability = Array.from(document.querySelectorAll('.desirability-radio')).find(e => (e as HTMLInputElement).checked)?.getAttribute("id") as string;
        const trackingLogs: Array<TrackingLog> = [];
        const action = Action.from({name, desirability, trackingLogs});
        return action;
    }

    private stringToElement(htmlString: string) {
        const template = document.createElement('template');
        htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = htmlString;
        return template.content.firstChild as HTMLElement;
    }
}