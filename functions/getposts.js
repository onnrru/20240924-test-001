const fs = require('fs'); // 파일 시스템 모듈(fs)을 사용하여 파일을 읽습니다.
const path = require('path'); // 경로 처리를 위해 Node.js의 경로 모듈을 불러옵니다.

exports.handler = async function(event, context) {
    // 이 함수는 서버리스 함수로서 게시글 목록을 불러오는 역할을 합니다.

    const filePath = path.join(__dirname, 'posts.json');
    // __dirname: 현재 파일의 디렉토리 경로
    // 게시글이 저장된 'posts.json' 파일 경로를 설정합니다.

    let posts = []; // 게시글 목록을 담을 배열을 초기화합니다.

    if (fs.existsSync(filePath)) {
        // 'posts.json' 파일이 존재하면 파일을 읽어서 게시글 목록을 불러옵니다.
        const fileData = fs.readFileSync(filePath); // 파일을 읽습니다.
        posts = JSON.parse(fileData); // 읽어온 데이터를 JSON 형태로 변환하여 배열에 저장합니다.
    }

    return {
        statusCode: 200, // 성공 시 200 상태 코드를 반환합니다.
        body: JSON.stringify(posts), 
        // 게시글 목록을 JSON 형태로 반환합니다.
    };
};
