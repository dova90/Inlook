export interface IApiResponse<T>{
    isError: boolean;
	errorMessage?: string;
	responseCode: number;
	data?: T;
}

export const handleResponse = async <T>(response: Response) : Promise<IApiResponse<T>> => {
    if(response.ok){
        return {
            isError: false,
            responseCode: response.status,
            data: await response.json(),
        }
    }
    else {
        return {
            isError: true,
            responseCode: response.status,
            errorMessage: await response.json(),
        }
    }
}


export const handleError = async <T>(error: any) : Promise<IApiResponse<T>> => {
    return {
        isError: true,
        responseCode: error.status,
        errorMessage: error.message,
    }
}