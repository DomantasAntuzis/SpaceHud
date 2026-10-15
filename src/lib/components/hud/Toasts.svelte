<script>
  import { room } from "$lib/state/room.svelte.js";
</script>

<div class="toasts" aria-live="polite">
  {#each room.toasts as t (t.id)}
    <div class="toast">{t.text}</div>
  {/each}
</div>

<style>
  .toasts {
    position: fixed;
    bottom: 24px;
    left: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 100;
    pointer-events: none;
  }

  .toast {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-primary);
    background: #2a2350;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    padding: 8px 16px;
    animation: slide 0.25s ease-out;
  }

  @keyframes slide {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
  }
</style>
