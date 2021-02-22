import { Sprite, Graphics, Texture, Container } from 'pixi.js';
import Assets from '../core/AssetManager';
import { gsap, Elastic } from 'gsap';
import PixiPlugin from "gsap/PixiPlugin";

gsap.registerPlugin(PixiPlugin);

export default class Fish extends Sprite {
  /**
   * Creates an instance of Fish.
   * @memberof Fish
   */
  constructor() {
    super();
    this.name = 'fish';
    this.fish = null;
    this.smallFish = null;
    this.bigFish = null;
    this.initFish();
    // this.x = 100;
    // this.y = 100;
    // this.interactive = true;
    // this.buttonMode = true;
  }

  /**
   * Initizlies the object of class Fish
   *
   * @memberof Fish
   */
  async initFish() {
    await this._addFishImages();
  }

  /**
   * Hides the "Small" fish. Shows the "Big" fish. 
   * Scales the "Fish sprite 1.5 times with GSAP and easing 
   *
   * @memberof Fish
   */
  expand() {

    this.fish.texture = this.bigFish;

    // this.fish.scale.set(1.5, 1.5);
    gsap.to(this.fish, {
      pixi: {
        scaleX: 1.5,
        scaleY: 1.5
      },
      duration: 1,
      ease: Elastic.easeOut.config(1, 0.3)
    });

    setTimeout(() => {
      this.contract();
    }, 5000);
  }

  /**
   * Hides the "Big" fish. Shows the "Small" fish. 
   * Scales the fish sprite to its original size
   *
   * @memberof Fish
   */
  contract() {

    this.fish.texture = this.smallFish;
    // this.fish.scale.set(1, 1);

    gsap.to(this.fish, {
      pixi: {
        scaleX: 1,
        scaleY: 1,
      },
      duration: 0,
    });
  }

  /**
   * Initializes PIXI Textures for the Big and Small fish images.
   * Add pointer event to the Fish instance
   *
   * @memberof Fish
   */
  async _addFishImages() {
    const that = this;
    const container = new Container();

    this.smallFish = Texture.from('small');
    this.bigFish = Texture.from('big');

    // Add big fish sprite
    const fish = Sprite.from(this.smallFish);

    this.fish = fish;
    this.fish.anchor.set(0.5);
    this.fish.name = 'fish';
    this.fish.buttonMode = true;
    this.fish.interactive = true;

    this.fish.on('pointerdown', () => {
      that.expand();
    });

  }

}