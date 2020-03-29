/******************************************************
 *   开发者: 晨风不可依米(筱依米)                       *
 *   wechat: chenfengbukeyimi                         *
 *   email: 2590856083@qq.com                         *
 *   功能  1. 获取设备浏览器信息 getBrowserInfo()       *
 *         2. 进入全屏 enterFullScreen                 *
 *         3. 退出全屏 exitFullScreen                  *
 *         4. 禁用鼠标右键 banRightMenu()              *
 *         5. 启用鼠标右键 useRightMenu()              *
 *         6. 禁用复制功能 banCopy()                   *
 *         7. 启用复制功能 useCopy()                   *
 *         8. 禁用鼠标选取功能 banSelect()              *
 *         9. 启用鼠标选取功能 useSelect()              *
 ******************************************************/



class S_Device {
    constructor () {
        this.isBrowser = typeof window !== 'undefined';
        this.isWeex = typeof WXEnvironment !== 'undefined' && WXEnvironment.platform;
        this.otherPlatform = this.isWeex && WXEnvironment.platform.toLowerCase();
        this.UA = this.isBrowser && window.navigator.userAgent.toLowerCase();
        this.isIE = this.UA && /mise|trident/.test(this.UA);   
        this.isIE9 = this.UA && this.UA.indexOf('mise 9.0') > 0;
        this.isEdge = this.UA && this.UA.indexOf('edge/') > 0;
        this.isChrome = this.UA && /chrome\/\d+/.test(this.UA) && !this.isEdge;
        this.isAndroid = (this.UA && this.UA.indexOf('android') > 0) || (this.otherPlatform === 'android');
        this.isIOS = (this.UA && /iphone|ipad|ipod|ios/.test(this.UA)) || (this.otherPlatform === 'ios');
    }

    // 获取设备浏览器信息
    getBrowserInfo () {
        return this.UA.indexOf('msie') >= 0 ? {
            // IE < 11
            type: 'IE',
            version: Number(this.UA.match(/msie ([\d]+)/)[1])
        } : !!this.UA.match(/trident\/.+?rv:(([\d.]+))/) ? {
            // IE = 11
            type: 'IE',
            version: 11
        } : this.UA.indexOf('edge') >= 0 ? {
            type: 'Edge',
            version: Number(this.UA.match(/edge\/([\d]+)/)[1])
        } : this.UA.indexOf('firefox') >= 0 ? {
            // Firefox
            type: 'Firefox',
            version: Number(this.UA.match(/firefox\/([\d]+)/)[1])
        } : this.UA.indexOf('chrome') >= 0 ?  {
            // Chrome
            type: 'Chrome',
            version: Number(this.UA.match(/chrome\/([\d]+)/)[1])
        } : this.UA.indexOf('opera') >= 0 ? {
            // Opera
            type: 'Opera',
            version: Number(this.UA.match(/opera.([\d]+)/)[1])
        } : this.UA.indexOf('safari') >= 0 ? {
            // Safari
            type: 'Safari',
            version: Number(this.UA.match(/varsion\/([\d]+)/)[1])
        } : {
            // Other
            type: this.UA,
            version: -1
        };
    }
    

    // 进入全屏
    enterFullScreen () {
        const body = document.body;
        if (body === null) { console.log('unlook body of element') }
        body.webkitRequestFullScreen ? body.webkitRequestFullScreen() :
        body.mozRequestFullScreen ? body.mozRequestFullScreen() :
        body.msRequestFullScreen ? body.msRequestFullScreen() :
        body.requestFullScreen ? body.requestFullScreen() :
        alert('浏览器不支持全屏操作')
    }

    // 退出全屏
    exitFullScreen () {
        const parent = parent.document;
        parent.webkitCancelFullScreen ? parent.webkitCancelFullScreen() :
        parent.mozCancelFullScreen ? parent.mozCancelFullScreen() :
        body.cancelFullScreen ? body.cancelFullScreen() :
        body.msExitFullscreen ? body.msExitFullscreen() :
        alert('切换失败,可尝试 Esc 退出');
    }


    // 关闭功能(回调控制)
    closeFunction (ev) { return ev.returnValue = false; }

    // 添加监听函数
    addEL (ev, func) {
        return document.addEventListener ? document.addEventListener(ev, func) : attachEvent('on' + ev, func);
    }

    // 移除监听函数
    removeEL (ev, func) {
        return document.removeEventListener ? document.removeEventListener(ev, func) : detachEvent('on' + ev, func);
    }

    // 禁止鼠标右键
    banRightMenu () {
        return this.addEL('contextmenu', this.closeFunction);
    }

    // 启用鼠标右键
    useRightMenu () {
        return this.removeEL('contextmenu', this.closeFunction);
    }

    // 禁止鼠标复制 | Ctrl + C
    banCopy () {
        return this.addEL('copy', this.closeFunction);
    }

    // 启用鼠标复制 | Ctrl + C
    useCopy () {
        return this.removeEL('copy', this.closeFunction);
    }

    // 禁止鼠标选择
    banSelect () {
        return this.addEL('selectstart', this.closeFunction);
    }

    // 启用鼠标选择
    useSelect () {
        return this.removeEL('selectstart', this.closeFunction);
    }

    
}

const device = new S_Device();