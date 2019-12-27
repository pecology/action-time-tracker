import { Duration } from "./Duration";

export class TrackingLog {
    private _start: Date;
    private _end: Date;
    constructor(start: Date, end: Date)
    constructor(start: string, end: string)
    constructor(start: string | Date, end: string | Date) {
        this._start = new Date(start);
        this._end = new Date(end);
    }

    get start() { return this._start }
    get end() { return this._end }

    get duration() {return new Duration(this._start, this._end)}

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
        if(!object.end) {
            throw Error('object has no "end" property');
        }
        return new TrackingLog(object.start, object.end);
    }
}