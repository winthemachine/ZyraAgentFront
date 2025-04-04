import AppFooter from '@/components/common/AppFooter'
import AppHeader from '@/components/common/AppHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout: React.FC = () => {
    return (
        <main className="fixed h-screen top-0 w-full">
            <div className="bg-gradient-to-br from-[#050510] to-[#0a0a20] text-white w-full h-full overflow-y-auto">
                <AppHeader />
               <div className=''>
                <Outlet />
               </div>
                <AppFooter />
            </div>
        </main>
    )
}

export default AppLayout