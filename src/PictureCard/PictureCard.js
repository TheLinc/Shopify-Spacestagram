import './PictureCard.css';
import _uniqueId from 'lodash/uniqueId';
import { Component } from 'react';
class PictureCard extends Component{

    state={
        readMoreEn: false,
        descElement: null,
        readMoreButton: null,
        cardContainer: null,
        cardHeight: null,
    }

    constructor(props){
        super(props);
        this.uniqueTextID = _uniqueId('postDesc_');
        this.uniqueButtonID = _uniqueId('postReadMore_');
        this.uniqueContainerID = _uniqueId('cardContainer_');
    }

    componentDidMount(){
      
            const desc = document.getElementById(this.uniqueTextID);
            const readMoreButton = document.getElementById(this.uniqueButtonID);
            const cardContainer = document.getElementById(this.uniqueContainerID);

            //wait 0.8 second for photos to load
            setTimeout(() => {
                const cardHeight = document.getElementById(this.uniqueContainerID).offsetHeight;
                if (desc.offsetHeight < desc.scrollHeight || desc.offsetWidth < desc.scrollWidth) {
                    this.setState({readMoreEn: true, descElement: desc, readMoreButton: readMoreButton, cardContainer: cardContainer, cardHeight: cardHeight});
                } 
            }, 800);
    }
    
    render(){
        let expanded = false;

        if(!this.state.readMoreEn && this.state.readMoreButton){
            this.state.readMoreButton.classList.add("hidden");
        }

        if(this.state.cardContainer && this.state.cardHeight){
            const container = this.state.cardContainer;
            const height = this.state.cardHeight;
            console.log("carHeight2: ", height);
            const rowEnd = Math.ceil(height/20);
            container.setAttribute("style", "grid-row-end: span "+ rowEnd);
        }

        function expandReadMore(readMoreEn, descElement, readMoreButton, cardContainer){
            if(readMoreEn && descElement && cardContainer){
                if(!expanded){
                    descElement.classList.remove("line-clamp-4");
                    readMoreButton.innerHTML = "Read Less";
                    console.log("CLICK");
                }else{
                    descElement.classList.add("line-clamp-4");
                    readMoreButton.innerHTML = "Read More";
                    console.log("CLICK"); 
                }
                const cardHeight = cardContainer.offsetHeight;
                const rowEnd = Math.ceil(cardHeight/20);
                cardContainer.setAttribute("style", "grid-row-end: span "+ rowEnd);

                expanded = !expanded;
            } 
        }

        const postObj = this.props.postObj;
        if(postObj){
            return (  
                <div className="cardContainer" id={this.uniqueContainerID}>
                    <img src={postObj.url}></img>
                    <div className="textContainer">
                        <button className="likeButton"><i className="fa fa-thumbs-up"></i></button>
                        <div className="postTitle">{postObj.title}</div>
                        <div className="postDate">{postObj.date}</div>
                        <div id={this.uniqueTextID} className="line-clamp-4 postDesc">{postObj.explanation}</div>
                        <button id={this.uniqueButtonID} className="readMoreButton" onClick={()=>{expandReadMore(this.state.readMoreEn, this.state.descElement, this.state.readMoreButton, this.state.cardContainer)}}>Read More</button>
                    </div>
                </div>
            );
        }else{
           return(<div className='hello'></div>)
        }
    }
}
 
export default PictureCard;