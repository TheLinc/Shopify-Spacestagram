import './Home.css'
import { Component } from 'react';
import PictureCard from '../PictureCard/PictureCard';

import data from "../data.json"

class Home extends Component{
    state = {
        apod: [],
        resultNum: null
    } 

    async componentDidMount(){
        const resultNum = 5;
        try{
            const data = await fetch("https://api.nasa.gov/planetary/apod?api_key=IJpkkRXsHEKYrn76KgFjyz3j3HXXulxe76w7KCF7&count=" + resultNum);
            const apod = await data.json();
            console.log("API Data: ", apod);
            this.setState({apod: apod, resultNum: resultNum});
        }
        catch(err){
            console.log("ERROR: ",err);
        }
    }
    
    render(){
        function getCards(resultArray){
            //filters API results of any non Nasa Gov links
            const filteredArray = resultArray.filter((item) => item.url.includes("apod.nasa.gov"));
            var i = 0;
            return(
                filteredArray.map((cont) => (
                    <PictureCard postObj = {cont} key={i++}/> 
            )));
        }
     
        return (  
            <div className="content">
                {getCards(this.state.apod)}
            </div>
        );
    }
}
 
export default Home;