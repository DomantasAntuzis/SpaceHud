<script>
  import ParticipantCard from "./ParticipantCard.svelte";
  import VideoCard from "./VideoCard.svelte";
  import AddToolbar from "./AddToolbar.svelte";
</script>

<div class="canvas">
  <ParticipantCard
    name="Domantas"
    initial="D"
    avatarColor="var(--color-accent)"
    cardColor="#2a2350"
    speaking={true}
    x={70}
    y={70}
  />
  <ParticipantCard
    name="Jonas"
    initial="J"
    avatarColor="var(--color-note-coral)"
    cardColor="#452420"
    speaking={false}
    x={496}
    y={86}
  />
  <ParticipantCard
    name="Mia"
    initial="M"
    avatarColor="var(--color-note-teal)"
    cardColor="#123f3a"
    speaking={false}
    x={302}
    y={188}
  />

  <VideoCard droppedBy="Domantas" x={242} y={377} />

  <AddToolbar />
</div>

<style>
  .canvas {
    position: relative;
    flex: 1;
    min-height: 668px;
    background-color: var(--color-bg);
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 22px 22px;
    overflow: hidden;
  }
</style>
