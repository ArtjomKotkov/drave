export interface AbstractConfig  {
  rootFolder: string;
  trashRoot: string;
  baseColor: string;
  workflow?: {
    default?: {
      isEnabled?: boolean;
      isHidden?: boolean;
    }
  };
}
