export const checkNaturals = (nat) => {
    const num = parseInt(nat);
    return num >= 0 ? nat : 0;
}

export const compressVideoRecorder = async (file) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
    });

    const stream = video.captureStream();
    const chunks = [];
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 1000000
    });

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => URL.revokeObjectURL(video.src);

    mediaRecorder.start();
    video.play();
    await new Promise((resolve) => {
        mediaRecorder.onstop = () => {
            video.pause();
            resolve();
        };
        video.onended = () => mediaRecorder.stop();
    });

    return new Blob(chunks, { type: 'video/webm' });
};

const utils = {
    checkNaturals,
    compressVideoRecorder
};

export default utils;