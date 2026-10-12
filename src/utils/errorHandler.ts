export class APIError extends Error {

    constructor(message: string, public statusCode: number){
        super(message);
        this.name = "API ERROR"
    }
}

//using unkown because you can throw anything
//and you have to check unkown before you can use it
export function handleError(err: unknown): void {

    //APIError
    if (err instanceof APIError){
        console.log(`${err.statusCode}: ${err.message}`);
        return
    }

    //Plain Error
    if (err instanceof Error){
        console.error(`Something went wrong: ${err.message}`);
        return;
    }

    //what was thrown was not an error, and using String(err)
    //turns the value to a text
    console.error(`Something unexpected happen: ${String(err)}`);
}