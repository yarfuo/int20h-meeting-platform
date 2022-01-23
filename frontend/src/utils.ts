export async function getVideoStream() {
  const constraints = {
    video: {
      width: { min: 160, ideal: 640, max: 1280 },
      height: { min: 120, ideal: 360, max: 720 },
    },
    audio: true,
  }
  return await navigator.mediaDevices.getUserMedia(constraints)
}
