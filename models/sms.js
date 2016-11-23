var request=require("request");


module.exports=function(message,chatId,token,callback){
	var data={
	url: "http://api.kamp.kg/chats/" + chatId + "/write",
	method:"POST",
	headers:{
		'X-Namba-Auth-Token': token
	},
	body:{
		"type":"text/plain",
		"content":message
	},
	json: true
	}
	request(data,callback);
};