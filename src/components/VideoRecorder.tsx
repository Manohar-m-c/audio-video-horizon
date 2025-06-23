import React, { useState, useRef } from 'react';

const VideoRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        videoChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        videoChunks.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Camera permission denied:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(track => track.stop());
    setRecording(false);
  };

  return (
    <div>
      <h2>Video Recorder</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: '400px', height: '300px', border: '1px solid black' }}
      ></video>
      <br />
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {videoUrl && (
        <div>
          <h3>Preview</h3>
          <video
            controls
            src={videoUrl}
            style={{ width: '400px', height: '300px' }}
          ></video>
          <a href={videoUrl} download="recording.webm">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
