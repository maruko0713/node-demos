import koaRouter from 'koa-router';
import user from '../api/user';

export default(app) => {
	let router = koaRouter();
	app.use(router.routes());
	router.get('/',function*(next){
		yield this.render('index.html',{});
		yield next;
	});
	// 定义服务器端的api
	router.get("/api/user",user);
	router.get("*",function*(next){
		yield this.render('index.html',{});
		yield next;
	});
}