export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type uint32 = number;
export type uint64 = number;
export type int64 = number;
export type int32 = number;

export namespace google {
  export namespace protobuf {
    export interface Duration {
      seconds: int64;
      nanos: int32;
    }
  }
}