var request=require("request");



module.exports=function(userId,token,callback)
{

  var data={
  url: "http://api.kamp.kg/chats/create",
  method:"POST",
  headers: {
			'X-Namba-Auth-Token': token
		},
		body: {
        "name":"Яндекс.Переводчик",
        "members":[userId],
        'image':'YzU2OWM3YWY0YzcyZmYxZWEyODcyYmJlOTJhM2VkMjE2MDFjMDRhZWNhZDk3ODFiYzk0NDVkNjQzMDI0YjBlZjkyNWNhZWMxODkwYmZlYTRkNjY5NjQwYjNhNGY4MDUxNmJlYjg3OGQ0MTQxNWZiODNmZDBhOGViZDFlNTg3M2RkOGY4YTk2N2M5YTA3NDM0MDhmMWI3MGZlZmU1YjhhNWE3NmM0NzA2NWE2N2JjNGU5MjUxMjZhMjdlYzg4ZmYxZjZkNWQzN2NmZjZmNTEyOWU3NTcyMmVhMjJmMmQ0NDE='

		},
		json: true
}
console.log("chat created");
	request(data,callback);
}