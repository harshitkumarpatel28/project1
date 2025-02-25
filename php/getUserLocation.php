<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);

try {
    if(count($_REQUEST) === 0) {
        throw new Exception("Error Processing Request", 1);
    }

    $url = 'http://api.geonames.org/timezoneJSON?lat='.$_REQUEST["lat"].'&lng='.$_REQUEST["lng"].'&username=hgp28194';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL,$url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result,true);

    $output['status']['code'] = 200;
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode;
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
} catch(Exception $e) {
    $output['status']['code'] = 500;
    $output['status']['error'] = $e->getMessage();
    $output['status']['description'] = "failure";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = "";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
}