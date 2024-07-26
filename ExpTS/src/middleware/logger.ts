import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logDirectory = process.env.LOG_DIRECTORY || 'logs';

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

export const logger = (format: 'simple' | 'complete') => (req: Request, res: Response, next: NextFunction) => {
    const logFilePath = path.join(logDirectory, 'access.log');
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
    
    const logEntry = format === 'simple' 
        ? `${new Date().toISOString()} ${req.url} ${req.method}\n`
        : `${new Date().toISOString()} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')}\n`;
    
    logStream.write(logEntry);
    logStream.end();
    next();
};