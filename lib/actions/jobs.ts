

import type { FormState } from "@/lib/types/job";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

/** Abort requests that hang so callers (and their toasts) aren't stuck forever. */
const REQUEST_TIMEOUT_MS = 15_000

export const createJobs = async (data: FormState) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    }).catch((error) => {
        if (error.name === "TimeoutError") {
            throw new Error("The backend did not respond in time. Is it running?");
        }
        throw error;
    });
    if (!res.ok) {
        throw new Error(`Failed to create job (HTTP ${res.status})`);
    }
    return res.json();
}

export const deleteJob = async(jobId: string) =>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: 'DELETE',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    if (!res.ok) {
        throw new Error(`Failed to delete job (HTTP ${res.status})`);
    }
    return res.json();
}