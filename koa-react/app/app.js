import koa from 'koa';
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import staticServer from "koa-static";
import nunjucks from "./middlewares/koa-nunjucks";
import routers from "./routers";
// 创建koa应用
const app = koa();
app.use(nunjucks(__dirname+"/views",{
	noCache:process.env.NODE_ENV === "production",
	watch: !process.env.NODE_ENV === "production"
}));
//  配置静态文件地址
app.use(staticServer(__dirname+"/public"));
// session
app.keys = ["some secret hurr"];
app.use(session(app));
// body parser
app.use(bodyParser());
// app.use 方法用于添加中间件
// 中间件必须是geneatoer函数
routers(app);
app.listen(8080);
