import { useState } from 'react';
import type { Job } from '../types/api.types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {job.title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor={`repo-url-${job.id}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            GitHub Repository URL
          </label>
          <input
            type="url"
            id={`repo-url-${job.id}`}
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
