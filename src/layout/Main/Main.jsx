import { Outlet } from "react-router-dom";
import Navbar from "../../pages/sharedPages/Navbar/Navbar";
import Footer from "../../pages/sharedPages/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;