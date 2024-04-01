import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../features/auth/authSlice";
import PageSubtitle from "./PageSubtitle";

const UpdateUserDataForm = () => {

    const dispatch = useDispatch();
    
    const {isLoading, user} = useSelector(state => state.auth);

    const {name: currentName, position: currentPosition, avatar: currentAvatar, skills: currentSkills, bio: currentBio} = user.user_metadata;

    const [name, setName] = useState( currentName);
    const [position, setPosition] = useState( currentPosition || "");
    const [avatar, setAvatar] = useState(""); 
    const [skills, setSkills] = useState(currentSkills?.join(', ') ||"");
    const [bio, setBio] = useState(currentBio ||"");
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!name){
          return;
        }
        if (avatar !== "") {
            dispatch(updateUserData({name, position, avatar, skills, bio}));
        } else {
            dispatch(updateUserData({name, position, skills, bio}));
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <PageSubtitle title='Update Your Data'/>
            <form 
                onSubmit={onSubmit} 
                className="bg-bgWhite rounded-lg shadowMedium p-4"
                >
                <div className="mdjFormControl">
                    <label className="mdjLabel" htmlFor="name">Name:</label>
                    <input 
                    type="text" 
                    className="mdjInput" 
                    id="name" 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    />
                </div>
                <div className="mdjFormControl">
                    <label className="mdjLabel" htmlFor="position">Position:</label>
                    <input 
                        type="text" 
                        className="mdjInput" 
                        id="position" 
                        name="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="mdjFormControl">
                    <label className="mdjLabel" htmlFor="bio">About:</label>
                    <textarea
                        className="mdjTextarea"
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        disabled={isLoading}
                    />  
                </div>
                <div className="mdjFormControl">
                    <label className="mdjLabel" htmlFor="skills">Skills, separated by comma:</label>
                    <input
                        type="text"
                        className="mdjInput"
                        id="skills"
                        name="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="mdjFormControl">
                    <label className="mdjLabel" htmlFor="avatar">Avatar:</label>
                    <input
                        className="file-input file-input-sm file-input-borderDark w-full bg-bgInput text-fontDark"
                        type="file"
                        name='avatar'
                        id="avatar"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        disabled={isLoading}
                    />
                </div>
                <div className="flex items-end justify-end pt-4">
                    <button disabled={isLoading} className="mdjButtonPrimary">Submit Update</button>
                </div>
                
            </form>
        </div>
    )
}

export default UpdateUserDataForm