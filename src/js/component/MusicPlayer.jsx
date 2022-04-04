import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const MusicPlayer = () => {
	const [songList, setSongList] = useState("");
	const [urlsong, setUrlsong] = useState("");

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
			<h1>Music Player</h1>

			<ul>
				{songList
					? songList.map((song, i) => {
							return (
								<li
									key={i}
									onClick={() => {
										setUrlsong(
											"https://assets.breatheco.de/apis/sound/" +
												song.url
										);
										console.log(urlsong);
									}}>
									{song.name}
								</li>
							);
					  })
					: ""}
			</ul>
			<audio controls autoPlay src={urlsong}>
				Your browser does not support the
				<code>audio</code> element.
			</audio>
		</>
	);
};

export default MusicPlayer;

// text.replace("Microsoft", "sdffds");
