import { Action } from "./core/Action";
import { ActionElement } from "./ActionElement";
import { ActionRepository } from "./ActionRepository";

export class DeleteActionDialog {
    private _element: HTMLElement;
    get element() { return this._element };

    constructor(private _targetActionElement: ActionElement) {
        const templateText = `
            <div id="overlay" style="display:none;">
                <div id="dialog-wrapper">
                    <div id="dialog">
                        <label>Do you want to delete this action?</label>
                        <input type="button" id="delete-yes-button" value="yes">
                        <input type="button" id="delete-no-button" value="no">
                    </div>
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

        // yesボタンイベントハンドラ設定
        (this._element.querySelector("#delete-yes-button") as HTMLElement).onclick = async () => {
            const repository = new ActionRepository();
            await repository.delete(this._targetActionElement.action);
            this._targetActionElement.tr.remove();

            this.close();
        };

        // noボタンイベントハンドラ設定
        (this._element.querySelector("#delete-no-button") as HTMLElement).onclick = () => {
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

    private stringToElement(htmlString: string) {
        const template = document.createElement('template');
        htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = htmlString;
        return template.content.firstChild as HTMLElement;
    }
}