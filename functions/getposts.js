const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const filePath = path.join(__dirname, 'posts.json');

    let posts = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        posts = JSON.parse(fileData);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(posts),
    };
};
