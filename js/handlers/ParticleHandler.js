import Flash from '../objects/Particles/Flash';
import Blood from '../objects/Particles/Blood';
import Explosion from '../objects/Particles/Explosion';

export default class ParticleHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;

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
      }
    ];

    // Load all of the particle assets
    for (var i = 0; i < this.particleData.length; i++) {
      var particle = this.particleData[i];
      for (var ia = 0; ia < particle.assets.length; ia++) {
        var asset = particle.assets[ia];
        if (asset.type === 'spritesheet') {
          this.scene.load.spritesheet(
            'explosion',
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
        flags: flags,
        scene: this.scene,
        data: particleObj
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

      // Removing the particle
      if (particle.delete) {
        particle.destroyAssets();
        this.particles.splice(i, 1);
      }
    }
  }
}
