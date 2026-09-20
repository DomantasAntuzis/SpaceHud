<script>
  let { name, message, avatarColor } = $props();
</script>

<div class="chat-message">
  <div class="avatar" style="background:{avatarColor};">{name[0]}</div>
  <div class="content">
    <span class="name">{name}</span>
    <p class="message">{message}</p>
  </div>
</div>

<style>
  .chat-message {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 12px;
    color: #ffffff;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .message {
    margin: 0;
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.4;
  }
</style>
