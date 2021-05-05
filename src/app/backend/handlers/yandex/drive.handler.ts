import {AbstractDriveHandler} from '../base/drive.handler';
import {YandexToken} from '../../state';
import {Request} from '../shared/request';


export class YandexDriveHandler extends AbstractDriveHandler {

  credentials: YandexToken | undefined;
  apiUrl = 'https://cloud-api.yandex.net/v1/disk/';
  request = new Request();

  configure(credentials: YandexToken): void {
    this.request.configure({
      headers: {
        Authorization: `OAuth ${credentials.access_token}`
      }
    });
  }

  async getMetaData(): Promise<object> {
    const response = await this.request.make(this.apiUrl);
    return await response.json();
  }

  async get(
    identificator: string,
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
        limit,
        offset
      }
    });

    return await response.json();
  }

  async delete(
    identificator: string,
    fields?: Array<string> | undefined,
    permanently?: boolean
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
        permanently
      },
      method: 'DELETE'
    });

    return await response.json();
  }

  async update(
    identificator: string,
    dataMap: object,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
      },
      method: 'PATCH',
      data: dataMap
    });

    return await response.json();
  }

  async makeDir(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
      },
      method: 'PUT',
    });

    return await response.json();
  }

  async getDownloadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/donwload', {
      query: {
        path: identificator,
        fields: fields?.join(','),
      }
    });

    return await response.json();
  }

  async copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/copy', {
      query: {
        from: identificatorFrom,
        path: identificatorTo,
        fields: fields?.join(','),
        overwrite
      },
      method: 'POST'
    });

    return await response.json();
  }

  async move(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = true
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/move', {
      query: {
        from: identificatorFrom,
        path: identificatorTo,
        fields: fields?.join(','),
        overwrite
      },
      method: 'POST'
    });

    return await response.json();
  }

  async publish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/publish', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'PUT'
    });

    return await response.json();
  }

  async unpublish(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/unpublish', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'PUT'
    });

    return await response.json();
  }

  async getUploadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/upload', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      }
    });

    return await response.json();
  }

  async uploadByUrl(
    identificator: string, url: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/upload', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'POST'
    });

    return await response.json();
  }

  async clearTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'trash/resources', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'DELETE'
    });

    return await response.json();
  }

  async getTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'trash/resources', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      }
    });

    return await response.json();
  }

  async restoreTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'trash/resources', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'PUT'
    });

    return await response.json();
  }
}
