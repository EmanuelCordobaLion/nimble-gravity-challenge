import { useState, useEffect } from 'react';
import { getCandidateByEmail } from '../services/api.service';
import type { Candidate, ApiError } from '../types/api.types';

const CANDIDATE_EMAIL = 'emacordoba99@gmail.com';

export function useCandidateData() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidate() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCandidateByEmail(CANDIDATE_EMAIL);
        setCandidate(data);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to load candidate data');
      } finally {
        setLoading(false);
      }
    }

    fetchCandidate();
  }, []);

  return { candidate, loading, error };
}
