import Vue from "./lib/vue.esm.browser.min.js";
import "./base.less";

// 值集
const valueAll = {
    // 类型
    industry: [
        { key: "1", value: "机构编制" },
        { key: "2", value: "外交" },
        { key: "3", value: "教育" },
        { key: "4", value: "公安" },
        { key: "5", value: "民政" },
        { key: "6", value: "司法" },
        { key: "7", value: "交通运输" },
        { key: "8", value: "文化" },
        { key: "9", value: "工商" },
        { key: "A", value: "旅游局" },
        { key: "B", value: "宗教事务管理" },
        { key: "C", value: "全国总工会" },
        { key: "D", value: "人民解放军总后勤部" },
        { key: "E", value: "省级人民政府" },
        { key: "F", value: "地、市（设区）级人民政府" },
        { key: "G", value: "区、县级人民政府" },
        { key: "Y", value: "其他" },
    ],
    // 类别
    category: {
        1: [
            { key: "1", value: "机关" },
            { key: "2", value: "事业单位" },
            { key: "3", value: "中央编办..." },
            { key: "4", value: "其他" },
        ],
        2: [{ key: "1", value: "外交" }],
        3: [{ key: "1", value: "教育" }],
        4: [{ key: "1", value: "公安" }],
        5: [
            { key: "1", value: "社会团体" },
            { key: "2", value: "民办非企业单位" },
            { key: "3", value: "基金会" },
            { key: "4", value: "其他" },
        ],
        6: [{ key: "1", value: "司法" }],
        7: [{ key: "1", value: "交通运输" }],
        8: [{ key: "1", value: "文化" }],
        9: [
            { key: "1", value: "企业" },
            { key: "2", value: "个体工商户" },
            { key: "3", value: "农民专业合作社" },
            { key: "4", value: "其他" },
        ],
        A: [{ key: "1", value: "旅游局" }],
        B: [{ key: "1", value: "宗教事务管理" }],
        C: [{ key: "1", value: "全国总工会" }],
        D: [{ key: "1", value: "人民解放军总后勤部" }],
        E: [{ key: "1", value: "省级人民政府" }],
        F: [{ key: "1", value: "地、市（社区）级人民政府" }],
        G: [{ key: "1", value: "区、县级人民政府" }],
        Y: [{ key: "1", value: "其他" }],
    },
    // 城市码
    city: [
        { key: "110000", value: "北京市" },
        { key: "110108", value: "北京市海淀区" },
        { key: "120000", value: "天津市" },
        { key: "330100", value: "杭州市" },
        { key: "130200", value: "唐山市" },
        { key: "310000", value: "上海市" },
        { key: "440300", value: "深圳市" },
    ],
    // 统一社会信用代码，码表
    codeKeyValue: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        G: 16,
        H: 17,
        J: 18,
        K: 19,
        L: 20,
        M: 21,
        N: 22,
        P: 23,
        Q: 24,
        R: 25,
        T: 26,
        U: 27,
        W: 28,
        X: 29,
        Y: 30,
    },
    // 组织机构代码码表
    codeKeyValueOrganization: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        G: 16,
        H: 17,
        I: 18, // 统一社会信用代码不使用
        J: 19,
        K: 20,
        L: 21,
        M: 22,
        N: 23,
        O: 24, // 统一社会信用代码不使用
        P: 25,
        Q: 26,
        R: 27,
        S: 28, // 统一社会信用代码不使用
        T: 29,
        U: 30,
        V: 31, // 统一社会信用代码不使用
        W: 32,
        X: 33,
        Y: 34,
        Z: 35, // 统一社会信用代码不使用
    },
    // 统一社会信用代码，codeKeyValue位置加权
    locakWeight: [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28],
    // 组织机构代码，codeKeyValueOrganization位置加权
    localWeightOrganization: [3, 7, 9, 10, 5, 8, 4, 2],
};

// 内容区域
Vue.component("main-box", {
    data() {
        return {
            // 第一位默认值
            positionOne: "9",
            // 第二位默认取值
            positionTwo: "1",
            // 3-8位默认取值
            positionThree: "110000",
            // 组织机构代码
            positionFour: "",
            // 结果
            result: "",
            industry: valueAll.industry,
            category: valueAll.category,
            city: valueAll.city,
        };
    },
    methods: {
        // 随机生成组织机构代码
        roundXudm() {
            this.positionFour = this.createOrganization();
            this.getCode();
        },

        // 根据输入生成组织机构代码
        getByInput() {
            let oz = this.inputCheck(this.positionFour);
            if (!oz[0]) return (this.result = oz[1]);
            this.getCode();
        },

        // 组织机构代码生成
        getCode() {
            // 1. 将输入拼接为统一社会信用代码的前17位
            let dm17 =
                this.positionOne +
                this.positionTwo +
                this.positionThree +
                this.positionFour;
            // 2. 17位字符转为对应的数值
            let cCi = new Array(17);
            for (let i = 0; i < 17; i++) {
                cCi[i] = valueAll.codeKeyValue[dm17.substr(i, 1)];
            }
            // 3. 计算级数之和
            let cwSUM = 0;
            for (let i = 0; i < 17; i++) {
                cwSUM = cwSUM + cCi[i] * valueAll.locakWeight[i];
            }
            // 4. 获取校验位
            let getFinalChar = 31 - (cwSUM % 31);
            // 余数为31时，校验位置为0
            getFinalChar = getFinalChar === 31 ? 0 : getFinalChar;
            // 5. 生成最终结果
            this.result = dm17 + this.findKey(valueAll.codeKeyValue, getFinalChar);
        },

        // 查找值对应的key
        findKey(obj, value, compare = (a, b) => a === b) {
            return Object.keys(obj).find((k) => compare(obj[k], value));
        },

        // 获取随机数
        randomNum(minNum, maxNum) {
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        },

        // 组织机构代码合法性校验
        inputCheck(value) {
            if (value.length !== 9) return [false, "组织机构代码长度有误！"];
            let organization = value.substr(0, 8);
            let cCi = new Array(8);
            for (let i = 0; i < 8; i++) {
                cCi[i] = valueAll.codeKeyValueOrganization[organization.substr(i, 1)];
                if (cCi === undefined) return [false, "组织机构代码非法！"];
                if (
                    cCi[i] === 18 ||
                    cCi[i] === 24 ||
                    cCi[i] === 28 ||
                    cCi[i] === 31 ||
                    cCi[i] === 35
                )
                    return [false, "组织机构代码含IOSVZ，无法生成统一社会信用代码！"];
            }
            let cwSUM = 0;

            for (let i = 0; i < 8; i++) {
                cwSUM = cwSUM + cCi[i] * valueAll.localWeightOrganization[i];
            }
            let getFinalChar = 11 - (cwSUM % 11);
            if (getFinalChar === 10) {
                organization += "X";
            } else if (getFinalChar == 11) {
                organization += "0";
            } else {
                organization += getFinalChar;
            }

            if (organization === value) return [true, "success"];
            return [false, "组织机构代码校验失败！"];
        },

        // 生成组织机构代码
        createOrganization() {
            let organization = "";
            for (let i = 0; i < 8; i++) {
                let item = this.randomNum(0, 35);
                if (
                    item === 18 ||
                    item === 24 ||
                    item === 28 ||
                    item === 31 ||
                    item === 35
                )
                    item = item - 1;
                organization += this.findKey(valueAll.codeKeyValueOrganization, item);
            }
            let cCi = new Array(8);
            for (let i = 0; i < 8; i++) {
                cCi[i] = valueAll.codeKeyValueOrganization[organization.substr(i, 1)];
            }
            let cwSUM = 0;
            for (let i = 0; i < 8; i++) {
                cwSUM = cwSUM + cCi[i] * valueAll.localWeightOrganization[i];
            }
            let getFinalChar = 11 - (cwSUM % 11);
            if (getFinalChar === 10) {
                organization += "X";
            } else if (getFinalChar == 11) {
                organization += "0";
            } else {
                organization += getFinalChar;
            }
            return organization;
        },
    },
    watch: {
        positionOne() {
            this.positionTwo = "1";
        },
    },
    template: `
        <div class="main">
            <div class="item cc-display">
                <div class="text ec-display">请选择行业：</div>
                <div class="s-item selected border-none">
                    <select v-model="positionOne">
                        <option v-for="(item, index) in industry" :value="item.key">{{item.value}}</option>
                    </select>
                </div>
            </div>
            <div class="item cc-display">
                <div class="text ec-display">请选择类别：</div>
                <div class="s-item selected border-none">
                    <select v-model="positionTwo">
                        <option v-for="(item, index) in category[positionOne]" :value="item.key">{{item.value}}</option>
                    </select>
                </div>
            </div>
            <div class="item cc-display">
                <div class="text ec-display">请选择城市：</div>
                <div class="s-item selected border-none">
                    <select v-model="positionThree">
                        <option v-for="(item, index) in city" :value="item.key">{{item.value}}</option>
                    </select>
                </div>
            </div>
            <div class="item cc-display">
                <div class="text ec-display">组织机构代码：</div>
                <div class="s-item">
                    <input type="text" v-model="positionFour" class="s-input border-none" />
                </div>
            </div>
            <div class="item cc-display">
                <div class="text ec-display">结果输出：</div>
                <div class="s-item result cc-display">
                    {{result}}
                </div>
            </div>
            <div class="item cc-display">
                <button @click="roundXudm">随机</button>
                <button @click="getByInput" style="margin-left:10px;">生成</button>
            </div>
        </div>
    `,
});

// Vue 应用
new Vue({
    el: "#app",
    data: {
        title: "统一社会信用代码生成器",
    },
});
