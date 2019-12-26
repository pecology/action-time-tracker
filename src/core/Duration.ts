export class Duration {
    private _msec: number;

    constructor(msec: number);
    constructor(date1: Date, date2: Date);
    constructor(msecOrDate: number | Date, date2?: Date) {
        if (typeof msecOrDate === "number") {
            this._msec = msecOrDate;
            return;
        }
        if (date2) {
            this._msec = date2.getTime() - msecOrDate.getTime();
            return;
        }
        this._msec = 0;
    }

    get msec() { return this._msec; }

    add(msec: number): Duration;
    add(duration: Duration): Duration;
    add(msecOrDuration: number | Duration) {
        if (typeof msecOrDuration === "number") {
            const msec = msecOrDuration;
            return new Duration(this._msec + msec);
        };
        const duration = msecOrDuration
        return new Duration(this._msec + duration._msec);
    }

    subtract(msec: number): Duration;
    subtract(duration: Duration): Duration;
    subtract(msecOrDuration: number | Duration) {
        if (typeof msecOrDuration === "number") {
            const msec = msecOrDuration;
            return new Duration(this._msec - msec);
        };
        const duration = msecOrDuration
        return new Duration(this._msec - duration._msec);
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