import { JobCard } from './JobCard';
import type { Job, Candidate } from '../types/api.types';

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
}

export function JobList({ jobs, candidate }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No jobs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}
