const onPlayerCreate = PlayerManager.prototype.onPlayerCreate;
const onMovementUpdateAnimation = Movement.prototype.updateAnimation;

const HEAD_OFFSET = 0.4;
const RENDER_LINE_STEP = 0.001;
const RENDER_LINE_WIDTH = 0.03;
const RED_COLOR = new pc.Color(1, 0, 0);

let enemies = null;

function renderLine(application, from, to, color) {
  for (let i = 0; i < RENDER_LINE_WIDTH; i += RENDER_LINE_STEP) {
    const fromOffset = new pc.Vec3(from.x + i, from.y, from.z + i);
    const toOffset = new pc.Vec3(to.x + i, (to.y - HEAD_OFFSET), to.z + i);

    application.renderLine(fromOffset, toOffset, color);
  }
}

PlayerManager.prototype.onPlayerCreate = function () {
  onPlayerCreate.apply(this, arguments);

  enemies = this.players;
};

Movement.prototype.updateAnimation = function () {
  onMovementUpdateAnimation.apply(this, arguments);

  if (!enemies) {
    return;
  }

  const position = this.entity.getPosition().clone();

  for (const enemy of enemies) {
    renderLine(this.app, enemy.localPosition, position, RED_COLOR);
  }
}
