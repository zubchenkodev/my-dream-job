import { useDispatch } from "react-redux";
import { formatDate } from "../utils";
import { deleteJob, setEditJob, toggleFav } from "../features/job/jobSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiCalendarDays, HiClock, HiMapPin, HiOutlineHeart, HiHeart } from "react-icons/hi2";


const JobCard = ({job}) => {
    const { id, company, position, location, created_at, isFav, isRemote, type, status } = job;

    const [isLiked, setIsLiked] = useState(isFav);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteJob(id));
    }

    const handleLike = (id) => {
        dispatch(toggleFav(id));
        setIsLiked(!isLiked);
    }


    return (
        <article className="bg-bgWhite shadowMedium rounded-lg w-full grid grid-rows-[auto,1fr,auto] p-4 gap-4">
            <div className="card-header flex justify-between">
                <div>
                    <h3 className="text-fontDark h3">{company}</h3>
                    <p className="text-fontDark textSm">{position}</p>
                </div>
                <button onClick={() => handleLike(id)} className="btn btn-ghost btn-sm">
                    { isLiked ? <HiHeart className="text-borderDark w-5 h-5"/> : <HiOutlineHeart className="text-borderDark w-5 h-5"/>}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2 items-center">
                    <HiMapPin className="text-borderDark w-5 h-5"/>
                    <p className="text-fontLight textSm">{location}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <HiClock className="text-borderDark w-5 h-5"/>
                    <p className="text-fontLight textSm">{type}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <HiCalendarDays className="text-borderDark w-5 h-5"/>
                    <p className="text-fontLight textSm">{formatDate(created_at)}</p>
                </div>
                {isRemote && <span className="text-fontLight textSm py-1 px-3">Remote job</span>}
            </div>
            <div className="card-footer flex justify-between items-center">
                <span className="mdjBadge">{status}</span>
                <div className="flex gap-2">
                    <Link 
                        className="mdjButtonSecondary text-sm"
                        to='/add-job'
                        onClick={() => dispatch(setEditJob({
                            editJobId: id,
                            company,
                            position,
                            location,
                            created_at,
                            isFav,
                            isRemote,
                            type,
                            status
                        }))}
                    >
                    Edit
                    </Link>
                    <button
                        className="mdjButtonPrimary text-sm"
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    )
}

export default JobCard