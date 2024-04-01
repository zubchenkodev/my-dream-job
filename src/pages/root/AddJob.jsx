import { useSelector } from "react-redux";
import { AddJobForm, PageTitle } from "../../components"

const AddJob = () => {

  const {isEditing} = useSelector((store) => store.job);

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
      <PageTitle title={ isEditing ? 'Edit Job' : 'Add Job'}/>
      <AddJobForm/>
    </div>
  )
}

export default AddJob