import { Sprite, Graphics } from 'pixi.js';
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
    this.bigFish = null;
    this.smallFish = null;
    this.initFish();
  }

  /**
   * Initizlies the object of class Fish
   *
   * @memberof Fish
   */
  async initFish() {
    await this._addFishImages();
    await this._addEventHanlerToSmallFish();
  }

  /**
   * Hides the "Small" fish sprite. Shows the "Big" fish sprite. 
   * Scales the "Big" fish sprite 1.5 times with GSAP and easing 
   *
   * @memberof Fish
   */
  expand() {
    this.smallFish.visible = false;
    this.bigFish.visible = true;

    gsap.to(this.bigFish, {
      pixi: {
        scale: 1.5,
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
   * Scales the "Big" fish sprite to its original size
   *
   * @memberof Fish
   */
  contract() {
    this.smallFish.visible = true;
    this.bigFish.visible = false;

    gsap.to(this.bigFish, {
      pixi: {
        scale: 1,
      },
      duration: 1,
      ease: Elastic.easeOut.config(1, 0.3)
    });
  }

  /**
   * Initializes PIXI Sprites for the Big and Small fish images.
   *
   * @memberof Fish
   */
  async _addFishImages() {

    // Add big fish sprite
    const bigFish = Sprite.from('big');

    this.bigFish = bigFish;
    this.bigFish.anchor.set(0.5);
    this.bigFish.name = 'bigFish';
    this.bigFish.x = window.innerWidth / 2;
    this.bigFish.y = window.innerHeight / 2;
    this.bigFish.visible = false;

    window.__PIXI_APP.stage.addChild(bigFish);

    // Add small fish sprite
    const smallFish = Sprite.from('small');

    this.smallFish = smallFish;
    this.smallFish.anchor.set(0.5);
    this.smallFish.name = 'smallFish';
    this.smallFish.x = window.innerWidth / 2;
    this.smallFish.y = window.innerHeight / 2;

    window.__PIXI_APP.stage.addChild(smallFish);
  }

  /**
   * Adds function that will be executed on 'pointerdown' 
   *
   * @memberof Fish
   */
  async _addEventHanlerToSmallFish() {
    const that = this;

    this.smallFish.interactive = true;
    this.smallFish.buttonMode = true;
    this.smallFish.on('pointerdown', () => {
      that.expand();
    });
  }
}