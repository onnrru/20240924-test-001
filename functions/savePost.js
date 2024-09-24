const fs = require('fs'); // 파일을 읽고 쓰기 위해 Node.js의 파일 시스템 모듈(fs)을 불러옵니다.
const path = require('path'); // 경로를 다루기 위해 Node.js의 경로 모듈(path)을 불러옵니다.

exports.handler = async function(event, context) {
    // 서버리스 함수의 기본 핸들러 함수입니다.
    // 'event'는 요청 정보를 담고, 'context'는 함수 실행에 대한 메타데이터를 담습니다.

    if (event.httpMethod !== 'POST') {
        // 요청이 POST 메소드가 아닌 경우에는 405 에러 (Method Not Allowed)를 반환합니다.
        return {
            statusCode: 405, // 405: 허용되지 않는 HTTP 메소드
            body: 'Method Not Allowed', // 에러 메시지
        };
    }

    // 요청의 본문(body)에서 JSON 데이터를 파싱합니다.
    const data = JSON.parse(event.body);

    // 게시글을 저장할 파일 경로를 설정합니다.
    const filePath = path.join(__dirname, 'posts.json');
    // __dirname: 현재 파일의 디렉토리 경로
    // 'posts.json' 파일에 게시글을 저장할 예정입니다.

    let posts = []; // 게시글 목록을 담을 배열을 초기화합니다.
    
    // 게시글 파일이 존재하는지 확인하고, 파일이 있으면 기존 데이터를 읽어옵니다.
    if (fs.existsSync(filePath)) {
        // fs.existsSync()는 파일이 존재하는지 여부를 확인합니다.
        const fileData = fs.readFileSync(filePath); // 파일 내용을 읽어옵니다.
        posts = JSON.parse(fileData); // 읽은 데이터를 JSON으로 변환하여 게시글 목록에 저장합니다.
    }

    // 새로운 게시글을 배열에 추가합니다.
    posts.push({
        id: Date.now(), // 현재 시간(밀리초)을 ID로 사용합니다. 고유한 게시글 ID를 생성합니다.
        title: data.title, // 요청으로 받은 게시글 제목
        content: data.content, // 요청으로 받은 게시글 내용
    });

    // 업데이트된 게시글 목록을 다시 파일에 저장합니다.
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2)); 
    // JSON.stringify(posts, null, 2): 게시글 배열을 JSON 포맷으로 변환하여 저장합니다.
    // 2는 JSON 포맷을 읽기 좋게 들여쓰기(indent)를 2칸씩 설정한다는 의미입니다.

    return {
        statusCode: 200, // 성공 시 200 상태 코드를 반환합니다.
        body: JSON.stringify({ message: '게시글이 저장되었습니다.' }),
        // 요청 응답 본문에 성공 메시지를 JSON 형태로 반환합니다.
    };
};
