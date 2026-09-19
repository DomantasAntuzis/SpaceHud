<div class="add-toolbar">
  <span class="hint">drag into the room to add</span>
  <div class="buttons">
    <button><i class="fa-solid fa-circle-play"></i> video</button>
    <button><i class="fa-solid fa-music"></i> music</button>
  </div>
</div>

<style>
  .add-toolbar {
    position: absolute;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .hint {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  button {
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
    padding: 8px 18px;
    cursor: grab;
    box-sizing: border-box;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.05);
  }
</style>
