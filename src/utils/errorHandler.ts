export class APIError extends Error {

    constructor(statusCode: number, message: string){
        super(message);
        this.name = "API ERROR"
    }
}