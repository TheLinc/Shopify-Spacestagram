import './Header.css';
import spacestagramLogo from '../Images/SpacestagramLogo.png'
const Header = () => {
   //returns header for web page
    return ( 
        <div id = "header" className="header sticky" >
           <img id="logo" className="headerLogo" src={spacestagramLogo} alt="Spacestagram logo of astronaut holding a moon baloon with a shopify bag in their other hand"></img>
        </div>
     );
}
export default Header;