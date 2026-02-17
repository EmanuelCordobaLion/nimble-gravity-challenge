import type { Job } from '../types/api.types';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
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
        <div
          key={job.id}
          className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {job.title}
          </h3>
        </div>
      ))}
    </div>
  );
}
