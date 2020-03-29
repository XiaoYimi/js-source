
/************************************************************
 *   开发者: 晨风不可依米(筱依米)                             *
 *   wechat: chenfengbukeyimi                               *
 *   email: 2590856083@qq.com                               *
 *   功能  创建对象
 *         1. 工厂模式 factory()                    *
 *         2. 下划线命名法 转 驼峰命名法 underlineToHump()    *
 *         3. 驼峰命名法 转 下划线命名法 humpToUnderline()    *
 ************************************************************/


// 工厂模式--以人为例
// 特点: 解决一系列相似的对象的问题,但没有解决对象识别地问题.
function factory (name, age, sex, ...rest) {
    const obj = {};
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    rest.forEach(item => {
        for (const key in item) { obj[key] = item[key]; }
    })
    obj.getInfo = function () {
        let info = '';
        for (const key in obj) { typeof obj[key] === 'function' ? '' : info += key + ': ' + obj[key] + ', '; }
        return info.slice(0, -2);
    }
    return obj;
}

const man1 = factory('xiaoyimi', 25, 1, {money: 5, job: 'IT'}, {class: 3});
const man2 = factory('qinmutian', 23, 0, {money: 10, job: 'IT'}, {class: 3});
// console.log(man1); // { ... }
console.log(man1.__proto__ === man2.__proto__);  // true
console.log(man1.constructor === man2.constructor); // true
console.log(man1.getInfo === man2.getInfo); // false 

// 工厂模式所创建的对象,其构造器(Object)和原型对象(Object.prototype)都全等;
// 但每个实例的同名函数是不相等的,因为实例中包含不同的的 Function 实例.


// 构造函数模式--以动物为例
// 特点: 
//  需要 new 操作来创建对象
//  this 指向新建的对象
function Animal (type, name, from, ...rest) {
    this.type = type;
    this.name = name;
    this.from = from;
    rest.forEach(item => {
        for (const key in item) { this[key] = item[key]; }
    })
    this.getInfo = function () {
        let info = '';
        for (const key in this) { typeof this[key] === 'function' ? '' : info += key + ': ' + this[key] + ', '; }
        return info.slice(0, -2);
    }
}

const kj = new Animal('dog', '柯基犬', 'english', { color: 'white', old: 1 });
const ty = new Animal('dog', '田园犬', 'china', { color: 'yellow', old: 2 });
console.log(kj);  // Animal {...}
console.log(ty);  // Animal {...}
console.log(kj.constructor === ty.constructor);  // true
console.log(kj.__proto__ === ty.__proto__); // true
console.log(kj.getInfo === ty.getInfo);  // false

// 构造函数模式所 new 出来的实例,其构造器(Object)和原型对象(Object.prototype)都全等;
// 但每个实例的同名函数是不相等的,因为实例中包含不同的的 Function 实例.


// 原型模式--以动物为例
// 特点: 通过原型对象(prototype)来添加属性和方法,以达到每个实例都能共享属性(一改全改).
function Cat () {}
Cat.prototype.type = 'cat';
Cat.prototype.food = 'fish';
Cat.prototype.eat = function () { return 'The ' + this.type + '\'s food is ' + this.food; }
const dr = new Cat();
dr.name = '短耳猫';
const zr = new Cat();
zr.name = '折耳猫';
console.log(dr);
console.log(zr);
console.log(dr.constructor === zr.constructor);  // true
console.log(dr.__proto__ === zr.__proto__);  // true
console.log(dr.eat === zr.eat);  // true

// 原型模式所 new 出来的实例,其构造器(Object)和原型对象(Object.prototype),以及原型对象下的同名函数都全等;