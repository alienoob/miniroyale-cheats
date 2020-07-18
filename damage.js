const onEnemyDamage = Enemy.prototype.damage;

const DAMAGE_X = 20;

Enemy.prototype.damage = function () {
  for (let i = 0; i <= DAMAGE_X; i++) {
    onEnemyDamage.apply(this, arguments);
  }
};
