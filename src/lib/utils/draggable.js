/**
 * Starts a pointer drag for an element inside `.canvas`, clamped to the canvas bounds.
 *
 * @param {PointerEvent} pointerDownEvent - the pointerdown event on the dragged element
 * @param {{ x: number, y: number }} startPosition - the element's current position
 * @param {(position: { x: number, y: number }) => void} onMove - called on every move with the clamped position
 * @param {(position: { x: number, y: number }) => void} [onEnd] - called once on pointerup with the final position
 */
export function startDrag(pointerDownEvent, startPosition, onMove, onEnd) {
  const pointerStartX = pointerDownEvent.clientX;
  const pointerStartY = pointerDownEvent.clientY;
  const elementRect = pointerDownEvent.currentTarget.getBoundingClientRect();
  const canvasRect = pointerDownEvent.currentTarget
    .closest(".canvas")
    .getBoundingClientRect();
  const maxX = canvasRect.width - elementRect.width;
  const maxY = canvasRect.height - elementRect.height;

  let latestPosition = { x: startPosition.x, y: startPosition.y };

  function handlePointerMove(moveEvent) {
    latestPosition = {
      x: Math.min(Math.max(startPosition.x + (moveEvent.clientX - pointerStartX), 0), maxX),
      y: Math.min(Math.max(startPosition.y + (moveEvent.clientY - pointerStartY), 0), maxY),
    };
    onMove(latestPosition);
  }

  function handlePointerUp() {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    onEnd?.(latestPosition);
  }

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
}
