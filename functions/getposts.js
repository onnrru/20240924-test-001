const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const postId = event.queryStringParameters.id; // URL 쿼리에서 게시글 ID를 가져옵니다.
    const filePath = path.join(__dirname, 'posts.json');
    
    let posts = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        posts = JSON.parse(fileData);
    }

    const post = posts.find(p => p.id == postId);

    if (!post) {
        return {
            statusCode: 404,
            body: '게시글을 찾을 수 없습니다.',
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(post),
    };
};
