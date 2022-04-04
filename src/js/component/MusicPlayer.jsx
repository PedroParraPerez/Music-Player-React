import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

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
			<div className="d-flex m-0 mt-5 justify-content-center  wrap">
				<div className="d-block">
					<h1 className="title text-center">Music Player</h1>

					<ul className="p-0">
						{songList
							? songList.map((song, i) => {
									return (
										<li
											className="song d-flex justify-content-between"
											key={i}>
											{song.name}
											<span
												className="song_play_button"
												onClick={() => {
													setUrlsong(
														"https://assets.breatheco.de/apis/sound/" +
															song.url
													);
													setNamesong(song.name);
													console.log(urlsong);
												}}>
												Reproducir
											</span>
										</li>
									);
							  })
							: ""}
					</ul>
					<div className="song_playing">
						<span>Esta sonando: </span>
						<span>{namesong ? namesong : ""}</span>
					</div>
					<audio
						className="audiocontrols mt-3"
						controls
						autoPlay
						src={urlsong}>
						Your browser does not support the
						<code>audio</code> element.
					</audio>
				</div>
			</div>
		</>
	);
};

export default MusicPlayer;

// text.replace("Microsoft", "sdffds");
