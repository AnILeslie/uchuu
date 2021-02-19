"use strict";
/**
 * @class DateFormat && 时间格式化快捷工具 && 继承自Date，支持Date原生方法
 * @param 时间格式 yy|YY:年，MM:月，dd|DD:天，hh|HH:小时，mm:分，ss|SS:秒，ml:毫秒
 */

class DateFormat extends Date {
    constructor(dataValue = null) {
        dataValue ? super(dataValue) : super();
    }

    /**
     * @method getFormatDate && 获取格式化时间
     * @param {String} formatType 时间格式 && yy|YY:年，MM:月，dd|DD:天，hh|HH:小时，mm:分，ss|SS:秒，ml:毫秒
     * @returns {String} 格式化之后的时间
     */
    getFormatDate(formatType = "yy-MM-dd hh:mm:ss.ml") {
        return formatType.replace(/(yy)|(YY)|(MM)|(dd)|(DD)|(hh)|(HH)|(mm)|(ss)|(SS)|(ml)/g, e => {
            if (e == "yy") return this.getFullYear();
            if (e == "YY") return this.getFullYear();
            if (e == "MM") return (this.getMonth() + 1).toString().padStart(2, "0");
            if (e == "dd") return this.getDate().toString().padStart(2, "0");
            if (e == "DD") return this.getDate().toString().padStart(2, "0");
            if (e == "hh") return this.getHours().toString().padStart(2, "0");
            if (e == "HH") return this.getHours().toString().padStart(2, "0");
            if (e == "mm") return this.getMinutes().toString().padStart(2, "0");
            if (e == "ss") return this.getSeconds().toString().padStart(2, "0");
            if (e == "SS") return this.getSeconds().toString().padStart(2, "0");
            if (e == "ml") return this.getMilliseconds().toString().padStart(3, "0");
        });
    }

    /**
     * @method getFormatMoreAll && 对初始化的时间进行重新设置
     * @param {Number} year 年
     * @param {Number} month 月
     * @param {Number} days 日
     * @param {Number} hours 时
     * @param {Number} minutes 分
     * @param {Number} seconds 秒
     * @param {Number} milliseconds 毫秒
     * @param {String} formatType 时间格式 && yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒
     * @returns {String} 返回指定格式的时间字符串
     */
    getFormatMoreAll(year = 0, month = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, formatType = "yy-MM-dd hh:mm:ss") {
        this.nowDateSet(year, month, days, hours, minutes, seconds, milliseconds);
        return this.getFormatDate(formatType);
    }
    /** 类似getFormatMoreAll()，但不改变原始值 */
    getFormatMoreAllNoSet(year = 0, month = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, formatType = "yy-MM-dd hh:mm:ss") {
        this.nowDateSet(year, month, days, hours, minutes, seconds, milliseconds);
        let res = this.getFormatDate(formatType);
        this.nowDateSet(-year, -month, -days, -hours, -minutes, -seconds, -milliseconds);
        return res;
    }

    /**
     * @method getFormatMoreItem && 对初始化的时间进行重新设置
     * @param {String} type 设置的类型 && yy|YY:年，MM:月，dd|DD:天，hh|HH:小时，mm:分，ss|SS:秒，ml:毫秒
     * @param {Number} val 要增加或减少的值
     * @param {String} formatType 时间格式 && yy|YY:年，MM:月，dd|DD:天，hh|HH:小时，mm:分，ss|SS:秒，ml:毫秒 
     * @returns {String} 返回指定格式的时间字符串
     */
    getFormatMoreItem(type = "yy", val = 1, formatType = "yy-MM-dd hh:mm:ss") {
        this.nowDateSetItem(type, val);
        return this.getFormatDate(formatType);
    }
    /** 类似getFormatMoreItem()，但不改变原始值 */
    getFormatMoreItemNoSet(type = "yy", val = 1, formatType = "yy-MM-dd hh:mm:ss") {
        this.nowDateSetItem(type, val);
        let res = this.getFormatDate(formatType);
        this.nowDateSetItem(type, -val);
        return res;
    }

    /** 设置时间 */
    nowDateSet(year = 0, month = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        this.setFullYear(this.getFullYear() + year);
        this.setMonth(this.getMonth() + month);
        this.setDate(this.getDate() + days);
        this.setHours(this.getHours() + hours);
        this.setMinutes(this.getMinutes() + minutes);
        this.setSeconds(this.getSeconds() + seconds);
        this.setMilliseconds(this.getMilliseconds() + milliseconds);
    }

    /** 按类型设置时间 */
    nowDateSetItem(type = "yy", val = 1) {
        if (type == "yy") this.setFullYear(this.getFullYear() + val);
        if (type == "YY") this.setFullYear(this.getFullYear() + val);
        if (type == "MM") this.setMonth(this.getMonth() + val);
        if (type == "dd") this.setDate(this.getDate() + val);
        if (type == "DD") this.setDate(this.getDate() + val);
        if (type == "hh") this.setHours(this.getHours() + val);
        if (type == "HH") this.setHours(this.getHours() + val);
        if (type == "mm") this.setMinutes(this.getMinutes() + val);
        if (type == "ss") this.setSeconds(this.getSeconds() + val);
        if (type == "SS") this.setSeconds(this.getSeconds() + val);
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

// ES Module 模块导出
// export { DateFormat };