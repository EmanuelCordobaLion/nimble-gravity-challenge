import type {
  Candidate,
  Job,
  ApplyToJobRequest,
  ApplyToJobResponse,
  ApiError,
} from '../types/api.types';

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    const error: ApiError = {
      message: errorText || `HTTP error! status: ${response.status}`,
      status: response.status,
    };
    throw error;
  }

  return response.json();
}

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );

  return handleResponse<Candidate>(response);
}

export async function getJobsList(): Promise<Job[]> {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  return handleResponse<Job[]>(response);
}

export async function applyToJob(data: ApplyToJobRequest): Promise<ApplyToJobResponse> {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse<ApplyToJobResponse>(response);
}
