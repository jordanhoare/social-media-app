import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "./online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext.js";
import { Add, Remove } from "@mui/icons-material"


export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.followings.includes(user?._id));


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


      const handleClick = async () => {
        try {
          if (followed) {
            await axios.put(`/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
          } else {
            await axios.put(`/users/${user._id}/follow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
          }
          setFollowed(followed);
        } catch (err) {
        }
      };



    const HomeRightBar = () => {
        return (
        <>
            <div className="birthdayContainer">
                <img src="assets/gift.png" alt="" className="birthdayImg" />
                <span className="birthdayText">
                    <b>John Doe</b> and <b>3 other friends</b> have a birthday today.
                </span>
            </div>

            <img src="assets/ad.png" alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>

            <ul className="rightbarFriendList">
                {Users.map((u) => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>
        </>
        );
    };



    const ProfileRightBar = () => {
        return(
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />} 
                </button>
            )}
            <h4 className="rightbarTitle">About:</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{
                    user.relationship ===1 ? "Single" :
                    user.relationship ===2 ? "Married" :
                    "-" }</span>
                </div>
            </div>
            <h4 className="rightbarTitle">Friends:</h4>
            <div className="rightbarFollowings">

                {friends.map((friend) => (
                    <Link to={"/profile/"+ friend.username} style={{textDecoration:"none"}}>
                    
                    <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg"
                    src={ friend.profilePicture 
                        ? PF+friend.profilePicture 
                        : PF+"person/defaultProfile.png"} 
                    alt=""  
                    />
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
                </Link>
                ))}
                
            </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                { user 
                ? <ProfileRightBar /> 
                : <HomeRightBar />}
            </div>
        </div>
    );
}
