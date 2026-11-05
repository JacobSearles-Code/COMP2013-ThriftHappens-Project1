import logo from '../assets/images/logo.png'
import banner from '../assets/images/banner.png'
function NavBar() {
    return (
        <div className="thriftNavBar">
            <img className="bkgBannerLeft" src={banner} alt=""/>
            <img src={logo} className="navImg" alt=""/>
            <img className="bkgBannerRight" src={banner} alt=""/>
        </div>
    )
}

export default  NavBar;