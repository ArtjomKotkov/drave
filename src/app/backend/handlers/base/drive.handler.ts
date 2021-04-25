export abstract class AbstractDriveHandler {

  apiUrl: string;

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

  abstract update(identificator: string, data: object, fields: Array<string> | undefined): object;

  abstract makeDir(identificator: string, fields: Array<string> | undefined): object;

  abstract getDownloadLink(identificator: string, fields: Array<string> | undefined): object;

  abstract copy(identificator_from: string, identificator_to: string, fields: Array<string> | undefined): object;

  abstract move(identificator_from: string, identificator_to: string, fields: Array<string> | undefined): object;

  abstract publish(identificator: string): object;

  abstract unpublish(identificator: string): object;

  abstract getUploadLink(identificator: string): object;

  abstract uploadByUrl(identificator: string, url: string): object;

  abstract clearTrash(identificator: string): object;

  abstract getTrash(identificator: string): object;

  abstract restoreTrash(identificator: string): object;

}
