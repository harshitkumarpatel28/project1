<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);

try {
    if(count($_REQUEST) === 0) {
        throw new Exception("Error Processing Request", 1);
    }
    
    $url = 'https://api.weatherapi.com/v1/forecast.json?key=c93c907269b14a4c8f0181712241408&q='.$_REQUEST["placeName"].'&days=3';

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