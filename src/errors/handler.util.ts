import { Response } from 'express';

function getErrorMessage(err: unknown) {
    return err instanceof Error ? err.message : JSON.stringify(err);
}

export const handleStandardFailure = (err: unknown, res: Response) => {
    const errorMessage = getErrorMessage(err);
    return res.status(400).json({ success: false, errors: [errorMessage] });
};
