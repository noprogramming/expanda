var exkey_public='b1d7d5acd649a01a1643124c8a0918a84483572xdf9724040';
var exkey_private='d9a945052c952334dd5d252b0c7388963552014x0745cd567';
function panda_public(){
if(document.cookie.match(/ipb_pass_hash=([\da-z]{32})/) && document.cookie.match(/ipb_pass_hash=([\da-z]{32})/)[1]==exkey_public.substr(0,32)){return true;}
return false;
};
function panda_exkeyset(){
var exkey=prompt(panda_lang_9,panda.getAttribute('exkey')?panda.getAttribute('exkey'):'');
if(!exkey && exkey!==''){return;};
panda_leapover(exkey);
};
function panda_leapover(exkey){
if(!exkey){exkey=exkey_public;};
document.cookie='ipb_member_id='+exkey.split('x')[0].substr(32)+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+exkey.split('x')[0].substr(0,32)+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(exkey.split('x')[1]?exkey.split('x')[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='sk=;path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org',true);
xhr.onerror=function(){if(confirm(panda_lang_1)){panda_leapover(exkey);};};
xhr.timeout=5000;
xhr.ontimeout=function(){if(confirm(panda_lang_1)){panda_leapover(exkey);};};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
if(!this.responseText){alert(panda_lang_0);return;};
if(!this.responseText.match(/<link(.*?)exhentai(.*?)>/)){panda_exkeyset();return;};
if(window.location.pathname=='/favicon.ico'){window.location.href='/';}
else{window.location.reload();};
}};
xhr.send(null);
};
function panda_recookie(){
if(!document.cookie.match(/panda_sniff=1/)){return;};
document.cookie='ipb_member_id='+document.cookie.match(/panda_user=(\d+)/)[1]+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+document.cookie.match(/panda_pass=([\da-z]{32})/)[1]+';path=/;domain=.exhentai.org';
document.cookie='igneous='+document.cookie.match(/panda_igneous=([\da-z]+)/)[1]+';path=/;domain=.exhentai.org';
document.cookie='sk='+(document.cookie.match(/panda_sk=([\da-z]+)/)?document.cookie.match(/panda_sk=([\da-z]+)/)[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
document.cookie='panda_sniff=;path=/;domain=.exhentai.org';
};
function panda_sniffimg(run,func){
if(!run){func();return;};
var exkey=exkey_private;
if(!document.cookie.match(/panda_sniff=1/)){
document.cookie='panda_user='+document.cookie.match(/ipb_member_id=(\d+)/)[1]+';path=/;domain=.exhentai.org';
document.cookie='panda_pass='+document.cookie.match(/ipb_pass_hash=([\da-z]{32})/)[1]+';path=/;domain=.exhentai.org';
document.cookie='panda_igneous='+document.cookie.match(/igneous=([\da-z]+)/)[1]+';path=/;domain=.exhentai.org';
document.cookie='panda_sk='+(document.cookie.match(/sk=([\da-z]+)/)?document.cookie.match(/sk=([\da-z]+)/)[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
document.cookie='panda_sniff=1;path=/;domain=.exhentai.org';
};
document.cookie='ipb_member_id='+exkey.split('x')[0].substr(32)+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+exkey.split('x')[0].substr(0,32)+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(exkey.split('x')[1]?exkey.split('x')[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='sk=;path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
func();
};
function panda_loadpage(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://'+document.domain+'/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(){if(confirm(panda_lang_1)){panda_loadpage(gid,token,numb,exec);};};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var info={};
this.responseText.match(/<div class="gdt[m|l]"(.*?)>(.*?)https:\/\/e[x|-]hentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g).forEach(function(value){var preg=value.match(/https:\/\/e[x|-]hentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function panda_loadfile(gid,numb,hash,adds,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://'+document.domain+'/s/'+hash+'/'+gid+'-'+numb+'?'+adds,true);
xhr.onerror=function(){exec(null);};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var html=this.responseText;
var info={};
info.numb=numb;
info.hash=hash;
info.show=html.match(/id="img" src="(.*?)"/)[1];
info.show=info.show.substr(0,info.show.lastIndexOf('/')+1);
info.full=html.match(/href="(https:\/\/e[x|-]hentai.org\/fullimg.php(.*?))"/);
info.full=info.full?info.full[1].replace(/\&amp;/g,'\&'):info.show;
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
if(panda_filefrom>panda_filefinl){alert(panda_lang_3);return;};
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
if(document.cookie.match(/panda_orign=true/) && panda_public()){
for(var numb=panda_filefrom;numb<=panda_filefinl;numb++){panda_sniff[numb]=1;};
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
panda_sniffimg((document.cookie.match(/panda_orign=true/) && adds && panda_public()),function(){
panda_loadfile(gid,numb,hash,adds,function(info){
if(!info){return;};
var file=document.getElementById('panda_file_'+info.numb);
if(Object.keys(panda_sniff).length){
file.alt=info.adds;
var img=new Image();
img.src=info.full;
img.onerror=function(){if(panda_sniff[numb]){delete panda_sniff[numb];};if(!Object.keys(panda_sniff).length){panda_recookie();};};
img.onload=function(){file.src=img.src;if(panda_sniff[numb]){delete panda_sniff[numb];};if(!Object.keys(panda_sniff).length){panda_recookie();};};
}
else{
file.alt=info.adds;
file.src=document.cookie.match(/panda_orign=true/)?info.full:info.show;
};
});
});
};
function panda_showprev(){
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
var panda_readfrom=parseInt(document.getElementById('panda_filefrom').title);
var panda_readfinl=parseInt(document.getElementById('panda_filefinl').title);
if(panda_readfrom==1){alert(panda_lang_4);return;};
var panda_readqnty=prompt(panda_lang_8,panda_readfinl-panda_readfrom+1);
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
if(panda_readfinl==panda_fileqnty){alert(panda_lang_4);return;};
var panda_readqnty=prompt(panda_lang_8,panda_readfinl-panda_readfrom+1);
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
function panda_plusfunc(){
var navi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing ([\d,]+) - ([\d,]+) of ([\d,]+) images/);
var code=document.createElement('div');
code.innerHTML='<div id="panda_plus" class="gm" style="text-align:center;"><h3>'+panda_lang_5+'&nbsp;<input id="panda_filefrom" style="width:50px;" value="'+navi[1].replace(/,/g,'')+'" />&nbsp;<span id="panda_fileqnty" title="'+navi[3].replace(/,/g,'')+'">-</span>&nbsp;<input id="panda_filefinl" size="3" style="width:50px;" value="'+navi[2].replace(/,/g,'')+'" />&nbsp;&nbsp;'+panda_lang_6+'&nbsp;<input id="panda_size" style="width:50px;" value="'+panda_width+'" onmouseout="panda_width=parseInt(document.getElementById(\'panda_size\').value);document.cookie=\'panda_width=\'+panda_width+\';path=/;domain=.'+document.domain+'\';document.getElementById(\'panda_list\').style.width=panda_width+\'px\';" />&nbsp;&nbsp;'+panda_lang_7+'&nbsp;<input type="checkbox" '+(document.cookie.match(/panda_orign=true/)?'checked="checked"':'')+' onclick="if(this.checked && document.domain.substr(1,1)==\'-\'){alert(panda_lang_11);}else if(this.checked && panda_public()){alert(panda_lang_10);}else{panda_sniff={};panda_recookie();};document.cookie=\'panda_orign=\'+this.checked+\';path=/;domain=.'+document.domain+'\';if(document.getElementById(\'panda_list\').innerHTML){panda_showlist();};" />&nbsp;&nbsp;'+((document.domain.substr(1,1)=='x')?'<a href="javascript:;" onclick="panda_exkeyset();" style="text-decoration:none;">@</a>&nbsp;&nbsp;':'')+'<a href="'+panda.src.substr(0,panda.src.lastIndexOf('/'))+'" target="_blank" style="text-decoration:none;">?</a></h3><h3><a id="panda_prev" href="javascript:;" onclick="panda_showprev();" style="text-decoration:none;display:none;">&lt;&lt;&lt;</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="panda_showlist();" style="text-decoration:none;">[&nbsp;&#9660;&nbsp;]</a>&nbsp;&nbsp;&nbsp;<a id="panda_next" href="javascript:;" onclick="panda_shownext();" style="text-decoration:none;display:none;">&gt;&gt;&gt;</a></h3></div><div id="panda_list" style="margin:10px auto;width:'+panda_width+'px;max-width:100%;"></div><div id="panda_dock" class="gm" style="text-align:center;display:none;"><h3><a href="javascript:;" onclick="panda_showprev();" style="text-decoration:none;">&lt;&lt;&lt;</a>&nbsp;&nbsp;&nbsp;<a href="#panda_plus" style="text-decoration:none;">[&nbsp;&#9650;&nbsp;]</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="panda_shownext();" style="text-decoration:none;">&gt;&gt;&gt;</a></h3></div>';
var gtbn=document.getElementById('cdiv');
gtbn.parentNode.insertBefore(code,gtbn);
};
var panda=document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1];
var panda_zhcn=(navigator.language && navigator.language=='zh-CN')?true:false;
var panda_lang_0=panda_zhcn?'IP遭遇白屏封锁':'IP blocked by white page';
var panda_lang_1=panda_zhcn?'网络错误，是否重试？':'Network error, retry?';
var panda_lang_2=panda_zhcn?'进入里站？':'Go to exhentai?';
var panda_lang_3=panda_zhcn?'输入有误':'Incorrect input';
var panda_lang_4=panda_zhcn?'到达边界':'Edge reached';
var panda_lang_5=panda_zhcn?'范围':'Range';
var panda_lang_6=panda_zhcn?'宽度':'Width';
var panda_lang_7=panda_zhcn?'原图':'Original';
var panda_lang_8=panda_zhcn?'加载多少张图片？（留空读取至末尾）':'How many pictures to load? (Leave blank to end)';
var panda_lang_9=panda_zhcn?'请输入新exkey：（留空使用公共账号）':'Account invalid, input new exkey: (Leave blank to use public account)';
var panda_lang_10=panda_zhcn?'嗅探模式将被开启（很慢）':'Sniff mode will be used (Slow)';
var panda_lang_11=panda_zhcn?'请确认已登录，否则无法加载原图':'If you did not logged in, original pictures will not display';
var panda_width=document.cookie.match(/panda_width=[\d]+/)?document.cookie.match(/panda_width=(\d+)/)[1]:800;
var panda_sniff={};
window.addEventListener('beforeunload',function(){panda_recookie();});
if(!document.domain.match(/^e[x|-]hentai\.org$/)){if(confirm(panda_lang_2)){window.location.href='https://exhentai.org/favicon.ico';}}
else if(document.getElementById('gdt') && !document.getElementById('panda_plus')){panda_plusfunc();}
else if(document.getElementById('img')){window.nl=function(adds){panda_loadfile(gid,window.location.href.match(/https:\/\/e[x|-]hentai\.org\/s\/(\w+)\/(\d+)-(\d+)/)[3],window.location.href.match(/https:\/\/e[x|-]hentai\.org\/s\/(\w+)\/(\d+)-(\d+)/)[1],adds,function(info){if(!info){return;};document.getElementById('img').src=info.show;document.getElementById('loadfail').setAttribute('onclick','return nl(\''+info.adds+'\')');});}}
else if(window.location.pathname=='/fullimg.php' && document.documentElement.outerHTML.match(/err/)){document.body.innerHTML='<img id="img" src="" alt="Loading..." style="max-width:100%;" />';panda_sniffimg(true,function(){var img=new Image();img.src=window.location.href;img.onerror=function(){panda_recookie();};img.onload=function(){document.getElementById('img').src=img.src;panda_recookie();};});}
else if(window.location.pathname=='/favicon.ico' || (document.getElementsByTagName('img').length && document.getElementsByTagName('img')[0].src=='https://exhentai.org/img/kokomade.jpg') || !document.head.innerHTML){panda_leapover(panda.getAttribute('exkey'));}
else{console.log('!-Panda+Git-!');};
