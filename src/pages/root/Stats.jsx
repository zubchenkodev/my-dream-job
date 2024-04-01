import { useDispatch } from "react-redux";
import { AllTimeStatisticsContainer, MonthStatisticsContainer, PageSubtitle, PageTitle } from "../../components"
import { useEffect, useState } from "react";
import { fetchJobs } from "../../features/allJobs/allJobsSlice";

const Stats = () => {

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('month');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
        <PageTitle title="Statistics"/>
        <PageSubtitle title="Job applications statistics"/>
        <div className="mdjTabs">
          <div className="flex gap-4">
              <button 
                  onClick={() => setActiveTab('month')}
                  className={`mdjTabButton ${activeTab === 'month' ? 'mdjTabButtonActive' : ''}`}>
                  This Month
              </button>
              <button 
                  onClick={() => setActiveTab('all-time')} 
                  className={`mdjTabButton ${activeTab === 'all-time' ? 'mdjTabButtonActive' : ''}`}>
                  All Time
              </button>
          </div>
          <div className='pt-4'>
          {activeTab === 'month' ? 
          <MonthStatisticsContainer/>
          :
          <AllTimeStatisticsContainer/>
          }
          </div>
      </div>
    </div>
  )
}

export default Stats;