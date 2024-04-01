import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../features/allJobs/allJobsSlice";


const JobsPagination = () => {

    const dispatch = useDispatch();

    const {jobsCount, currentPage, pageSize} = useSelector((store) => store.jobs);

    const numOfPages = Math.ceil(jobsCount / pageSize);

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    }

    if(numOfPages <= 1) return null;

    return (
        <div className='mt-16 flex justify-end'>
            <div className='join'>
                {pages.map((pageNumber) => {
                    return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`btn btn-xs sm:btn-md border-none join-item ${
                        pageNumber === currentPage ? 'bg-base-300 border-base-300 ' : ''
                        }`}
                    >
                        {pageNumber}
                    </button>
                    );
                })}
            </div>
        </div>
    )
}

export default JobsPagination