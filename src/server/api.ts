import { remultApi } from "remult/remult-sveltekit";
import { Task } from "../demo/todo/Task";
import { getUserFromHeaders } from "../modules/auth/server";
import { auth } from "../modules/auth/server";
import { InMemoryDataProvider } from "remult";

export const api = remultApi({
  admin: true,
  entities: [Task],

  getUser: (event) => getUserFromHeaders(event.request.headers),
  modules: [auth()],
});
