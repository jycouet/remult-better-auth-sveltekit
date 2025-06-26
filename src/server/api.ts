import { remultApi } from "remult/remult-sveltekit";
import { Task } from "../demo/todo/Task";
  
export const api = remultApi({
  admin: true,
  entities: [Task],
});