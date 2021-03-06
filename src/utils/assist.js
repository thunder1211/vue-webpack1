const pageScroll = (function () {
    const fn = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    let islock = false;

    return {
        lock: function () {
            if (islock) return;
            islock = true;
            document.addEventListener('touchmove', fn);
        },
        unlock: function () {
            islock = false;
            document.removeEventListener('touchmove', fn);
        }
    };
})();

const isColor = function (value) {
    const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
    const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

    return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

const getScrollview = function (el) {
    let currentNode = el;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

const checkInview = function (scrollView, el) {
    const contentHeight = scrollView === window ? document.body.offsetHeight : scrollView.offsetHeight;
    const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;

    const post = el.getBoundingClientRect().top - contentTop;
    const posb = post + el.offsetHeight;

    return (post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight);
};

const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className === '' ? cls : ele.className + ' ' + cls;
    }
};

const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};

// 浏览器信息
const Browser = function (userAgent) {
    var u = userAgent || navigator.userAgent
    var _this = this
    var match = {
        // 内核
        Trident: u.indexOf('Trident') > 0 || u.indexOf('NET CLR') > 0,
        Presto: u.indexOf('Presto') > 0,
        WebKit: u.indexOf('AppleWebKit') > 0,
        Gecko: u.indexOf('Gecko/') > 0,
        // 浏览器
        UC: u.indexOf('UC') > 0 || u.indexOf(' UBrowser') > 0,
        QQ: u.indexOf('QQBrowser') > 0,
        BaiDu: u.indexOf('Baidu') > 0 || u.indexOf('BIDUBrowser') > 0,
        Maxthon: u.indexOf('Maxthon') > 0,
        LBBROWSER: u.indexOf('LBBROWSER') > 0,
        SouGou: u.indexOf('MetaSr') > 0 || u.indexOf('Sogou') > 0,
        IE: u.indexOf('MSIE') > 0 || u.indexOf('Trident') > 0,
        Firefox: u.indexOf('Firefox') > 0,
        Opera: u.indexOf('Opera') > 0 || u.indexOf('OPR') > 0,
        Safari: u.indexOf('Safari') > 0,
        Chrome: u.indexOf('Chrome') > 0 || u.indexOf('CriOS') > 0,
        Wechat: u.indexOf('MicroMessenger') > 0,
        // 系统或平台
        Windows: u.indexOf('Windows') > 0,
        Mac: u.indexOf('Macintosh') > 0,
        Android: u.indexOf('Android') > 0 || u.indexOf('Adr') > 0,
        WP: u.indexOf('IEMobile') > 0,
        BlackBerry: u.indexOf('BlackBerry') > 0 || u.indexOf('RIM') > 0 || u.indexOf('BB') > 0,
        MeeGo: u.indexOf('MeeGo') > 0,
        Symbian: u.indexOf('Symbian') > 0,
        iOS: u.indexOf('like Mac OS X') > 0,
        iPhone: u.indexOf('iPh') > 0,
        iPad: u.indexOf('iPad') > 0,
        // 设备
        Mobile: u.indexOf('Mobi') > 0 || u.indexOf('iPh') > 0 || u.indexOf('480') > 0,
        Tablet: u.indexOf('Tablet') > 0 || u.indexOf('iPad') > 0 || u.indexOf('Nexus 7') > 0
    }
    // 修正
    if (match.Chrome) {
        match.Chrome = !(match.Opera + match.BaiDu + match.Maxthon + match.SouGou + match.UC + match.QQ + match.LBBROWSER)
    }
    if (match.Safari) {
        match.Safari = !(match.Chrome + match.Opera + match.BaiDu + match.Maxthon + match.SouGou + match.UC + match.QQ + match.LBBROWSER)
    }
    if (match.Mobile) {
        match.Mobile = !match.iPad
    }
    // 基本信息
    var hash = {
        engine: ['Trident', 'Presto', 'WebKit', 'Gecko'],
        browser: ['UC', 'QQ', 'BaiDu', 'Maxthon', 'SouGou', 'IE', 'Firefox', 'Opera', 'Safari', 'Chrome', 'LBBROWSER', 'Wechat'],
        os: ['Windows', 'Mac', 'Android', 'WP', 'BlackBerry', 'MeeGo', 'Symbian', 'iOS', 'iPhone', 'iPad'],
        device: ['Mobile', 'Tablet']
    }
    _this.device = 'PC'
    _this.language = (function () {
        var g = (navigator.browserLanguage || navigator.language).toLowerCase()
        return g === 'c' ? 'zh-cn' : g
    })()
    for (var s in hash) {
        for (var i = 0; i < hash[s].length; i++) {
            var value = hash[s][i]
            if (match[value]) {
                _this[s] = value
                break
            }
        }
    }
    // 版本信息
    var version = {
        'Chrome': function () {
            return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1')
        },
        'IE': function () {
            var v = u.replace(/^.*MSIE ([\d.]+).*$/, '$1')
            if (v === u) {
                v = u.replace(/^.*rv:([\d.]+).*$/, '$1')
            }
            return v !== u ? v : ''
        },
        'Firefox': function () {
            return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1')
        },
        'Safari': function () {
            return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
        },
        'Maxthon': function () {
            return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
        },
        'QQ': function () {
            return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
        },
        'BaiDu': function () {
            return u.replace(/^.*BIDUBrowser[\s/]([\d.]+).*$/, '$1')
        },
        'UC': function () {
            return u.replace(/^.*UBrowser\/([\d.]+).*$/, '$1')
        },
        'Wechat': function () {
            return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
        }
    }
    _this.version = ''
    if (version[_this.browser]) {
        _this.version = version[_this.browser]()
    }
}

// 时间格式化
const timeFormater = function (seconds) {
    var min = Math.floor(seconds / 60)
    var second = seconds % 60
    var hour = ''
    var newMin = ''
    var time = ''
    if (min > 60) {
        hour = Math.floor(min / 60)
        newMin = min % 60
    }
    if (second < 10) {
        second = '0' + second
    }
    if (min < 10) {
        min = '0' + min
    }
    time = hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second)
    return time
}

const jcookie = function (name, value, options) {
    if (typeof value !== 'undefined') { // name and value given, set cookie
        options = options || {}
        if (value === null) {
            value = ''
            options.expires = -1
        }
        var expires = ''
        if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
            var date
            if (typeof options.expires === 'number') {
                date = new Date()
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
            } else {
                date = options.expires
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : ''
        var domain = options.domain ? '; domain=' + options.domain : ''
        var secure = options.secure ? '; secure' : ''
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
    } else { // only name given, get cookie
        var cookieValue = null
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';')
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim()
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                }
            }
        }
        return cookieValue
    }
};

export {pageScroll, isColor, getScrollview, checkInview, addClass, removeClass, Browser, timeFormater, jcookie}
