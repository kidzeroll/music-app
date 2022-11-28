import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
	<div className="flex flex-row items-center w-full p-4 py-2 mb-2 rounded-lg cursor-pointer hover:bg-[#4c426e]">
		<h3 className="mr-3 text-base font-bold text-white">{i + 1}.</h3>
		<div className="flex flex-row items-center justify-between flex-1">
			<img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
			<div className="flex flex-col justify-center flex-1 mx-3">
				<Link to={`/songs/${song.key}`}>
					<p className="text-xl font-bold text-white">{song?.title}</p>
				</Link>
				<Link to={`/artists/${song?.artists[0].adamid}`}>
					<p className="mt-1 text-base text-gray-300">{song?.subtitle}</p>
				</Link>
			</div>
		</div>

		<PlayPause
			isPlaying={isPlaying}
			activeSong={activeSong}
			song={song}
			handlePause={handlePauseClick}
			handlePlay={handlePlayClick}
		/>
	</div>
);

const TopPlay = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data } = useGetTopChartsQuery();
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	});

	const topPlays = data?.slice(0, 5);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	return (
		<div ref={divRef} className="mb-6 ml-0 xl:ml-6 xl:mb-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
			<div className="flex flex-col w-full">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-2xl font-bold text-white">Top Charts</h2>
					<Link to="/top-charts">
						<p className="text-base text-gray-300 cursor-pointer">See more</p>
					</Link>
				</div>

				<div className="flex flex-col gap-1 mt-4">
					{topPlays?.map((song, i) => (
						<TopChartCard
							key={song.key}
							song={song}
							i={i}
							isPlaying={isPlaying}
							activeSong={activeSong}
							handlePauseClick={handlePauseClick}
							handlePlayClick={() => handlePlayClick(song, i)}
						/>
					))}
				</div>
			</div>

			<div className="flex flex-col justify-between w-full mt-8">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-2xl font-bold text-white">Top Artist</h2>
					<Link to="/top-artists">
						<p className="text-base text-gray-300 cursor-pointer">See more</p>
					</Link>
				</div>

				<Swiper
					slidesPerView="auto"
					spaceBetween={15}
					freeMode
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className="mt4"
				>
					{topPlays?.map((song, i) => (
						<SwiperSlide
							key={song?.key}
							style={{ width: "25%", height: "auto" }}
							className="rounded-full shadow-lg animate-slideright"
						>
							<Link to={`/artists/${song?.artists[0].adamid}`}>
								<img src={song?.images.background} alt="name" className="object-cover w-full rounded-full" />
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default TopPlay;
