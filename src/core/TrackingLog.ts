export class TrackingLog {
    constructor(private _start: Date, private _end: Date) { }

    get start() { return this._start }
    get end() { return this._end }
}