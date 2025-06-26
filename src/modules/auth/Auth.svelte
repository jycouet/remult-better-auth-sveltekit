<script lang="ts">
  import { remult } from "remult";
  import type { TileStatus } from "../../demo/Tile.svelte";
  import Tile from "../../demo/Tile.svelte";
  import { createAuthClient } from "better-auth/svelte";
  import { invalidateAll } from "$app/navigation";

  const authClient = createAuthClient();

  let status = $state<TileStatus>("Loading");
  let errorType = $state<"missingSecret" | "other" | null>(null);

  $effect(() => {
    remult
      .initUser()
      .then(() => {
        status = "Success";
      })
      .catch((e) => {
        status = "Error";
        if (e.message.includes("the server configuration")) {
          errorType = "missingSecret";
        } else {
          errorType = "other";
        }
      });
  });

  let tileSubtitle = $derived(
    status === "Loading"
      ? "Checking your authentication status"
      : status === "Error"
        ? "There seems to be an issue"
        : undefined
  );
</script>

<Tile
  title="Auth"
  {status}
  subtitle={tileSubtitle}
  className="auth"
  width="half"
>
  {#if status === "Loading"}
    <!-- You can add a loading indicator here if needed -->
  {:else if status === "Error"}
    {#if errorType === "missingSecret"}
      <p>
        Make sure to set the <code>AUTH_SECRET</code> in the <code>.env</code>
        file. <br />
        Read more at
        <a href="https://errors.authjs.dev#missingsecret">auth.js docs</a>.<br
        />
        Please check the server terminal console for more information.
      </p>
    {:else}
      <p>An error occurred. Please try again later.</p>
    {/if}
  {:else if remult.authenticated()}
    {@const roles = remult.user?.roles ?? []}
    <p>
      You are authenticated as <strong>{remult.user?.name}</strong>
      <br />
      <i>Roles:</i>
      {roles.length > 0 ? roles.join(", ") : "-"}
    </p>
    <div class="button-row">
      <button
        onclick={async () => {
          authClient.signOut();
          await invalidateAll();
          remult.user = undefined;
        }}>Sign Out</button
      >
    </div>
  {:else}
    <p>You are currently not authenticated</p>
    <div class="button-row">
      <button
        onclick={async () => {
          const u = await authClient.signUp.email({
            name: "test",
            email: "test@test.com",
            password: "Password123",
          });
          remult.user = u.data?.user;
        }}
      >
        Sign Up
      </button>
      <button
        onclick={async () => {
          const u = await authClient.signIn.email({
            email: "test@test.com",
            password: "Password123",
          });
          remult.user = u.data?.user;
        }}
      >
        Sign In
      </button>
    </div>
  {/if}
</Tile>
