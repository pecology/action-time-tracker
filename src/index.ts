import { ActionElement } from "./ActionElement"
import { Action } from "./core/Action";
import { VirtueTimeElement } from "./VirtueTimeElement";
import { AddActionDialog } from "./AddActionDialog";
import { ActionRepository } from "./ActionRepository";

window.onload = async () => {
    const repository = new ActionRepository()
    const actions = await repository.findAll();

    if (actions.length === 0) {
        actions.push(new Action("音楽", "Good", []));
        actions.push(new Action("プログラミング", "Good", []));
        actions.push(new Action("トレーニング", "Good", []));
        actions.push(new Action("掃除", "Good", []));
        actions.push(new Action("数学", "Good", []));
        actions.push(new Action("漫画", "Neautoral", []));
        actions.push(new Action("アニメ", "Neautoral", []));
        actions.push(new Action("映画", "Neautoral", []));
        actions.push(new Action("ポケモン", "Neautoral", []));
        actions.push(new Action("ぷよぷよ", "Bad", []));
        actions.push(new Action("ネットサーフィン", "Bad", []));
        const repository = new ActionRepository();
        repository.insertAll(actions);
    }

    actions.map(a => new ActionElement(a))
            .forEach(e => {
                document.querySelector("tbody")?.appendChild(e.tr);
            });

    const virtueTimeElement = new VirtueTimeElement(actions);
    document.querySelector(".container")?.insertBefore(virtueTimeElement.div, document.querySelector("#add-button"));

    const addButton = document.getElementById("add-button") as HTMLButtonElement;
    addButton.onclick = () => {
        const addActionDialog = new AddActionDialog();
        addActionDialog.show();
    };
}