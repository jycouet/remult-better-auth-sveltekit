<script lang="ts">
  import Tile from "../demo/Tile.svelte";
  import Admin from "../demo/Admin.svelte";
  import Todo from "../demo/todo/Todo.svelte";
  import "../styles.css";
  import Auth from "../modules/auth/Auth.svelte";
</script>

<div class="tiles">
  <Tile
    title="better-auth-sveltekit"
    subtitle=""
    icon="remult"
    className="intro"
    status="Success"
    width="half"
  >
    <div class="tile__title">What's next?</div>
    <div class="button-row">
      <a class="button" href="https://learn.remult.dev/" target="_blank">
        Interactive Tutorial
      </a>
      <a class="button" href="https://remult.dev/docs" target="_blank">
        Documentation
      </a>
      <a class="button" href="https://github.com/remult/remult" target="_blank">
        Github
      </a>
    </div>
    <div class="intro__stack">
      <div class="intro__stack-item">
        <span>Framework</span>
        SvelteKit
      </div>
      <div class="intro__stack-item">
        <span>Database</span>
        JSON Files
      </div>
      <div class="intro__stack-item">
        <span>Auth</span>
        better-auth
      </div>
    </div>
  </Tile>
  <Auth />
  <Admin />
  <Todo />
</div>
