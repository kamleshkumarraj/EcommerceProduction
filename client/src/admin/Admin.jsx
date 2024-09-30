import React from 'react'
import Sidebar from './components/common/Sidebar';
import { Outlet } from 'react-router-dom';

function Admin() {
    return (
		<div className='flex h-screen overflow-hidden text-gray-100 bg-gray-900'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Outlet />
		</div>
	);
}

export default Admin
