export {};

export type RoomItemType = {
  _id: string;
  title: string;
  description: string;
  quality: string;
  photo: string | null;
  roomNumber: number;
  reserved: string | null;
};

export type UserType = {
  email: string;
  password: string;
};

export type MessageType = {
  title: string;
  message: string;
};

export type AuthFormType = {
  title: string;
  onFinish(data: UserType): void;
  onFinishFailed(errorInfo: any): void;
  submitBtnText: string;
};

export type DefaultStateRoomsType = {
  rooms: [] | RoomItemType[];
  loading: boolean;
  error: string;
};

export type DefaultStateRoomType = {
  room: {} | RoomItemType;
  loading: boolean;
  error: string;
};

export type DefaultStateAuthType = {
  auth: boolean;
  loading: boolean;
  error: string;
};

export type getApiRoomsType = { rooms: RoomItemType[]; codeStatus: number };
