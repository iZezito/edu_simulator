import { useState, useCallback } from 'react';
import api from '@/services/api';
import { AxiosRequestConfig } from 'axios';

interface ServiceHookResult<T> {
  data: {
    object: T | null;
    list: T[] | null;
  };
  error: Error | null;
  isPending: boolean;
  get: (id?: string | number, config?: AxiosRequestConfig) => Promise<T>;
  getAll: (params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<T[]>;
  create: (data: Partial<T>, config?: AxiosRequestConfig) => Promise<T>;
  update: (id: string | number, data: Partial<T>, config?: AxiosRequestConfig) => Promise<T>;
  remove: (id: string | number, config?: AxiosRequestConfig) => Promise<void>;
  mutate: () => void;
}

export function useService<T extends { id: string | number }>(resource: string): ServiceHookResult<T> {
  const [data, setData] = useState<{ object: T | null; list: T[] | null }>({
    object: null,
    list: null,
  });
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleRequest = useCallback(async <R>(
    request: () => Promise<R>,
    onSuccess?: (result: R) => void
  ): Promise<R> => {
    setIsPending(true);
    setError(null);
    try {
      const result = await request();
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setIsPending(false);
    }
  }, []);

  const get = useCallback((id?: string | number, config?: AxiosRequestConfig) => {
    return handleRequest(
      () => api.get<T>(`/${resource}${id ? `/${id}` : '/'}`, config).then(res => res.data),
      (result) => setData(prevData => ({ ...prevData, object: result }))
    );
  }, [resource, handleRequest]);

  const getAll = useCallback((params?: Record<string, any>, config?: AxiosRequestConfig) => {
    return handleRequest(
      () => api.get<T[]>(`/${resource}`, { ...config, params }).then(res => res.data),
      (result) => setData(prevData => ({ ...prevData, list: result }))
    );
  }, [resource, handleRequest]);

  const create = useCallback((newData: Partial<T>, config?: AxiosRequestConfig) => {
    return handleRequest(
      () => api.post<T>(`/${resource}`, newData, config).then(res => res.data),
      (createdItem) => setData(prevData => ({
        ...prevData,
        list: prevData.list ? [...prevData.list, createdItem] : [createdItem],
      }))
    );
  }, [resource, handleRequest]);

  const update = useCallback((id: string | number, updatedData: Partial<T>, config?: AxiosRequestConfig) => {
    return handleRequest(
      () => api.put<T>(`/${resource}/${id}`, updatedData, config).then(res => res.data),
      (updatedItem) => setData(prevData => ({
        ...prevData,
        object: prevData.object?.id === id ? { ...prevData.object, ...updatedItem } : prevData.object,
        list: prevData.list?.map(item => item.id === id ? { ...item, ...updatedItem } : item) || null,
      }))
    );
  }, [resource, handleRequest]);

  const remove = useCallback((id: string | number, config?: AxiosRequestConfig) => {
    return handleRequest(
      () => api.delete(`/${resource}/${id}`, config).then(() => undefined),
      () => setData(prevData => ({
        ...prevData,
        list: prevData.list?.filter(item => item.id !== id) || null,
        object: prevData.object?.id === id ? null : prevData.object,
      }))
    );
  }, [resource, handleRequest]);

  const mutate = useCallback(() => {
    setData({ object: null, list: null });
  }, []);

  return {
    data,
    error,
    isPending,
    get,
    getAll,
    create,
    update,
    remove,
    mutate,
  };
}





// import { useState, useCallback } from 'react';
// import api from '@/services/api';
// import { AxiosRequestConfig } from 'axios';

// interface ServiceHookResult<T> {
//   data: T | T[] | null;
//   error: Error | null;
//   isPending: boolean;
//   get: (id?: string | number, config?: AxiosRequestConfig) => Promise<T>;
//   getAll: (params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<T[]>;
//   create: (data: Partial<T>, config?: AxiosRequestConfig) => Promise<T>;
//   update: (id: string | number, data: Partial<T>, config?: AxiosRequestConfig) => Promise<T>;
//   remove: (id: string | number, config?: AxiosRequestConfig) => Promise<void>;
//   mutate: () => void;
// }

// export function useService<T extends { id: string | number }>(resource: string): ServiceHookResult<T> {
//   const [data, setData] = useState<T | T[] | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [isPending, setIsPending] = useState<boolean>(false);

//   const handleRequest = useCallback(async <R>(
//     request: () => Promise<R>,
//     onSuccess?: (result: R) => void
//   ): Promise<R> => {
//     setIsPending(true);
//     setError(null);
//     try {
//       const result = await request();
//       onSuccess?.(result);
//       return result;
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error('An unknown error occurred'));
//       throw err;
//     } finally {
//       setIsPending(false);
//     }
//   }, []);

//   const get = useCallback((id?: string | number, config?: AxiosRequestConfig) => {
//     return handleRequest(
//       () => api.get<T>(`/${resource}${id ? `/${id}` : ''}`, config).then(res => res.data),
//       setData
//     );
//   }, [resource, handleRequest]);

//   const getAll = useCallback((params?: Record<string, any>, config?: AxiosRequestConfig) => {
//     return handleRequest(
//       () => api.get<T[]>(`/${resource}`, { ...config, params }).then(res => res.data),
//       setData
//     );
//   }, [resource, handleRequest]);

//   const create = useCallback((newData: Partial<T>, config?: AxiosRequestConfig) => {
//     return handleRequest(
//       () => api.post<T>(`/${resource}`, newData, config).then(res => res.data),
//       (createdItem) => setData(prevData => 
//         Array.isArray(prevData) ? [...prevData, createdItem] : createdItem
//       )
//     );
//   }, [resource, handleRequest]);

//   const update = useCallback((id: string | number, updatedData: Partial<T>, config?: AxiosRequestConfig) => {
//     return handleRequest(
//       () => api.put<T>(`/${resource}/${id}`, updatedData, config).then(res => res.data),
//       (updatedItem) => setData(prevData => {
//         if (Array.isArray(prevData)) {
//           return prevData.map(item => item.id === id ? { ...item, ...updatedItem } : item);
//         } else if (prevData && 'id' in prevData && prevData.id === id) {
//           return { ...prevData, ...updatedItem };
//         }
//         return updatedItem;
//       })
//     );
//   }, [resource, handleRequest]);

//   const remove = useCallback((id: string | number, config?: AxiosRequestConfig) => {
//     return handleRequest(
//       () => api.delete(`/${resource}/${id}`, config).then(() => undefined),
//       () => setData(prevData => {
//         if (Array.isArray(prevData)) {
//           return prevData.filter(item => item.id !== id);
//         } else if (prevData && 'id' in prevData && prevData.id === id) {
//           return null;
//         }
//         return prevData;
//       })
//     );
//   }, [resource, handleRequest]);

//   const mutate = useCallback(() => {
//     setData(null);
//   }, []);

//   return {
//     data,
//     error,
//     isPending,
//     get,
//     getAll,
//     create,
//     update,
//     remove,
//     mutate,
//   };
// }


