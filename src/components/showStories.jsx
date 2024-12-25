import { useDispatch } from "react-redux";
import { chengMyStory } from "../store";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowStories = ({ id , count}) => {
  const dispatch = useDispatch();
  const [story, setStory] = useState({});
  const [storyID, setStoryID] = useState(parseInt(id));

  const token = localStorage.getItem("token");
  const getDataOnline_story = () => {
   // setStory({});
     axios
       .get(`http://192.168.1.99/tar/home/getStoryById.php?id=${storyID}`, {
         method: "GET",
         headers: {
           Authorization: `${token}`, // ارسال توکن در هدر
         },
       })
       .then((res) => {
         if (res.data[0][0] !== "not") {
            setStory(res.data[0]);
            
               // console.log(story.vid);
         }
       })
       .catch((error) => {
         console.error(error);
       });
   };

    useEffect(() => {
     
       getDataOnline_story();
  
      
       
     }, [storyID]);

  return (
    <>
      <div
        style={{
          position: "fixed",

          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "#181818cb",
          zIndex: "100",
        }}
        onClick={() => {
          dispatch(chengMyStory({ id: 0 }));
          
        }}
      ></div>

      <div
        style={{
          width: "350px",
          height: "450px",
          backgroundImage: "linear-gradient(to bottom, #ffffffff, #4c525e)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "120",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            padding: "2px 5px",
            color: "#ff6e6e",
            fontSize: "15px",
          }}
          onClick={() => {
            dispatch(chengMyStory({ id: 0 }));
            
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>

        <h5>
       {story.title} 
        </h5><br />
        
        <video width="350" height="280"  src={`http://192.168.1.99/tar/files/stories/vids/${story.vid}`} controls autoPlay>
         
        </video>
        
        <br />
        <p style={{color:"#dbdbdb"}}> {story.des} </p>
        <div style={{ display: "flex", gap: "200px" ,color:"#ffffff" }}>
          <span
            style={{ fontSize: "20px" }}
            onClick={() => {
                 setStoryID(storyID-1)
                 if(storyID===0){
                    dispatch(chengMyStory({ id: 0 }));
                 }else{
                     dispatch(chengMyStory({ id: id - 1 }));
                 }
             
             
            }}
          >
           
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
          <span
            style={{ fontSize: "20px" }}
            onClick={() => {

                setStoryID(storyID+1)
                if(storyID+1 > count){
                    dispatch(chengMyStory({ id: 0 }));
                }else{
                    dispatch(chengMyStory({ id: id + 1 }));
                }
              
             
            }}
          >
            
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </>
  );
};
