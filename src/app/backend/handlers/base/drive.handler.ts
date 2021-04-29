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

  abstract copy(
    identificator_from: string,
    identificator_to: string,
    fields: Array<string> | undefined,
    overwrite: boolean
  ): object;

  abstract move(
    identificator_from: string,
    identificator_to: string,
    fields: Array<string> | undefined,
    overwrite: boolean
  ): object;

  abstract publish(identificator: string, fields: Array<string> | undefined): object;

  abstract unpublish(identificator: string, fields: Array<string> | undefined): object;

  abstract getUploadLink(identificator: string, fields: Array<string> | undefined): object;

  abstract uploadByUrl(identificator: string, url: string, fields: Array<string> | undefined): object;

  abstract clearTrash(identificator: string, fields: Array<string> | undefined): object;

  abstract getTrash(identificator: string, fields: Array<string> | undefined): object;

  abstract restoreTrash(identificator: string, fields: Array<string> | undefined): object;

}
