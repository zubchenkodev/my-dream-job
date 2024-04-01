import { useSelector } from "react-redux";
import { Avatar, PageSubtitle, PageTitle } from "../../components";
import { Link } from "react-router-dom";

const Profile = () => {

  const {isLoading, user} = useSelector(state => state.auth);

  const {name, position, avatar, bio, skills} = user.user_metadata;

  console.log(skills)

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto,1fr] gap-8 w-full items-start">
        <Avatar avatar={avatar} name={name} size='w-20' color='bgButtonPrimary' textSize='text-3xl'/>
        <div className="flex flex-col">
          <PageTitle title={name} color={"text-passionDark"}/>
          {position && <p className="text-sm lg:text-md">{position}</p>}
        </div>
        </div>
        <div className="flex justify-end">
          <Link to="/edit-profile" className='mdjButtonPrimary' disabled={isLoading}>Edit Profile</Link>
        </div> 
      </div>
      
      <div className="flex flex-col gap-2 lg:gap-4">
        <PageSubtitle title='About me:' color={'text-warmthDark'}/>
        <div className="text-sm lg:text-base">
          {bio ? bio : <p>Edite your profile to add information about yourself...</p>}
        </div>
      </div>
      
       
      <div className="flex flex-col gap-2 lg:gap-4">
        <PageSubtitle title='My skills:'/>
        {skills?.length > 0 ?
          (
            <div className="flex gap-4 flex-wrap overflow-y-scroll items-start">
              {skills.map((skill, index) => {
                return(
                  <div key={index} className="mdjBadge">{skill}</div>
                )
              })}
            </div>
          ) : 
          (
            <p>Edite your profile to add your skills...</p>
          )}
      </div>
    </div>
  )
}

export default Profile