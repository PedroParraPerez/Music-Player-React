import React, { useState, useEffect } from "react";
import playbutton from "../../img/playbutton.png";

//create your first component
const MusicPlayer = () => {
	const [songList, setSongList] = useState("");
	const [urlsong, setUrlsong] = useState("");
	const [namesong, setNamesong] = useState("");

	useEffect(() => {
		TakeSongList();
	}, []);

	const TakeSongList = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setSongList(data);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

	return (
		<>
			{" "}
			<div className="  justify-content-center mt-5  wrap">
				<div className="d-block">
					<h1 className="title text-center fw-bold text-decoration-underline mb-4 pt-3">
						Music Player
					</h1>

					<ul className="p-0">
						{songList
							? songList.map((song, i) => {
									return (
										<li
											onClick={() => {
												setUrlsong(
													"https://assets.breatheco.de/apis/sound/" +
														song.url
												);
												setNamesong(song.name);
											}}
											className="song d-flex justify-content-between text-capitalize p-1"
											key={i}>
											{song.name}
											<span className="song_play_button ">
												<img
													clasName="songlistbutton"
													src={playbutton}
												/>
											</span>
										</li>
									);
							  })
							: ""}
					</ul>
					<div className="song_playing">
						<span className="fw-bold isplaying">
							Esta sonando:{" "}
						</span>
						<span className="fw-bold text-decoration-underline isplaying">
							{namesong ? namesong.toUpperCase() : ""}
						</span>
					</div>
					<audio
						className="audiocontrols mt-3"
						controls
						autoPlay
						src={urlsong}
					/>
				</div>
			</div>
		</>
	);
};

export default MusicPlayer;
