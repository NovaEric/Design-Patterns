import { Logger } from 'jsr:@deno-library/logger';


interface IDenoLoggerAdapter {
    file: string;

    writeLog: (msg:string) => void;
    writeError: (msg:string) => void;
    writeWarning: (msg:string) => void;
}

export class DenoLoggerAdapter implements IDenoLoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string){
    this.file = file;
  };

  writeLog (msg: string){
 this.logger.info(`${msg} %c[${this.file} info]`);
  };

  writeError (msg: string) {
 this.logger.error(`${msg} %c[${this.file} error]`);
  };

  writeWarning (msg: string) {
     this.logger.warn(`${msg} %c[${this.file} warning]`);
  };

}
