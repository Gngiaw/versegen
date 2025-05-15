'use client';
import { useState } from "react";

export default function VerseGen() {
  const [lyrics, setLyrics] = useState("");
  const [style, setStyle] = useState("");
  const [title, setTitle] = useState("");
  const [tempo, setTempo] = useState("medium");
  const [voice, setVoice] = useState("random");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const styleSuggestions = ["pop", "rock", "jazz", "classical", "edm", "hip hop"];

  const handleGenerate = () => {
    setLoading(true);
    setAudioUrl("");

    // 🔥 替换为保证可播放的MP3测试链接
    setTimeout(() => {
      setAudioUrl("/demo.mp3");

      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 space-y-6">
      <h1 className="text-4xl font-bold text-fuchsia-500 mt-4">VerseGen</h1>
      <p className="text-gray-400">Turn your lyrics into music with a single click.</p>

      <div className="w-full max-w-xl space-y-4">

        <div>
          <h2 className="text-lg font-semibold text-fuchsia-400 mb-1">Title <span className="text-red-500">*</span></h2>
          <input
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-fuchsia-500"
            type="text"
            placeholder="Enter a memorable title for your song..."
            maxLength={30}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-fuchsia-400 mb-1">Lyrics / Description</h2>
          <textarea
            className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-fuchsia-500"
            rows={5}
            placeholder="Enter your lyrics or a music description..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-fuchsia-400 mb-1">Styles</h2>
          <input
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-fuchsia-500"
            type="text"
            placeholder="Enter styles: Pop, Rock, Jazz, etc."
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            list="style-suggestions"
          />
          <datalist id="style-suggestions">
            {styleSuggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-fuchsia-400 mb-1">Voice Type</h2>
          <select
            className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="random">Random</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="child-male">Boy</option>
            <option value="child-female">Girl</option>
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-fuchsia-400 mb-1">Tempo</h2>
          <select
            className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-fuchsia-500"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>

        <div className="flex flex-col items-center pt-4 space-y-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-lg px-6 py-3 rounded-2xl shadow-lg transition"
          >
            {loading ? "Generating..." : "Verse Me"}
          </button>

          {loading && (
            <p className="text-fuchsia-300 animate-pulse">We are summoning the music fairy... 🧚‍♀️</p>
          )}
        </div>
      </div>

      {audioUrl && (
        <div className="bg-gray-900 text-white w-full max-w-xl mt-6 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">{title || "Your Track"}</h2>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <a
            href={audioUrl}
            download={title ? `${title}.mp3` : "VerseGenTrack.mp3"}
            className="mt-4 inline-block bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-xl text-sm shadow transition"
          >
            Download Song
          </a>
        </div>
      )}
    </div>
  );
}
