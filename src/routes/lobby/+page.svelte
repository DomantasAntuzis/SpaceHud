<div class="room">

  <header class="topbar">
    <div class="room-info">
      <i class="fa-solid fa-house"></i>
      <span class="room-name">friday hangout</span>
      <span class="room-code">#a1b2c3</span>
    </div>
    <div class="actions">
      <button class="btn btn-ghost"><i class="fa-solid fa-link"></i> copy invite</button>
      <button class="btn btn-danger">leave</button>
    </div>
  </header>

  <div class="presence">
    <div class="avatar-stack">
      <div class="avatar" style="background: #e0507a;">D</div>
      <div class="avatar" style="background: #17a398;">M</div>
      <div class="avatar" style="background: #e4573d;">J</div>
      <div class="avatar more">+2</div>
    </div>
    <span class="presence-label">5 in the room</span>
  </div>

  <div class="layout">

    <main class="stage card card-purple">
      <div class="tape"></div>
      <p class="label"><i class="fa-solid fa-circle-play"></i> now watching</p>
      <div class="placeholder-media">
        <span>video / stream placeholder</span>
      </div>
      <div class="stage-controls">
        <button class="icon-btn"><i class="fa-solid fa-backward-step"></i></button>
        <button class="icon-btn"><i class="fa-solid fa-play"></i></button>
        <button class="icon-btn"><i class="fa-solid fa-forward-step"></i></button>
        <div class="scrub-track"><div class="scrub-fill"></div></div>
        <span class="time-label">--:-- / --:--</span>
      </div>
    </main>

    <aside class="sidebar">

      <section class="panel card-teal">
        <div class="tape"></div>
        <p class="panel-title"><i class="fa-solid fa-music"></i> queue</p>
        <ul class="queue-list">
          <li>
            <span class="queue-icon"><i class="fa-solid fa-music"></i></span>
            <span class="queue-text">track placeholder</span>
            <span class="queue-by">added by D</span>
          </li>
          <li>
            <span class="queue-icon"><i class="fa-solid fa-music"></i></span>
            <span class="queue-text">track placeholder</span>
            <span class="queue-by">added by M</span>
          </li>
        </ul>
        <button class="btn btn-ghost btn-block"><i class="fa-solid fa-plus"></i> add to queue</button>
      </section>

      <section class="panel card-coral">
        <div class="tape"></div>
        <p class="panel-title"><i class="fa-solid fa-microphone"></i> voice</p>
        <div class="voice-list">
          <div class="voice-user speaking">
            <span class="avatar small" style="background: #7c5cff;">D</span>
            <span class="voice-name">Domantas</span>
            <i class="fa-solid fa-wave-square"></i>
          </div>
          <div class="voice-user">
            <span class="avatar small" style="background: #e0507a;">M</span>
            <span class="voice-name">Mia</span>
          </div>
        </div>
        <button class="btn btn-ghost btn-block"><i class="fa-solid fa-microphone"></i> join voice</button>
      </section>

      <section class="panel card-pink chat-panel">
        <div class="tape"></div>
        <p class="panel-title"><i class="fa-solid fa-comment"></i> chat</p>
        <div class="chat-messages">
          <div class="chat-msg">
            <span class="avatar tiny" style="background: #17a398;">J</span>
            <div><b>Jonas</b><p>chat message placeholder</p></div>
          </div>
          <div class="chat-msg">
            <span class="avatar tiny" style="background: #e4573d;">M</span>
            <div><b>Mia</b><p>another message placeholder</p></div>
          </div>
        </div>
        <div class="chat-input-row">
          <div class="chat-input-placeholder">type a message…</div>
          <button class="icon-btn send"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </section>

    </aside>
  </div>
</div>

<style>
  .room {
    background: #14121f;
    color: #f5f0ff;
    font-family: 'Manrope', sans-serif;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 48px 64px;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .room-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .room-info i {
    color: #7c5cff;
  }

  .room-name {
    font-family: 'Fredoka', sans-serif;
    font-size: 28px;
    font-weight: 600;
  }

  .room-code {
    font-size: 15px;
    color: #7d76a3;
  }

  .actions {
    display: flex;
    gap: 14px;
  }

  .btn {
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 22px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .btn-ghost {
    background: transparent;
    color: #f5f0ff;
    border: 1.5px solid #3a3555;
  }

  .btn-danger {
    background: #e4573d;
    color: #ffffff;
  }

  .btn-block {
    width: 100%;
    justify-content: center;
    margin-top: 12px;
  }

  .presence {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 32px;
  }

  .avatar-stack {
    display: flex;
  }

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    border: 3px solid #14121f;
    margin-left: -12px;
  }

  .avatar:first-child {
    margin-left: 0;
  }

  .avatar.more {
    background: #23203a;
    color: #b8aed9;
    font-size: 14px;
  }

  .avatar.small {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }

  .avatar.tiny {
    width: 28px;
    height: 28px;
    font-size: 12px;
    flex-shrink: 0;
  }

  .presence-label {
    font-size: 15px;
    color: #b8aed9;
  }

  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 420px;
    gap: 32px;
    margin-top: 32px;
  }

  .card {
    border-radius: 20px;
    padding: 28px;
    position: relative;
    box-sizing: border-box;
  }

  .tape {
    position: absolute;
    top: -8px;
    left: 24px;
    width: 44px;
    height: 14px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.18);
  }

  .card-purple { background: #2a2350; }
  .card-teal   { background: #123f3a; }
  .card-coral  { background: #452420; }
  .card-pink   { background: #3a2030; }

  .label,
  .panel-title {
    font-family: 'Fredoka', sans-serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .stage {
    display: flex;
    flex-direction: column;
    min-height: 640px;
  }

  .placeholder-media {
    flex: 1;
    border: 1.5px dashed #4a437a;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7d76a3;
    font-size: 16px;
  }

  .stage-controls {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 20px;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #f5f0ff;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  .scrub-track {
    flex: 1;
    height: 5px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.12);
  }

  .scrub-fill {
    width: 30%;
    height: 100%;
    border-radius: 2px;
    background: #7c5cff;
  }

  .time-label {
    font-size: 13px;
    color: #7d76a3;
    flex-shrink: 0;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .panel {
    display: flex;
    flex-direction: column;
  }

  .queue-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .queue-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
  }

  .queue-icon {
    color: #5dcaa5;
  }

  .queue-text {
    flex: 1;
  }

  .queue-by {
    color: #7d76a3;
    font-size: 13px;
  }

  .voice-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .voice-user {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
  }

  .voice-user.speaking i {
    color: #5dcaa5;
    font-size: 13px;
  }

  .voice-name {
    flex: 1;
  }

  .chat-panel {
    flex: 1;
    min-height: 320px;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    overflow-y: auto;
  }

  .chat-msg {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .chat-msg b {
    font-size: 13px;
    display: block;
  }

  .chat-msg p {
    margin: 3px 0 0;
    font-size: 15px;
    color: #d9d3f2;
  }

  .chat-input-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
  }

  .chat-input-placeholder {
    flex: 1;
    border: 1.5px solid #4a3550;
    border-radius: 12px;
    padding: 13px 16px;
    font-size: 15px;
    color: #7d76a3;
  }

  .send {
    width: 44px;
    height: 44px;
    background: #7c5cff;
  }
</style>