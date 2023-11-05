
export type IServerResponse<T> = {
    data: T
    error: undefined
} | {
    data: undefined
    error: string
}



export type IFileUploadResponse = {
    id: string;
    fileHash: string;
    fileMime: string;
    fileName: string;
    fileSize: number;
}