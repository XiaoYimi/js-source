/************************************************************
 *   开发者: 晨风不可依米(筱依米)                             *
 *   wechat: chenfengbukeyimi                               *
 *   email: 2590856083@qq.com                               *
 *   功能  1. 字符首字母大写 capitalize()                     *
 *         2. 下划线命名法 转 驼峰命名法 underlineToHump()    *
 *         3. 驼峰命名法 转 下划线命名法 humpToUnderline()    *
 ************************************************************/

class S_String {
    constructor () {}

    // 首字母大写
    capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // 下划线命名法 转 驼峰命名法
    underlineToHump (str) {
        return str.replace(/_(\w)/g, (empty, letter) => {
            return letter ? letter.toUpperCase() : '';
        });
    }

    // 驼峰命名法 转 下划线命名法
    humpToUnderline (str) {
        return str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
    }
    
}

const s = new S_String();