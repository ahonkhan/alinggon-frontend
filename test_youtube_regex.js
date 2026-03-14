
function extractYouTubeId(url) {
    if (url.length === 11) return url;
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = match && match[1].length === 11 ? match[1] : "";
    console.log(`URL: ${url} -> ID: ${id} (match: ${match ? match[1] : 'null'})`);
    return id;
}

const testUrls = [
    "https://www.youtube.com/watch?v=7IQ-qwkk18w",
    "https://youtu.be/7IQ-qwkk18w?si=1UU_TGgta1LQFS3l",
    "https://youtube.com/shorts/7IQ-qwkk18w",
    "https://youtube.com/embed/7IQ-qwkk18w",
    "7IQ-qwkk18w"
];

testUrls.forEach(extractYouTubeId);
