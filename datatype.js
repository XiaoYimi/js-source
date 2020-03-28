/*********************************************
 *   开发者: 晨风不可依米(筱依米)              *
 *   wechat: chenfengbukeyimi                *
 *   email: 2590856083@qq.com                *
 *   功能  1. 数据类型获取 get                 *
 *         2. 数据类型怕判断 check             *
 *********************************************/


class S_DataType {
    constructor () {
    this.datatype = [
        'String', 'Number', 'boolean', 'Null', 'Undefined', 'Symbol',
        'Object', 'Array', 'Function', 'RegExp'
    ];
    }

    get (data) {
        if (!data && data !== '' && data !== undefined && data !== null) { return console.log('必传参数 data'); }
        const desc = Object.prototype.toString.call(data);
        return desc.substring(desc.indexOf(' ') + 1, desc.length - 1);
    }

    check (data, datatype) {
        return this.get(data) === datatype;
    }
}


const d = new S_DataType();
console.log(d)



