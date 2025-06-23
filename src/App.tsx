import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import VideoRecorder from './components/VideoRecorder';
import './App.css';

const App: React.FC = () => {
  const [mode, setMode] = useState<'audio' | 'video'>('audio');

  return (
    <div className="App">
      <h1>Audio & Video Recorder App</h1>

      <div>
        <button onClick={() => setMode('audio')} disabled={mode === 'audio'}>
          Audio Mode
        </button>
        <button onClick={() => setMode('video')} disabled={mode === 'video'}>
          Video Mode
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {mode === 'audio' ? <AudioRecorder /> : <VideoRecorder />}
      </div>
    </div>
  );
};

export default App;
