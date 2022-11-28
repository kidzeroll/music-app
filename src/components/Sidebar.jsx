import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
	<div className="mt-10">
		{links.map((item) => (
			<NavLink
				key={item.name}
				to={item.to}
				className="flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
				onClick={() => handleClick && handleClick()}
			>
				<item.icon className="w-6 h-6 mr-2" />
				{item.name}
			</NavLink>
		))}
	</div>
);

const Sidebar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			{/* desktop sidebar */}
			<div className="flex-col hidden md:flex w-[240px] py-10 px-4 bg-[#191624]">
				<h1 className="object-contain w-full text-2xl text-center text-white h-14">My Music</h1>
				<NavLinks />
			</div>

			{/* mobile sidebar */}
			<div className="absolute block md:hidden top-6 right-3">
				{mobileMenuOpen ? (
					<RiCloseLine className="w-6 h-6 text-white" onClick={() => setMobileMenuOpen(false)} />
				) : (
					<HiOutlineMenu className="w-6 h-6 text-white" onClick={() => setMobileMenuOpen(true)} />
				)}
			</div>

			<div
				className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
					mobileMenuOpen ? "left-0" : "-left-full"
				}`}
			>
				<h1 className="object-contain w-full text-2xl text-center text-white h-14">My Music</h1>
				<NavLinks handleClick={() => setMobileMenuOpen(false)} />
			</div>
		</>
	);
};

export default Sidebar;
