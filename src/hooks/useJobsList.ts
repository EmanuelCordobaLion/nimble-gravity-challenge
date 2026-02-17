import { useState, useEffect } from 'react';
import { getJobsList } from '../services/api.service';
import type { Job, ApiError } from '../types/api.types';

export function useJobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const data = await getJobsList();
        setJobs(data);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}
