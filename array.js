

/*******************************************************
 *    开发者: 晨风不可依米 (wechat: chenfengbukeyimi)    *
 *                                                     *
 *    sorting: 对数组进行排序,并返回数组                 *
 *      JS 原生排序  =>  sort()                         *
 *      冒泡法排序  =>  bubbling()                      *
 *      选择法排序  =>  select()                        *
 *      插入法排序  =>  insert()                        *
 *      快速法排序  =>  quick()                         *
 *                                                     *
 *                                                     *
 *    unipid: 对数组进行去重,并返回数组                  *
 *       ES6 常用去重(Array.from, Set)  =>  es6()       *  
 *       ES6 new Set去重  =>  set()                    *
 *       ES6 includes 反向去重  =>  unincludes()        *
 *       ES5 常用去重(双for遍历)  =>  es5()             *
 *       Array indexOf 配合去重  =>  indexof()          *
 *                                                     *
 *                                                     *
 *    upset: 对数组顺序进行打乱,并返回数组                *
 *       随机数组下标值替换位置 => randomIndex()         *
 *                                                     *
 *                                                     *
 *   以下加强项                                         *
 *                                                     *
 *    数组迭代与归并方法                                 *
 *    Array.filter()                                   *
 *    Array.forEach()                                  *
 *    Array.reduce()                                   *
 *    Array.map()                                      *
 *    Array.some()                                     *
 *    Array.every()                                    *
 *                                                     *
 *                                                     *
 *    数组栈方法 (push, pop)                            *
 *    数组队列方法 (shift, unshift)                     *
 *    数组操作方法 (splice)                             *
 *    数组分割与拼接方法 (split, join)                   *
 *                                                     *
 *                                                     *
 *******************************************************/

class S_Array {

    constructor () {}

    isArray (arr) {
        return Array.isArray(arr);
    }

    tip () { return console.log('arr of arguments is not an array type value'); }
    
    asc (m, n) { return m - n; }

    desc (m, n) { return n - m; }

    // sort 排序
    sorting_sort (arr, isdesc = false) {
        if (!this.isArray(arr)) { return this.tip(); }
        return arr.sort(isdesc ? this.desc : this.asc);
    }

    // bubbling 排序(两两比较进行交换位置)
    sorting_bubbling (arr, isdesc = false) {
        if (!this.isArray(arr)) { return this.tip(); }
        for (let i=0; i<arr.length; i++) {
            for (let j=i+1; j<arr.length; j++) {
                if (arr[i] > arr[j]) { [arr[i], arr[j]] = [arr[j], arr[i]]; }
            }
        }
        return isdesc ? arr.reverse() : arr;
    }

    // select 排序(每轮中查找最小值索引,在轮次结束时进行交换位置)
    sorting_select (arr, isdesc = false) {
        if (!this.isArray(arr)) { return this.tip(); }
        for (let i=0; i<arr.length; i++) {
            let min_index = i;
            for (let j=i+1; j<arr.length; j++) {
                if (arr[min_index] > arr[j]) { min_index = j; }
            }
            [arr[i], arr[min_index]] = [arr[min_index], arr[i]];
        }
        return isdesc ? arr.reverse() : arr;
    }

    // insert 排序(在每一轮次[j]比较后一索引与前一索引值, 小于则交换位置)
    sort_insert (arr, isdesc = false) {
        if (!this.isArray(arr)) { return this.tip(); }
        for (let i=1; i<arr.length; i++) {
            for (let j=i; j>0; j--) {
                if (arr[j] < arr[j-1]) {
                    [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
                }
            }
        }
        return isdesc ? arr.reverse() : arr;
    }


    // quick 排序(可通过 isdesc 控制排序方向)
    sort_quick (arr, isdesc = false) {
        const narr = this._sort_quick(arr);
        return isdesc ? narr.reverse() : narr;
    }

    // quick 排序(查看数组中间值和索引,通过每轮次比较大小添加到中间值左|右边数组,使用递归方法再次处理)
    _sort_quick (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        if (arr.length <= 1) { return arr; }
        const middle_index = Math.floor(arr.length / 2);
        const middle_value = arr.splice(middle_index, 1)[0];
        const left = [], right = [];
        for (let i=0; i<arr.length; i++) {
            arr[i] > middle_value ? right.push(arr[i]) : left.push(arr[i]);
        }
        return [...this._sort_quick(left), middle_value, ...this._sort_quick(right)];
    }


    // 不彻底排序多维数组
    sorting_double (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        this.sorting_sort(arr);
        arr.forEach(item => {
            if (this.isArray(item)) {
                this.sorting_double(item);
            }
        });
        return arr;
    }

    
    // es6 去重(Array.from && Set)
    unipid_es6 (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        return Array.from(new Set(arr));
    }

    // set 去重(数组解构 && Set)
    unipid_set (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        return [...(new Set(arr))];
    }

    // includes 反向去重(空数组 && includes)
    unipid_includes (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        const res = [];
        for (let i=0; i<arr.length; i++) {
            if (!res.includes(arr[i])) { res.push(arr[i]); }
        }
        return res;
    }

    // indexof 去重(空数组 && indexOf)
    unipid_indexof (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        const res = [];
        for (let i=0; i<arr.length; i++) {
            if (res.indexOf(arr[i]) === -1) { res.push(arr[i]); }
        }
        return res;
    }

    // 双 for 遍历(每轮次中查找同等值,找到就移除)
    unipid_es5 (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        for (let i=0; i<arr.length; i++) {
            for (let j=i+1; j<arr.length; j++) {
                if (arr[i] === arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }


    // 数组打乱(Math.random)
    upset_random (arr) {
        if (!this.isArray(arr)) { return this.tip(); }
        const len = arr.length;
        for (let i=0; i<len; i++) {
            const m = parseInt(Math.random() * len);
            const n = parseInt(Math.random() * len);
            const [min, max] = m > n ? [n, m] : [m, n];
            [arr[m], arr[n]] = [arr[n], arr[m]];
        }
        return arr;
    }

    // 数组分组(byte 组内个数)
    split_group (arr, byte) {
        const narr = [];
        const len = arr.length;
        if (len <= byte) { return narr.push(arr); }
        const times = Math.ceil(len / byte)
        for (let i=0; i<times; i++) {
            i !== times ? narr.push(arr.slice(i * byte, (i+1) * byte)) : narr.push(arr.slice(i * byte));
        }
        return narr;
    }



}

const arr = new S_Array();