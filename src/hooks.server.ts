import { sequence } from "@sveltejs/kit/hooks";
import { api as handleRemult } from "./server/api";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "./modules/auth/server/auth";
import type { Handle } from "@sveltejs/kit";

const handleAuth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

export const handle = sequence(
  // Manage your sequence of handlers here
  handleRemult,
  handleAuth
);
