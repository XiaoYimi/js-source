
/*********************************************
 *   开发者: 晨风不可依米(筱依米)              *
 *   wechat: chenfengbukeyimi                *
 *   email: 2590856083@qq.com                *
 *   功能  1. 校验对象为 Object               *
 *         2. 格式化对象为字符拼接(&)          *
 *         3. 格式化字符拼接(&)为对象          *
 *********************************************/



class S_Params {
    constructor () {}

    isObject (obj) {
        const desc = (Object.prototype.toString.call(obj)).split(' ')[1];
        const type = desc.slice(0, desc.indexOf(']'));
        return type === 'Object';
    }

    tip () {
        return console.log('obj of arguments is not an Object type value');
    }

    // 格式化对象类型数据为字符串拼接(&)
    encode (obj) {
        if (!this.isObject(obj)) { return this.tip(); }
        const res = [];
        const keys = Object.keys(obj);
        [...keys].forEach(item => { res.push(item + '=' + obj[item]); });
        return res.join('&');
    }

    // 格式化字符串拼接(&)为对象类型数据
    decode (str) {
        // (str 格式: key=value | key=value&key=value)
        const obj = {};
        str = str ? str : window.location.search.slice(1);
        const str_arr = str.split('&');
        if (str_arr.length && str_arr[0].indexOf('=') > -1) {
            str_arr.forEach(item => {
                const kv = item.split('=');
                obj[kv[0]] = kv[1];
            })
        }
        return obj;
    }


}

const params = new S_Params();