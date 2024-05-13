export interface CommonState {
  /**
   * is the assistant builder
   */
  isBuilder: boolean;
  /**
   *  1: 记忆模式, 0: 独立模式
   */
  useContext: 1 | 0;
  page: number;
  total: number;
  chat?: API.Chat;
  chats: API.Chat[];
}

export const initialCommonState: CommonState = {
  isBuilder: false,
  useContext: 0,
  page: 1,
  total: 0,
  chats: [],
};
