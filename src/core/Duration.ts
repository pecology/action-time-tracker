export class Duration {
    private _msec: number;

    constructor(msec: number);
    constructor(fromDate: Date, toDate: Date);
    constructor(msecOrFromDate: number | Date, toDate?: Date) {
        if (typeof msecOrFromDate === "number") {
            this._msec = msecOrFromDate;
            return;
        }
        
        if (toDate) {
            this._msec = toDate.getTime() - msecOrFromDate.getTime();
            return;
        }

        this._msec = 0;
    }

    get msec() { return this._msec; }

    add(msec: number): Duration;
    add(duration: Duration): Duration;
    add(msecOrDuration: number | Duration) {
        const addMsec = typeof msecOrDuration === "number" ? msecOrDuration : msecOrDuration._msec;
        return new Duration(this._msec + addMsec);
    }

    subtract(msec: number): Duration;
    subtract(duration: Duration): Duration;
    subtract(msecOrDuration: number | Duration) {
        const subtractMsec = typeof msecOrDuration === "number" ? msecOrDuration : msecOrDuration._msec;
        return this.add(-subtractMsec);
    }

    toString() {
        const sign = this._msec >= 0 ? "" : "-";

        const absMsec = Math.abs(this._msec);
        const hour = Math.floor(absMsec / (1000 * 60 * 60));
        const minute = Math.floor((absMsec % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((absMsec % (1000 * 60)) / 1000);
        const msec = absMsec % 1000;
        return `${sign}${this.fillZero(hour)}:${this.fillZero(minute)}:${this.fillZero(second)}:${this.fillZero(msec, 3)}`;
        //return `${this.fillZero(hour)}:${this.fillZero(minute)}:${this.fillZero(second)}`;
    }

    private fillZero(num: number, digit: number = 2) {
        return ("0".repeat(digit) + num.toString()).slice(-digit);
    }
}