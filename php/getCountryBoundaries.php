<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);

try {
    if(count($_REQUEST) === 0) {
        throw new Exception("Error Processing Request", 1);
    }
    
    $myfile = fopen("../data/countryBorders.json", "r") or die("Unable to open file!");
    $data = fread($myfile,filesize("../data/countryBorders.json"));
    fclose($myfile);
    $decode = json_decode($data, true);
    $coordinates = [];
    if($decode) {
        foreach ($decode['features'] as $dValue) {
            if($dValue['properties']['iso_a2'] === $_REQUEST['countryCode']) {
                foreach ($dValue['geometry']['coordinates'] as $cValue) {
                    $coordinates['coordinates'][] = $cValue;
                }
                break;
            }
        }
    }

    $output['status']['code'] = 200;
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $coordinates;
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