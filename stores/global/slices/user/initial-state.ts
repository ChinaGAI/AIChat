export type ThemeEnum = "light" | "dark";

export interface UserState {
  userProfile?: API.UserProfile;
}

export const initialUserState: UserState = {};
