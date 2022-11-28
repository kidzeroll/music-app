import SongBar from "./SongBar";

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (
	<div className="flex flex-col">
		<h1 className="text-3xl font-bold text-white">Related Songs:</h1>

		<div className="flex flex-col w-full mt-6">
			{data?.map((song, i) => (
				<SongBar
					key={`${song.key}-${artistId}`}
					song={song}
					i={i}
					artistId={artistId}
					isPlaying={isPlaying}
					activeSong={activeSong}
					handlePauseClick={handlePauseClick}
					handlePlayClick={handlePlayClick}
				/>
			))}
		</div>
	</div>
);

export default RelatedSongs;
