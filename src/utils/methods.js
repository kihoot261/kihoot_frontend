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

    const duration = video.duration;
    const height = video.videoHeight;
    const targetBitrate = Math.min(2500000, Math.max(1500000, (height * height * 4) / duration))
    const stream = video.captureStream(30);
    const chunks = [];
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/mp4;codecs=vp9',
        videoBitsPerSecond: targetBitrate
    });

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    mediaRecorder.start();
    video.play();
    await new Promise((resolve) => {
        mediaRecorder.onstop = () => {
            URL.revokeObjectURL(video.src);
            video.pause();
            resolve();
        };
        video.onended = () => mediaRecorder.stop();
    });

    return new Blob(chunks, { type: 'video/webm' });
};

const getYearMonthDay = (today) => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getMinDate = () => {
    const today = new Date();
    return getYearMonthDay(today)
}

export const diffBetweenDates = (date1, date2) => {
    const endDate = new Date(date1);
    const startDate = new Date(date2);
    return (endDate - startDate) / (1000 * 60 * 60 * 24);
}

const utils = {
    checkNaturals,
    compressVideoRecorder,
    getMinDate,
    diffBetweenDates
};

export default utils;