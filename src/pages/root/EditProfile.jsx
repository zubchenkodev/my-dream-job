import { useState } from 'react';
import { PageTitle, UpdateCredentialsForm, UpdateUserDataForm } from '../../components'


const EditProfile = () => {

    const [activeTab, setActiveTab] = useState('profile');


    return (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
            <PageTitle title="Update your account"/>
            <div className="mdjTabs">
                <div className="flex gap-4">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`mdjTabButton ${activeTab === 'profile' ? 'mdjTabButtonActive' : ''}`}>
                        Profile
                    </button>
                    <button 
                        onClick={() => setActiveTab('credentials')} 
                        className={`mdjTabButton ${activeTab === 'credentials' ? 'mdjTabButtonActive' : ''}`}>
                        Credentials
                    </button>
                </div>
                <div className='pt-4'>
                {activeTab === 'profile' ? 
                <UpdateUserDataForm />
                :
                <UpdateCredentialsForm/>
                }
                </div>
            </div>
        </div>
    )
}

export default EditProfile