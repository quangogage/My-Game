import Flash from '../objects/Particles/Flash';
import Blood from '../objects/Particles/Blood';
import Explosion from '../objects/Particles/Explosion';
import Gib from '../objects/Particles/Gib';
import SpawnFlash from '../objects/Particles/SpawnFlash';
import BulletHit from '../objects/Particles/BulletHit';

export default class ParticleHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.player = options.player;
    this.enemies = options.enemies;

    // All particle instances
    this.particles = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  preload() {
    // The different types of particles
    this.particleData = [
      {
        name: 'flash',
        assets: [
          {
            name: 'flash',
            fileName: 'flash'
          }
        ],
        class: Flash
      },
      {
        name: 'blood',
        assets: [
          {
            name: 'blood',
            fileName: 'blood'
          }
        ],
        class: Blood
      },
      {
        name: 'explosion',
        assets: [
          {
            name: 'explosion',
            fileName: 'explosion',
            type: 'spritesheet',
            frameWidth: 32,
            frameHeight: 32
          }
        ],
        class: Explosion
      },
      {
        name: 'gib',
        class: Gib,
        assets: [
          {
            name: 'meat-gib',
            fileName: 'gibs/meat-gib',
            type: 'spritesheet',
            frameWidth: 8,
            frameHeight: 8
          },
          {
            name: 'bone-gib',
            fileName: 'gibs/bone-gib',
            type: 'spritesheet',
            frameWidth: 8,
            frameHeight: 8
          }
        ]
      },
      {
        name: 'spawn-flash',
        class: SpawnFlash,
        assets: [
          {
            name: 'spawn-flash',
            fileName: 'spawn-flash',
            type: 'spritesheet',
            frameWidth: 16,
            frameHeight: 32
          }
        ]
      },
      {
        name: 'bullet-hit',
        class: BulletHit,
        assets: [
          {
            name: 'bullet-hit',
            fileName: 'bullet-hit',
            type: 'spritesheet',
            frameWidth: 16,
            frameHeight: 16
          }
        ]
      }
    ];

    // Load all of the particle assets
    for (var i = 0; i < this.particleData.length; i++) {
      var particle = this.particleData[i];
      for (var ia = 0; ia < particle.assets.length; ia++) {
        var asset = particle.assets[ia];
        if (asset.type === 'spritesheet') {
          this.scene.load.spritesheet(
            asset.name,
            `images/particles/${asset.fileName}.png`,
            {
              frameWidth: asset.frameWidth,
              frameHeight: asset.frameHeight
            }
          );
        } else {
          this.scene.load.image(
            asset.name,
            `images/particles/${asset.fileName}.png`
          );
        }
      }
    }
  }
  update() {
    this.updateParticles();
  }

  // Create a particle
  create(x, y, type, flags) {
    var particleObj = this.getParticleObj(type);

    // Create the new particle instance
    this.particles.push(
      new particleObj.class({
        x: x,
        y: y,
        flags: flags || {},
        scene: this.scene,
        data: particleObj,
        particles: this.particles
      })
    );
  }

  /* ** Private Functions ** */
  // Get a particle object based on it's name
  getParticleObj(name) {
    for (var i = 0; i < this.particleData.length; i++) {
      if (this.particleData[i].name == name) {
        return this.particleData[i];
      }
    }
  }

  // Update all of the particle instances
  updateParticles() {
    for (var i = 0; i < this.particles.length; i++) {
      var particle = this.particles[i];

      // Run it's update function if it has one
      if (particle.update) {
        particle.update();
      }

      // Get pushed if enabled
      if (particle.getPushed) {
        this.getPushed(particle);
      }

      // Removing the particle
      if (particle.delete) {
        particle.destroyAssets();
        this.particles.splice(i, 1);
      }
    }
  }

  // Getting pushed around by the player and enemies
  // Getting pushed by the player & enemies
  getPushed(particle) {
    var posInfluence = 0.1;
    var rotInfluence = 0.5;
    var player = this.player;
    var enemies = this.enemies;
    var playerPos = player.getPos();
    var playerDim = player.getDim();

    // Player
    if (
      playerPos.x + playerDim.width / 2 >
        particle.sprite.x - particle.width / 2 &&
      playerPos.x - playerDim.width / 2 <
        particle.sprite.x + particle.width / 2 &&
      playerPos.y + playerDim.height / 2 >
        particle.sprite.y - particle.height / 2 &&
      playerPos.y - playerDim.height / 2 <
        particle.sprite.y + particle.height / 2
    ) {
      particle.xvel += player.xvel * posInfluence;
      if (particle.rotVel) {
        particle.rotVel += player.xvel * rotInfluence;
      }
    }

    // Enemies
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      var enemyPos = enemy.getPos();
      var enemyDim = enemy.getDim();
      if (
        enemyPos.x + enemyDim.width / 2 >
          particle.sprite.x - particle.width / 2 &&
        enemyPos.x - enemyDim.width / 2 <
          particle.sprite.x + particle.width / 2 &&
        enemyPos.y + enemyDim.height / 2 >
          particle.sprite.y - particle.height / 2 &&
        enemyPos.y - enemyDim.height / 2 <
          particle.sprite.y + particle.height / 2
      ) {
        particle.xvel += enemy.xvel * posInfluence;
        if (particle.rotVel) {
          particle.rotVel += enemy.xvel * rotInfluence;
        }
      }
    }
  }
}
