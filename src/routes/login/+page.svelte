<script>
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { login, register } from "$lib/api/auth";
  import { ApiError } from "$lib/api/http";
  import { refreshUser } from "$lib/state/user.svelte.js";
  import { room } from "$lib/state/room.svelte.js";
  import { reconnectSocket } from "$lib/api/socket";

  let mode = $state("login"); // login | register
  let username = $state("");
  let password = $state("");
  let error = $state("");
  let busy = $state(false);

  async function submit(event) {
    event.preventDefault();
    error = "";
    if (!username.trim() || !password) {
      error = "username and password are required";
      return;
    }
    if (mode === "register" && password.length < 8) {
      error = "password must be at least 8 characters";
      return;
    }
    busy = true;
    try {
      if (mode === "register") await register(username.trim(), password);
      else await login(username.trim(), password);
      // register returns no user object, and the session id changed on login
      await refreshUser();
      if (room.id != null) reconnectSocket();
      await goto(room.id != null ? resolve(`/room/${room.id}`) : resolve("/"));
    } catch (e) {
      error =
        e instanceof ApiError && e.status === 429
          ? "too many attempts, try again later"
          : e.message;
    } finally {
      busy = false;
    }
  }
</script>

<div class="login-page">
  <form onsubmit={submit}>
    <h1>{mode === "login" ? "welcome back" : "create an account"}</h1>
    <input bind:value={username} placeholder="username" autocomplete="username" />
    <input
      type="password"
      bind:value={password}
      placeholder="password"
      autocomplete={mode === "login" ? "current-password" : "new-password"}
    />
    {#if error}<div class="error">{error}</div>{/if}
    <button class="primary" disabled={busy}>{mode === "login" ? "log in" : "register"}</button>
    <button
      type="button"
      class="link"
      onclick={() => {
        mode = mode === "login" ? "register" : "login";
        error = "";
      }}
    >
      {mode === "login" ? "no account? register" : "have an account? log in"}
    </button>
    <a href={resolve("/")}>back home</a>
  </form>
</div>

<style>
  .login-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(360px, 90%);
    font-family: var(--font-body);
    color: var(--color-text-primary);
  }

  h1 {
    font-family: var(--font-display);
    font-size: 28px;
    margin-bottom: 8px;
  }

  input {
    all: unset;
    border-radius: 50px;
    border: 1px solid var(--color-border);
    padding: 10px 20px;
  }

  .primary {
    all: unset;
    text-align: center;
    font-weight: 600;
    border-radius: 50px;
    border: 1px solid var(--color-border);
    padding: 10px 20px;
    cursor: pointer;
  }

  .primary:hover {
    background: var(--color-accent);
  }

  .link {
    all: unset;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  a {
    text-align: center;
    font-size: 14px;
    color: var(--color-text-muted);
  }

  .error {
    color: var(--color-note-coral);
    font-size: 14px;
  }
</style>
