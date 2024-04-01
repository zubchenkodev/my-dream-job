import { BiSolidBriefcase } from "react-icons/bi"
import { compareMonthToAllTime, getAmountOfJobsByStatus } from "../utils"
import Loader from "./Loader";
import { Fragment } from "react";

const StatCard = ({statusStat, jobsThisMonth, jobs, isLoading, allTime}) => {

    const {status, color, text} = statusStat;

    const applicationsTotal = status === 'all';


    return (
        <div className="bg-bgWhite shadowMedium rounded-lg p-4 stat min-h-[145px] ">
        {isLoading ?
            (
                <Loader />
            ):
            (
                <Fragment>
                <div className="stat-title capitalize h3 text-fontDark">{text}</div>
                <div className={`stat-value text-fontDark`}>
                    {allTime ?
                        applicationsTotal ? jobs?.length : getAmountOfJobsByStatus(jobs, status )
                        :
                        applicationsTotal ? jobsThisMonth?.length : getAmountOfJobsByStatus(jobsThisMonth, status )
                    }
                </div>
                {!allTime &&
                <div className={`stat-desc`}>
                    {applicationsTotal ? compareMonthToAllTime(jobsThisMonth?.length, jobs?.length, text) : compareMonthToAllTime(getAmountOfJobsByStatus(jobsThisMonth, status ), getAmountOfJobsByStatus(jobs, status ), text)}
                </div>
                }
                </Fragment>
            )
        }
        </div>
    )
}

export default StatCard