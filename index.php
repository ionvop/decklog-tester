<?php

$data = json_decode($_POST["data"], true);
echo "Processing data...<br>";
ob_flush();
flush();

foreach ($data["deckImages"] as $key => $value) {
    $max = count($data["deckImages"]);
    $current = $key + 1;
    $percent = round($current / $max * 100) . "%";
    echo "{$current}/{$max} GET {$data['deckImages'][$key]['data']}";
    ob_flush();
    flush();
    $data["deckImages"][$key]["data"] = "data:image/png;base64," . base64_encode(file_get_contents($data["deckImages"][$key]["data"]));
    echo " done {$percent}<br>";
    ob_flush();
    flush();
}

file_put_contents("data.json", json_encode($data, JSON_PRETTY_PRINT));
echo "ok";

echo <<<HTML
    <script>
        location.href = "app/";
    </script>
HTML;