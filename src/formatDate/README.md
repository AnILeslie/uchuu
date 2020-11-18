# formatDate
## version: v0.0.1
## 参数：时间格式 yy:年，mm:月，dd:天，hh:小时，mn:分，ss:秒，ml:毫秒
## 文件列表
```
dateFormat-v0.0.1.js    --- 工具文件
test.html               --- 测试文件
```
# 使用
## 1、文件引入
```
<script src="dateFormat-v0.0.1.js"></script>
```
## 2、或者import
```
export { DateFormat };  // 取消注释
import { DateFormat } from "./dateFormat-v0.0.1.js";
```
## 3、引入后，JS代码块中使用
```
let date = new DateFormat();  // 时间格式化工具，不输入时间值，初始化为当天
console.log(`初始化当前时间，不指定格式：${date.getFormatDate()}`);
console.log(`去年此刻：${date.getFormatMoreAllNoSet(-1)}`);
console.log(`去年此刻（修改了初始化的时间值）：${date.getFormatMoreAll(-1)}---时间变为：${date.getFormatDate()}`);
console.log(`格式化时间：${date.getFormatDate("yy|mm|dd hh:mn:ss.ml")}`);
console.log(`后天：${date.getFormatMoreItemNoSet("dd", 2)}`);
console.log(`后天（修改了初始化的时间）：${date.getFormatMoreItem("dd", 2)}---时间变为：${date.getFormatDate()}`);
```
