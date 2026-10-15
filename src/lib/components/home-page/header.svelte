<script>
  import { resolve } from "$app/paths";
  import { user, clearUser } from "$lib/state/user.svelte.js";
  import { logout } from "$lib/api/auth";

  async function handleLogout() {
    await logout().catch(() => {});
    clearUser();
  }
</script>
<header>
    <div id="title-wrapper">
        <i class="fa-solid fa-face-smile"></i>
        <div> Hangout </div>
    </div>
    <div id="auth">
        {#if user.current}<span>{user.current.username}</span>{/if}
        {#if user.current?.type === "registered"}
            <button onclick={handleLogout}>Logout</button>
        {:else}
            <a href={resolve('/login')}>Login</a>
        {/if}
    </div>
</header>

<style>
    header  {
        width: 80%;
        display: flex; flex-direction: row; justify-content: space-between;
        color: var(--color-text-primary);
    }
    #title-wrapper  {
        display: flex; flex-direction: row;
        font-size: 32px;
        font-weight: 600;
        font-family: var(--font-display);
    }
    #title-wrapper i{
        display: flex;
        align-self: center;
    }
    #auth {
        display: flex; align-items: center; gap: 12px;
        font-family: var(--font-body);
    }
    a, button {
        all: unset;
        display: flex;
        align-items: center; justify-content: center;
        font-family: var(--font-body); font-weight: 600;
        border-radius: 50px; border: 1px solid var(--color-border);
        padding: 5px 15px;
    }
    a:hover, button:hover{
        cursor: pointer;
        background-color: var(--color-accent);
    }

    @media (max-width: 640px) {
        header {
            width: 90%;
        }
        #title-wrapper {
            font-size: 22px;
        }
        a, button {
            font-size: 14px;
            padding: 5px 12px;
        }
    }
</style>