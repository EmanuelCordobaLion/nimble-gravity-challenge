import { useState } from 'react';
import { applyToJob } from '../services/api.service';
import { getGitHubUrlError } from '../utils/validation';
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
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setRepoUrl(value);
    if (validationError) {
      setValidationError(null);
    }
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const urlError = getGitHubUrlError(repoUrl);
    if (urlError) {
      setValidationError(urlError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setValidationError(null);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl.trim(),
      });

      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      const err = error as { message: string };
      setErrorMessage(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {job.title}
        </h3>
        {submitStatus === 'success' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Applied
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor={`repo-url-${job.id}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            GitHub Repository URL
          </label>
          <input
            type="text"
            id={`repo-url-${job.id}`}
            value={repoUrl}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="https://github.com/username/repository"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition ${
              validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isSubmitting || submitStatus === 'success'}
            aria-invalid={validationError ? 'true' : 'false'}
            aria-describedby={validationError ? `error-${job.id}` : undefined}
          />
          {validationError && (
            <p id={`error-${job.id}`} className="mt-1 text-sm text-red-600">
              {validationError}
            </p>
          )}
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3" role="alert">
            <p className="text-green-800 text-sm font-medium">
              ✓ Application submitted successfully!
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
            <p className="text-red-800 text-sm font-medium">Error submitting application</p>
            <p className="text-red-600 text-xs mt-1">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : submitStatus === 'success' ? 'Applied ✓' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
