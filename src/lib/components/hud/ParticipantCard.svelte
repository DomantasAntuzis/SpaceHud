<script>
  let {
    name,
    initial,
    avatarColor,
    cardColor,
    speaking = false,
    x = $bindable(0),
    y = $bindable(0),
  } = $props();

  function pointerDown(event) {
    const startX = event.clientX;
    const startY = event.clientY;
    const origX = x;
    const origY = y;
    const cardRect = event.currentTarget.getBoundingClientRect();
    const canvasRect = event.currentTarget.closest(".canvas").getBoundingClientRect();
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

<div onpointerdown={pointerDown} class="participant" class:speaking style="left:{x}px; top:{y}px; background:{cardColor};" role="button" tabindex="0">
  <div class="row">
    <div class="who">
      <div class="avatar" style="background:{avatarColor};">{initial}</div>
      <span class="name">{name}</span>
    </div>
    <div class="mic">
      <i class="fa-solid {speaking ? 'fa-microphone' : 'fa-microphone-slash'}"></i>
    </div>
  </div>
  <div class="status">{speaking ? "speaking" : "mic off"}</div>
</div>

<style>
  .participant {
    position: absolute;
    width: 176px;
    box-sizing: border-box;
    padding: 14px;
    border-radius: 14px;
    border: 1.5px solid transparent;
    animation: appear 0.3s ease-out;
    /* cursor: grab; */
    /* touch-action: none; */
  }

  @keyframes appear {
    from {
      transform: scale(0.85);
      opacity: 0;
    }
  }

  .participant.speaking {
    border-color: #34d399;
    box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.15);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .who {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 13px;
    color: #ffffff;
  }

  .name {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mic {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text-secondary);
    font-size: 11px;
  }

  .participant.speaking .mic {
    background: rgba(52, 211, 153, 0.25);
    color: #34d399;
  }

  .status {
    margin-top: 8px;
    margin-left: 42px;
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .participant.speaking .status {
    color: #34d399;
  }
</style>
