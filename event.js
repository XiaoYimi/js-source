/*********************************************
 *   开发者: 晨风不可依米(筱依米)              *
 *   wechat: chenfengbukeyimi                *
 *   email: 2590856083@qq.com                *
 *   功能  1. 事件绑定 on                     *
 *         2. 事件解绑 off                    *
 *         3. 事件触发 trigger                *
 *********************************************/

class S_Event {
    constructor () {
        this._cache = {}
    }

    on (type, cb) {
        if (!this._cache[type]) { this._cache[type] = [] }
        let hasCB = false
        this._cache[type].forEach(func => {
            if (func.name === cb.name) { hasCB = true }
        })
        if (!hasCB) { this._cache[type].push(cb) }
    }

    off (type, cb) {
        if (!this._cache[type]) { return console.error('this is no define a function in this type of ' + type) }
        this._cache[type].forEach((func, index) => {
            if (func.name === cb.name) { this._cache[type].splice(index, 1) }
        })
    }

    trigger (type, data) {
       if (this._cache[type]) {
        this._cache[type].forEach(func => {
            func(data)
        })
       }
    }
}

const ev = new S_Event()
function func (data) {
    data = data ? data : {}
    data.name = data.name ? data.name : arguments.callee.name
    console.log(data)
}

// 绑定 clcik 事件
ev.on('click', func)

// 解绑 clcik 事件
// ev.off('click', func)

// 触发 clcik 事件,并执行回调 func
ev.trigger('click', { name: 'chenfengbukeyimi' })
