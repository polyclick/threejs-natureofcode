// libraries
import TweenMax from 'gsap'
import dat from 'dat-gui'

// extensions
import OrbitControls from 'three/controls/OrbitControls'


// includes
import SquareWalker from './square-walker.js'
import RadiusWalker from './radius-walker.js'
import TriangleWalker from './triangle-walker.js'
import ShaderWalker from './shader-walker.js'



///////////////////////////////////////////////////////////////////////////////
//// APPLICATION CLASS
///////////////////////////////////////////////////////////////////////////////

class App {



  ///////////////////////////////////////////////////////////////////////////////
  //// CONSTRUCTION & DESTRUCTION
  ///////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    this.init()
    this.handleResize()
  }



  init() {

    // gui
    this.gui = new dat.GUI()
    this.gui.closed = true

    // clock
    this.clock = new THREE.Clock()

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)
    this.renderer.setClearColor(0x000000, 1)
    document.body.appendChild(this.renderer.domElement)

    // scene
    this.createScene()

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener(`tick`, () => { this.handleTick() })

    // resize
    window.addEventListener(`resize`, (e) => { this.handleResize(e) }, false)
  }



  createScene() {
    this.scene = new THREE.Scene()

    this.setupCameras()
    this.setupLights()
    this.setupModels()
  }



  setupCameras() {

    // default camera
    this.camera = new THREE.PerspectiveCamera(70, this.sceneWidth / this.sceneHeight, 0.0001, 10000)
    this.camera.position.z = 400

    // default camera debug
    const camFolder = this.gui.addFolder(`Default Camera`)
    camFolder.add(this.camera, 'fov', 25, 120).onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'zoom', 0.1, 10).onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'near').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera, 'far').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera.position, 'x').name('posX').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera.position, 'y').name('posY').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.add(this.camera.position, 'z').name('posZ').onChange(() => { this.camera.updateProjectionMatrix() })
    camFolder.open()

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
    this.controls.rotateSpeed = 0.5
    this.controls.target = new THREE.Vector3(0, 0, 0)
  }



  setupLights() {
    // add lights
  }



  setupModels() {
    this.walkers = [
      new ShaderWalker(this.scene, 0x486bff),

      new ShaderWalker(this.scene, 0x222222),
      new ShaderWalker(this.scene, 0x444444),
      new ShaderWalker(this.scene, 0x666666),
      new ShaderWalker(this.scene, 0x888888),
      new ShaderWalker(this.scene, 0xaaaaaa),
      new ShaderWalker(this.scene, 0xcccccc),
      new ShaderWalker(this.scene, 0xeeeeee)
    ]
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// UPDATE & DRAW
  ///////////////////////////////////////////////////////////////////////////////

  update() {
    const delta = this.clock.getDelta()

    if(this.controls)
      this.controls.update()

    this.walkers.forEach(w => w.walk())
  }



  draw() {
    this.walkers.forEach((w, index) => {
      w.draw(this.clock.getElapsedTime() + (index * 0.085))
    })

    this.renderer.render(this.scene, this.camera)
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// HANDLERS & UTILS
  ///////////////////////////////////////////////////////////////////////////////

  handleTick() {
    this.update()
    this.draw()
  }



  handleResize(e) {

    // update vars
    this.sceneWidth = window.innerWidth
    this.sceneHeight = window.innerHeight

    // update camera
    this.camera.aspect = this.sceneWidth / this.sceneHeight
    this.camera.updateProjectionMatrix()

    // update renderer
    this.renderer.setSize(this.sceneWidth, this.sceneHeight)

    // update walkers
    this.walkers.forEach(w => w.resize(this.sceneWidth, this.sceneHeight))
  }

}



///////////////////////////////////////////////////////////////////////////////
//// EXPORTS
///////////////////////////////////////////////////////////////////////////////

export const app = new App()
