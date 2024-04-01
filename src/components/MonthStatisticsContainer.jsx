import { useSelector } from "react-redux";
import { compareMonthToAllTime, getAmountOfJobsByStatus, getJobsThisMonth } from "../utils";
import { BiSolidBriefcase } from "react-icons/bi";
import Loader from "./Loader";
import { statusStats } from "../consts";
import StatCard from "./StatCard";

const MonthStatisticsContainer = () => {

    const {loading: isLoading, jobs} = useSelector(store => store.jobs);

    const jobsThisMonth = getJobsThisMonth(jobs);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {statusStats.map((statusStat, index) => {
          return (
            <StatCard key={index} statusStat={statusStat} jobsThisMonth={jobsThisMonth} jobs={jobs} isLoading={isLoading}/>
          )
        } )}
      </div>
    )
}

export default MonthStatisticsContainer