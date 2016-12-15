var request=require("request");



module.exports=function(userId,token, ip, callback)
{
  if(ip === "::ffff:77.235.20.133") {
    url = "http://77.235.20.133:3000/chats/create"
  }
  else
    url = "http://api.kamp.kg/chats/create";
  var data={
  url: url,
  method:"POST",
  headers: {
			'X-Namba-Auth-Token': token
		},
		body: {
        "name":"Курсы валют",
        "members":[userId],
        'image':'YzU2OWM3YWY0YzcyZmYxZWEyODcyYmJlOTJhM2VkMjE2MDFjMDRhZWNhZDk3ODFiYzk0NDVkNjQzMDI0YjBlZjkyNWNhZWMxODkwYmZlYTRkNjY5NjQwYjNhNGY4MDUxNmJlYjg3OGQ0MTQxNWZiODNmZDBhOGViZDFlNTg3M2RlNzMyMzc1NTVjY2JmZWY4MmU0ODhiMjhjMjIyYjkxZDgyZWExZTdhMGE4N2E1NDcyNTIzYWM1YzM4NTNlYjczMDE2N2E1OGY0OWI4ZTUyMzJmNjE1OGI0YjNhOTI0MmU='

		},
		json: true
}
console.log("chat created");
	request(data,callback);
}
