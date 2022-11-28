import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

	const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");

	if (isFetching) return <Loader title="Loading songs..." />;

	if (error) return <Error />;
	const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center justify-between w-full mt-4 mb-10 sm:flex-row">
				<h2 className="text-3xl font-bold text-left text-white">Discover {genreTitle || "Pop"}</h2>
				<select
					onChange={(e) => dispatch(selectGenreListId(e.target.value))}
					value={genreListId || "POP"}
					className="p-3 mt-5 text-sm text-gray-300 bg-black rounded-lg outline-none sm:mt-0"
				>
					{genres.map((genre) => (
						<option key={genre.value} value={genre.value}>
							{genre.title}
						</option>
					))}
				</select>
			</div>
			<div className="flex flex-wrap justify-center gap-8 sm:justify-start">
				{data?.map((song, i) => (
					<SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} data={data} i={i} />
				))}
			</div>
		</div>
	);
};

export default Discover;
