// 爬取豆瓣电影的数据和图片
var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");
var path = require("path");

var opt = {
	hostname: "localhost",
	path:"/douban.html",
	port:3000
}

http.get(opt,function(res){
	var html = "";
	var movies = [];

	res.setEncoding("utf-8");

	res.on("data",function(chunk) {
		html += chunk;
	});

	res.on("end",function() {
		var $ = cheerio.load(html);

		$(".item").each(function(){
			var picUrl = $(".pic img",this).attr("src");
			var movie = {
				title:$(".title",this).text(),
				star: $(".info .star .em",this).text(),
				link:$("a",this).attr("href"),
				picUrl:/^http/.test(picUrl)?picUrl:"http://localhost:3000/"+picUrl
			};
			downloadImg("img/",movie.picUrl);
			movies.push(movie);
		});
		console.log(movies);
		saveData("data/data.json",movies);
	})
}).on("error",function(err){
	console.log(err);
});

function saveData(path,movies) {
	fs.writeFile(path,JSON.stringify(movies,null,4),function(err) {
		if(err) {
			console.log(err);
		}
		console.log("save done");
	})
}

function downloadImg(imgDir,url) {
	console.log(url);
	http.get(url,function(res) {
		var data = "";
		res.setEncoding("binary");
		res.on("data",function(chunk) {
			data += chunk;
		});
		res.on("end",function(){
			fs.writeFile(imgDir+path.basename(url),data,"binary",function(err) {
				if(err) {
					console.log(err);
				}
				console.log("download done");
			})
		})
	}).on("error",function(err){
		console.log(err);
	})
}