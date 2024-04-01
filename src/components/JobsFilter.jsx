import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setIsFav, setIsRemote, setSearch, setSort, setStatus, setType } from "../features/allJobs/allJobsSlice";


const JobsFilter = () => {

    const { sort, sortOptions, type, typeOptions, status, statusOptions, isFav, isRemote, search } = useSelector((store) => store.jobs);

    const dispatch = useDispatch();

    const handleSortChange = (e) => {
        dispatch(setSort(e.target.value));
    }

    const handleTypeChange = (e) => {
        dispatch(setType(e.target.value));
    }

    const handleStatusChange = (e) => {
        dispatch(setStatus(e.target.value));
    }

    const handleFavChange = () => {
        dispatch(setIsFav());
    }

    const handleRemoteChange = () => {
        dispatch(setIsRemote());
    }

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    }

    const handleReset = () => {
        dispatch(clearFilters())
    }

    return (
        <div>
            <form className="bg-bgWhite rounded-lg shadowMedium p-4 flex flex-col gap-4">
                <div className="w-full grid lg:grid-cols-2 xl:grid-cols-4 gap-1">
                    <div className="mdjFormControl">
                    <label htmlFor="search" className="mdjLabel">Search</label>
                    <input 
                        className="mdjInput"
                        type="text"
                        name="search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    </div>
                    <div className="mdjFormControl">
                        <label htmlFor="sort" className="mdjLabel">Sort by:</label>
                        <select className="mdjSelect" name='sort' value={sort} onChange={handleSortChange}>
                            {sortOptions.map((option) => {
                                return (
                                    <option key={option} value={option}>{option}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mdjFormControl">
                        <label htmlFor="type" className="mdjLabel">Type:</label>
                        <select className="mdjSelect" name='type' value={type} onChange={handleTypeChange}>
                            {typeOptions.map((option) => {
                                return (
                                    <option key={option} value={option}>{option}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mdjFormControl">
                        <label htmlFor="status" className="mdjLabel">Status:</label>
                        <select className="mdjSelect" name='status' value={status} onChange={handleStatusChange}>
                            <option value="all" key='all'>all</option>
                            {statusOptions.map((option) => {
                                return (
                                    <option key={option} value={option}>{option}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="w-full grid lg:grid-cols-2 xl:grid-cols-4 gap-1">
                    <div className='mdjFormControlHorizontal'>
                        <input className='mdjCheckbox' 
                        name="isFav"
                        value={isFav}
                        onChange={handleFavChange}
                        type="checkbox"
                        />
                        <label htmlFor="isFav" className="mdjLabelAlt">
                            <span>Favorites</span>
                        </label>
                    </div>
                    <div className='mdjFormControlHorizontal'>
                        <input className='mdjCheckbox'
                        name="isRemote"
                        value={isRemote}
                        onChange={handleRemoteChange}
                        type="checkbox"
                        />
                        <label htmlFor="isRemote" className="mdjLabelAlt">
                            <span>Remote</span>
                        </label>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-1 items-end">
                    <div className="hidden lg:block lg:col-span-1 xl:col-span-3"></div>
                    <button onClick={handleReset} className='col-span-1 mdjButtonPrimary'>Reset</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default JobsFilter