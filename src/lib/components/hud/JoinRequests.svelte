<script>
  import { room } from "$lib/state/room.svelte.js";
  import { answerKnock } from "$lib/api/socket";
</script>

{#if room.isHost && room.requests.length}
  <div class="requests">
    {#each room.requests as r (r.id)}
      <div class="request">
        <span class="who"><b>{r.username}</b> wants to join</span>
        <button class="deny" onclick={() => answerKnock(false, r.id)}>deny</button>
        <button class="admit" onclick={() => answerKnock(true, r.id)}>admit</button>
      </div>
    {/each}
  </div>
{/if}

<style>
  .requests {
    position: fixed;
    top: 80px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 100;
  }

  .request {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--color-text-primary);
    background: #2a2350;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    padding: 8px 8px 8px 16px;
  }

  button {
    all: unset;
    font-weight: 600;
    border-radius: 999px;
    padding: 6px 14px;
    cursor: pointer;
  }

  .admit {
    background: var(--color-accent);
    color: #fff;
  }

  .deny {
    color: var(--color-text-muted);
  }

  .deny:hover {
    color: var(--color-text-primary);
  }
</style>
