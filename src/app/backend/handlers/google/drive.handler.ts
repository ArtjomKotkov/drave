import {AbstractDriveHandler} from '../base/drive.handler';
import {GoogleToken} from '../../state';
import {Request} from '../shared/request';


export class GoogleDriveHandler extends AbstractDriveHandler {

  credentials: GoogleToken | undefined;
  apiUrl = 'https://www.googleapis.com/drive/v3/';
  request = new Request();

  configure(credentials: GoogleToken): void {
    this.request.configure({
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`
      }
    });
  }

  async getMetaData(): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'about',
      {
        query: {
          fields: '*'
        }
      }
    );
    return await response.json();
  }

  async get(
    identificator?: string,
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined,
    optional?: object | undefined
  ): Promise<object> {
    let response = null;
    let query = {
      fields: fields?.join(',')
    };

    if (optional) {
      query = {
        ...query,
        ...optional
      };
    }

    if (identificator) {
      response = await this.request.make(this.apiUrl + 'files/' + identificator, {
        query
      });
    } else {
      response = await this.request.make(this.apiUrl + 'files/', {
        query
      });
    }
    return await response.json();
  }


  async delete(
    identificator: string,
    fields?: Array<string> | undefined,
    permanently?: boolean
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'files/' + identificator, {
      method: 'DELETE'
    });

    return await response.json();
  }

  async update(
    identificator: string,
    dataMap: object,
    fields?: Array<string> | undefined,
    optional?: object | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'files/' + identificator, {
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
    name: string,
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'files/' + identificator, {
      query: {
        path: identificator,
        fields: fields?.join(','),
      },
      data: {
        mimeType: 'application/vnd.google-apps.folder',
        name
      },
      method: 'POST',
    });

    return await response.json();
  }

  async getDownloadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<any> {
    return await this.get(identificator);
  }

  async copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false): Promise<object> {
    return await this.update(identificatorFrom, {
      addParents: identificatorTo
    });
  }

  async move(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = true
  ): Promise<object> {
    return await this.update(identificatorFrom, {
      removeParents: identificatorFrom,
      addParents: identificatorTo
    });
  }

  async publish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'files/' + identificator + '/permissions', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'POST',
      data: {
        role: 'reader',
        type: 'anyone'
      }
    });

    return await response.json();
  }

  async unpublish(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'files/' + identificator + '/permissions', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'DELETE'
    });

    return await response.json();
  }

  async download(
    identificator: string
  ): Promise<Blob> {
    const response = await this.request.make(this.apiUrl + 'files/' + identificator + '?alt=media', {
      query: {
        alt: 'media'
      }
    });

    return await response.blob();
  }

  async upload(
    identificator: string,
    file: Blob
  ): Promise<object> {
    return await this.request.make(this.apiUrl + 'files', {
      headers: {
        'Content-Type': file.type,
        'Content-Length': String(file.size)
      },
      data: file
    });
  }

  async clearTrash(): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'files/trash', {
      method: 'DELETE'
    });

    return await response.json();
  }

  async getTrash(
    identificator?: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + '/files', {
      query: {
        corpora: 'trashed = true'
      }
    });

    return await response.json();
  }

  async restoreTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
   return await this.update(
     identificator,
     {
       trashed: false
     }
   );
  }
}
