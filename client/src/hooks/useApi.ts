import { useState, useCallback } from 'react';
import { getApiUrl, getHeaders } from '../config/api';
import type { ApiResponse } from '../config/api';

export interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async <T = any>(
    endpoint: string,
    options: RequestInit = {},
    callbacks?: UseApiOptions
  ): Promise<ApiResponse<T> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl(endpoint), {
        headers: getHeaders(),
        ...options,
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || `HTTP error! status: ${response.status}`;
        setError(errorMessage);
        callbacks?.onError?.(errorMessage);
        return null;
      }

      if (!data.success) {
        const errorMessage = data.error || 'Request failed';
        setError(errorMessage);
        callbacks?.onError?.(errorMessage);
        return null;
      }

      callbacks?.onSuccess?.(data.data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      setError(errorMessage);
      callbacks?.onError?.(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Convenience methods
  const get = useCallback((endpoint: string, callbacks?: UseApiOptions) => {
    return makeRequest(endpoint, { method: 'GET' }, callbacks);
  }, [makeRequest]);

  const post = useCallback((endpoint: string, body: any, callbacks?: UseApiOptions) => {
    return makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }, callbacks);
  }, [makeRequest]);

  const put = useCallback((endpoint: string, body: any, callbacks?: UseApiOptions) => {
    return makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }, callbacks);
  }, [makeRequest]);

  const del = useCallback((endpoint: string, callbacks?: UseApiOptions) => {
    return makeRequest(endpoint, { method: 'DELETE' }, callbacks);
  }, [makeRequest]);

  return {
    loading,
    error,
    makeRequest,
    get,
    post,
    put,
    delete: del,
    clearError: () => setError(null),
  };
}
