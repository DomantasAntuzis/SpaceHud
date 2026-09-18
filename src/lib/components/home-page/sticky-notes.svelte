<div class="board">
  <svg class="connector" width="1248" height="460">
    <path d="M180 130 Q 320 60 470 190" fill="none" stroke="#332f4d" stroke-width="2" stroke-dasharray="6 9" />
    <path d="M560 220 Q 700 260 830 150" fill="none" stroke="#332f4d" stroke-width="2" stroke-dasharray="6 9" />
    <path d="M900 210 Q 980 300 1040 340" fill="none" stroke="#332f4d" stroke-width="2" stroke-dasharray="6 9" />
  </svg>
 
  <div class="note note-room">
    <div class="tape"></div>
    <i class="fa-solid fa-house"></i>
    <h3>the room</h3>
    <p>just a space that exists while you're all in it. closes when everyone leaves.</p>
  </div>
 
  <div class="note note-music">
    <div class="tape"></div>
    <i class="fa-solid fa-music"></i>
    <h3>music, together</h3>
    <p>queue up tracks from a link. everyone hears the same song at the same time.</p>
  </div>
 
  <div class="note note-watch">
    <div class="tape"></div>
    <i class="fa-solid fa-circle-play"></i>
    <h3>watch stuff</h3>
    <p>drop a video link and watch it in sync, so reactions actually land together.</p>
  </div>
 
  <div class="note note-talk">
    <div class="tape"></div>
    <i class="fa-solid fa-microphone"></i>
    <h3>talk whenever</h3>
    <p>hop into voice without opening another app. it's just there.</p>
  </div>
 
  <div class="badge">
    <span class="dot"></span>
    <span>5 friends here now</span>
  </div>
</div>

<style>
    .board {
        position: relative;
        width: 1214px;
        max-width: 100%;
        height: 460px;
        margin: 60px auto;
  }
 
  .connector {
    position: absolute;
    top: 0;
    left: 0;
  }
 
  .note {
    position: absolute;
    width: 240px;
    box-sizing: border-box;
    padding: 22px;
    border-radius: 18px;
  }
 
  .note .tape {
    position: absolute;
    top: -10px;
    left: 50%;
    width: 54px;
    height: 18px;
    border-radius: 3px;
    transform: translateX(-50%) rotate(2deg);
  }
 
  .note i {
    font-size: 22px;
    color: #ffffff;
  }
 
  .note h3 {
    font-family: 'Fredoka', sans-serif;
    font-size: 17px;
    font-weight: 600;
    margin: 12px 0 6px;
    color: #ffffff;
  }
 
  .note p {
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
 
  .note-room     { left: 24px;  top: 28px;  background: #e0507a; transform: rotate(-4deg); }
  .note-room .tape { background: #f3d9e2; transform: translateX(-50%) rotate(-3deg); }
  .note-room p    { color: #fbe3ec; }
 
  .note-music     { left: 360px; top: 190px; background: #17a398; transform: rotate(3deg); }
  .note-music .tape { background: #cfece7; }
  .note-music p    { color: #d7f3ee; }
 
  .note-watch     { left: 720px; top: 40px;  background: #e4573d; transform: rotate(-2.5deg); }
  .note-watch .tape { background: #f6d9ce; }
  .note-watch p    { color: #fbe4dc; }
 
  .note-talk      { left: 900px; top: 260px; background: #7c5cff; transform: rotate(2deg); }
  .note-talk .tape { background: #ded6ff; transform: translateX(-50%) rotate(-2deg); }
  .note-talk p     { color: #ece7ff; }
 
  .badge {
    position: absolute;
    left: 1000px;
    top: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #ffd166;
    border-radius: 999px;
    padding: 8px 16px;
    transform: rotate(6deg);
  }
 
  .badge .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2f7a3d;
  }
 
  .badge span {
    font-size: 13px;
    font-weight: 600;
    color: #4a3200;
  }

  @media (max-width: 1280px) {
    .board {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: 24px;
      width: 90%;
      max-width: 420px;
      height: auto;
      margin: 40px auto;
    }

    .connector {
      display: none;
    }

    .note {
      position: static;
      width: 100%;
      max-width: 320px;
      transform: none !important;
    }

    .note .tape {
      transform: translateX(-50%) rotate(0deg) !important;
    }

    .badge {
      position: static;
      transform: none;
    }
  }

  @media (max-width: 420px) {
    .note {
      padding: 18px;
    }

    .note h3 {
      font-size: 16px;
    }

    .note p {
      font-size: 13px;
    }
  }
</style>