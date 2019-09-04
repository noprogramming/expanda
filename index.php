<?php
if(preg_match('/\/(?:(\w+)\.)?panda.user.js$/i',$_SERVER['REQUEST_URI'],$key)){
header('Content-Type:application/javascript;');
echo "
// ==UserScript==
// @name         熊猫书签
// @namespace    https://".$_SERVER['HTTP_HOST']."
// @description  zh-cn/
// @license      MIT
// @version      13
// @match        ex.com
// @match        exhentai.org/*
// @grant        none
// ==/UserScript==
(function(){
'use strict';
if(window.location.host=='ex.com'){window.location.href='https://exhentai.org/favicon.ico';return;};
var a=document.createElement('script');a.src='//".dirname($_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"])."/panda.js?'+parseInt(Date.parse(new Date())/600000);".(empty($key['1'])?"":"a.setAttribute('exkey','".$key['1']."');")."document.body.appendChild(a);
})();
";
die;
}
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
<meta name="keywords" content="熊猫书签,Panda Bookmark" />
<meta name="description" content="熊猫书签,Panda Bookmark" />
<link rel="icon" href="data:," />
<title>熊猫书签</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;max-width:100%;vertical-align:top;}
body{margin:32px 0;font-family:Microsoft Yahei;font-size:14px;line-height:26px;word-wrap:break-word;word-break:break-all;}
a{color:#000;text-decoration:none;}
input{margin:8px 0 6px 0;padding:4px;width:100%;height:30px;}
input[type=button]{padding-top:2px;}
.rack{margin:auto;width:720px;text-align:center;border-color:#666;}
.rack td{padding:6px 0;width:50%;border-color:#666;}
.rack hr{margin:6px 0;border-color:#666;}
.rack span{display:block;padding:0 8px 2px 8px;text-align:left;}
</style>
</head>
<body>
<table border="1" cellspacing="0" class="rack">
<tr>
<td colspan="2" id="title">...</td>
</tr>
<tr>
<td colspan="1"><a id="button_monkey" href="javascript:;" onclick="setup('monkey');">油猴 Windows Mac Android</a></td>
<td colspan="1"><a id="button_origin" href="javascript:;" onclick="setup('origin');">传统 iOS</a></td>
</tr>
<tr>
<td colspan="2">
<div id="account">
<span>
<b>[密钥绑定]</b><br />
如果没有密钥，可按流程注册，或留空使用公共书签。<br />
<input id="exkey" placeholder="exkey" /><br />
<input type="button" value="确定" onclick="var exkey=document.getElementById('exkey').value;if(check(exkey)){window.location.hash=exkey;setup(current);alert('绑定成功');}else{alert('格式错误');};" /><br />
</span>
<hr />
<span>
<b>[账号注册]</b><br />
注册地址：<a href="https://forums.e-hentai.org/?act=Reg" target="_blank"><u>https://forums.e-hentai.org/?act=Reg</u></a><br />
中国大陆无法访问，需挂载拥有<b>私人IP</b>的<b>欧美V:P!И</b>，不能多人共用同IP。<br />
使用<b>亚洲IP</b>注册的账户，也无法获得里区权限。V:P!И务必选用<b>欧美</b>节点。<br />
建议用Gmail邮箱注册，使用<b>163、QQ等国内邮箱</b>注册账户无法获得权限。<br />
注册过程就不多说了，确认时可能弹出验证码，如果看不到请更换V:P!И。<br />
注册完成等待一周左右时间，账号应该就能获得里区权限，参照流程登录：<br />
挂载<b>欧美V:P!И</b>，清空<b>浏览器COOKIE</b>，先<a href="https://e-hentai.org/bounce_login.php" target="_blank"><u><b>登录表站</b></u></a>，再<a href="https://exhentai.org" target="_blank"><u><b>访问里站</b></u></a>。<br />
如果还出现熊猫，多等一周换个欧美V:P!И登录，再不行就是凉了。<br />
</span>
<hr />
<span>
<b>[密钥提取]</b><br />
示例格式：aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa12345x1e2d3c<br />
<b>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</b>是<b>ipb_pass_hash</b>。<br />
<b>12345</b>是<b>ipb_member_id</b>。<br />
<b>x</b>是解析所需的<b>分隔符</b>。<br />
<b>1e2d3c</b>是<b>igneous</b>。<br />
使用电脑浏览器，<b>按上节教程登录里站</b>。按下<b>F12</b>，找到COOKIE：<br />
[Edge] Debug-Cookie-exhentai.org<br />
[Chrome] Application-Cookies-exhentai.org<br />
[Firefox] Storage-Cookies-exhentai.org<br />
复制<b>ipb_pass_hash</b>、<b>ipb_member_id</b>、<b>igneous</b>三个变量。<br />
按照格式规范组合成exkey，把这串密钥保存好，以后就可以用了。<br />
</span>
</div>
<div id="monkey" style="display:none;">
<span>
<b>[安装插件]</b><br />
请根据您的浏览器类型，安装油猴插件：<br />
<a href="https://www.softpedia.com/get/Internet/Internet-Applications-Addons/Chrome-Extensions/Tampermonkey.shtml#download" target="_blank"><u><b>Chrome</b></u></a><br />
<a href="https://addons.mozilla.org/firefox/addon/tampermonkey/" target="_blank"><u><b>Firefox</b></u></a><br />
<a href="https://www.microsoft.com/store/apps/9NBLGGH5162S" target="_blank"><u><b>Edge</b></u></a><br />
没有以上浏览器请安装<a href="https://www.mozilla.org/firefox/" target="_blank"><u>Firefox</u></a>，iOS请用传统书签。<br />
</span>
<hr />
<span>
<b>[添加脚本]</b><br />
为油猴插件添加熊猫书签脚本：<br />
<a id="monkey_link" target="_blank"><u><b>点此下载安装</b></u></a><br />
</span>
<hr />
<span>
<b>[访问里站]</b><br />
由于EH遭遇大陆屏蔽，请访问以下地址跳转：<br />
<a href="http://ex.com" target="_blank"><u><b>ex.com</b></u></a><br />
</span>
</div>
<div id="origin" style="display:none;">
<span>
<b>[复制代码]</b><br />
全选并拷贝下面的代码：<br />
<input id="origin_code" onclick="this.select();this.setSelectionRange(0,99999);" /><br />
</span>
<hr />
<span>
<b>[创建书签]</b><br />
1. 把本页添加至书签。<br />
2. 点击浏览器地址栏。<br />
3. 找到刚才添加的书签，长按，编辑。<br />
4. 使用刚才复制的代码，替换原有地址。<br />
5. 保存书签。<br />
</span>
<hr />
<span>
<b>[解锁里站]</b><br />
1. 进入任意非空网页，例如：<a href="https://www.baidu.com" target="_blank"><u>www.baidu.com</u></a><br />
2. 点击浏览器地址栏，运行熊猫书签，跳转至图标页。<br />
3. 重复上个步骤，再次运行熊猫书签，即可解锁里站。<br />
</span>
<hr />
<span>
<b>[扩展功能]</b><br />
1. 进入里站专辑页面。<br />
2. 点击浏览器地址栏，运行熊猫书签。<br />
3. 下拉找到扩展面板，使用扩展功能。<br />
</span>
</div>
<hr />
<span>
<b>[常见问题]</b><br />
这里收集了一些使用里站时常见的错误。<br />
<b>网络封锁：链接被重置</b><br />
没有写入COOKIE，跳转到了被屏蔽的表站，请使用熊猫书签进入。<br />
<b>地域限制：白屏</b><br />
您所在地区被拦截，例如规避日本版权投诉，请挂载欧美V:P!И访问。<br />
<b>权限不足：熊猫</b><br />
清空浏览器COOKIE并重试，还是不行说明没有权限，请使用公共书签。<br />
<b>流量超限：509 Bandwidth Limit Exceeded</b><br />
当前IP浏览的图片过多被E站限制，可等待配额恢复或重启路由器更换IP。<br />
</span>
<hr />
<a href="https://github.com/ehpanda/panda.feedback/issues" target="_blank"><b>Feedback</b></a>
</td>
</tr>
</table>
<script>
function check(exkey){
if(exkey.length<36){return false;};
if(!/^[\dA-F]{32}$/i.test(exkey.split('x')[0].substr(0,32))){return false;};
if(!Number.isInteger(parseInt(exkey.split('x')[0].substr(32)))){return false;};
if(exkey.split('x')[1] && !/^[\dA-F]+$/i.test(exkey.split('x')[1])){return false;};
return true;
};
function setup(element){
var exkey=window.location.hash?window.location.hash.substr(1):'';
if(check(exkey)){document.getElementById('title').innerHTML='<a id="button_account" href="javascript:;" onclick="if(confirm(\'解除绑定？\')){window.location.hash=\'\';setup(current);};">'+exkey+'</a>';}
else{exkey='';document.getElementById('title').innerHTML='<a id="button_account" href="javascript:;" onclick="setup(\'account\');">熊猫书签</a>';};
if(current && current!=element){
document.getElementById('button_'+current).style.fontWeight='';
document.getElementById(current).style.display='none';
};
current=element;
document.getElementById('button_'+element).style.fontWeight='bold';
document.getElementById(element).style.display='';
document.getElementById('monkey_link').href=(exkey?(exkey+'.'):'')+'panda.user.js';
document.getElementById('origin_code').value="javascript:(function(){var a=document.createElement('script');a.setAttribute('src','//"+window.location.hostname+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'))+"/panda.js?'+parseInt(Date.parse(new Date())/600000));"+(exkey?"a.setAttribute('exkey','"+exkey+"');":"")+"document.body.appendChild(a);}());";
};
var current=null;
setup('account');
</script>
</body>
</html>