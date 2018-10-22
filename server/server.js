const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
