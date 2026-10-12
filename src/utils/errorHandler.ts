export class APIError extends Error {

    constructor(message: string, public statusCode: number){
        super(message);
        this.name = "API ERROR"
    }
}

//using unkown because you can throw anything
//and you have to check unkown before you can use it
export function handleError(err: unknown): void {

    //APIError check
    if (err instanceof APIError){
        console.log(`${err.statusCode}: ${err.message}`);
        return
    }

    //Plain Error check, covers network failures and JSON parse failures
    if (err instanceof Error){

         // TypeError is what fetch throws when the request cannot be made at all.
         //Network failure: turn off Wi-Fi and request a valid id to see
        if (err instanceof TypeError){
            console.error("Could not reach the server. Please Try Again");

        //JSON failure, when the body is not valid JSON: 
        // temporarily point the URL at a page that returns HTML instead of JSON to see
        } else if (err instanceof SyntaxError){
            console.error("The server sent data in an unexpected format. Please try again later.");
        } else {
            console.error("Something went wrong. Please try again.");
        }


        console.debug(`Error: ${err.name}: ${err.message}`);
        return;
    }

    //what was thrown was not an error, and using String(err)
    //turns the value to a text
    console.error(`Something unexpected happen: ${String(err)}`);
}