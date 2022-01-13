import './Home.css'
import { Component } from 'react';
import PictureCard from '../PictureCard/PictureCard';
import LoadingImage from '../Images/loading.gif'
import React, { useState } from "react";

import data from "../data.json"

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            apod: null,
            count: 0,
        } 
        this.handleCallback = this.handleCallback.bind(this);
    }

    async componentDidMount(){
        const today = new Date();
        const endDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const startDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-8);
    
        try{
            const data = await fetch("https://api.nasa.gov/planetary/apod?api_key=IJpkkRXsHEKYrn76KgFjyz3j3HXXulxe76w7KCF7&start_date="+startDate+"&end_date="+endDate);
            const apod = await data.json();
            console.log("API Data: ", apod);
            this.setState({apod: apod});
        }
        catch(err){
            console.log("ERROR: ", err);
        }
        window.addEventListener("scroll", this.scrollFunction)
    }

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
    

    handleCallback(){
        this.setState({ count: this.state.count + 1 });
    }
    
    render(){

        function getCards(resultArray, callback){
            if(resultArray){
                //filters API results of any non Nasa Gov links
                const filteredArray = resultArray.filter((item) => item.url.includes("apod.nasa.gov"));
                var i = 0;

                return(
                    <div className="cardGrid" tabIndex="0"  >
                        {filteredArray.map((cont) => (<PictureCard postObj = {cont} parentCallback = {callback} key={i++}/> ))}
                    </div>  
                );
            }else{
                return(
                    <div className="loadingImgContainer">
                        <img className="loadingImg" src={LoadingImage}></img>
                    </div>
                );
            }
        }

        return (  
            <div className="content" tabIndex="1">
                {getCards(this.state.apod, this.handleCallback, this.state.count)}
            </div>
        );
    }
}
 
export default Home;