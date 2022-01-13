import './Header.css';
import spacestagramLogo from '../Images/SpacestagramLogo.png'
const Header = () => {
    return ( 
        <div id = "header" className="header sticky" >
           <img id="logo" className="headerLogo" src={spacestagramLogo}></img>
        </div>
     );
}
 
export default Header;