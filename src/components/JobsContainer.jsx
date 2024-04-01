import { useEffect, useState } from "react";
import { fetchJobs } from "../features/allJobs/allJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsFillGridFill, BsList } from 'react-icons/bs';
import JobCard from "./JobCard";
import Loader from "./Loader";

const JobsContainer = () => {
    const [layout, setLayout] = useState('grid');

    const dispatch = useDispatch();

    const {jobs, jobsCount, loading, error, sort, type, status, isFav, isRemote, search, currentPage} = useSelector((store) => store.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch, sort, type, status, isFav, isRemote, search, currentPage, jobsCount]);

    const setButtonStyle = (pattern) => {
        return `text-xl btn btn-circle btn-sm ${
          pattern === layout
            ? 'btn bg-bgButtonPrimary text-white'
            : 'btn bg-bgBadge text-fontLight'
        }`;
    };

    if (loading) return <div className="w-full h-[50vh]"><Loader/></div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <div className="flex justify-between items-center pb-4">
                <h2 className='text-fontDark h2'>
                    {jobsCount === 0 ?
                        'No jobs found' : 
                        `${jobsCount} job${jobsCount > 1 ? 's' : ''} found`
                    }
                </h2>
                <div className='hidden lg:flex gap-x-2'>
                    <button
                    className={setButtonStyle('list')}
                    onClick={() => setLayout('list')}
                    >
                        <BsList />
                    </button>
                
                    <button
                    className={setButtonStyle('grid')}
                    onClick={() => setLayout('grid')}
                    >
                        <BsFillGridFill />
                    </button>
                </div>
            </div>
            
            <div className={layout === 'list' ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                {jobs.map((job) => {
                    return (
                        <JobCard key={job.id} job={job} />
                    )
                })}
            </div>
            
        </div>
    )
}

export default JobsContainer