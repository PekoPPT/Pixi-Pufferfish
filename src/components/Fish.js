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
    this.smallFish = Texture.from('small');;
    this.bigFish = Texture.from('big');
    this.initFish();
  }

  /**
   * Initizlies the object of class Fish
   *
   * @memberof Fish
   */

  async initFish() {
    // Add big fish sprite
    const fish = Sprite.from(this.smallFish);

    this.fish = fish;
    this.fish.anchor.set(0.5);
    this.fish.name = 'fish';
    this.fish.buttonMode = true;
    this.fish.interactive = true;
    this.fish.expand = this.expand;
    this.fish.contract = this.contract;

    this.fish.on('click', () => {
      this.expand();
    });
  }

  /**
   * Hides the "Small" fish. Shows the "Big" fish. 
   * Scales the "Fish sprite 1.5 times with GSAP and easing 
   *
   * @memberof Fish
   */

  expand() {
    this.fish.texture = this.bigFish;
    const timeline = new gsap.timeline();
    timeline.to(this.fish, {
      pixi: {
        scaleX: 1.5,
        scaleY: 1.5
      },
      duration: 1,
      ease: Elastic.easeOut.config(1, 0.3)
    });
    timeline.addPause(5);
    timeline.to(this.fish, {
      pixi: {
        scaleX: 1,
        scaleY: 1
      },
      duration: 0,
    }).then(() => {
      this.contract();
    });
  }

  /**
   * Hides the "Big" fish. Shows the "Small" fish. 
   * Scales the fish sprite to its original size
   *
   * @memberof Fish
   */

  contract() {
    this.fish.texture = this.smallFish;
  }

}