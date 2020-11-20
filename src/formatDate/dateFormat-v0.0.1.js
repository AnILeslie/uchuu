"use strict";
/**
 * @class DateFormat && 时间格式化快捷工具 && 继承自Date，支持Date原生方法
 * @param 时间格式 yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒
 */

class DateFormat extends Date {
    constructor(dataValue = null) {
        dataValue ? super(dataValue) : super();
    }

    /**
     * @method getFormatDate && 获取格式化时间
     * @param {String} formatType 时间格式 && yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒
     * @returns {String} 格式化之后的时间
     */
    getFormatDate(formatType = "yy-mm-dd hh:mn:ss") {
        return formatType.replace(/(yy)|(mm)|(dd)|(hh)|(mn)|(ss)|(ml)/gi, e => {
            if (e == "yy") return this.getFullYear();
            if (e == "mm") return this.getMonth().toString().padStart(2, "0");
            if (e == "dd") return this.getDate().toString().padStart(2, "0");
            if (e == "hh") return this.getHours().toString().padStart(2, "0");
            if (e == "mn") return this.getMinutes().toString().padStart(2, "0");
            if (e == "ss") return this.getSeconds().toString().padStart(2, "0");
            if (e == "ml") return this.getMilliseconds().toString().padStart(3, "0");
        });
    }

    /**
     * @method getFormatMoreAll && 对初始化的时间进行重新设置
     * @param {*} yy 年
     * @param {*} mm 月
     * @param {*} dd 日
     * @param {*} hh 时
     * @param {*} mn 分
     * @param {*} ss 秒
     * @param {*} ml 毫秒
     * @param {String} formatType 时间格式 && yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒
     * @returns {String} 返回指定格式的时间字符串
     */
    getFormatMoreAll(yy = 0, mm = 0, dd = 0, hh = 0, mn = 0, ss = 0, ml = 0, formatType = "yy-mm-dd hh:mn:ss") {
        this.nowDateSet(yy, mm, dd, hh, mn, ss, ml);
        return this.getFormatDate(formatType);
    }
    /** 类似getFormatMoreAll()，但不改变原始值 */
    getFormatMoreAllNoSet(yy = 0, mm = 0, dd = 0, hh = 0, mn = 0, ss = 0, ml = 0, formatType = "yy-mm-dd hh:mn:ss") {
        this.nowDateSet(yy, mm, dd, hh, mn, ss, ml);
        let res = this.getFormatDate(formatType);
        this.nowDateSet(-yy, -mm, -dd, -hh, -mn, -ss, -ml);
        return res;
    }

    /**
     * @method getFormatMoreItem && 对初始化的时间进行重新设置
     * @param {String} type 设置的类型 && yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒
     * @param {Number} val 要增加或减少的值
     * @param {String} formatType 时间格式 && yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒 
     * @returns {String} 返回指定格式的时间字符串
     */
    getFormatMoreItem(type = "yy", val = 1, formatType = "yy-mm-dd hh:mn:ss") {
        this.nowDateSetItem(type, val);
        return this.getFormatDate(formatType);
    }
    /** 类似getFormatMoreItem()，但不改变原始值 */
    getFormatMoreItemNoSet(type = "yy", val = 1, formatType = "yy-mm-dd hh:mn:ss") {
        this.nowDateSetItem(type, val);
        let res = this.getFormatDate(formatType);
        this.nowDateSetItem(type, -val);
        return res;
    }

    /** 设置时间 */
    nowDateSet(yy = 0, mm = 0, dd = 0, hh = 0, mn = 0, ss = 0, ml = 0) {
        this.setFullYear(this.getFullYear() + yy);
        this.setMonth(this.getMonth() + mm);
        this.setDate(this.getDate() + dd);
        this.setHours(this.getHours() + hh);
        this.setMinutes(this.getMinutes() + mn);
        this.setSeconds(this.getSeconds() + ss);
        this.setMilliseconds(this.getMilliseconds() + ml);
    }

    /** 按类型设置时间 */
    nowDateSetItem(type = "yy", val = 1) {
        if (type == "yy") this.setFullYear(this.getFullYear() + val);
        if (type == "mm") this.setMonth(this.getMonth() + val);
        if (type == "dd") this.setDate(this.getDate() + val);
        if (type == "hh") this.setHours(this.getHours() + val);
        if (type == "mn") this.setMinutes(this.getMinutes() + val);
        if (type == "ss") this.setSeconds(this.getSeconds() + val);
        if (type == "ml") this.setMilliseconds(this.getMilliseconds() + val);
    }
}

// example(当前时间为：2020-10-17 20:32:37):
// let date = new DateFormat();  // 时间格式化工具
// console.log(date.getFormatDate());  // 2020-10-17 20:32:37
// console.log(date.getFormatMoreAll(-1));  // 2019-10-17 20:32:37
// console.log(date.getFormatMoreAllNoSet(-1));  //2018-10-17 20:32:37
// console.log(date.getFormatDate("yy|mm|dd"));  // 2019|10|17
// console.log(date.getFormatMoreItem("dd", 2));  // 2019-10-19 20:32:37
// console.log(date.getFormatMoreItemNoSet("dd", 2));  // 2019-10-21 20:32:37

// export { DateFormat };