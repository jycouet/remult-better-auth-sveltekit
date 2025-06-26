import { Module } from "remult/server";
import { authEntities } from "../entities";
import { auth as auth_config } from "./auth";
import type { UserInfo } from "remult";

export const auth = () => {
  return new Module({
    key: "auth",
    entities: Object.values(authEntities),
  });
};

export const getUserFromHeaders = async (headers: Headers) => {
  const s = await auth_config.api.getSession({
    headers: headers,
  });

  if (!s) {
    // throw new BetterAuthError("getUser: No session found in request.");
    return undefined;
  }

  // Craft UserInfo from session
  return {
    id: s.user.id,
    name: s.user.name,
    roles: [],
  } satisfies UserInfo;
};
