<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="/src/style.css" rel="stylesheet">
  <title>Pursuit - Create a goal</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
  <h1>Enter your new goal</h1>
  <label for="name">Enter goal's name&nbsp;:</label>

  <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" />

  <label for="type-select">Choose a type&nbsp;:</label>

  <select name="type" id="type-select">
    <option value="">--Please choose an option--</option>
  </select>

  <input type="text" id="name" name="name" required minlength="1" maxlength="30" size="30" />

  <button type="submit">Create Goal</button>
  <button type="button" onclick="window.history.back();">Back</button>

</body>

</html>