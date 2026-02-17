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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent" role="status" aria-label="Loading"></div>
          <p className="mt-3 text-gray-600 font-medium">Loading application data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full" role="alert">
          <p className="text-red-800 font-semibold text-lg">Unable to load data</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
          <p className="text-red-500 text-xs mt-3">Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Job Application
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Welcome, <span className="font-medium">{candidate.firstName} {candidate.lastName}</span>
          </p>
        </header>

        <main>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Available Positions
              </h2>
              <span className="text-sm text-gray-500">
                {jobs.length} {jobs.length === 1 ? 'position' : 'positions'}
              </span>
            </div>
            <JobList jobs={jobs} candidate={candidate} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App
