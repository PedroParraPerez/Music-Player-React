import React, { useState, useEffect } from "react";
import playbutton from "../../img/playbutton.png";

//create your first component
const MusicPlayer = () => {
	let URLAPI = "https://assets.breatheco.de/apis/sound";
	const [songList, setSongList] = useState([]);
	const [isRunning, setIsRunning] = useState({});

	useEffect(() => {
		TakeSongList();
	}, []);

	const TakeSongList = () => {
		fetch(URLAPI.concat("/songs"), {
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

	function Song(name, position, url, id) {
		this.name = name;
		this.position = position;
		this.url = url;
		this.id = id;
	}

	const NextSong = () => {
		let position = isRunning.position + 1;

		if (position < songList.length) {
			setIsRunning(
				new Song(
					songList[position].name,
					position,
					songList[position].url,
					songList[position].id
				)
			);
		} else {
			setIsRunning(
				new Song(0, songList[0].name, songList[0].url, songList[0].id)
			);
		}
	};

	const LastSong = () => {
		let position = isRunning.position - 1;

		if (position > 0) {
			setIsRunning(
				new Song(
					songList[position].name,
					position,
					songList[position].url,
					songList[position].id
				)
			);
		} else {
			setIsRunning(
				new Song(
					songList[songList.length - 1].name,
					songList.length - 1,
					songList[songList.length - 1].url,
					songList[songList.length - 1].id
				)
			);
		}
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
							<ul className="p-0 playlist">
								{songList
									? songList.map((song, index) => {
											return (
												<li
													onClick={() => {
														setIsRunning({
															id: song.id,
															position: index,
															name: song.name,
															url: song.url,
														});
													}}
													className="song d-flex justify-content-between text-capitalize p-1 "
													key={index}>
													{song.id + " "}
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
								{isRunning.name
									? isRunning.name.toUpperCase()
									: ""}
							</span>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-2 d-flex justify-content-center buttons_song">
						<button
							className="NextAndLast"
							onClick={() => {
								LastSong();
							}}>
							{" "}
							<i className="fas fa-backward"></i>{" "}
						</button>
					</div>
					<div className="col-8">
						<audio
							className="audiocontrols mt-3"
							controls
							autoPlay
							onEnded={() => {
								NextSong();
							}}
							src={URLAPI.concat("/" + isRunning.url)}
						/>
					</div>
					<div className="col-2 d-flex justify-content-center buttons_song">
						<button
							className="NextAndLast"
							onClick={() => {
								NextSong();
							}}>
							{" "}
							<i className="fas fa-forward"></i>{" "}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MusicPlayer;
