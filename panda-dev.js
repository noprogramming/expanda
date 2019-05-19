javascript:
function panda_exkeyset(){
var setkey=prompt(panda_lang_q002,panda.getAttribute('exkey')?panda.getAttribute('exkey'):'');
if(!setkey && setkey!==''){return;};
panda_leapover(setkey);
};
function panda_exkeyget(setkey,sniff,func){
if(setkey){func(setkey);return;};
var xhr=new XMLHttpRequest();
xhr.open('GET',panda.src.substr(0,panda.src.lastIndexOf('/'))+'/exkey-'+(sniff?'private':'public')+'?'+parseInt(Date.parse(new Date())/600000),true);
xhr.onerror=function(){if(confirm(panda_lang_a001)){panda_exkeyget(setkey,sniff,func);};};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var getkey=this.responseText.replace(/[\r\n]/g,'');
if(!getkey){if(sniff){alert(panda_lang_q003);}else{panda_exkeyset();};return;};
func(getkey);
}};
xhr.setRequestHeader('Content-Type','text/plain');
xhr.responseType='text';
xhr.send(null);
};
function panda_leapover(setkey){
panda_exkeyget(setkey,false,function(getkey){
document.cookie='ipb_member_id='+getkey.split('x')[0].substr(32)+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+getkey.split('x')[0].substr(0,32)+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(getkey.split('x')[1]?getkey.split('x')[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='sk=;path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org',true);
xhr.onerror=function(){if(confirm(panda_lang_a001)){panda_leapover(getkey);};};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
if(!this.responseText.match(/<link(.*?)exhentai(.*?)>/)){panda_exkeyset();return;};
if(window.location.pathname=='/favicon.ico'){window.location.href='/';}
else{window.location.reload();};
}};
xhr.send(null);
});
};
function panda_loadpage(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(){if(confirm(panda_lang_a001)){panda_loadpage(gid,token,numb,exec);}else{panda_lock=false;}};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var prev=document.getElementsByClassName('ths')[1].innerHTML=='Normal'?this.responseText.match(/<div class="gdtm"(.*?)>(.*?)https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g):this.responseText.match(/<div class="gdtl"(.*?)>(.*?)https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g);
var info={};
prev.forEach(function(value){var preg=value.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function panda_loadfile(gid,numb,hash,adds,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/s/'+hash+'/'+gid+'-'+numb+'?'+adds,true);
xhr.onerror=function(){exec(null);};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var html=this.responseText;
var info={};
info.numb=numb;
info.hash=hash;
info.show=html.match(/id="img" src="(.*?)"/)[1];
info.full=html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)?html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)[1].replace(/\&amp;/g,'\&'):info.show;
info.adds=adds+'&nl='+html.match(/onclick="return nl\(\'(.*?)\'\)"/)[1];
exec(info);
}};
xhr.send(null);
};
function panda_showlist(){
var panda_filefrom=parseInt(document.getElementById('panda_filefrom').value);
var panda_filefinl=parseInt(document.getElementById('panda_filefinl').value);
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
if(!panda_filefrom || panda_filefrom<0){panda_filefrom=1;};
if(!panda_filefinl || panda_filefinl>panda_fileqnty){panda_filefinl=panda_fileqnty;};
if(panda_filefrom>panda_filefinl){alert(panda_lang_a003);return;};
document.getElementById('panda_filefrom').title=panda_filefrom;
document.getElementById('panda_filefinl').title=panda_filefinl;
var panda_pageconf=document.getElementsByClassName('ths');
var panda_pageqnty=parseInt(panda_pageconf[0].innerHTML)*(panda_pageconf[1].innerHTML=='Normal'?10:5);
var panda_pagefrom=Math.ceil(panda_filefrom/panda_pageqnty);
var panda_pagefinl=Math.ceil(panda_filefinl/panda_pageqnty);
var panda_hashmaps={};
for(var numb=panda_pagefrom;numb<=panda_pagefinl;numb++){
panda_loadpage(gid,token,numb,function(info){
panda_hashmaps=Object.assign(panda_hashmaps,info);
if(Math.ceil(Object.keys(panda_hashmaps).length/panda_pageqnty)==(panda_pagefinl-panda_pagefrom+1)){
document.getElementById('panda_list').innerHTML='';
document.getElementById('panda_prev').style.display='';
document.getElementById('panda_next').style.display='';
document.getElementById('panda_dock').style.display='';
document.getElementById('panda_plus').scrollIntoView();
if(panda_orign && !panda.getAttribute('exkey')){
for(var numb=panda_filefrom;numb<=panda_filefinl;numb++){
panda_sniff[numb]=1;
}
};
panda_sniffimg(Object.keys(panda_sniff).length,function(){
for(var numb=panda_filefrom;numb<=panda_filefinl;numb++){
document.getElementById('panda_list').innerHTML+='<img id="panda_file_'+numb+'" src="" alt="" style="display:block;margin:4px auto;max-width:100%;min-width:100px;min-height:100px;background:#000;" onclick="panda_showfile('+numb+',\''+panda_hashmaps[numb]+'\',this.alt);" />';
document.getElementById('panda_file_'+numb).click();
};
});
};
});
};
};
function panda_showfile(numb,hash,adds){
panda_loadfile(gid,numb,hash,adds,function(info){
if(!info){return;};
var file=document.getElementById('panda_file_'+info.numb);
file.alt=info.adds;
if(Object.keys(panda_sniff).length){ ////列表加载后有人刷新怎么办
var img=new Image();
img.src=info.full;
img.onload=function(){
file.src=img.src;
delete panda_sniff[numb];
if(!Object.keys(panda_sniff).length){panda_recookie();};
};
}
else{
file.src=panda_orign?info.full:info.show;
};
});
};
function panda_showprev(){
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
var panda_readfrom=parseInt(document.getElementById('panda_filefrom').title);
var panda_readfinl=parseInt(document.getElementById('panda_filefinl').title);
if(panda_readfrom==1){alert(panda_lang_a004);return;};
var panda_readqnty=prompt(panda_lang_q001,panda_readfinl-panda_readfrom+1);
if(!panda_readqnty && panda_readqnty!==''){return;};
panda_readqnty=parseInt(panda_readqnty);
if(!panda_readqnty || panda_readqnty<0){panda_readqnty=panda_fileqnty;};
var panda_filefrom=panda_readfrom-panda_readqnty;
var panda_filefinl=panda_readfrom-1;
if(panda_filefrom<1){panda_filefrom=1;};
document.getElementById('panda_filefrom').value=panda_filefrom;
document.getElementById('panda_filefinl').value=panda_filefinl;
panda_showlist();
};
function panda_shownext(){
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
var panda_readfrom=parseInt(document.getElementById('panda_filefrom').title);
var panda_readfinl=parseInt(document.getElementById('panda_filefinl').title);
if(panda_readfinl==panda_fileqnty){alert(panda_lang_a004);return;};
var panda_readqnty=prompt(panda_lang_q001,panda_readfinl-panda_readfrom+1);
if(!panda_readqnty && panda_readqnty!==''){return;};
panda_readqnty=parseInt(panda_readqnty);
if(!panda_readqnty || panda_readqnty<0){panda_readqnty=panda_fileqnty;};
var panda_filefrom=panda_readfinl+1;
var panda_filefinl=panda_readfinl+panda_readqnty;
if(panda_filefinl>panda_fileqnty){panda_filefinl=panda_fileqnty;};
document.getElementById('panda_filefrom').value=panda_filefrom;
document.getElementById('panda_filefinl').value=panda_filefinl;
panda_showlist();
};
function panda_recookie(){
document.cookie='ipb_member_id='+(exkey_user?exkey_user[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+(exkey_pass?exkey_pass[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(exkey_igneous?exkey_igneous[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='sk='+(exkey_sk?exkey_sk[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
exkey_sniffing=false; ////复原sniffing
};
function panda_sniffimg(run,func){
if(!run){func();return;};
panda_exkeyget(null,true,function(getkey){
if(!exkey_sniffing){
exkey_user=document.cookie.match(/ipb_member_id=(\d+)/);
exkey_pass=document.cookie.match(/ipb_pass_hash=([\da-z]{32})/);
exkey_igneous=document.cookie.match(/igneous=([\da-z]+)/);
exkey_sk=document.cookie.match(/sk=([\da-z]+)/);
exkey_sniffing=true; ////上面这些都写入cookie，检测到后修正
};
document.cookie='ipb_member_id='+getkey.split('x')[0].substr(32)+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+getkey.split('x')[0].substr(0,32)+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(getkey.split('x')[1]?getkey.split('x')[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='sk=;path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
window.addEventListener('beforeunload',function(e){panda_recookie();});
func();
});
};
function panda_plusfunc(){
var navi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing ([\d,]+) - ([\d,]+) of ([\d,]+) images/);
var code=document.createElement('div');
code.innerHTML='<div id="panda_plus" class="gm" style="text-align:center;"><h3>'+panda_lang_p001+'&nbsp;<input id="panda_filefrom" style="width:50px;" value="'+navi[1].replace(/,/g,'')+'" />&nbsp;<span id="panda_fileqnty" title="'+navi[3].replace(/,/g,'')+'">-</span>&nbsp;<input id="panda_filefinl" size="3" style="width:50px;" value="'+navi[2].replace(/,/g,'')+'" />&nbsp;&nbsp;'+panda_lang_p002+'&nbsp;<input id="panda_size" style="width:50px;" value="'+panda_width+'" onmouseout="panda_width=parseInt(document.getElementById(\'panda_size\').value);document.cookie=\'panda_width=\'+panda_width+\';path=/;domain=.exhentai.org\';document.getElementById(\'panda_list\').style.width=panda_width+\'px\';" />&nbsp;&nbsp;'+panda_lang_p003+'&nbsp;<input type="checkbox" '+(panda_orign?'checked="checked"':'')+' onclick="panda_orign=this.checked;document.cookie=\'panda_orign=\'+panda_orign+\';path=/;domain=.exhentai.org\';if(document.getElementById(\'panda_list\').innerHTML){panda_showlist();};" /></h3><h3><a id="panda_prev" href="javascript:;" onclick="panda_showprev();" style="display:none;">&lt;&lt;&lt;</a>&nbsp;&nbsp;<a href="javascript:;" onclick="panda_showlist();">'+panda_lang_p004+'</a>&nbsp;&nbsp;<a href="javascript:;" onclick="panda_exkeyset();">'+panda_lang_p005+'</a>&nbsp;&nbsp;<a id="panda_next" href="javascript:;" onclick="panda_shownext();" style="display:none;">&gt;&gt;&gt;</a></h3></div><div id="panda_list" style="margin:10px auto;width:'+panda_width+'px;max-width:100%;"></div><div id="panda_dock" class="gm" style="text-align:center;display:none;"><h3><a href="javascript:;" onclick="panda_showprev();">&lt;&lt;&lt;</a>&nbsp;&nbsp;<a href="#panda_plus">[&nbsp;&#9650;&nbsp;]</a>&nbsp;&nbsp;<a href="javascript:;" onclick="panda_shownext();">&gt;&gt;&gt;</a></h3></div>';
var gtbn=document.getElementById('cdiv');
gtbn.parentNode.insertBefore(code,gtbn);
};
var panda=document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1];
var panda_zhcn=(navigator.language && navigator.language=='zh-CN')?true:false;
var panda_lang_a001=panda_zhcn?'网络错误，是否重试？':'Network error, retry?';
var panda_lang_a002=panda_zhcn?'进入里站？':'Go to exhentai?';
var panda_lang_a003=panda_zhcn?'输入有误':'Incorrect input';
var panda_lang_a004=panda_zhcn?'到达边界':'Edge reached';
var panda_lang_p001=panda_zhcn?'范围':'Range';
var panda_lang_p002=panda_zhcn?'宽度':'Width';
var panda_lang_p003=panda_zhcn?'原图':'Orign';
var panda_lang_p004=panda_zhcn?'竖屏浏览':'Reader';
var panda_lang_p005=panda_zhcn?'切换账号':'Altkey';
var panda_lang_q001=panda_zhcn?'加载多少张图片？（留空读取至末尾）':'How many pictures to load? (Leave blank to load to end)';
var panda_lang_q002=panda_zhcn?'账号已失效，请输入新exkey：（留空使用公共账号）':'Account invalid, input new exkey: (Leave blank to use public account)';
var panda_lang_q003=panda_zhcn?'嗅探账号已失效':'Sniff account invalid';
var panda_width=document.cookie.match(/panda_width=[\d]+/)?document.cookie.match(/panda_width=(\d+)/)[1]:720;
var panda_orign=document.cookie.match(/panda_orign=true/)?true:false;
var panda_sniff={};
var exkey_sniffing,exkey_user,exkey_pass,exkey_igneous,exkey_sk; ////最好不用公共变量（同上写入COOKIE）
if(document.domain!='exhentai.org'){if(confirm(panda_lang_a002)){window.location.href='https://exhentai.org/favicon.ico';}}
else if(document.getElementById('gdt') && !document.getElementById('panda_plus')){panda_plusfunc();}
else if(window.location.pathname=='/fullimg.php' && document.documentElement.outerHTML.match(/err/)){panda_sniffimg(true,function(){var img=new Image();img.src=window.location.href;img.onerror=function(){panda_recookie();};img.onload=function(){document.body.innerHTML='<img src="'+img.src+'" alt="Retry" style="max-width:100%;" />';panda_recookie();};});}
else if(window.location.pathname=='/favicon.ico' || document.contentType=='image/gif'){panda_leapover(panda.getAttribute('exkey'));}; ////防止重复刷新？
