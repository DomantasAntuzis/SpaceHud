<script>
  import { room } from "$lib/state/room.svelte.js";
  import { user } from "$lib/state/user.svelte.js";

  const MAX = 6;
  let shown = $derived(room.members.slice(0, MAX));
  let extra = $derived(Math.max(0, room.members.length - MAX));
</script>

<div class="bubbles" aria-label="people in this room">
  {#each shown as m (m.id)}
    <div
      class="bubble"
      class:me={m.id === user.current?.id}
      style="background:{m.color};"
      title={m.id === user.current?.id ? `${m.username} (you)` : m.username}
    >
      {m.username.charAt(0).toUpperCase()}
    </div>
  {/each}
  {#if extra > 0}
    <div class="bubble more">+{extra}</div>
  {/if}
</div>

<style>
  .bubbles {
    display: flex;
    align-items: center;
  }

  .bubble {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 13px;
    color: #ffffff;
    border: 2px solid var(--color-bg);
    margin-left: -8px;
    animation: pop 0.25s ease-out;
  }

  .bubble:first-child {
    margin-left: 0;
  }

  .bubble.me {
    box-shadow: 0 0 0 2px #34d399;
  }

  .bubble.more {
    background: rgba(255, 255, 255, 0.12);
    color: var(--color-text-secondary);
    font-size: 12px;
  }

  @keyframes pop {
    from {
      transform: scale(0.4);
      opacity: 0;
    }
  }
</style>
