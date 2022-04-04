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
			<div className="  justify-content-center  wrap">
				<div className="d-block">
					<h1 className="title text-center fw-bold text-decoration-underline mb-4">
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
											className="song d-flex justify-content-between text-capitalize"
											key={i}>
											{song.name}
											<span className="song_play_button ">
												<img
													clasName="songlistbutton"
													src="https://img.icons8.com/flat-round/64/000000/play--v1.png"
												/>
											</span>
										</li>
									);
							  })
							: ""}
					</ul>
					<div className="song_playing">
						<span className="fw-bold">Esta sonando: </span>
						<span className="fw-bold text-decoration-underline">
							{namesong ? namesong.toUpperCase() : ""}
						</span>
					</div>
					<audio
						className="audiocontrols mt-3"
						controls
						autoPlay
						src={urlsong}></audio>
				</div>
			</div>
		</>
	);
};

export default MusicPlayer;

// text.replace("Microsoft", "sdffds");
