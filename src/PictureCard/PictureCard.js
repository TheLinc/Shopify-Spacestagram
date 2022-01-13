import './PictureCard.css';
import _uniqueId from 'lodash/uniqueId';
import { Component } from 'react';
import { db }from '../firebase-config';
import { collection, getDoc, getDocs, doc, setDoc} from 'firebase/firestore';

class PictureCard extends Component{

    constructor(props){
        super(props);
        this.uniqueTextID = _uniqueId('postDesc_');
        this.uniqueButtonID = _uniqueId('postReadMore_');
        this.uniqueContainerID = _uniqueId('cardContainer_');
        this.uniqueLikeButtonID = _uniqueId('likeButton_');

        this.state={
            readMoreEn: false,
            descElement: null,
            readMoreButton: null,
            cardContainer: null,
            cardHeight: null,
            imageLoaded: false,
            liked: false,
            likeButton: null,
        }
    }
    async componentDidMount(){
        const desc = document.getElementById(this.uniqueTextID);
        const readMoreButton = document.getElementById(this.uniqueButtonID);
        const cardContainer = document.getElementById(this.uniqueContainerID);
        const likeButton = document.getElementById(this.uniqueLikeButtonID);

        try{
            const docRef = doc(db, "posts", this.props.postObj.title);
            const document = await getDoc(docRef);
            const col = collection(db, "posts");

            let liked = false;

            if (document.data()){
                liked =  document.data().liked;
                console.log("POST IN DATABASE", document.data());
            } else{
                await setDoc(doc(col, this.props.postObj.title), {
                    liked: false,
                });
                console.log("POST NOT IN DATABASE");
            }
    
            var readMoreEnabled = false;
            if (desc.offsetHeight < desc.scrollHeight || desc.offsetWidth < desc.scrollWidth) {
                readMoreEnabled = true;
            } 
            this.setState({
                readMoreEn: readMoreEnabled, 
                descElement: desc, 
                readMoreButton: readMoreButton, 
                cardContainer: cardContainer, 
                liked: liked,
                likeButton: likeButton,
            });   
        }
        catch(err){
            console.log("ERROR: ", err);
        }
    }

    handleImageLoaded(){
        this.setState({imageLoaded: true});
        this.props.parentCallback();
    }

    async handleLike(){
        const col = collection(db, "posts");
        const liked = !this.state.liked;
        const likeButton = this.state.likeButton;

        await setDoc(doc(col, this.props.postObj.title), {
            liked: liked,
        });

        this.setState({liked: liked});

        if(liked){
            likeButton.classList.add("postLiked");
        }else{
            likeButton.classList.remove("postLiked");
        }
    }

    render(){
        let expanded = false;
        if(!this.state.readMoreEn && this.state.readMoreButton){
            this.state.readMoreButton.classList.add("hidden");
        }

        if(this.state.cardContainer && this.state.imageLoaded){
            const container = this.state.cardContainer;
            const cardHeight = container.offsetHeight + 20;
            const rowEnd = Math.ceil(cardHeight/20);
            container.setAttribute("style", "grid-row-end: span "+ rowEnd);
        }

        if(this.state.likeButton){
            if(this.state.liked){
                this.state.likeButton.classList.add("postLiked");
            }else{
                this.state.likeButton.classList.remove("postLiked");
            }
        }

        function expandReadMore(readMoreEn, descElement, readMoreButton, cardContainer){
            if(readMoreEn && descElement && cardContainer){
                if(!expanded){
                    descElement.classList.remove("line-clamp-4");
                    readMoreButton.innerHTML = "Read Less";
                }else{
                    descElement.classList.add("line-clamp-4");
                    readMoreButton.innerHTML = "Read More";
                }

                const cardHeight = cardContainer.offsetHeight + 20;
                const rowEnd = Math.ceil(cardHeight/20);
                cardContainer.setAttribute("style", "grid-row-end: span "+ rowEnd);

                expanded = !expanded;
            } 
        }

        const postObj = this.props.postObj;
        if(postObj){
            return (  
                <div className="cardContainer" id={this.uniqueContainerID} tabIndex="0">
                    <img className="cardImg" src={postObj.url} onLoad={this.handleImageLoaded.bind(this)}></img>
                    <div className="textContainer">
                        <button className="likeButton" id={this.uniqueLikeButtonID} onClick={this.handleLike.bind(this)}><i className="fa fa-thumbs-up"></i></button>
                        <div className="postTitle">{postObj.title}</div>
                        <div className="postDate">{postObj.date}</div>
                        <div id={this.uniqueTextID} className="line-clamp-4 postDesc">{postObj.explanation}</div>
                        <button id={this.uniqueButtonID} className="readMoreButton" 
                            onClick={
                                ()=>{expandReadMore(this.state.readMoreEn, this.state.descElement, this.state.readMoreButton, this.state.cardContainer)}
                            }>Read More
                        </button>
                    </div>
                </div>
            );
        }else{
           return(<div/>)
        }
    }
}
 
export default PictureCard;