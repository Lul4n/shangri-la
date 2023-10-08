import {Writeable} from "./Utils";

export type ErrorCode = 'SYSTEM_NOT_FOUND' | 'INVALID_SYSTEM_ID' | 'UNKNOWN';

export interface ErrorResponse{
    get title(): string | null;
    get message(): string | null;
    get code(): ErrorCode;
    get status(): number;
}
export class ErrorResponseExceptionBuilder{
    private data: Partial<Writeable<ErrorResponse>> = {};

    public title(title: string): ErrorResponseExceptionBuilder {
        this.data.title = title;
        return this;
    }
    public message(message: string): ErrorResponseExceptionBuilder {
        this.data.message = message;
        return this;
    }
    public code(code: ErrorCode): ErrorResponseExceptionBuilder {
        this.data.code = code;
        return this;
    }
    public status(status: number): ErrorResponseExceptionBuilder {
        this.data.status = status;
        return this;
    }
    public build(): ErrorResponseException{
        return new ErrorResponseException(this.data);
    }
}

export class ErrorResponseException extends Error implements ErrorResponse{
    public static builder(): ErrorResponseExceptionBuilder{
        return new ErrorResponseExceptionBuilder();
    }

    private readonly _title: string | null;
    private readonly _code: ErrorCode;
    private readonly _status: number;

    constructor(source: Partial<ErrorResponse>) {
        super(source.message ? source.message : undefined);
        this._title = source.title ? source.title : null;
        this._code = source.code ? source.code : 'UNKNOWN';
        this._status = source.status ? source.status : 500;
    }

    get code(): ErrorCode {
        return this._code;
    }

    get status(): number {
        return this._status;
    }

    get title(): string | null {
        return this._title;
    }

}