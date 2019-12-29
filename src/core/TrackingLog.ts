import { Duration } from "./Duration";

export class TrackingLog {
    private _start: Date;
    private _end: Date | null;
    constructor(start: Date, end?: Date)
    constructor(start: string, end?: string)
    constructor(start: string | Date, end?: string | Date) {
        this._start = new Date(start);

        if(end) {
            this._end = new Date(end);
            return;
        }
        this._end = null;
    }

    get start() { return this._start }
    get end() { return this._end }

    get duration() {
        if(this._end) {
            return new Duration(this._start, this._end);
        } else {
            return new Duration(0);
        }
    }

    toJSON() {
        return {
            start: this._start,
            end: this._end,
        };
    }

    static from(object: any) {
        if(!object.start) {
            throw Error('object has no "start" property');
        }
        return new TrackingLog(object.start, object.end);
    }
}