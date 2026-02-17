import { useCandidateData } from './hooks/useCandidateData';
import { useJobsList } from './hooks/useJobsList';
import { JobList } from './components/JobList';

function App() {
  const { candidate, loading: candidateLoading, error: candidateError } = useCandidateData();
  const { jobs, loading: jobsLoading, error: jobsError } = useJobsList();

  const loading = candidateLoading || jobsLoading;
  const error = candidateError || jobsError;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Job Application
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome, {candidate.firstName} {candidate.lastName}
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Positions
          </h2>
          <JobList jobs={jobs} candidate={candidate} />
        </div>
      </div>
    </div>
  );
}

export default App
