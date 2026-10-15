<script>
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { createRoom } from "$lib/api/room";
  import { markCreated } from "$lib/state/room.svelte.js";
  import { refreshUser } from "$lib/state/user.svelte.js";

  let joining = $state(false);
  let code = $state("");
  let busy = $state(false);
  let error = $state("");

  async function handleCreate() {
    busy = true;
    error = "";
    joining = false;
    try {
      const { roomId } = await createRoom();
      markCreated(roomId);
      await refreshUser();
      await goto(resolve(`/room/${roomId}`));
    } catch (e) {
      error = e.message;
    } finally {
      busy = false;
    }
  }

  function handleJoin(event) {
    event.preventDefault();
    const id = code.trim().replace(/^#/, "");
    if (!/^\d+$/.test(id)) {
      error = "enter a numeric room code";
      return;
    }
    goto(resolve(`/room/${id}`));
  }
</script>

<div id="hero">
  <div id="hero-content-wrapper">
    <div id="big-text">your friends living room, but <span>online.</span></div>
    <div class="text">
      a place to hang out online with your friends — chat, listen to music, and
      watch stuff together
    </div>
    <div id="action-button-section">
      <button onclick={handleCreate} disabled={busy}>
        {busy ? "creating…" : "create a space"}
      </button>
      <button
        onclick={() => {
          joining = true;
          error = "";
        }}
      >
        join with code
      </button>
    </div>
    {#if joining}
      <form onsubmit={handleJoin}>
        <input bind:value={code} placeholder="room code, e.g. 12" />
        <button>join</button>
      </form>
    {/if}
    {#if error}<div class="error">{error}</div>{/if}
  </div>
</div>

<style>
  #hero {
    display: flex;
    width: 80%;
  }
  #hero-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
  }
  #big-text {
    font-weight: 700;
    font-size: 64px;
    font-family: var(--font-display);
    text-wrap: wrap;
    color: var(--color-text-primary);
  }
  #big-text span {
    color: #ff8b77;
  }
  .text {
    color: var(--color-text-secondary);
  }
  #action-button-section {
    display: flex;
    gap: 10px;
  }
  form {
    display: flex;
    gap: 10px;
  }
  input {
    all: unset;
    flex: 1;
    font-family: var(--font-body);
    border-radius: 50px;
    border: 1px solid var(--color-border);
    padding: 10px 20px;
    color: var(--color-text-primary);
  }
  .error {
    color: var(--color-note-coral);
    font-family: var(--font-body);
    font-size: 14px;
  }
  button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-body);
    font-weight: 600;
    border-radius: 50px;
    border: 1px solid var(--color-border);
    padding: 10px 30px;
    color: var(--color-text-primary);
  }
  button:hover {
    cursor: pointer;
    background-color: var(--color-accent);
  }
  button:active {
    background-color: var(--color-accent);
  }

  @media (max-width: 1024px) {
    #hero-content-wrapper {
      width: 70%;
    }
    #big-text {
      font-size: 48px;
    }
  }

  @media (max-width: 640px) {
    #hero {
      width: 90%;
    }
    #hero-content-wrapper {
      width: 100%;
    }
    #big-text {
      font-size: 32px;
    }
    #action-button-section {
      flex-direction: column;
    }
    #action-button-section button {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 20px;
    }
  }
</style>
