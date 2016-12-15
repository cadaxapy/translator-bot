
var request=require("request");


module.exports=function(message, chatId, token, ip, callback){
	if(ip === "::ffff:77.235.20.133") {
    url = "http://77.235.20.133:3000/chats/"
  }
  else
    url = "http://api.kamp.kg/chats/";
	var data={
	url: url + chatId + "/write",
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