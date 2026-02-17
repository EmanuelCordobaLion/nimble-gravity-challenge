import { JobCard } from './JobCard';
import type { Job, Candidate } from '../types/api.types';

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
}

export function JobList({ jobs, candidate }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 text-lg">No positions available at the moment.</p>
        <p className="text-gray-400 text-sm mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}
