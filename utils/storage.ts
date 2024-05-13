import Cookies from "js-cookie";
import { randString } from "@/utils/libs";
import Storage from "good-storage";
import { isServer } from "./const";

/**
 * storage handler
 */

const SessionIDKey = process.env.NEXT_PUBLIC_APP_PREFIX + "_SESSION_ID";
const UserTokenKey = process.env.NEXT_PUBLIC_APP_PREFIX + "_Authorization";

export function getSessionId() {
  let sessionId = Storage.get(SessionIDKey);
  if (!sessionId) {
    sessionId = randString(42);
    setSessionId(sessionId);
  }
  return sessionId;
}

export function removeSessionId() {
  Storage.remove(SessionIDKey);
}

export function setSessionId(sessionId: string) {
  Storage.set(SessionIDKey, sessionId);
}

export function getUserToken(): string {
  if (isServer) {
    const { cookies } = require("next/headers");
    const cookieState = cookies();
    return cookieState.get(UserTokenKey)?.value ?? "";
  }
  return Cookies.get(UserTokenKey) ?? "";
}

export function setUserToken(token: string) {
  Cookies.set(UserTokenKey, token);
}

export function removeUserToken() {
  Cookies.remove(UserTokenKey);
}
