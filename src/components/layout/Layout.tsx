import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import './Layout.css';
import { useState } from 'react';

const Layout = () => {
    const [checkOpen, setCheckOpen] = useState<boolean>(true);

    return (
        <>   
            <Header /> {/* Keep Header at the top */}

            <div style={{ display: "flex", flexDirection: "row", marginTop: "63px" }}> {/* Add marginTop to account for AppBar height */}
                <Sidebar setCheckOpen={setCheckOpen} />

                <div style={{
                    flex: 1, /* Make the Outlet container take the remaining space */
                    padding: "16px", /* Optional padding */
                }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
