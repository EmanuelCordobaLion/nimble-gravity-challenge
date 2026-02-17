import { useState } from 'react';
import { applyToJob } from '../services/api.service';
import type { Job, Candidate } from '../types/api.types';

interface JobCardProps {
  job: Job;
  candidate: Candidate;
}

export function JobCard({ job, candidate }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl.trim(),
      });

      setSubmitStatus('success');
      setRepoUrl('');
    } catch (error) {
      setSubmitStatus('error');
      const err = error as { message: string };
      setErrorMessage(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting || submitStatus === 'success'}
          />
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm font-medium">
              Application submitted successfully!
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm font-medium">Failed to submit</p>
            <p className="text-red-600 text-xs mt-1">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : submitStatus === 'success' ? 'Applied' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
