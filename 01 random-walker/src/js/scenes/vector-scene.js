// libraries

// extensions
import OrbitControls from 'three/controls/OrbitControls'

// includes
import SphereWalker from './walkers/sphere-walker.js'
import * as utils from '../utils/math-utils.js'



///////////////////////////////////////////////////////////////////////////////
//// VECTOR SCENE
///////////////////////////////////////////////////////////////////////////////

export default class VectorScene {



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
      this.camera = new THREE.PerspectiveCamera(90, this.viewportWidth / this.viewportHeight, 0.0001, 10000)
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

      this.box = new THREE.Mesh(
          new THREE.BoxGeometry(800, 800, 800, 20, 20, 20),
          new THREE.MeshBasicMaterial({ color: 0x666666, wireframe: true })
      )
      this.box.geometry.computeBoundingBox()
      this.scene.add(this.box)


      this.walkers = []

      let i, walker
      for(i = 0; i < 50; i++) {
        walker = new SphereWalker(this.box.geometry.boundingBox)
        walker.setup()

        this.walkers.push(walker)
        this.scene.add(walker.object)
      }

      // this.walker = new SphereWalker(this.box.geometry.boundingBox)
      // this.walker.setup()
      // this.scene.add(this.walker.object)
    }



    ///////////////////////////////////////////////////////////////////////////////
    //// PUBLIC METHODS
    ///////////////////////////////////////////////////////////////////////////////

    update(clock) {
      this.walkers.forEach((w) => {
        w.update()
        w.edges()
        w.apply()
      })

      this.controls.update()
    }


    draw(clock) {
      this.walkers.forEach((w) => {
        w.draw()
      })

      this.renderer.render(this.scene, this.camera)
    }


    resize(viewportWidth, viewportHeight) {
      this.viewportWidth = viewportWidth
      this.viewportHeight = viewportHeight

      this.camera.aspect = this.viewportWidth / this.viewportHeight
      this.camera.updateProjectionMatrix()
    }

  }