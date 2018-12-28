javascript:
var panda=document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1];
var panda_zhcn=(navigator.language && navigator.language=='zh-CN')?true:false;
var panda_lang_a001=panda_zhcn?'网络错误，是否重试？':'Network error, retry?';
var panda_lang_a002=panda_zhcn?'进入里站？':'Go to exhentai?';
var panda_lang_a003=panda_zhcn?'范围超限':'Incorrect range';
var panda_lang_b002=panda_zhcn?'账号已失效，请输入新exkey：（留空使用公共账号）':'Account invalid, input new exkey: (Leave blank to use public account)';
var panda_lang_p001=panda_zhcn?'范围':'Range';
var panda_lang_p002=panda_zhcn?'宽度':'Width';
var panda_lang_p003=panda_zhcn?'原图':'Orign';
var panda_lang_p004=panda_zhcn?'竖屏浏览':'Reader';
var panda_lang_p005=panda_zhcn?'打包下载':'Packer';
var panda_lang_p006=panda_zhcn?'切换账号':'Altkey';
var panda_width=document.cookie.match(/panda_width=[\d]+/)?document.cookie.match(/panda_width=(\d+)/)[1]:720;
var panda_orign=document.cookie.match(/panda_orign=true/)?true:false;
function panda_exkeyset(){
var setkey=prompt(panda_lang_b002,panda.getAttribute('exkey')?panda.getAttribute('exkey'):'');
if(!setkey && setkey!==''){return;};
panda_leapover(setkey);
};
function panda_exkeyget(setkey,func){
if(setkey){func(setkey);return;}
var xhr=new XMLHttpRequest();
xhr.open('GET',panda.src.substr(0,panda.src.lastIndexOf('/'))+'/exkey-bookmark?'+Date.parse(new Date()),true);
xhr.setRequestHeader('Content-Type','text/plain');
xhr.responseType='text';
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
getkey=xhr.responseText.replace(/[\r\n]/g,'');
if(!getkey){panda_exkeyset();return;};
func(getkey);
}};
xhr.send(null);
};
function panda_leapover(setkey){
panda_exkeyget(setkey,function(getkey){
document.cookie='ipb_member_id='+getkey.split('x')[0].substr(32)+';path=/;domain=.exhentai.org';
document.cookie='ipb_pass_hash='+getkey.split('x')[0].substr(0,32)+';path=/;domain=.exhentai.org';
document.cookie='igneous='+(getkey.split('x')[1]?getkey.split('x')[1]:'')+';path=/;domain=.exhentai.org';
document.cookie='yay=0;path=/;domain=.exhentai.org';
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org',true);
xhr.onerror=function(e){if(confirm(panda_lang_a001)){panda_leapover(getkey);};};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
if(!xhr.responseText.match(/<link(.*?)exhentai(.*?)>/)){panda_exkeyset();return;};
if(window.location.href=='https://exhentai.org/favicon.ico'){window.location.href='https://exhentai.org';return;}
window.location.reload();
}};
xhr.send(null);
});
};
function panda_loadpage(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(e){if(confirm(panda_lang_a001)){panda_loadpage(gid,token,numb,exec);}else{panda_lock=false;}};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var prev=document.getElementsByClassName('ths')[1].innerHTML=='Normal'?xhr.responseText.match(/<div class="gdtm"(.*?)>(.*?)https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g):xhr.responseText.match(/<div class="gdtl"(.*?)>(.*?)https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g);
var info={};
prev.forEach(function(value){var preg=value.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function panda_loadfile(gid,numb,hash,adds,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/s/'+hash+'/'+gid+'-'+numb+'?'+adds,true);
xhr.onerror=function(e){exec(null);};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var html=xhr.responseText;
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
var panda_showfrom=document.getElementById('panda_showfrom').value;
var panda_showfinl=document.getElementById('panda_showfinl').value;
var panda_showfull=document.getElementById('panda_showfull').title;
var panda_filefrom=(!panda_showfrom || panda_showfrom==0)?1:parseInt(panda_showfrom);
var panda_filefinl=(!panda_showfinl || panda_showfinl==0)?parseInt(panda_showfull.replace(/,/g,'')):parseInt(panda_showfinl);
if(!panda_filefrom || !panda_filefinl || panda_filefrom>panda_filefinl || panda_filefrom<1 || panda_filefinl>parseInt(panda_showfull.replace(/,/g,''))){alert(panda_lang_a003);return;};
var panda_pageconf=document.getElementsByClassName('ths');
var panda_pagetote=parseInt(panda_pageconf[0].innerHTML)*(panda_pageconf[1].innerHTML=='Normal'?10:5);
var panda_pagefrom=Math.ceil(panda_filefrom/panda_pagetote);
var panda_pagefinl=Math.ceil(panda_filefinl/panda_pagetote);
var panda_hashmaps={};
for(var numb=panda_pagefrom;numb<=panda_pagefinl;numb++){
panda_loadpage(gid,token,numb,function(info){
panda_hashmaps=Object.assign(panda_hashmaps,info);
if(Math.ceil(Object.keys(panda_hashmaps).length/panda_pagetote)==(panda_pagefinl-panda_pagefrom+1)){
document.getElementById('panda_list').innerHTML='';
for(var numb=panda_filefrom;numb<=panda_filefinl;numb++){
document.getElementById('panda_list').innerHTML+='<img id="panda_file_'+numb+'" src="" alt="" style="display:block;margin:4px auto;max-width:100%;min-width:100px;min-height:100px;background:#000;" onclick="panda_loadfile(gid,'+numb+',\''+panda_hashmaps[numb]+'\',this.alt,function(info){if(!info){return;};var file=document.getElementById(\'panda_file_\'+info.numb);file.src=info.'+(panda_orign?'full':'show')+';file.alt=info.adds;});" />';
document.getElementById('panda_file_'+numb).click();
};
};
});
};
};
function panda_plusfunc(){
var navi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing ([\d,]+) - ([\d,]+) of ([\d,]+) images/);
var code=document.createElement('div');
code.innerHTML='<div id="panda_plus" class="gm" style="text-align:center;"><h3>'+panda_lang_p001+'&nbsp;<input id="panda_showfrom" style="width:50px;" value="'+navi[1].replace(/,/g,'')+'" />&nbsp;<span id="panda_showfull" title="'+navi[3].replace(/,/g,'')+'">-</span>&nbsp;<input id="panda_showfinl" size="3" style="width:50px;" value="'+navi[2].replace(/,/g,'')+'" />&nbsp;&nbsp;'+panda_lang_p002+'&nbsp;<input id="panda_size" style="width:50px;" value="'+panda_width+'" onmouseout="panda_width=parseInt(document.getElementById(\'panda_size\').value);document.cookie=\'panda_width=\'+panda_width+\';path=/;domain=.exhentai.org\';document.getElementById(\'panda_list\').style.width=panda_width+\'px\';" />&nbsp;&nbsp;'+panda_lang_p003+'&nbsp;<input type="checkbox" '+(panda_orign?'checked="checked"':'')+' onclick="panda_orign=this.checked;document.cookie=\'panda_orign=\'+panda_orign+\';path=/;domain=.exhentai.org\';if(document.getElementById(\'panda_list\').innerHTML){panda_showlist();};" /></h3><h3><a href="javascript:;" onclick="panda_showlist();">'+panda_lang_p004+'</a>&nbsp;&nbsp;<a href="javascript:;" onclick="alert(\'代码不会写……\\r\\nNo can programming\');">'+panda_lang_p005+'</a>&nbsp;&nbsp;<a href="javascript:;" onclick="panda_exkeyset();">'+panda_lang_p006+'</a></h3></div><div id="panda_list" style="margin:10px auto;width:'+panda_width+'px;max-width:100%;"></div>';
var gtbn=document.getElementById('cdiv');
gtbn.parentNode.insertBefore(code,gtbn);
};
if(document.getElementById('panda_plus')){console.log('exist');}
else if(document.domain!='exhentai.org'){if(confirm(panda_lang_a002)){window.location.href='https://exhentai.org/favicon.ico';}}
else if(document.getElementById('gdt')){panda_plusfunc();}
else{panda_leapover(panda.getAttribute('exkey'));};