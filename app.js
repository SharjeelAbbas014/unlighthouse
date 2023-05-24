const express = require('express')
const app = express()
const port = 3002
const { exec } = require('child_process');

app.get('/', (req, res) => {
    exec('sh unlighthouse.sh',
    (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})