const fs = require('fs');

module.exports = function endpoints(app)
{
    const apiFiles = fs.readdirSync('./src/api');

    const apiBase = '/api/v1';

    app.get("/health", (req, res) =>
    {
        res.send({ success: true, message: "It is working" });
    });

    for (let apiFile of apiFiles)
    {
        let apiEndpoint = apiFile.replace('.js', '');
        app.use(apiBase + '/' + apiEndpoint, require(`./api/${apiFile}`));
    }
}