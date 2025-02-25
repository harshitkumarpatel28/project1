<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);

try {
    $myfile = fopen("../data/countryBorders.json", "r") or die("Unable to open file!");
    $data = fread($myfile,filesize("../data/countryBorders.json"));
    fclose($myfile);

    $resultData = [];
    foreach (json_decode($data)->features as $key => $value) {
        $resultData[] = ['name' => $value->properties->name, 'countryCode' => $value->properties->iso_a2];
    }

    $output['status']['code'] = 200;
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data']['countries'] = $resultData;
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