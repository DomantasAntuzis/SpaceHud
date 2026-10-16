<script>
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { onDestroy } from "svelte";
  import RoomHeader from "$lib/components/hud/RoomHeader.svelte";
  import RoomCanvas from "$lib/components/hud/RoomCanvas.svelte";
  import ChatSidebar from "$lib/components/hud/ChatSidebar.svelte";
  import Toasts from "$lib/components/hud/Toasts.svelte";
  import JoinRequests from "$lib/components/hud/JoinRequests.svelte";
  import { room, openRoom, closeRoom } from "$lib/state/room.svelte.js";

  $effect(() => {
    openRoom(page.params.slug, page.url.searchParams.get("invite"));
  });

  onDestroy(closeRoom);
</script>

{#if room.status === "ready"}
  <div class="room-page">
    <RoomHeader />
    <div class="room-body">
      <RoomCanvas />
      <ChatSidebar />
    </div>
    <JoinRequests />
    <Toasts />
  </div>
{:else}
  <div class="state">
    {#if room.status === "waiting"}
      <h2>waiting for the host to let you in…</h2>
      <a href={resolve("/")}>cancel</a>
    {:else if room.status === "denied"}
      <h2>the host didn't let you in</h2>
      <a href={resolve("/")}>back home</a>
    {:else if room.status === "notfound"}
      <h2>room not found</h2>
      <a href={resolve("/")}>back home</a>
    {:else if room.status === "error"}
      <h2>{room.error}</h2>
      <a href={resolve("/")}>back home</a>
    {:else}
      <h2>joining room…</h2>
    {/if}
  </div>
{/if}

<style>
  .room-page {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: var(--color-bg);
  }

  .room-body {
    flex: 1;
    display: flex;
  }

  .state {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--color-text-primary);
    font-family: var(--font-body);
  }

  .state a {
    color: var(--color-accent);
  }
</style>
