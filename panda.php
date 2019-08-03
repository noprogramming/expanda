<?php
preg_match('/\/(\w+)\.panda.user.js$/i',$_SERVER['REQUEST_URI'],$key);
header('Content-Type:application/javascript;');
echo "
// ==UserScript==
// @name         熊猫书签
// @namespace    https://".$_SERVER['HTTP_HOST']."
// @description  zh-cn/
// @license      MIT
// @version      12
// @match        *.exhentai.org/*
// @grant        none
// ==/UserScript==
(function(){
'use strict';
if(window.location.host.match(/^\w+\.exhentai\.org$/i)){window.location.href='https://exhentai.org/favicon.ico';return;};
var a=document.createElement('script');a.src='//".$_SERVER['HTTP_HOST']."/panda.js?'+parseInt(Date.parse(new Date())/600000);".($key?"a.setAttribute('exkey','".$key['1']."');":"")."document.body.appendChild(a);
})();
";
?>