module.exports=function(a){

var b=a.split("");
for(var i=0;i<b.length;i++)
{if((b[i]==" ")&&(b[i+1]==" "))
	b[i]="";
};
var c=0;
while(c<b.length)
{if(b[c]=="")
  {
	b.splice(c,1);
   c--;
}
c++;
}
if(b[0]==" ")
b.shift();
if(b[b.length-1]==" ")
b.pop();
var s="";
for(var i=0;i<b.length;i++)
	s+=b[i];
   return s;
   
}