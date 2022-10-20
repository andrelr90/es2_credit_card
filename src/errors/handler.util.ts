import { Response } from 'express';

function getErrorMessage(err: unknown) {
    let errorMessage;
    if (err instanceof Error) {
        errorMessage = err.message;
    } else {
        errorMessage = JSON.stringify(err);
    }
    return errorMessage;
}

export const handleStandardFailure = (err: unknown, res: Response) => {
    const errorMessage = getErrorMessage(err);
    return res.status(400).json({ success: false, errors: [errorMessage] });
};
