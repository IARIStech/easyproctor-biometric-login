import axios, { Canceler, AxiosResponse, AxiosError } from 'axios';
import Constants from '@/utils/constants';
import $http from '../plugins/http';

export type ServiceObject<R> = [Promise<R>, Canceler | null];

export const Get = <R>(url: string = '', query?: { [key: string]: any }): ServiceObject<R> => {
    let requestCanceler: Canceler | null = null;

    // Pegar a query String
    const request = new Promise<R>((resolve, reject) => {
        // Realizar requisição HTTP
        $http.get(url, { params: query, cancelToken: new axios.CancelToken((c) => requestCanceler = c) })
            .then((resp: AxiosResponse<R>) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error.response && error.response.data && error.response.data.Error ? error.response.data.Error : Constants.DEFAULT_API_ERROR);
            });
    });

    return [request, requestCanceler];
};

export const Post = <M, R>(url: string, model: M, options?: { onProgress?: (progress: number) => void; timeout?: number}): ServiceObject<R> => {
    let requestCanceler: Canceler | null = null;

    const request = new Promise<R>((resolve, reject) => {
        $http.post<M, AxiosResponse<R>>(url, model, {
            cancelToken: new axios.CancelToken((c) => requestCanceler = c),
            onUploadProgress: (e: { type: "progress" | ""; total: number; loaded: number}) => {
                if(e.type == "progress") {
                    const percentage = Math.round((e.loaded / e.total) * 100);
                    options?.onProgress && options.onProgress(percentage);
                }
            },
            timeout: options?.timeout || 45000
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error.response && error.response.data && error.response.data.Error ? error.response.data.Error : Constants.DEFAULT_API_ERROR);
            });
    });

    return [request, requestCanceler];
};

export const Patch = <M, R>(url: string, model: M, options?: { onProgress?: (progress: number) => void; timeout?: number}): ServiceObject<R> => {
    let requestCanceler: Canceler | null = null;

    const request = new Promise<R>((resolve, reject) => {
        $http.patch<M, AxiosResponse<R>>(url, model, {
            cancelToken: new axios.CancelToken((c) => requestCanceler = c),
            onUploadProgress: (e: { type: "progress" | ""; total: number; loaded: number}) => {
                if(e.type == "progress") {
                    const percentage = Math.round((e.loaded / e.total) * 100);
                    options?.onProgress && options.onProgress(percentage);
                }
            },
            timeout: options?.timeout || 45000
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error.response && error.response.data && error.response.data.Error ? error.response.data.Error : Constants.DEFAULT_API_ERROR);
            });
    });

    return [request, requestCanceler];
};