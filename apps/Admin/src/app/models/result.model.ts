export interface ResultModel<T>{
    data?: T;
    errorMessages?: string[];
    statusCode: number;
    isSuccessful: boolean;
}