<?php
preg_match('/^\/(\w+)?\.?panda.user.js$/i',$_SERVER['REQUEST_URI'],$q);
$k=(empty($q['1'])||strlen($q['1'])<36||!is_numeric(substr(explode('x',$q['1'])['0'],32)))?null:$q['1'];
header('Content-Type:application/javascript;charset=utf-8;');
echo "
// ==UserScript==
// @name         熊猫书签
// @namespace    https://panda.gxtel.com
// @description  zh-cn/
// @license      MIT
// @version      10
// @match        *://*.exhentai.org/
// @match        *://*.exhentai.org/?page=*
// @match        *://*.exhentai.org/g/*
// @match        *://*.exhentai.org/s/*
// @match        *://*.exhentai.org/favicon.ico
// @grant        none
// ==/UserScript==
(function(){
'use strict';
if(window.location.host.match(/^\w+\.exhentai\.org$/i)){window.location.href='https://exhentai.org/favicon.ico';return;}
if(window.location.href.match(/^https?:\/\/exhentai\.org\/favicon\.ico$/i)||document.contentType=='image/gif'||document.getElementById('gdt')){var a=document.createElement('script');a.setAttribute('src','//panda.gxtel.com/panda.js?'+Date.parse(new Date()));".($k?'a.setAttribute(\'exkey\',\''.$k.'\');':'')."document.body.appendChild(a);return;}
})();
";
?>