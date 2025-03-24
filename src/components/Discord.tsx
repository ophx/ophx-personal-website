import { useState, useEffect } from "react";

export default function Discord() {
    const [ user, setUser ] = useState({
        id: "",
        username: "",
        avatar: "",
        public_flags: 0,
    });
    const [ userStatus, setUserStatus ] = useState("1242127179655942195");
    const [ badges, setBadges ] = useState({
        badge_HYPESQUAD_ONLINE_HOUSE_1: false,
        badge_HYPESQUAD_ONLINE_HOUSE_2: false,
        badge_HYPESQUAD_ONLINE_HOUSE_3: false,
        badge_ACTIVE_DEVELOPER: false,
    });
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

    const calculateSpotifyProgress = () => {
        if (spotify.timestamps && spotify.timestamps.start && spotify.timestamps.end) {
            const currentTime = Date.now();
            const progress = ((currentTime - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start)) * 100;
            return Math.min(progress, 100);
        }
        return 0;
    };
    const formatTimestamp = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.lanyard.rest/v1/users/459738097622712320");
            const data = await response.json();
            const userData = data.data.discord_user;
            const statusData = data.data.discord_status;
            const spotifyData = data.data.spotify;

            console.log(data)
    
            setUser(userData);
            setSpotify(spotifyData);
    
            switch (statusData) {
                case "dnd":
                    setUserStatus("1242127177147744327");
                    break;
                case "offline":
                    setUserStatus("1242127179655942195");
                    break;
                case "online":
                    setUserStatus("1242127175902171136");
                    break;
                case "idle":
                    setUserStatus("1242127178309566547");
                    break;
                default:
                    setUserStatus("1242127179655942195");
                    break;
            }

            const HYPESQUAD_ONLINE_HOUSE_1 = 64;
            const HYPESQUAD_ONLINE_HOUSE_2 = 128;
            const HYPESQUAD_ONLINE_HOUSE_3 = 256;
            const ACTIVE_DEVELOPER = 4194304;
            const flags = userData.public_flags || 0;
            const badge_HYPESQUAD_ONLINE_HOUSE_1 = (flags & HYPESQUAD_ONLINE_HOUSE_1) === HYPESQUAD_ONLINE_HOUSE_1;
            const badge_HYPESQUAD_ONLINE_HOUSE_2 = (flags & HYPESQUAD_ONLINE_HOUSE_2) === HYPESQUAD_ONLINE_HOUSE_2;
            const badge_HYPESQUAD_ONLINE_HOUSE_3 = (flags & HYPESQUAD_ONLINE_HOUSE_3) === HYPESQUAD_ONLINE_HOUSE_3;
            const badge_ACTIVE_DEVELOPER = (flags & ACTIVE_DEVELOPER) === ACTIVE_DEVELOPER;

            setBadges({
                badge_HYPESQUAD_ONLINE_HOUSE_1,
                badge_HYPESQUAD_ONLINE_HOUSE_2,
                badge_HYPESQUAD_ONLINE_HOUSE_3,
                badge_ACTIVE_DEVELOPER,
            });
        };
    
        fetchData();
        setInterval(() => {
            fetchData();
        }, 1000);
    }, []);

    return (
        <div className="p-4 rounded-lg">
			<div className="flex items-start gap-4">
				<div>
					<div className="relative">
						<img draggable="false" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`} className="rounded-full shadow-lg h-20 w-20" />
						<img draggable="false" src={`https://cdn.discordapp.com/emojis/${userStatus}.webp?size=96&quality=lossless`} className="absolute bottom-0 left-14 transform translate-y-1/4 w-6 h-6 border-4 border-[#c084fc3b] bg-[#a955f71b] rounded-full" />
					</div>
				</div>
				<div>
					<p className="text-white font-medium text-2xl" id="userName">{user.username}</p>
					<div className="flex items-center border-2 border-[#c084fc3b] bg-[#a955f71b] rounded-lg shadow-lg px-1 py-0.5 mt-2">
						{badges.badge_HYPESQUAD_ONLINE_HOUSE_1 && (
                            <img draggable="false" src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/hypesquadbravery.svg" className="h-7 w-7" />
                        )}
                        {badges.badge_HYPESQUAD_ONLINE_HOUSE_2 && (
                            <img draggable="false" src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/hypesquadbrilliance.svg" className="h-7 w-7" />
                        )}
                        {badges.badge_HYPESQUAD_ONLINE_HOUSE_3 && (
                            <img draggable="false" src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/hypesquadbalance.svg" className="h-7 w-7" />
                        )}
                        {badges.badge_ACTIVE_DEVELOPER && (
                            <img draggable="false" src="https://raw.githubusercontent.com/mezotv/discord-badges/1d46c1feb168386ee2771d61397cf6b1eb4dde8f/assets/activedeveloper.svg" className="h-7 w-7" />
                        )}
					</div>
				</div>
			</div>
			<div className="border-2 border-[#c084fc3b] bg-[#a955f71b] rounded-lg shadow-lg p-4 mt-4">
				<div className="space-y-4">
                    {!spotify && (
                        <p className="text-gray-300 text-sm">Not Listening To Anything...</p>
                    )}

                    {spotify && (
                        <div>
                            <p className="text-white text-sm font-medium mb-1 uppercase">Listening To Spotify</p>
                            <div className="flex items-start gap-4">
                                <div>
                                    <img draggable="false" src={spotify.album_art_url} className="rounded-lg shadow-lg h-16 w-16" />
                                </div>
                                <div>
                                    <a href={`https://open.spotify.com/track/${spotify.track_id}`} target="_blank" className="text-white font-medium hover:underline">{spotify.song}</a>
                                    <p className="text-gray-300 text-sm">By {spotify.artist}</p>
                                    <p className="text-gray-300 text-sm">On {spotify.album}</p>
                                </div>
                            </div>
                            <div className="relative w-full h-1 bg-[#a955f71b] rounded-full mt-2">
                                <div className="absolute top-0 left-0 h-full bg-[#c084fc3b] rounded-full" style={{ width: `${calculateSpotifyProgress()}%` }}></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-white text-sm">{formatTimestamp((Date.now() - spotify.timestamps.start) / 1000)}</p>
                                <p className="text-white text-sm">{formatTimestamp((spotify.timestamps.end - spotify.timestamps.start) / 1000)}</p>
                            </div>
                        </div>
                    )}
                </div>
			</div>
		</div>
    );
}