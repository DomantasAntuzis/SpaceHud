<script>
  import ChatMessage from "./ChatMessage.svelte";

  const messages = [
    { id: 1, name: "Mia", message: "omw, give me 2 min", avatarColor: "var(--color-note-teal)" },
    { id: 2, name: "Jonas", message: "no worries, queued the video", avatarColor: "var(--color-note-coral)" }
  ];
</script>

<aside class="chat-sidebar">
  <div class="chat-header">
    <i class="fa-solid fa-comment"></i>
    <span>chat</span>
  </div>

  <div class="chat-messages">
    {#each messages as m (m.id)}
      <ChatMessage name={m.name} message={m.message} avatarColor={m.avatarColor} />
    {/each}
  </div>

  <div class="chat-input-row">
    <input type="text" placeholder="say something…" />
    <button class="send" aria-label="send message"><i class="fa-solid fa-paper-plane"></i></button>
  </div>
</aside>

<style>
  .chat-sidebar {
    /* width: 264px; */
    flex-shrink: 0;
    min-height: 668px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--color-border);
    padding: 20px;
    gap: 20px;
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 15px;
    color: var(--color-text-primary);
  }

  .chat-header i {
    color: var(--color-text-muted);
    font-size: 13px;
  }

  .chat-messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
  }

  .chat-input-row {
    display: flex;
    gap: 10px;
  }

  input {
    all: unset;
    flex: 1;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--color-text-primary);
    font-family: var(--font-body);
  }

  input::placeholder {
    color: var(--color-text-muted);
  }

  .send {
    all: unset;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--color-accent);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    box-sizing: border-box;
  }
</style>
