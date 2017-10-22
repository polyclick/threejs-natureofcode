// libraries

// includes
import SquareWalker from './walkers/square-walker.js'
import RadiusWalker from './walkers/radius-walker.js'
import TriangleWalker from './walkers/triangle-walker.js'
import ShaderWalker from './walkers/shader-walker.js'

// extensions
import OrbitControls from 'three/controls/OrbitControls'

///////////////////////////////////////////////////////////////////////////////
//// WALKER SCENE
///////////////////////////////////////////////////////////////////////////////

export default class WalkerScene {



    ///////////////////////////////////////////////////////////////////////////////
    //// CONSTRUCTION & DESTRUCTION
    ///////////////////////////////////////////////////////////////////////////////

    constructor(viewportWidth, viewportHeight, renderer, gui) {
      this.viewportWidth = viewportWidth
      this.viewportHeight = viewportHeight
      this.renderer = renderer
      this.gui = gui

      this.scene = new THREE.Scene()

      this.setup()
    }



    setup() {
      this.setupCameras()
      this.setupLights()
      this.setupModels()
    }



    setupCameras() {

      // default camera
      this.camera = new THREE.PerspectiveCamera(70, this.viewportWidth / this.viewportHeight, 0.0001, 10000)
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
    //// PUBLIC METHODS
    ///////////////////////////////////////////////////////////////////////////////

    update(clock) {
      this.walkers.forEach(w => w.walk())
      this.controls.update()
    }



    draw(clock) {
      this.walkers.forEach((w, index) => {
        w.draw(clock.getElapsedTime() + (index * 0.085))
      })

      this.renderer.render(this.scene, this.camera)
    }



    resize(viewportWidth, viewportHeight) {
      this.viewportWidth = viewportWidth
      this.viewportHeight = viewportHeight

      this.walkers.forEach(w => w.resize(this.viewportWidth, this.viewportHeight))

      this.camera.aspect = this.viewportWidth / this.viewportHeight
      this.camera.updateProjectionMatrix()
    }
  }