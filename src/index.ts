import localForage from "localforage";

import { ActionElement } from "./ActionElement"
import { Action } from "./core/Action";
import { VirtueTimeElement } from "./VirtueTimeElement";

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
        .forEach(e => document.querySelector("tbody")?.appendChild(e.tr));


    const virtueTimeElement = new VirtueTimeElement(actions);
    document.querySelector(".container")?.insertBefore(virtueTimeElement.h1, document.querySelector(".container>table"));

    setInterval(async () => {
        await localForage.setItem('actions', JSON.stringify(actions));
    }, 10000)

}