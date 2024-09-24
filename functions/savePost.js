const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const data = JSON.parse(event.body);

    const filePath = path.join(__dirname, 'posts.json');
    
    let posts = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        posts = JSON.parse(fileData);
    }

    // 새로운 게시글 추가
    posts.push({
        id: Date.now(), // 고유 ID로 현재 시간을 사용
        title: data.title,
        content: data.content,
    });

    // 게시글을 파일에 저장
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: '게시글이 저장되었습니다.' }),
    };
};
