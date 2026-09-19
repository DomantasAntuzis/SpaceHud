<script>
  let { droppedBy = "Domantas", x = 0, y = 0 } = $props();
</script>

<div class="video-card" style="left:{x}px; top:{y}px;">
  <div class="video-header">
    <i class="fa-solid fa-grip-vertical"></i>
    <span>dropped by {droppedBy}</span>
    <button class="close" aria-label="close video"><i class="fa-solid fa-xmark"></i></button>
  </div>
  <div class="video-body">
    <div class="play-ring"><i class="fa-solid fa-play"></i></div>
    <span class="caption">playing a video</span>
  </div>
</div>

<style>
  .video-card {
    position: absolute;
    width: 222px;
    box-sizing: border-box;
    border-radius: 14px;
    background: #1c1a2e;
    border: 1px solid var(--color-border);
    overflow: hidden;
  }

  .video-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--color-border);
    font-size: 12px;
    color: var(--color-text-muted);
    font-style: italic;
  }

  .video-header i.fa-grip-vertical {
    color: var(--color-text-muted-2);
    cursor: grab;
  }

  .video-header span {
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

  .video-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 28px 16px;
  }

  .play-ring {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid var(--color-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-size: 14px;
  }

  .caption {
    font-size: 12px;
    color: var(--color-text-muted);
  }
</style>
