import { Action } from "./core/Action";

export class DeleteActionDialog {
    private _element: HTMLElement;
    get element() { return this._element };

    constructor(private _targetAction: Action) {
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
    }

    open(): Promise<Action | undefined> {
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

            // yesボタンイベントハンドラ設定
            (this._element.querySelector("#delete-yes-button") as HTMLElement).onclick = () => {
                this.close();
                res(this._targetAction);
            };

            // noボタンイベントハンドラ設定
            (this._element.querySelector("#delete-no-button") as HTMLElement).onclick = () => {
                this.close();
                res(undefined);
            };
        })
    }

    close() {
        this._element.setAttribute("style", "display:none");
        this._element.remove();
    }

    private stringToElement(htmlString: string) {
        const template = document.createElement('template');
        htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = htmlString;
        return template.content.firstChild as HTMLElement;
    }
}