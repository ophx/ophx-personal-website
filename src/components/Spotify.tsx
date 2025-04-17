import { useState, useEffect } from "react";
import { useLanyard } from "react-use-lanyard";

export default function Spotify() {
    const [ tick, setTick ] = useState(0);
    const { loading, status } = useLanyard({
        userId: "459738097622712320",
        socket: true
    });

    useEffect(() => {
        if (!loading && status) {
            console.log("Socket connection established (api.lanyard.rest)");
        }
    }, [ loading, status ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [ status?.listening_to_spotify ]);

    const calculateSpotifyProgress = () => {
        if (status?.spotify.timestamps && status?.spotify.timestamps.start && status?.spotify.timestamps.end) {
            const currentTime = Date.now();
            const progress = ((currentTime - status?.spotify.timestamps.start) / (status?.spotify.timestamps.end - status?.spotify.timestamps.start)) * 100;

            return Math.min(progress, 100);
        }

        return 0;
    };

    const formatTimestamp = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    if (!loading && status?.listening_to_spotify) {
        return (
            <div className="fixed bottom-4 right-4 w-80 z-10">
                <div className="flex flex-col">
                    <div className="bg-green-500 px-2 py-1 rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-5 fill-white">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                            <p className="text-text-main text-sm font-medium">Listening To Spotify</p>
                        </div>
                    </div>
                    <div className="rounded-b-lg shadow-lg bg-card-background/50 backdrop-blur-lg border border-border px-4 py-2">
                        <div className="flex items-start gap-2">
                            <div>
                                <img draggable="false" src={status?.spotify.album_art_url} className="rounded-lg shadow-lg h-16 w-16 max-h-16 max-w-16" />
                            </div>
                            <div>
                                <a href={`https://open.spotify.com/track/${status?.spotify.track_id}`} target="_blank" className="text-text-main font-medium hover:underline">{status?.spotify.song}</a>
                                <p className="text-text-muted text-sm">By {status?.spotify.artist}</p>
                                <p className="text-text-muted text-sm">On {status?.spotify.album}</p>
                            </div>
                        </div>
                        <div className="relative w-full h-1 bg-green-500/25 rounded-full mt-2">
                            <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{ width: `${calculateSpotifyProgress()}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-text-main text-sm">{formatTimestamp((Date.now() - status?.spotify.timestamps.start) / 1000)}</p>
                            <p className="text-text-main text-sm">{formatTimestamp((status?.spotify.timestamps.end - status?.spotify.timestamps.start) / 1000)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="fixed bottom-4 right-4 w-80 z-10">
                <div className="flex flex-col">
                    <div className="rounded-lg shadow-lg bg-card-background/50 backdrop-blur-lg border border-border px-4 py-2">
                        <div className="flex items-center gap-2">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-5 fill-white">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                            <p className="text-text-main text-sm font-medium">Not Listening To Anything...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}