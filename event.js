/*********************************************
 *   开发者: 晨风不可依米(筱依米)              *
 *   wechat: chenfengbukeyimi                *
 *   email: 2590856083@qq.com                *
 *   功能: Vue 框架                           *
 *       1. 事件绑定 on                       *
 *       2. 事件解绑 off                      *
 *       3. 事件触发 trigger                  *
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
ev.on('click', func)
ev.on('click', func)
ev.trigger('click')
