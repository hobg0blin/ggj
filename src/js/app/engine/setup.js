// Global imports -
import {createCamera} from 'components/Three/camera.js'
import {createLights} from 'components/Three/lights.js'
import {createRenderer} from 'components/Three/renderer.js'
import {createControls, addToGUI} from 'components/Three/controls.js'
import { level2 }from 'levels/level2.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

const setup = (THREE) => {
    const world = {};
    world.THREE = THREE
  // CLOCK
    world.clock = new THREE.Clock()
    // SCENE & RENDER
    world.renderer = createRenderer();
    world.renderer.setSize( window.innerWidth, window.innerHeight );
    world.scene = new THREE.Scene();

    // CAMERA & VIEWPORTS

    world.camera = createCamera()
    world.camera.position.set(0, 20, 100)
  // effects
    world.composer = new EffectComposer( world.renderer);
    world.composer.addPass( new RenderPass( world.scene, world.camera ) );

   //LIGHTS
    const color = 0xFFFFFF
    const intensity = 1.5
    world.light = createLights({color: color, intensity: intensity})
    world.light[0].position.set(0, 100, 50)
    world.light[0].castShadow = true
    world.scene.add(world.light[0])
    world.scene.add(new THREE.AmbientLight({color: 'white', intensity: 1}))

    //BACKGROUND & FOG
    world.textureLoader = new THREE.TextureLoader()
    let backgroundImg = world.textureLoader.load('/three/studio-bg.jpg')
//        world.scene.background = backgroundImg
    // CONTROLS
    world.controls = createControls(world.camera, world.renderer)
//    this.controls.target.set(0, 0, 0)
    // RENDERING
    //
    world.render = (level, world) => {
      updateSize(world.renderer)
      requestAnimationFrame(level.animate)
      world.renderer.render(world.scene, world.camera)
      world.composer.render()
    }
    return world
}

// deal with browser resizing
let windowWidth, windowHeight

function updateSize(renderer) {

  if ( windowWidth != window.innerWidth || windowHeight != window.innerHeight ) {

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    renderer.setSize( windowWidth, windowHeight );

  }

}


// handle level changes
const levelHandler = (levelIndex) => {
  let levels = [level2]
  return levels[levelIndex]
}

export {setup,  levelHandler}
