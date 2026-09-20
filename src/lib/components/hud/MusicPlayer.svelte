<script>
  import { mount, unmount } from "svelte";

  let {
    droppedBy = "Domantas",
    track = "lofi chill mix",
    x = $bindable(0),
    y = $bindable(0),
    destroyInstance
  } = $props();
  let playing = $state(false);

  function pointerDown(event) {
    const startX = event.clientX;
    const startY = event.clientY;
    const origX = x;
    const origY = y;
    const cardRect = event.currentTarget.getBoundingClientRect();
    const canvasRect = event.currentTarget
      .closest(".canvas")
      .getBoundingClientRect();
    const maxX = canvasRect.width - cardRect.width;
    const maxY = canvasRect.height - cardRect.height;

    function move(e) {
      x = Math.min(Math.max(origX + (e.clientX - startX), 0), maxX);
      y = Math.min(Math.max(origY + (e.clientY - startY), 0), maxY);
    }
    function up() {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
</script>

<div
  onpointerdown={pointerDown}
  role="button"
  tabindex="0"
  class="music-card"
  style="left:{x}px; top:{y}px;"
>
  <div class="music-header">
    <i class="fa-solid fa-grip-vertical"></i>
    <span>dropped by {droppedBy}</span>
    <button
      class="close"
      aria-label="close music"
      onclick={() => {
        destroyInstance();
      }}><i class="fa-solid fa-xmark"></i></button
    >
  </div>
  <div class="music-body">
    <button
      class="play-ring"
      class:playing
      aria-label={playing ? "pause" : "play"}
      onclick={() => (playing = !playing)}
    >
      <i class="fa-solid {playing ? 'fa-pause' : 'fa-play'}"></i>
    </button>
    <span class="caption">{track}</span>
  </div>
</div>

<style>
  .music-card {
    position: absolute;
    width: 222px;
    box-sizing: border-box;
    border-radius: 14px;
    background: #1c1a2e;
    border: 1px solid var(--color-border);
    overflow: hidden;
    /* cursor: grab; */
    /* touch-action: none; */
  }

  .music-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--color-border);
    font-size: 12px;
    color: var(--color-text-muted);
    font-style: italic;
  }

  .music-header i.fa-grip-vertical {
    color: var(--color-text-muted-2);
    cursor: grab;
  }

  .music-header span {
    flex: 1;
  }

  .close {
    all: unset;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
  }

  .close:hover {
    color: var(--color-text-primary);
  }

  .music-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 28px 16px;
  }

  .play-ring {
    all: unset;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid var(--color-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .play-ring:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .play-ring.playing {
    border-color: var(--color-accent);
    color: var(--color-accent);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .caption {
    font-size: 12px;
    color: var(--color-text-muted);
  }
</style>
