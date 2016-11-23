var Sequelize=require("sequelize");

var sequelize=new Sequelize("botdb","root","root",{
	host:"localhost",
	dialect:"postgres"

})

	var db=sequelize.define("l",{
	id:{
   type:Sequelize.INTEGER,
   autoIncrement: true,
        primaryKey: true
	},
	source:Sequelize.STRING,
	target:Sequelize.STRING,
	chatId:Sequelize.INTEGER
})
	exports.createDb=function()
	{
db.sync().then(function() {})


}
exports.createDefDb=function(chat_id)
{
 db.create({source:"ru",target:"en",chatId:chat_id})
}

 exports.addDb=function(source,target,chatId)
 {
 	db.create({source:source,target:target,chatId:chatId});
 }

 exports.getDb=function(chatId,callback)
 {
 	db.max("id").then(function(max){
 		db.findOne( { where:{id:max,chatId:chatId} } ).then(function(result){

 			callback(result.get("source"),result.get("target"))
 		})
 	})
 }
