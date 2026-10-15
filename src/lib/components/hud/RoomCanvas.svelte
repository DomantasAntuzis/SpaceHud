<script>
  import ParticipantCard from "./ParticipantCard.svelte";
  import VideoPlayer from "./VideoPlayer.svelte";
  import MusicPlayer from "./MusicPlayer.svelte";
  import AddToolbar from "./AddToolbar.svelte";
  import { mount, unmount } from "svelte";
  import { room } from "$lib/state/room.svelte.js";

  let mountedInstances = {};
  let canvasRef;

  // Each member gets a stable start slot, assigned once on first sight.
  const startPositions = {};
  function startPos(id, index) {
    startPositions[id] ??= { x: 40 + (index % 4) * 200, y: 40 + Math.floor(index / 4) * 100 };
    return startPositions[id];
  }

  function createPlayerInstance(functionCall) {
    if (functionCall === "video-player") {
      const id = crypto.randomUUID();
      const instance = mount(VideoPlayer, {
        target: canvasRef,
        props: {
          droppedBy: "Domantas",
          x: 200,
          y: 200,
        },
      });
      mountedInstances[id] = instance;
    }

    if (functionCall === "music-player") {
      const id = crypto.randomUUID();
      const instance = mount(MusicPlayer, {
        target: canvasRef,
        props: {
          droppedBy: "Domantas",
          x: 200,
          y: 200,
          destroyInstance: () => destroyInstance(id),
        },
      });
      mountedInstances[id] = instance;
    }
  }

  function destroyInstance(id){
    const instance = mountedInstances[id];
    unmount(instance);
    delete mountedInstances[id];
  }
</script>

<div role="application" class="canvas" bind:this={canvasRef}>
  {#each room.members as m, i (m.id)}
    {@const p = startPos(m.id, i)}
    <ParticipantCard
      name={m.username}
      initial={m.username.charAt(0).toUpperCase()}
      avatarColor={m.color}
      cardColor="#2a2350"
      x={p.x}
      y={p.y}
    />
  {/each}

  <VideoPlayer droppedBy="Domantas" x={242} y={377} />

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
