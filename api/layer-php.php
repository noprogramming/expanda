<?php
/*
--Apache|.htaccess--
RewriteEngine On
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https:\/\/%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /api/layer.php [L]
--Apache|.htaccess--
--Nginx|host.conf>server--
if ($scheme != https) {
rewrite ^(.*)$ https://$server_name$1 permanent;
}
if (!-e $request_filename) {
rewrite ^(.*)$ /api/layer.php;
}
--Nginx|host.conf>server--
*/
preg_match('/\/(\w+)\.panda\.user\.js$/i',$_SERVER['REQUEST_URI'],$key);
$obj=json_decode(file_get_contents('../config'),true);
$txt=str_replace(array('`func`','`node`','`ver`','`key`','`web`'),array($obj['func'],$obj['node'],$obj['ver'],($key?'s.setAttribute(\'exkey\',\''.$key[1].'\');':''),substr(explode(',',substr($obj['node'],1,-1))[0],1,-1)),$obj['monkey']);
header('Content-Type:application/javascript;');
echo $txt;
?>
