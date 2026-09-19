<script>
  import RoomHeader from "$lib/components/room/RoomHeader.svelte";
  import RoomCanvas from "$lib/components/room/RoomCanvas.svelte";
  import ChatSidebar from "$lib/components/room/ChatSidebar.svelte";
</script>

<div class="room-page">
  <RoomHeader />
  <div class="room-body">
    <RoomCanvas />
    <ChatSidebar />
  </div>
</div>

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
</style>
