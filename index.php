<?php
if(isset($_GET['tampermonkey'])){
$c=curl_init('https://clients2.google.com/service/update2/crx?response=redirect&prodversion=9999&x=id%3Ddhdgffkkebhmkfjojejmpbldmpobfkfo%26installsource%3Dondemand%26uc');
curl_setopt($c,CURLOPT_TIMEOUT,10);
curl_setopt($c,CURLOPT_SSL_VERIFYPEER,0);
curl_setopt($c,CURLOPT_SSL_VERIFYHOST,0);
curl_setopt($c,CURLOPT_FOLLOWLOCATION,1);
curl_setopt($c,CURLOPT_HEADER,0);
curl_setopt($c,CURLOPT_NOBODY,1);
$e=curl_exec($c);if(curl_errno($c)){die('curl_err');}
$i=curl_getinfo($c);if(empty($i['http_code']) || $i['http_code']!=200){die('resolve_err');}
curl_close($c);
header('Content-Type: application/x-chrome-extension');
header('Content-Disposition: attachment; filename=tampermonkey.crx');
header('Pragma: no-cache');
echo $e;die;
}
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