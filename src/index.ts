import { ActionElement } from "./ActionElement"
import { Action } from "./core/Action";
import { VirtueTimeElement } from "./VirtueTimeElement";

window.onload = () => {
    const actions = [
        new Action("音楽", "Good", []),
        new Action("プログラミング", "Good", []),
        new Action("トレーニング", "Good", []),
        new Action("掃除", "Good", []),
        new Action("数学", "Good", []),
        new Action("漫画", "Neautoral", []),
        new Action("アニメ", "Neautoral", []),
        new Action("映画", "Neautoral", []),
        new Action("ポケモン", "Neautoral", []),
        new Action("ぷよぷよ", "Bad", []),
        new Action("ネットサーフィン", "Bad", [])
    ];
    actions.map(a => new ActionElement(a))
        .forEach(e => document.querySelector("tbody")?.appendChild(e.tr));


    const virtueTimeElement = new VirtueTimeElement(actions);
    document.querySelector(".container")?.insertBefore(virtueTimeElement.h1, document.querySelector(".container>table"));
}