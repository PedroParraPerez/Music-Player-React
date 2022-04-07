import React, { useState, useEffect } from "react";
import playbutton from "../../img/playbutton.png";
import nextsong from "../../img/next_song.png";
import lastsong from "../../img/last_song.png";
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
			<div className=" container-fluid justify-content-center mt-5  wrap">
				<div className="row ">
					<div className="col-12">
						<h1 className="title text-center fw-bold text-decoration-underline mb-4 pt-3">
							Music Player
						</h1>
					</div>
					<div className="row">
						<div className="col-12">
							<ul className="p-0">
								{songList
									? songList.map((song, index) => {
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
													key={index}>
													{song.name}
													<span className="song_play_button ">
														<img
															className="songlistbutton"
															src={playbutton}
														/>
													</span>
												</li>
											);
									  })
									: ""}
							</ul>
						</div>
					</div>

					<div className="row song_playing">
						<div className="col-12">
							<span className="fw-bold isplaying">
								Esta sonando:{" "}
							</span>
							<span className="fw-bold text-decoration-underline isplaying">
								{namesong ? namesong.toUpperCase() : ""}
							</span>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-2 d-flex justify-content-center">
						<img clasName="song_controls" src={lastsong} />
					</div>
					<div className="col-8">
						<audio
							className="audiocontrols mt-3"
							controls
							autoPlay
							src={urlsong}
						/>
					</div>
					<div className="col-2 d-flex justify-content-center">
						<img clasName="song_controls" src={nextsong} />
					</div>
				</div>
			</div>
		</>
	);
};

export default MusicPlayer;
