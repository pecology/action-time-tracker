import { Desirability, isDesirability } from "./Desirability"
import { TrackingLog } from "./TrackingLog";
import { Duration } from "./Duration";

export class Action {
    private startDate?: Date;
    private _duration: Duration;
    constructor(private _name: string, private _desirability: Desirability, private _trackingLogs: Array<TrackingLog>) {
        if(_trackingLogs.length === 0) {
            this._duration = new Duration(0);
        } else {
            this._duration = _trackingLogs.map(l => l.duration).reduce((prev, curr) => prev.add(curr));
        }
    }

    get name() { return this._name; }
    get desirability() { return this._desirability; }
    get isActive() { return !!this.startDate }

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
        if (this.isActive && this.startDate) {
            const currentDuration = new Duration(this.startDate, new Date())
            return this._duration.add(currentDuration);
        }
        return this._duration;
    }

    toJSON() {
        return {
            name: this._name,
            desirability: this._desirability,
            trackingLogs: this._trackingLogs
        };
    }

    static from(object: any) {
        if(!object.name || typeof object.name !== "string") {
            throw new Error('"name" property is invalid.');
        }
        if(!isDesirability(object.desirability)) {
            throw new Error('"desirability" property is invalid.');
        }

        if(!Array.isArray(object.trackingLogs)) {
            throw new Error('"trackingLogs" property is not Array.');
        }

        const trackingLogs = object.trackingLogs.map((o: any) => TrackingLog.from(o)) as Array<TrackingLog>;
        return new Action(object.name, object.desirability, trackingLogs);
    }

}
