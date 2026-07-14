import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';

/**
 * API 호출의 로딩 및 에러 상태를 관리하는 커스텀 훅
 * @param apiFunc 호출할 Axios 기반 API 함수
 */
export function useApi<T, P extends any[]>(apiFunc: (...args: P) => Promise<AxiosResponse<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: P) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'API 호출 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, execute, setData };
}
