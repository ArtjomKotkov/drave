export abstract class AbstractDriveHandler {

  abstract apiUrl: string;

  abstract getMetaData(): object;

  abstract get(
    identificator: string,
    fields: Array<string> | undefined,
    limit: number | undefined,
    offset: number | undefined
  ): object;

  abstract delete(
    identificator: string,
    fields: Array<string> | undefined,
    permanently: boolean
  ): object;

  abstract update(identificator: string, data: object, fields?: Array<string>): object;

  abstract makeDir(name: string, identificator: string, fields?: Array<string>): object;

  abstract getDownloadLink(identificator: string, fields?: Array<string>): object;

  abstract copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields: Array<string> | undefined,
    overwrite: boolean
  ): object;

  abstract move(
    identificatorFrom: string,
    identificatorTo: string,
    fields: Array<string> | undefined,
    overwrite: boolean
  ): object;

  abstract publish(identificator: string, fields?: Array<string>): object;

  abstract unpublish(identificator: string, fields?: Array<string>): object;

  abstract clearTrash(identificator?: string, fields?: Array<string>): object;

  abstract getTrash(identificator?: string, fields?: Array<string>): object;

  abstract restoreTrash(identificator: string, fields?: Array<string>): object;

  abstract download(identificator: string): Promise<Blob>;

  abstract upload(identificator: string, file: Blob): object;
}
