import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function Layout()
{
    return (
        <>
            <Navbar />
            <main class="main">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;