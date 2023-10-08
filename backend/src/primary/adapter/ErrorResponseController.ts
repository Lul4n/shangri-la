import {loggerFactory} from "../../ccc/Logger";
import {Express, NextFunction, Request, Response} from "express";
import { System} from "../../../gen-src/openapi";
import {ErrorResponseException} from "../../ccc/ErrorResponseException";


export class ErrorResponseController {
    private static readonly LOGGER = loggerFactory(ErrorResponseController);
    public constructor(server: Express) {

        server.use((error : Error, req : Request, res : Response, _:NextFunction) => {
            if(error instanceof ErrorResponseException){
                return res.status(error.status || 500).json({
                    status: error.status,
                    code: error.code,
                    title: error.title,
                    message: error.message
                })
            }else {
                return res.status(500).json({
                    status: 500,
                    code: 'UNKNOWN',
                    title: 'Error',
                    message: 'Internal server error',
                });
            }
        })

    }
}