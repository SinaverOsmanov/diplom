export type RoomItemType = {
  _id: string;
  title: string;
  description: string;
  quality: string;
  photoUrl: string | null;
  roomNumber: number;
  reserved: string | null;
};

export type RoomFormType = Omit<
  RoomItemType,
  "_id" | "roomNumber" | "reserved"
>;

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

export type DefaultStateType = {
  loading: boolean;
  error: null;
};

export type DefaultStateRoomsType = DefaultStateType & {
  rooms: RoomItemType[] | null;
};

export type DefaultStateRoomType = DefaultStateType & {
  room: RoomItemType | null;
};

export type DefaultStateAuthType = DefaultStateType & {
  auth: boolean | null;
  admin: boolean | null;
};

export type GetApiRoomsType = { rooms: RoomItemType[]; codeStatus: number };

export type ResponseType = {
  codeStatus: number;
  message: string;
};

export type GetApiRoomByIdType = {
  roomId: string;
};

export type GetApiRoomType = {
  room: RoomItemType;
};

export interface IUserDataRequest {
  userId: string;
  isAdmin: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
