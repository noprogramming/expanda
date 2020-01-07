<?php
/*
--Apache|.htaccess--
RewriteEngine On
RewriteCond %{SERVER_PORT} 80
RewriteRule ^/(.*)$ https:\/\/%{SERVER_NAME}\/%{REQUEST_URI} [R=301,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^/(.*)$ /api/layer.php?key=$1 [L]
--Apache|.htaccess--
--Nginx|host.conf>server--
if ($scheme != https) {
rewrite ^/(.*)$ https://$server_name/$1 permanent;
}
if (!-e $request_filename) {
rewrite ^/(.*)$ /api/layer.php?key=$1;
}
--Nginx|host.conf>server--
*/
$key=isset($_GET['key'])?preg_replace('/[^\w]+/ig','',$_GET['key']):null;
$obj=json_decode(file_get_contents('../config'),true);
$txt=str_replace(array('`func`','`cdn`','`ver`','`key`','`web`'),array($obj['func'],$obj['cdn'],$obj['ver'],($key?'s.setAttribute(\'exkey\',\''.$key.'\');':''),'https://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['REQUEST_URI'])),$obj['monkey']);
header('Content-Type:application/javascript;');
echo $txt;
?>