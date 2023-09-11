const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

app.get("/", (req, res) => {
    const slackName = req.query.slack_name;
    const track = req.query.track;

    const gitHubUrl = 'https://github.com/ndiuel/hng_stage_1';
    const gitHubFileUrl = 'https://github.com/ndiuel/hng_stage_1/blob/main/index.js';

    const localTIme = new Date();
    const utcTime = new Date(
        localTIme.getUTCFullYear(), localTIme.getUTCMonth(),
        localTIme.getUTCDate(), localTIme.getUTCHours(),
        localTIme.getUTCMinutes(), localTIme.getUTCSeconds()
    );
    
    res.json({
        'slack_name': slackName,
        'track': track,
        'github_repo_url': gitHubUrl,
        'github_file_url': gitHubFileUrl, 
        'current_day': days[localTIme.getDay()],
        'utc_time': utcTime.toISOString(),
        'status_code': 200
    })
});

app.listen(3000, function (req, res) {
    console.log("Server is running at port 3000");
});

module.exports = app;