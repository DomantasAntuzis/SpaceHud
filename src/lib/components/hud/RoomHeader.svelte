<script>
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import MemberBubbles from "./MemberBubbles.svelte";
  import { room, closeRoom, inviteLink, pushToast } from "$lib/state/room.svelte.js";
  import { deleteRoom } from "$lib/api/room";
  import { ApiError } from "$lib/api/http";

  function leave() {
    closeRoom();
    goto(resolve("/"));
  }

  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(inviteLink());
      pushToast("invite link copied");
    } catch {
      pushToast("couldn't copy the invite link");
    }
  }

  async function remove() {
    try {
      await deleteRoom(room.slug);
      leave();
    } catch (e) {
      pushToast(
        e instanceof ApiError && e.status === 404
          ? "only the host can delete this room"
          : e.message,
      );
    }
  }
</script>

<header class="room-header">
  <div class="room-title">
    <i class="fa-solid fa-house"></i>
    <span class="name">room</span>
    <span class="code">#{room.slug}</span>
  </div>
  <MemberBubbles />
  <div class="room-actions">
    {#if room.isHost}
      <button class="btn-invite" onclick={copyInvite}><i class="fa-solid fa-link"></i> invite</button>
    {/if}
    {#if room.isHost}
      <button class="btn-leave" onclick={remove}><i class="fa-solid fa-trash"></i> delete</button>
    {/if}
    <button class="btn-leave" onclick={leave}><i class="fa-solid fa-chevron-left"></i> leave</button>
  </div>
</header>

<style>
  .room-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 59px;
    padding: 0 24px;
    box-sizing: content-box;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  .room-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .room-title i {
    color: var(--color-accent);
    font-size: 16px;
  }

  .name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 16px;
    color: var(--color-text-primary);
  }

  .code {
    font-size: 13px;
    color: var(--color-text-muted);
  }

  .room-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .btn-invite {
    all: unset;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    padding: 8px 16px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .btn-invite:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .btn-leave {
    all: unset;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-muted);
    cursor: pointer;
  }

  .btn-leave:hover {
    color: var(--color-text-primary);
  }
</style>
