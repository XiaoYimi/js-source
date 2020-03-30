
/************************************************************
 *   开发者: 晨风不可依米(筱依米)                             *
 *   wechat: chenfengbukeyimi                               *
 *   email: 2590856083@qq.com                               *
 *   功能  创建对象
 *         1. 工厂模式 factory()                             *
 *         2. 构造函数模式 new Animal()                      *
 *         3. 原型模式 new Cat()                             *
 *         4.
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
const man2 = factory('qinmutian', 23, 0, {money: 10, job: 'PE'}, {class: 3});
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

// 构造函数模式所 new 出来的实例,其构造器(Animal)和原型对象(Animal.prototype)都全等;
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

// 原型模式所 new 出来的实例,其构造器(Cat)和原型对象(Cat.prototype),以及原型对象下的同名函数(getInfo)都全等;
// 原型对象下的同名函数之所以会全等,是因为指向同一个引用,当该同名函数被改写,其它实例下的同名函数也会受其影响.


// 构造原型组合模式--以笔为例
// 特点: 
//  结合构造函数模式定义实例属性，原型模式定义原型(共享)属性和方法
//  节省内存(体现在原型的属性和方法指向同一引用)


function Pen (name, makings, ...rest) {
    this.name = name;
    this.makings = makings;
    rest.forEach(item => {
        for (const key in item) { this[key] = item[key]; }
    })
    this.needMakings = function () { return this.makings; }
}

Pen.prototype.type = 'pen';
Pen.prototype.write = function () { return '使用' + this.name + '书写文本'; }

const gb = new Pen('钢笔', '黑炭墨水', {price: 2.5});
const qb = new Pen('铅笔', '石墨笔芯', {price: 0.5});
console.log(gb);
console.log(qb);
console.log(gb.constructor === qb.constructor);  // true
console.log(gb.__proto__ === qb.__proto__);  // true
console.log(gb.needMakings === qb.needMakings);  // false (实例方法)
console.log(gb.write === qb.write);  // true  (原型方法)

// 构造原型组合模式所 new 出来的实例,其构造器(Pen)和原型对象(Pen.prototype)都全等;
// 但每个实例的同名函数是不一定相等的;因为实例方法为不同的的 Function 实例,原型方法的指向都是同一引用.


// 动态原型模式--以域为例
// 特点: 在实例化对象内部初始化某些原型的属性和方法

function Fish (name, price) {
    this.name = name;
    this.price = price;
    this.getPrice = function () { return this.price; }
    if (typeof this.getInfo != 'function') {
        arguments.callee.prototype.getInfo = function () { return this.name; }
    }
}

const jy = new Fish('金鱼', 2500);
const my = new Fish('墨鱼', 1000);
console.log(jy);
console.log(my);
console.log(jy.constructor === my.constructor);  // true
console.log(jy.__proto__ === my.__proto__);  // true
console.log(jy.getPrice === my.getPrice);  // false (实例方法)
console.log(jy.getInfo === my.getInfo);  // true  (原型方法)

// 动态原型模式所 new 出来的实例,其构造器(Fish)和原型对象(Fish.prototype)都全等;
// 但每个实例的同名函数是不一定相等的;因为实例方法为不同的的 Function 实例,原型方法的指向都是同一引用.


// 寄生构造函数--以人为例
// 特点:
//  1. 与工厂模式一模一样的内部结构
//  2. 通过 new 操作来创建实例对象

function Factory (name, age) {
    const obj = {};
    obj.name = name;
    obj.age = age;
    const n = Number(age);
    if (n < 18) {
        obj.type = '未成年人';
    } else if (n > 18 && n < 24){
        obj.type = '青少年人';
    } else if (n > 24 && n < 60){
        obj.type = '壮年人';
    } else if (n > 60){
        obj.type = '老年人';
    }
    obj.info = function () {
        const res = [];
        Object.keys(obj).forEach(key => {
            typeof obj[key] !== 'function' ? res.push(obj[key]) : '';
        });
        return res.join(',');
    }
    return obj;
}


const c = new Factory('穆晨风', 15);
const q = new Factory('玄道子', 25);
console.log(c);
console.log(q);
console.log(c.constructor === q.constructor);  // true
console.log(c.__proto__ === q.__proto__);  // true
console.log(c.info === q.info);  // false (实例方法)

// 构造函数模式所 new 出来的实例,其构造器(Animal)和原型对象(Animal.prototype)都全等;
// 但每个实例的同名函数是不相等的,因为实例中包含不同的的 Function 实例.



// 稳妥构造函数模式--以狗为例
// 特点:
//  禁用 this 和 new 
//  对外提供方法访问内部数据

function Safe (name, food) {
    const obj = {};
    obj.name = name;
    obj.food = food;
    return obj;
}

const safe = Safe('dog', 'bone');

















// 理解原型对象

// 当创建一个新函数(FN),会自动根据特定规则为新函数添加属性 prototype, 而属性 prototype 会指向原型对象 FN.prototype;
// 而原型对象 FN.prototype 会自动获得属性 constructor, 且指向新函数添加的属性 prototype 所在函数的指针.

// 构造函数  FN() => { prototype, example-attr... }
// 原型对象  FN.prototype  =>  { constructor, prototype-attr... }
// 实例      new FN()  =>  { __proto__, example_attr... } 

// 构造函数|原型对象|实例三者间的各自指向
// FN.prototype => FN.prototype(原型对象)
// FN.prototype.constructor => FN
// (new FN()).__proto__  => FN.prototype


// 原型链上属性的查找
// 1. 当前函数作用域的实例属性
// 2. 当前函数作用域的原型属性
// 3. 来自上层作用域的实例属性
// 4. 来自上层作用域的原型属性
// 5. ...
// 6. null


// 检测是否实例属性或原型属性(hasOwnProperty() && in)
// hasOwnProperty() 来自实例属性返回 true, 原型属性 返回 false
// in 检测实例对象是否存在某属性
function isInstanceAttr (instance, attr) {
    return instance.hasOwnProperty(attr) && (attr in instance);
}

// Object.keys()  获取对象上可枚举的实例属性(不包括原型属性,实例函数)
