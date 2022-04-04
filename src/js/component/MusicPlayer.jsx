import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const MusicPlayer = () => {
	const [songList, setSongList] = useState("");

	useEffect(() => {
		TakeSongList();
	}, []);

	const TakeSongList = () => {
		fetch("https://assets.breatheco.de/apis/sound/fx", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setSongList(data);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

	return (
		<>
			<h1>Music Player</h1>
			<ul>
				{songList
					? songList.map((song, i) => {
							return (
								<li key={i}>
									{song.name}
									<p>{song.category.toUpperCase()}</p>
								</li>
							);
					  })
					: ""}
			</ul>
			<div class="col-sm-4 col-sm-offset-4 embed-responsive embed-responsive-4by3">
				<audio controls class="embed-responsive-item">
					<source
						src={
							"https://assets.breatheco.de/apis/sound/" +
							"files/mario/fx_gameover.wav"
						}
					/>
				</audio>
			</div>
		</>
	);
};

export default MusicPlayer;

// text.replace("Microsoft", "sdffds");
