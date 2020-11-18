# JavaScriptLib
JavaScript工具库
## formatDate(v0.0.1)
日期格式化工具，对Date进行扩展
### 使用
```
<script src="dateFormat-v0.0.1.js"></script>
```

```
let date = new DateFormat();  // 时间格式化工具，不输入时间值，初始化为当天
console.log(`初始化当前时间，不指定格式：${date.getFormatDate()}`);
console.log(`去年此刻：${date.getFormatMoreAllNoSet(-1)}`);
console.log(`去年此刻（修改了初始化的时间值）：${date.getFormatMoreAll(-1)}---时间变为：${date.getFormatDate()}`);
console.log(`格式化时间：${date.getFormatDate("yy|mm|dd hh:mn:ss.ml")}`);
console.log(`后天：${date.getFormatMoreItemNoSet("dd", 2)}`);
console.log(`后天（修改了初始化的时间）：${date.getFormatMoreItem("dd", 2)}---时间变为：${date.getFormatDate()}`);
```
