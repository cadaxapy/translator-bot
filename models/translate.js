
/*var translate = require('node-google-translate-skidz');
=======
var translate = require('node-google-translate-skidz');
>>>>>>> 077ab7111640782cf839587244d5b5f82f0c4243

function translator(text,s,t)
{
var promise=new Promise(function(resolve,reject){
translate({
  text: text,
  source: s,
  target: t
}, function(result) {
  resolve(result);
});

});
return promise;
};
<<<<<<< HEAD
translator("я тебя люблю","ru","en").then(result=>{
	console.log(result);
})
module.exports=translator;*/
var KEY="trnsl.1.1.20160909T080552Z.6397520b54ae76f0.f4a12b6e4be89d263299ec70a175f538c276d914";
var translate = require('yandex-translate')(KEY);

function translator(text,s,t)
{
	var promise=new Promise(function(resolve,reject){
	translate.translate(text,{from:s,to:t},function(err,res){
		resolve(res.text[0]);
	})
})
	return promise;
}


/*translator("я тебя люблю","ru","en").then(result=>{
	console.log(result);
})*/
module.exports=translator;