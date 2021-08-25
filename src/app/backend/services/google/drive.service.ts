import {DriveAbstractService} from '../base/drive.abstract';
import {baseConfigsByType} from '../../state/yandex/config.data';
import {AbstractDrive, Credentials} from '../../state';
import {BehaviorSubject} from 'rxjs';
import {AbstractFile} from '../../state/base/model.abstract';
import {GoogleDriveHandler} from '../../handlers/google/drive.handler';
import {GoogleMetaData} from '../../state';


export class GoogleDriveService extends DriveAbstractService {
  handler: GoogleDriveHandler = new GoogleDriveHandler();

  private metaData: BehaviorSubject<GoogleMetaData | undefined> = new BehaviorSubject<GoogleMetaData | undefined>(undefined);

  constructor(
    private googleDrive: AbstractDrive,
  ) {
    super();
  }

  async registerCallback(code: number, function_: CallableFunction): Promise<void> {
    this.handler.request.registerCallback(code, function_, true);
  }

  async rebuild(credentials?: Credentials): Promise<void> {
    if (credentials === undefined) {
      return;
    }
    this.handler.configure(credentials);
    await this.updateMetaData();
  }

  getMetaData(): GoogleMetaData | undefined {
    return this.metaData.getValue();
  }

  async updateMetaData(): Promise<void> {
    const data = await this.handler.getMetaData();
    const metaData = this.parseMetaData(data);
    this.metaData.next(metaData);
  }

  private parseMetaData(response: any): GoogleMetaData {
    return {
      totalSpace: response.storageQuota.limit,
      filledSpace: response.storageQuota.usage,
      maxFileSize: response.maxUploadSize,
      trashFilledSpace: response.storageQuota.usageInDriveTrash,
      owner: {
        id: response.user.permissionId,
        login: response.user.emailAddress,
        displayName: response.user.displayName
      }
    };
  }

  async getRoot(
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<AbstractFile> {
    return await this.get(baseConfigsByType.google.rootFolder, fields, limit, offset);
  }

  async get(
    identificator: string,
    fields?: Array<string>,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<AbstractFile> {
    const file = this.googleDataToFile(await this.handler.get(identificator, ['*'], limit, offset)) as AbstractFile;
    if (file && file.isDir) {
      const innerFiles = await this.handler.get(undefined, ['*'], undefined, undefined, {
        q: `'${file.id}' in parents`
      }) as any;
      if (innerFiles) {
        const files = innerFiles.files as AbstractFile[];
        file.nested = {};
        file.nested.files = files.map(data => this.googleDataToFile(data) as AbstractFile);
      }
    }
    return file;
  }

  async delete(
    identificator: string,
    fields?: Array<string> | undefined,
    permanently: boolean = false
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.delete(identificator, fields, permanently)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async update(
    identificator: string,
    data: object,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.update(identificator, data, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async makeDir(
    identificator: string,
    name: string,
    fields?: Array<string>
  ): Promise<AbstractFile> {
    return this.googleDataToFile(await this.handler.makeDir(name, identificator, fields)) as AbstractFile;
  }

  async getDownloadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<string | undefined> {
    return (await this.handler.getDownloadLink(identificator, fields)).href as string;
  }

  async copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.copy(identificatorFrom, identificatorTo, fields, overwrite)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async move(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.move(identificatorFrom, identificatorTo, fields, overwrite)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async publish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.publish(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async unpublish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.unpublish(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async clearTrash(
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.clearTrash()) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async clearFromTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.clearTrash()) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async getTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    return this.googleDataToFile(this.handler.getTrash()) as AbstractFile;
  }

  async restoreTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.googleDataToFile(await this.handler.restoreTrash(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async download(identificator: string): Promise<Blob> {
    return await this.handler.download(identificator);
  }

  async upload(identificator: string, file: Blob): Promise<AbstractFile> {
    return await this.handler.upload(identificator, file) as AbstractFile;
  }

  async moveToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite?: boolean): Promise<void> {
    const fileFrom = await this.handler.download(identificatorFrom);

    await drive.driveService.upload(identificatorTo, fileFrom);
    await this.delete(identificatorFrom);

    await this.updateMetaData();
    await drive.driveService.updateMetaData();
  }

  async copyToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite?: boolean): Promise<void> {
    const fileFrom = await this.handler.download(identificatorFrom);

    await drive.driveService.upload(identificatorTo, fileFrom);

    await this.updateMetaData();
    await drive.driveService.updateMetaData();
  }

  private googleDataToFile(data: any): AbstractFile {
    return {
      id: data.id,
      name: data.name,
      mimeType: data.mimeType,
      size: data.size,
      created: data.createdTime,
      modified: data.modifiedTime,
      isDir: data.mimeType === 'application/vnd.google-apps.folder',
      type: '',
      trashed: data.trashed,
      drive: this.googleDrive,
    };
  }

}
