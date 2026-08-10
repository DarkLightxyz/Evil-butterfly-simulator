<?php

echo '<a href="Index.php" class="btn-back">Go Back</a>';

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="game.css">
</head>
<body>
    <center><video onclick="vid_disappear(event)" width=90% autoplay muted id="startcutscene" class="video1">
        <source src="cutscenes/Intro+Cutscene.mp4" type="video/mp4">
    </video></center>
    <center><video onclick="towin(event)" width=90% autoplay muted id="endcutscene" class="video2">
        <source src="cutscenes/EndingCutscene.mp4" type="video/mp4">
    </video></center>
    <audio autoplay>
        <source src="music/bg music 1.wav" type="audio/wav">
    </audio>
    <div class="container">
        <center><canvas id="canvas" width=1200px height=560px class="canvas"></canvas></center>
        <script src="script.js"></script>
    </div>
</body>
</html>