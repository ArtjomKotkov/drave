import {CachedDrives} from '../../services/shared/store.service';
import {AbstractDrive} from '../../state';

type driveCollection = Record<string, DriveItemCollection>;

export class DriveCollection {

  constructor(drive: CachedDrives) {
    this.drives = this.init(drive);
  }

  private drives: driveCollection = {};

  reload(drive: CachedDrives): void {
    this.drives = this.init(drive);
  }

  private init(drives: CachedDrives): driveCollection {
    const drivesCollection: driveCollection = {};
    Object.keys(drives).forEach(key => {
      drivesCollection[key] = new DriveItemCollection(drives[key]);
    });
    return drivesCollection;
  }

  calculateStatusFulfillmentForType(driveType: string, status: string): number {
    return this.drives[driveType].calculateStatusFulfillment(status);
  }

}

export class DriveItemCollection {
  constructor(
    drives: AbstractDrive[]
  ) {
    this.drivesItems = drives.map(drive => new DriveItem(drive));
  }

  drivesItems: DriveItem[] = [];

  calculateStatusFulfillment(status: string): number {
    const driveStatuses = this.drivesItems.map(drive => drive.hasStatus(status));
    return driveStatuses.filter(value => value === true).length / driveStatuses.length;
  }

}

export class DriveItem {
  constructor(
    private drive: AbstractDrive
  ) {
  }

  private statusMap: Set<string> = new Set([]);

  setStatus(name: string): void {
    this.statusMap.add(name);
  }

  hasStatus(name: string): boolean {
    return this.statusMap.has(name);
  }

  removeStatus(name: string): void {
    this.statusMap.delete(name);
  }

}
