<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evil Butterfly Simulator</title>
    <link rel="stylesheet" href="Index.css">
</head>
<body>
    <audio autoplay loop> 
        <source src="music/evilmusic.mp3" type="audio/mpeg">
</audio>
    <img src="logo/butterfly logo.png" width="50%px">
    <br><br><br>
    <input type="button" onclick="togame(event)" style="padding: 15px 5%; font-size: 25px;" value="Click to Test Your Fate">
    <br><br>
    <script>
        function togame(event) {
            event.preventDefault(); 
            window.location = "game.php"; 
        }
    </script>
</body>
</html>
<BR><BR>
<footer>Grease fire inc.</footer>
