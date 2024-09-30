const Header = ({ title }) => {
	return (
		<header className='bg-gray-800 bg-opacity-50 border-b border-gray-700 shadow-lg backdrop-blur-md'>
			<div className='max-w-[128rem] mx-auto py-[1.6rem] px-[1.6rem] sm:px-[2.4rem] lg:px-[3.2rem]'>
				<h1 className='text-[2.4rem] font-semibold text-gray-100'>{title}</h1>
			</div>
		</header>
	);
};
export default Header;
