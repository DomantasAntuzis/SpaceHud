<script>
  import ParticipantCard from "./ParticipantCard.svelte";
  import VideoPlayer from "./VideoPlayer.svelte";
  import MusicPlayer from "./MusicPlayer.svelte";
  import AddToolbar from "./AddToolbar.svelte";
  import { room, markElementDragging, unmarkElementDragging } from "$lib/state/room.svelte.js";
  import { user } from "$lib/state/user.svelte.js";
  import { emitCanvasAdd, emitCanvasMove, emitCanvasRemove } from "$lib/api/socket.js";

  // Media players are the canvas elements that are not participant cards
  const playerElements = $derived(
    Object.values(room.elements).filter((element) => element.type !== "participant")
  );

  // playerType is "video-player" or "music-player"
  function createPlayerInstance(playerType) {
    const elementId = crypto.randomUUID();
    const newElement = {
      id: elementId,
      type: playerType,
      x: 200,
      y: 200,
      props: { droppedBy: user.current?.username ?? "" },
    };
    // Show it right away, then tell the rest of the room
    room.elements[elementId] = newElement;
    emitCanvasAdd(newElement);
  }

  // While dragging, send at most one position per interval; the drop always sends the final one
  const MOVE_EMIT_INTERVAL_MS = 30;
  const lastMoveEmittedAt = {};

  function emitMoveThrottled(elementId, x, y) {
    markElementDragging(elementId);
    const now = Date.now();
    if (now - (lastMoveEmittedAt[elementId] ?? 0) < MOVE_EMIT_INTERVAL_MS) {
      return;
    }
    lastMoveEmittedAt[elementId] = now;
    emitCanvasMove(elementId, x, y);
  }

  function emitMoveFinal(elementId, x, y) {
    unmarkElementDragging(elementId);
    delete lastMoveEmittedAt[elementId];
    emitCanvasMove(elementId, x, y);
  }

  function destroyInstance(elementId) {
    delete room.elements[elementId];
    emitCanvasRemove(elementId);
  }
</script>

<div role="application" class="canvas">
  {#each room.members as m (m.id)}
    {#if room.elements[m.id]}
      <ParticipantCard
        name={m.username}
        initial={m.username.charAt(0).toUpperCase()}
        avatarColor={m.color}
        cardColor="#2a2350"
        bind:x={room.elements[m.id].x}
        bind:y={room.elements[m.id].y}
        onDrag={(x, y) => emitMoveThrottled(m.id, x, y)}
        onDragEnd={(x, y) => emitMoveFinal(m.id, x, y)}
      />
    {/if}
  {/each}

  {#each playerElements as element (element.id)}
    {#if element.type === "video-player"}
      <VideoPlayer
        droppedBy={element.props.droppedBy}
        bind:x={room.elements[element.id].x}
        bind:y={room.elements[element.id].y}
        destroyInstance={() => destroyInstance(element.id)}
        onDrag={(x, y) => emitMoveThrottled(element.id, x, y)}
        onDragEnd={(x, y) => emitMoveFinal(element.id, x, y)}
      />
    {:else if element.type === "music-player"}
      <MusicPlayer
        droppedBy={element.props.droppedBy}
        bind:x={room.elements[element.id].x}
        bind:y={room.elements[element.id].y}
        destroyInstance={() => destroyInstance(element.id)}
        onDrag={(x, y) => emitMoveThrottled(element.id, x, y)}
        onDragEnd={(x, y) => emitMoveFinal(element.id, x, y)}
      />
    {/if}
  {/each}

  <AddToolbar createPlayerCall={createPlayerInstance} />
</div>

<style>
  .canvas {
    position: relative;
    flex: 1;
    min-height: 668px;
    background-color: var(--color-bg);
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.06) 1px,
      transparent 1px
    );
    background-size: 22px 22px;
    overflow: hidden;
    z-index: 1;
  }
</style>
