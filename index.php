<?php

$data = json_decode($_POST["data"], true);

foreach ($data["deckImages"] as $key => $value) {
    $data["deckImages"][$key]["data"] = "data:image/png;base64," . base64_encode(file_get_contents($data["deckImages"][$key]["data"]));
    echo $data["deckImages"][$key]["name"] . " done<br>";
    flush();
}

file_put_contents("data.json", json_encode($data, JSON_PRETTY_PRINT));
echo "ok";

echo <<<HTML
    <script>
        location.href = "app/";
    </script>
HTML;