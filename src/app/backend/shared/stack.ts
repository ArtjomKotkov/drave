export class Stack<TData> {

  private store: TData[] = [];

  constructor(private limit?: number) {
  }

  pop(): TData | undefined {
    return this.store.pop();
  }

  add(data: TData): void {
    if (this.limit && this.store.length === this.limit) {
      this.store.splice(0, 1);
    }
    this.store.push(data);
  }

  count(): number {
    return this.store.length;
  }

  clear(): void {
    this.store = [];
  }

}
