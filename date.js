/**********************************************************
 *   开发者: 晨风不可依米(筱依米)                           *
 *   wechat: chenfengbukeyimi                             *
 *   email: 2590856083@qq.com                             *
 *   功能  1. 当前时间 now()                               *
 *         2. 当前年份 currentYear()                       *
 *         3. 当前月份 currentMonth()                      *
 *         4. 当前月份某天 currentDate()                   *
 *         5. 当前周几(数值) curentDay()                   *
 *         6. 当前周几(字符) currentDayStr()               *
 *         7. 当前时钟 currentHours()                      *
 *         8. 当前分钟 currentMinutes()                    *
 *         9. 当前秒钟 currentSeconds()                    *
 *         10. 当前时间戳 currentTimes()                   *
 *         11. 为个位数值添加前缀 '0' addZero()             *
 *         12. 格式化时间(Y-M-D) formatDates()             *
 *         13. 格式化时间(Y-M-D H-m-s) formatTimes()       *
 *                                                        *      
 *********************************************************/



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
