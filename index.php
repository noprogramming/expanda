<?php
preg_match('/^\/(\w+)?\.?panda.user.js$/i',$_SERVER['REQUEST_URI'],$q);
$k=(empty($q['1'])||strlen($q['1'])<36||!is_numeric(substr(explode('x',$q['1'])['0'],32)))?null:$q['1'];
header('Content-Type:application/javascript;charset=utf-8;');
echo "
// ==UserScript==
// @name         熊猫书签
// @namespace    Panda_Bookmark
// @description  zh-cn/
// @license      MIT
// @version      11
// @match        *.exhentai.org/*
// @grant        none
// ==/UserScript==
(function(){
'use strict';
if(window.location.host.match(/^\w+\.exhentai\.org$/i)){window.location.href='https://exhentai.org/favicon.ico';return;};
var a=document.createElement('script');a.src='//panda.gxtel.com/panda.js?'+parseInt(Date.parse(new Date())/600000);".($k?'a.setAttribute(\'exkey\',\''.$k.'\');':'')."document.body.appendChild(a);
})();
";
?>