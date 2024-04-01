export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    formattedDate = formattedDate.replace(/\b\d{1,2}\b/, day + suffix);
    return formattedDate;
}

export const getAmountOfJobsByStatus = (allJobs, status) => {
    const result = allJobs.filter((job) => job.status === status);
    return result.length;
}

export const getJobsThisMonth = (jobs) => {
    const currentDate = new Date();

    const isInCurrentMonth = (job) => {
      const jobDate = new Date(job.created_at);
      return jobDate.getMonth() === currentDate.getMonth() && jobDate.getFullYear() === currentDate.getFullYear();
    };

    const jobsThisMonth = jobs.filter(isInCurrentMonth);

    return jobsThisMonth
}

export const compareMonthToAllTime = (monthResult, allTimeResult, status) => {
    if(monthResult === 0) return `You don't have ${status} this month`;
    const result = monthResult/(allTimeResult / 100);
    return `${result.toFixed()}% of your all time ${status}`
}

export const getInitials = (fullName) => {
    const names = fullName.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    } else {
      return names[0][0];
    }
};
 
