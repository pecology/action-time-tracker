import localForage from "localforage";

import { ActionElement } from "./ActionElement"
import { Action } from "./core/Action";
import { VirtueTimeElement } from "./VirtueTimeElement";
import { AddActionDialog } from "./AddActionDialog";

window.onload = async () => {
    const actionsJSON = await localForage.getItem('actions') as string;
    const actions = actionsJSON ? (JSON.parse(actionsJSON) as Array<any>).map(o => Action.from(o)) 
                                : [];
    if (actions.length === 0) {
        actions.push(new Action("音楽", "Good", [])),
        actions.push(new Action("プログラミング", "Good", [])),
        actions.push(new Action("トレーニング", "Good", [])),
        actions.push(new Action("掃除", "Good", [])),
        actions.push(new Action("数学", "Good", [])),
        actions.push(new Action("漫画", "Neautoral", [])),
        actions.push(new Action("アニメ", "Neautoral", [])),
        actions.push(new Action("映画", "Neautoral", [])),
        actions.push(new Action("ポケモン", "Neautoral", [])),
        actions.push(new Action("ぷよぷよ", "Bad", [])),
        actions.push(new Action("ネットサーフィン", "Bad", []))
    }

    actions.map(a => new ActionElement(a))
            .forEach(e => {
                document.querySelector("tbody")?.appendChild(e.tr);
                e.tr.addEventListener("ondelete", () => {
                    const index = actions.findIndex(ele => ele === e.action);
                    actions.splice(index, 1);
                    e.tr.remove();
                })
            });


    const virtueTimeElement = new VirtueTimeElement(actions);
    document.querySelector(".container")?.insertBefore(virtueTimeElement.h1, document.querySelector("#add-button"));

    setInterval(async () => {
        await localForage.setItem('actions', JSON.stringify(actions));
    }, 10000);

    const addButton = document.getElementById("add-button") as HTMLButtonElement;
    addButton.onclick = async () => {
        const addActionDialog = new AddActionDialog();
        document.querySelector(".wrapper")?.appendChild(addActionDialog.element);
        const newAction = await addActionDialog.doModal();
        if(newAction) {
            actions.push(newAction);
            document.querySelector("tbody")?.appendChild(new ActionElement(newAction).tr)
        }
    };
}