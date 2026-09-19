<script>
  let { roomName = "friday hangout", roomCode = "#a1b2c3" } = $props();
</script>

<header class="room-header">
  <div class="room-title">
    <i class="fa-solid fa-house"></i>
    <span class="name">{roomName}</span>
    <span class="code">{roomCode}</span>
  </div>
  <div class="room-actions">
    <button class="btn-invite"><i class="fa-solid fa-link"></i> invite</button>
    <button class="btn-leave"><i class="fa-solid fa-chevron-left"></i> leave</button>
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
