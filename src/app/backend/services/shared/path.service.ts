import {Injectable} from '@angular/core';
import {CachedDrives} from './store.service';
import {Stack} from '../../shared';
import {AbstractDrive} from '../../state';
import {sha1} from 'object-hash';


@Injectable({
  providedIn: 'root'
})
export class PathService {

  drivePathData: Record<string, Stack<string>> = {};

  clear(): void {
    this.drivePathData = {};
  }

  popEveryone(): void {
    Object.values(this.drivePathData).forEach(stack => stack.pop());
  }

  addForDrive(drive: AbstractDrive, identificator?: string): void {
    const driveKey = this.driveToKey(drive);
    if (!driveKey) {
      throw new Error(`Drive ${drive.configService.configValue.common.name} doesn't contain nessesary credentials`);
    }
    console.log(driveKey)
    if (!this.drivePathData.hasOwnProperty(driveKey)) {
      this.drivePathData[driveKey] = new Stack();
    }
    if (!drive.configService.configValue.base?.rootFolder) {
      throw new Error(`Base config for drive ${drive.configService.configValue.common.name} nor provided`);
    }
    this.drivePathData[driveKey].add(identificator ? identificator : drive.configService.configValue.base?.rootFolder);
  }

  getLastForDrive(drive: AbstractDrive): string {
    const driveKey = this.driveToKey(drive);
    if (!driveKey) {
      throw new Error(`Drive ${drive.configService.configValue.common.name} doesn't contain nessesary credentials`);
    }
    return this.drivePathData[driveKey].getLast();
  }

  driveToKey(drive: AbstractDrive): string | undefined {
    const credValue = drive.authService.getCredentials().getValue();
    return credValue ? sha1(credValue) : undefined;
  }
}
