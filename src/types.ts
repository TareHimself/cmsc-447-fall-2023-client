
export type IServerResponse<T> = {
    data: T
    error: null
} | {
    data: null
    error: string
}



export type IFileUploadResponse = {
    id: string;
    fileHash: string;
    fileMime: string;
    fileName: string;
    fileSize: number;
}

export type IFileAccessResponse = {
    filename: string
    size: number
    mime: string
    views: number
    downloads: number
    expire_at: string
    url: string
}