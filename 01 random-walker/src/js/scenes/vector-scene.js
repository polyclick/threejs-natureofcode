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

      this.spacebarDown = false

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
      this.pointLight1 = new THREE.PointLight(0x00a0b0, 0.4)
      this.pointLight1.position.set(-200, -300, -50)
      this.scene.add(this.pointLight1)

      this.scene.add(new THREE.PointLightHelper(this.pointLight1, 10))

      this.pointLight2 = new THREE.PointLight(0xcc333f, 0.7)
      this.pointLight2.position.set(200, 250, 300)
      this.scene.add(this.pointLight2)

      this.scene.add(new THREE.PointLightHelper(this.pointLight2, 10))
    }


    setupModels() {

      this.box = new THREE.Mesh(
          new THREE.BoxGeometry(800, 800, 800, 20, 20, 20),
          new THREE.MeshBasicMaterial({ color: 0x666666, wireframe: true })
      )
      this.box.geometry.computeBoundingBox()
      this.scene.add(this.box)


      this.walkers = []

      let i, walker, bbox = this.box.geometry.boundingBox
      for(i = 0; i < 150; i++) {
        walker = new SphereWalker(bbox)
        walker.location = new THREE.Vector3(
          utils.randomFloat(bbox.min.x, bbox.max.x), 0, utils.randomFloat(bbox.min.z, bbox.max.z)
        )
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
        let gravity = new THREE.Vector3(utils.randomFloat(-0.05, 0.05), utils.randomFloat(-0.1, -0.5), 0)
        w.applyForce(gravity)

        if(this.spacebarDown) {
          let wind = new THREE.Vector3(1.0, 0, 0)
          w.applyForce(wind)
        }


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

    keyDown(e) {
      if(e.which === 32) this.spacebarDown = true
    }

    keyUp(e) {
      if(e.which === 32) this.spacebarDown = false
    }

  }