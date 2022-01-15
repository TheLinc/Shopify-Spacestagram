import './Home.css'
import { Component } from 'react';
import PictureCard from '../PictureCard/PictureCard';
import LoadingImage from '../Images/loading.gif'
import React from "react";

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            apod: null,
        } 
    }

    async componentDidMount(){
        const today = new Date();

        //API returns pictures from current day to 8 days in the past
        const endDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const startDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-8);
    
        try{
            //fetching data from APOD API from NASA
            const data = await fetch("https://api.nasa.gov/planetary/apod?api_key=IJpkkRXsHEKYrn76KgFjyz3j3HXXulxe76w7KCF7&start_date="+startDate+"&end_date="+endDate);
            const apod = await data.json();

            //log returned API data to console
            console.log("API Data: ", apod);

            //update state with values returned by API
            this.setState({
                apod: apod,
            });
        }
        catch(err){
            console.log("ERROR: ", err);
        }

        //event listener to adjust page style based on scroll
        window.addEventListener("scroll", this.scrollFunction)
    }

    //checks distance of cards from top of window and changes header styles accordingly
    scrollFunction(event){
        if(document.getElementById("logo") && document.getElementById("header")){
            if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
                document.getElementById("logo").classList.add("condensedHeader");
                document.getElementById("header").classList.add("headerBackground");
            } else {
                document.getElementById("logo").classList.remove("condensedHeader");
                document.getElementById("header").classList.remove("headerBackground");
            }
        }
    }
    
    render(){
        function getCards(resultArray, callback){
            //if results from API have been returned display cards, if not show loading
            if(resultArray){
                //filters API results of any non Nasa Gov links
                const filteredArray = resultArray.filter((item) => item.url.includes("apod.nasa.gov"));
                var i = 0;

                return(
                    <div className="cardGrid">
                        {filteredArray.map((cont) => (<PictureCard postObj = {cont} parentCallback = {callback} key={i++}/> ))}
                    </div>  
                );
            }
            else{
                return(
                    <div className="loadingImgContainer">
                        <img className="loadingImg" src={LoadingImage} alt="loading image of astronaut walking on planet as it spins"></img>
                    </div>
                );
            }
        }

        return (  
            <div className="content" id={this.contentID}>
                {getCards(this.state.apod)}
            </div>
        );
    }
}
 
export default Home;