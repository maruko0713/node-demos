# nodejs demos

锵锵锵锵！这个仓库里面是几个node的demo.
    
## 豆瓣网信息和图片的爬虫    
先运行一个本地的豆瓣吧！^_^    

```
wget http://labfile.oss.aliyuncs.com/courses/448/douban-server.tar.gz
```

```
tar zxvf douban-server.tar.gz
```

```
npm start
```

然后就可以在本地的3000端口看到一个本地的豆瓣网啦，我的spider.js就是针对这个网站进行的爬取，运行node spider.js 可以看到爬取信息和爬取情况的输出^_^

## 在线笔记
louNote 实现一个具备登录，注册和书写功能的在线笔记。
基于nodejs的express框架，mongoose模块，数据库为mongodb(这不废话吗啊哈哈哈哈)
   
## 漂流瓶
漂流瓶应用，可以给指定的性别的人发送漂流瓶，然后再随机捡起指定性别的漂流瓶。
数据库使用redis。
随机数生成使用node中的一个叫做node-uuid的库,它可以为我们生成一个唯一的id.
然后框架依然是万能的express啦～～～    
   
## 咩咩单词爬虫
这个是最近在做的一个叫做咩咩单词的web应用，爬取了扇贝单词的api,存储为json格式。   
也是用node实现的，模块选择了request模块.
