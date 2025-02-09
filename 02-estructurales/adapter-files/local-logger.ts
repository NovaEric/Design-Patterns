import { COLORS } from '../../helpers/colors.ts';

export class localLogger {
    constructor(private file:string){};

    writeLog(msg:string): void {
        console.log(`${msg} %c[${this.file} log]`, COLORS.gray);
    };

    writeError(msg:string): void {
        console.log(`${msg} %c[${this.file} error]`, COLORS.red);
    };
    writeWarning(msg:string): void {
        console.log(`${msg} %c[${this.file} warning]`, COLORS.orange);
    };
}
