import { loader } from "../assets";

const Loader = ({ title }) => (
	<div className="flex flex-col items-center justify-center w-full">
		<img src={loader} alt="loader" className="object-contain w-32 h-32" />
		<h1 className="mt-2 text-2xl font-bold text-white">{title || "Loading..."}</h1>
	</div>
);

export default Loader;
