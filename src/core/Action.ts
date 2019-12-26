import { Desirability } from "./Desirability"
import { TrackingLog } from "./TrackingLog";
import { Duration } from "./Duration";

export class Action {
    private startDate?: Date;
    private _duration: Duration;
    constructor(private _name: string, private _desirability: Desirability, private _trackingLogs: Array<TrackingLog>) {
        this._duration = new Duration(0);
    }

    get name() { return this._name; }
    get desirability() { return this._desirability; }
    get isStart() { return !!this.startDate }

    start() {
        this.startDate = new Date();
    }
    stop() {
        if (this.startDate) {
            this._trackingLogs.push(new TrackingLog(this.startDate, new Date()))
            this._duration = this.elapsedTime;
            this.startDate = undefined;
        }
    }

    get elapsedTime() {
        if (this.isStart && this.startDate) {
            const currentDuration = new Duration(this.startDate, new Date())
            return this._duration.add(currentDuration);
        }
        return this._duration;
    }

}
