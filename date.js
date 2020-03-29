
class S_Date {
    constructor () {
        this.weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    }

    now () { return new Date(); }

    currentYear () { return this.now().getFullYear(); }

    currentMonth () { return this.now().getMonth() + 1; }

    currentDate () { return this.now().getDate(); }

    currentDay () { return this.now().getDay(); }

    currentDayStr () {
        const day = this.currentDay();
        let weekday = 'unknow';
        this.weeks.forEach((item, index) => {
            if (day === index) { weekday = item; }
        });
        return weekday;
    }

    currentHours () { return this.now().getHours(); }

    currentMinutes () { return this.now().getMinutes(); }

    currentSeconds () { return this.now().getSeconds(); }

    currentTimes () { return this.now().getTime(); }

    addPreZero (n) { return String(n)[1] ? n : '0' + n; }

    // 格式化时间(Y-M-D)
    formatDates (d, splitor = '-') {
        const current = new Date(d);
        const year = current.getFullYear();
        const month = this.addPreZero(current.getMonth() + 1);
        const date = this.addPreZero(current.getDate());
        return [year, month, date].join(splitor);
    }

    // 格式化时间(Y-M-D H-m-s)
    formatTimes (d, splitor = '-') {
        const current = new Date(d);
        const year = current.getFullYear();
        const month = this.addPreZero(current.getMonth() + 1);
        const date = this.addPreZero(current.getDate());
        const hours = this.addPreZero(current.getHours());
        const minutes = this.addPreZero(current.getMinutes());
        const seconds = this.addPreZero(current.getSeconds());
        return [year, month, date].join(splitor) + ' ' + [hours, minutes, seconds].join(':');
    }
}

const d = new S_Date();
