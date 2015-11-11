# Mock Server

## 本地安装

  - Windows: 安装 [node]（https://nodejs.org/）
  - Linux: 使用系统的包管理安装 nodejs
  - Mac: 先安装 [Homebrew](http://brew.sh/)，然后使用 `brew install node` 安装 node

不存在版本问题，node 0.12.0 及以上版本都可行。

## 运行

在项目文件夹下输入以下命令会自动安装 node_modules 并运行 mock_server

```
npm install
```

如果 node_modules 已经安装完毕，也可以输入下面的命令启动服务器


```
grunt mock
```

两个命令都是可以的。

运行后，会自动获取当前主机在局域网中的 ip 地址，比如，你当前局域网 ip 是 192.168.31.225，那么访问地址是 http://192.168.31.225:9040，接入同一局域
网的设备都可以通过这个地址访问。

退出 mock server，同时按住键盘上的

```
Ctrl + C
```

## Mock Api

api 文件写在 api 目录下，mock_server 会自动加载运行

假设现在存在一个 example.json 文件，一下两种情况请注意

- 如果是修改 example.json 中内容，则不需要重启 mock server
- 如果是新增一个 json 文件，需要重启 mock server



## 怎么写？

打开 api/example.json

看一下前面的例子即可了解

## 高级运用

看一下 /api/v1/example_function 和 /api/v1/example_array 这两个例子，可以通过调用内部占位符动态生成数据



###@int(min, max) 和 @integer(min, max)

在 min 和 max 之间生成一个随机整数，等价于 name|min-max: 1。

参数：

min 可选，缺省值 -9007199254740992
max 可选，缺省值 9007199254740992

###@natural(min, max)

在 min 和 max 之间生成一个随机正整数，等价于 name|min-max: 1。

参数：

min 可选，缺省值 0
max 可选，缺省值 9007199254740992

###@bool(min, max, cur) 和 @boolean(min, max, cur)

随机生成一个布尔值，值为 cur 的概率是 min / (min + max)，值为 !cur 的概率是 max / (min + max)，等价于 'name|min-max': cur。

参数：

min 可选，缺省值 1
max 可选，缺省值 1
cur 可选，省略时将随机产生一个 bool 值

###@float(min, max, dMin, dMax)

生成一个浮点数，整数部分大于等于 min 小于等于 max，小数部分保留 dMin 到 dMax 位，等价于 'name|1-100.1-10': 100。

参数：

min 可选，缺省值 -9007199254740992
max 可选，缺省值 9007199254740992
dMin 可选，缺省值 0
dMax 可选，缺省值 17

###@char(pool) 和 @character(pool)
从 pool 中随机选择一个字符作为返回的字符。

参数：

pool 预设字符，可选，预定义的 pool 有：

lower : 'abcdefghijklmnopqrstuvwxyz'
upper : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
number: '0123456789'
symbol: '!@#$%^&*()[]'
省略时的默认值是上述四种 pool 的组合。

示例：

@char() // 使用默认值
@char('lower')
@char('upper')
@char('number')
@char('symbol')
@char('alpha') // alpha = lower + upper
@char('ABCDefgh') // 自定义的 pool
@str(pool, min, max) 和 @string(pool, min, max)

从 pool 候选字符中，随机生成一个长度在 min 到 max 之间的字符串。

参数：

pool 同上
min 字符串的最小长度，可选，缺省值 0
max 字符串的最大长度，可选，缺省值 9007199254740992

###@capitalize(word)

将 word 首字母大写。

参数：

word 必选，被转换的字符串

###@upper(str)

将 str 中的字符转换为大写字母。

参数：

str 必选，被转换的字符串

###@lower(str)

将 str 中的字符转换为小写字母

参数：

str 必选，被转换的字符串

###@range(start, stop, step)

从 start 开始，每次自增 step，直到 stop 结束，生成一个数组。

参数：

start 开始位置，可选，缺省值 0
stop 结束位置，必选
step 自增步长，可选，缺省值 1

###@pickOne(arr)

从数组或字符串中随机返回其中一个字符或数组项。

参数：

arr 必选，字符串或数组

###@pickSome(arr, count, shuffle)

从数组中随机选取 count 个返回。

参数：

arr 必选，源数组
count 可选，返回的数组长度，缺省时将随机产生一个 0 到 arr.length - 1 之间的一个数
shuffle 可选，是否随机顺序，为 true 时返回数组项的顺序将可能与源数组项的顺序同


###@shuffle(arr)

随机打乱字符串或数组中的字符或数组项。

参数：

arr 必选，字符串或数组

###@randomDate(min, max)

从 min 到 max 之间随机产生一个日期。

参数：

min 可选，最小毫秒数，缺省值 0
max 可选，最大毫秒数，缺省值 (new Date()).getTime()
@formatDate(data, format)

格式化日期或时间。

参数：

date 必选，将由 moment 格式化为日期格式，然后调用其 format 方法
format 必选，返回的日期时间格式
注意：两个参数具体的传值可以查看 moment 官网

###@parseDate(...)

返回 moment(arguments)，所以参数请参考 moment 官网。

###@date(date, format)

格式化日期为指定的日期格式。

参数：

date 可选，缺省时将由 randomDate 随机生成一个
format 可选，缺省值 'YYYY-MM-DD'，其他格式参考 moment 官网

###@time(date, format)

格式化日期为指定的时间格式。

参数：

date 可选，缺省时将由 randomDate 随机生成一个
format 可选，缺省值 'HH:mm:ss'，其他格式参考 moment 官网

###@datetime(date, format)

格式化日期为指定的日期时间格式。

参数：

date 可选，缺省时将由 randomDate 随机生成一个
format 可选，缺省值 'YYYY-MM-DD HH:mm:ss'，其他格式参考 moment 官网

###@now(unit, format)

按照指定格式返回当前时间。

参数：

unit 可选，参考 moment 官网
format 可选，缺省值 'YYYY-MM-DD HH:mm:ss'，其他格式参考 moment 官网

###@color

生成随机颜色值，例如：'#080900'。

###@maleFirstName

返回一个随机男性名。

###@femaleFirstName

返回一个随机女性名。

###@lastName

返回一个随机姓。

###@name(middleName)

返回一个随机名字。

参数：

middleName 可选

###@word(min, max)

返回长度为 min 到 max 之间的一个随机单词。

参数：

min 可选
max 可选
两个参数都省略时，返回长度为 3 到 7 之间的一个由随机字符组成的单词。

只有一个参数时，返回该参数长度的随机单词。

###@sentence(min, max)

返回长度为 min 到 max 个随机单词组成的句子。

参数：

min 可选
max 可选
两个参数都省略时，返回由 3 到 7 个随机单词组成的句子（首个单词首字母大写）

只有一个参数时，返回该参数个数的随机单词组成的句子

###@title(min, max)

返回长度为 min 到 max 个随机单词组成的标题（每个单词的首字母大写）。

参数：

min 可选
max 可选
两个参数都省略时，返回由 3 到 7 个随机单词组成的标题。

只有一个参数时，返回该参数个数的随机单词组成的标题。

###@paragraph(min, max)

返回长度为 min 到 max 个随机句子组成的段落。

参数：

min 可选
max 可选
两个参数都省略时，返回由 3 到 7 个随机句子组成的段落。

只有一个参数时，返回该参数个数的随机句子组成的段落。

###@lorem

返回一个 lorem 随机单词。

###@lorems

返回一个 lorem 随机段落。

###@tld

返回一个随机域名后缀 ( com、net、me、org... )。

###@domain(tld)

返回一个随机域名。

参数

tld 可选，省略时将随机产生一个域名后缀。
###@email(domain)

返回一个随机邮箱。

参数

domain 可选，省略时将随机产生一个域名。
###@url

随机生成一个 URL。

###@ip

随机生成一个 IP 地址。

###@mobile

随机生成一个大陆的手机号码。

###@zip(len) 和 @zipcode(len)

随机生成一个邮政编码。

参数：

len 可选，邮政编码的长度，缺省值为 6
###@lang 和 @language

随机返回一个语言的名称。

###@d5

返回 1 到 5 之间的随机数。

###@d10

返回 1 到 10 之间的随机数。

###@d20

返回 1 到 20 之间的随机数。

###@d50

返回 1 到 50 之间的随机数。

###@d100

返回 1 到 100 之间的随机数。

###@d200

返回 1 到 200 之间的随机数。

###@d500

返回 1 到 500 之间的随机数。

###@d1000

返回 1 到 1000 之间的随机数。

###@guid

随机生成一个 GUID。

###@id

随机生成一个 ID。

###@formItem(keys)

返回提交的表单或 QueryString 中的项。如果 keys 为字符串，则返回单项数据；如果 keys 为数组，则返回数据项数组，其他类型将直接返回 keys。

参数：

keys 字符串或数组，要返回数据的键

###@fromFile(filepath)

返回指定文件中的内容，支持 JSON 和 YAML 格式文件。

参数：

filepath 字符串，文件的绝对或相对（相对项目的根目录）路径