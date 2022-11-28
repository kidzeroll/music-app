import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
	const dispatch = useDispatch();
	const { songid } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
	const { data, isFetching: isFetchingRelatedSong, error } = useGetSongRelatedQuery({ songid });

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	if (isFetchingSongDetails || isFetchingRelatedSong) return <Loader title="Searching song detail" />;
	if (error) return <Error />;
	return (
		<div className="flex flex-col">
			<DetailsHeader artistId="" songData={songData} />
			<div className="mb-10">
				<h2 className="text-3xl font-bold text-white">Lyrics :</h2>

				<div className="mt-5">
					{songData?.sections[1].type === "LYRICS" ? (
						songData?.sections[1].text.map((line, i) => <p className="my-1 text-base text-gray-400">{line}</p>)
					) : (
						<p className="my-1 text-base text-gray-400">Sorry no Lyrics avaible!.</p>
					)}
				</div>
			</div>

			<RelatedSongs
				data={data}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	);
};

export default SongDetails;
