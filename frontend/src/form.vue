<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="/src/style.css" rel="stylesheet">
  <title>Pursuit - Today's goals</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
  <h1>Today's goals</h1>

  <form>
    <h2>Séance de sport</h2>
    <button type="button"></button>

    <label for="type-select">Choose a type&nbsp;:</label>

    <select name="type" id="type-select">
      <option value="">--Please choose an option--</option>
    </select>

    <button type="button">Delete</button>
    <button type="button">Edit</button>
  </form>
</body>

</html>