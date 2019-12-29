import { Action } from "./core/Action";
import { TrackingLog } from "./core/TrackingLog";
import { ActionElement } from "./ActionElement";
import { ActionRepository } from "./ActionRepository";

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
        
        // 閉じるイベントハンドラ設定
        this._element.addEventListener("click", event => {
            if ((<HTMLElement>event.target).id !== "overlay") {
                return false;
            }
            this.close();
        });
        
        // 確認ボタンイベントハンドラ設定
        (this._element.querySelector("#confirm-button") as HTMLElement).onclick = async () => {
            await this.createAction();
            this.close();
        };

        document.body.appendChild(this._element);
    }

    show() {
        this._element.setAttribute("style", "display:inline");
    }

    close() {
        this._element.remove();
    }

    private async createAction() {
        const name = (document.querySelector("#action-name-field") as HTMLInputElement).value;
        const desirability = Array.from(document.querySelectorAll('.desirability-radio')).find(e => (e as HTMLInputElement).checked)?.getAttribute("id") as string;
        const trackingLogs: Array<TrackingLog> = [];
        const action = Action.from({name, desirability, trackingLogs});

        const repository = new ActionRepository();
        await repository.insert(action);

        document.querySelector("tbody")?.appendChild(new ActionElement(action).tr);
    }

    private stringToElement(htmlString: string) {
        const template = document.createElement('template');
        htmlString = htmlString.trim();
        template.innerHTML = htmlString;
        return template.content.firstChild as HTMLElement;
    }
}