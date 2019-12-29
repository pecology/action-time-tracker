import localForage from "localforage";
import { Action } from "./core/Action";

export class ActionRepository {
    async findAll() {
        const actionsJSON = await localForage.getItem('actions') as string;
        const actions =
            actionsJSON
                ? (JSON.parse(actionsJSON) as Array<any>).map(o => Action.from(o))
                : [];
        return actions;
    }

    async findByName(name: string) {
        const actions = await this.findAll();
        return actions.find(a => a.name === name);
    }

    async update(newAction: Action) {
        const actions = await this.findAll();
        const oldActionIndex = actions.findIndex(a => a.name === newAction.name);
        if (oldActionIndex < 0) {
            throw new Error(`Action "${newAction.name}" does not exist.`);
        }

        actions[oldActionIndex] = newAction;
        await localForage.setItem("actions", JSON.stringify(actions));
    }

    async insert(newAction: Action) {
        const actions = await this.findAll();
        const alreadyExists = actions.some(a => a.name === newAction.name)
        if (alreadyExists) {
            throw new Error(`Action "${newAction.name}" already exists.`);
        }

        actions.push(newAction);
        await localForage.setItem("actions", JSON.stringify(actions));
    }

    async insertAll(newActions: Array<Action>) {
        for (const action of newActions) {
            await this.insert(action);
        }
    }

    async delete(targetAction: Action) {
        const actions = await this.findAll();
        const targetActionIndex = actions.findIndex(a => a.name === targetAction.name);
        const notExists = targetActionIndex === -1;
        if (notExists) {
            throw new Error(`Action "${targetAction.name}" not exists.`);
        }

        actions.splice(targetActionIndex, 1);
        await localForage.setItem("actions", JSON.stringify(actions));
    }
}