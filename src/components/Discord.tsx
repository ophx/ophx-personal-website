import { useState, useEffect } from "react";

export default function Discord() {
    const [ spotify, setSpotify ] = useState({
        track_id: "",
        timestamps: {
            start: 0,
            end: 0,
        },
        album: "",
        album_art_url: "",
        artist: "",
        song: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.lanyard.rest/v1/users/459738097622712320");
            const data = await response.json();
            const spotifyData = data.data.spotify;

            setSpotify(spotifyData);
        };
    
        fetchData();
        setInterval(() => {
            fetchData();
        }, 1000);
    }, []);

    const calculateSpotifyProgress = () => {
        if (spotify.timestamps && spotify.timestamps.start && spotify.timestamps.end) {
            const currentTime = Date.now();
            const progress = ((currentTime - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start)) * 100;

            return Math.min(progress, 100);
        }

        return 0;
    };

    const formatTimestamp = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="fixed bottom-4 right-4 w-80">
			{spotify && (
                <div className="rounded-lg shadow-lg bg-card-background/50 border border-border px-4 py-2">
                    <p className="text-text-main text-sm font-medium mb-2 uppercase">Ophx Is Listening To Spotify</p>
                    <div className="flex items-start gap-2">
                        <div>
                            <img draggable="false" src={spotify.album_art_url} className="rounded-lg shadow-lg h-16 w-16 max-h-16 max-w-16" />
                        </div>
                        <div>
                            <a href={`https://open.spotify.com/track/${spotify.track_id}`} target="_blank" className="text-text-main font-medium hover:underline">{spotify.song}</a>
                            <p className="text-text-muted text-sm">By {spotify.artist}</p>
                            <p className="text-text-muted text-sm">On {spotify.album}</p>
                        </div>
                    </div>
                    <div className="relative w-full h-1 bg-blue-600/25 rounded-full mt-2">
                        <div className="absolute top-0 left-0 h-full bg-blue-700 rounded-full" style={{ width: `${calculateSpotifyProgress()}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-text-main text-sm">{formatTimestamp((Date.now() - spotify.timestamps.start) / 1000)}</p>
                        <p className="text-text-main text-sm">{formatTimestamp((spotify.timestamps.end - spotify.timestamps.start) / 1000)}</p>
                    </div>
                </div>
            )}
		</div>
    );
}