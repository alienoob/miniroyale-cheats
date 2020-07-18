const onReady = Movement.prototype.onReady;
const onEnemyDamage = Enemy.prototype.damage;
const onPlayerCreate = PlayerManager.prototype.onPlayerCreate;
const onMovementUpdateAnimation = Movement.prototype.updateAnimation;

const ENTITY_KEY = "entity";
const ENEMIES_KEY = "enemies";

const DAMAGE_X = 20;
const RENDER_LINE_STEP = 0.001;
const RENDER_LINE_WIDTH = 0.03;
const RED_COLOR = new pc.Color(1, 0, 0);

const state = new Map();

function renderLine(application, from, to, color) {
  for (let i = 0; i < RENDER_LINE_WIDTH; i += RENDER_LINE_STEP) {
    const start = new pc.Vec3(from.x + i, from.y, from.z + i);
    const end = new pc.Vec3(to.x + i, (to.y - 0.4), to.z + i);

    application.renderLine(start, end, color);
  }
}

Movement.prototype.onReady = function () {
  onReady.apply(this, arguments);

  state.set(ENTITY_KEY, this.entity);
};

PlayerManager.prototype.onPlayerCreate = function () {
  onPlayerCreate.apply(this, arguments);

  state.set(ENEMIES_KEY, this.players);
};

Enemy.prototype.damage = function () {
  for (let i = 0; i <= DAMAGE_X; i++) {
    onEnemyDamage.apply(this, arguments);
  }
};

Movement.prototype.updateAnimation = function () {
  onMovementUpdateAnimation.apply(this, arguments);

  const enemies = state.get(ENEMIES_KEY);

  if (!enemies) {
    return;
  }

  const position = this.entity.getPosition().clone();

  for (const enemy of enemies) {
    renderLine(this.app, enemy.localPosition, position, RED_COLOR);
  }
}
