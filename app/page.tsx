// app/page.tsx
'use client';
import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

export default function VerseGen() {
  const [lyrics, setLyrics] = useState("");
  const [style, setStyle] = useState("");
  const [title, setTitle] = useState("");
  const [tempo, setTempo] = useState("medium");
  const [voice, setVoice] = useState("random");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const styleSuggestions = ["pop", "rock", "jazz", "classical", "edm", "hip hop"];

  const handleGenerate = async () => {
    setLoading(true);
    setAudioUrl("");
    try {
      const response = await fetch("https://huggingface.co/spaces/facebook/MusicGen/resolve/main/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `${lyrics}. Style: ${style || 'pop'}. Tempo: ${tempo}. Voice: ${voice}`
        })
      });
      const result = await response.json();
      if (result && result.audio_url) {
        setAudioUrl(result.audio_url);
      } else {
        alert("Failed to generate audio. Try again later.");
      }
    } catch (err) {
      console.error("Generation failed", err);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#000000" },
          particles: {
            number: { value: 60 },
            color: { value: "#b26bff" },
            links: { enable: true, color: "#b26bff" },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
            size: { value: 3 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-start p-6 space-y-6">
        <h1 className="text-4xl font-bold text-fuchsia-500 mt-4">VerseGen</h1>
        <p className="text-gray-400">Turn your lyrics into music with a single click.</p>

        <div className="w-full max-w-xl space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" className="w-full p-3 rounded bg-gray-900 border border-gray-700" />
          <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} placeholder="Lyrics / Description" rows={4} className="w-full p-3 rounded bg-gray-900 border border-gray-700" />
          <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Styles (Pop, Rock, Jazz...)" list="style-suggestions" className="w-full p-3 rounded bg-gray-900 border border-gray-700" />
          <datalist id="style-suggestions">
            {styleSuggestions.map(s => <option key={s} value={s} />)}
          </datalist>
          <select value={voice} onChange={(e) => setVoice(e.target.value)} className="w-full p-3 rounded bg-gray-900 border border-gray-700">
            <option value="random">Random</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="child-male">Boy</option>
            <option value="child-female">Girl</option>
          </select>
          <select value={tempo} onChange={(e) => setTempo(e.target.value)} className="w-full p-3 rounded bg-gray-900 border border-gray-700">
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>

          <div className="flex flex-col items-center pt-4">
            <button onClick={handleGenerate} disabled={loading} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full shadow-lg">
              {loading ? "Summoning Music Fairy... 🧚‍♀️" : "Verse Me"}
            </button>
          </div>
        </div>

        {audioUrl && (
          <div className="bg-gray-900 w-full max-w-xl mt-6 p-4 rounded border border-gray-700 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">{title || "Your Track"}</h2>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <a
              href={audioUrl}
              download={title ? `${title}.mp3` : "VerseGenTrack.mp3"}
              className="mt-4 bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-xl text-sm"
            >
              Download Song
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

