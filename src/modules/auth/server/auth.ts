import { remultAdapter } from "@nerdfolio/remult-better-auth";
import { betterAuth } from "better-auth";
import { authEntities } from "../entities";
import { remult } from "remult";

export const auth = betterAuth({
  database: remultAdapter(remult, {
    authEntities,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
