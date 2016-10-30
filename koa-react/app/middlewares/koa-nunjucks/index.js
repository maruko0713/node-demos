import nunjucks from "nunjucks";

export default(path,opts) => {
	let env = nunjucks.configure(path,opts);
	return function* (next) {
		let self = this;
		this.render = (view, ctx) => {
			return new Promise((resolve,reject)=>{
				nunjucks.render(view,ctx,(err,res)=>{
					if(err) {
						return reject(err);
					} 
					self.body = res;
					resolve();
				});
			});
		}
		yield next;
	}
}