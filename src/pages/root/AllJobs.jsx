import { JobsContainer, JobsFilter, JobsPagination, PageTitle } from "../../components";

const AllJobs = () => {

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageTitle title="All Jobs"/>
      <JobsFilter/>
      <JobsContainer/>
      <JobsPagination/>
    </div>
  )
}

export default AllJobs