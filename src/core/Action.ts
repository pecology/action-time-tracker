import { Desirability, isDesirability } from "./Desirability"
import { TrackingLog } from "./TrackingLog";
import { Duration } from "./Duration";

export class Action {
    private _totalTime: Duration;
    constructor(private _name: string, private _desirability: Desirability, private _trackingLogs: Array<TrackingLog>) {
        this._totalTime = _trackingLogs
            .map(l => l.duration)
            .reduce((prev, curr) => prev.add(curr), new Duration(0));
    }

    get name() { return this._name; }
    get desirability() { return this._desirability; }
    get isActive() { return !!this.recentLog && !this.recentLog?.end; }

    private get recentLog() { return this._trackingLogs.length === 0 ? null : this._trackingLogs[this._trackingLogs.length - 1]; }
    private get startTime() { return this.isActive ? this.recentLog?.start : null; }

    start() {
        const newTrackingLog = new TrackingLog(new Date());
        this._trackingLogs.push(newTrackingLog);
    }

    stop() {
        if (this.isActive && this.startTime) {
            const newTrackingLog = new TrackingLog(this.startTime, new Date);
            this._trackingLogs[this._trackingLogs.length - 1] = newTrackingLog;
            this._totalTime = this._totalTime.add(newTrackingLog.duration);
        }
    }

    get elapsedTime() {
        if (this.isActive && this.startTime) {
            const currentDuration = new Duration(this.startTime, new Date())
            return this._totalTime.add(currentDuration);
        }
        return this._totalTime;
    }

    toJSON() {
        return {
            name: this._name,
            desirability: this._desirability,
            trackingLogs: this._trackingLogs
        };
    }

    static from(object: any) {
        if (!object.name || typeof object.name !== "string") {
            throw new Error('"name" property is invalid.');
        }
        if (!isDesirability(object.desirability)) {
            throw new Error('"desirability" property is invalid.');
        }

        if (!Array.isArray(object.trackingLogs)) {
            throw new Error('"trackingLogs" property is not Array.');
        }

        const trackingLogs = object.trackingLogs.map((o: any) => TrackingLog.from(o)) as Array<TrackingLog>;
        return new Action(object.name, object.desirability, trackingLogs);
    }

}