// libraries
import TweenMax from 'gsap'
import dat from 'dat-gui'

// includes
import WalkerScene from './scenes/walker-scene.js'
import VectorScene from './scenes/vector-scene.js'



///////////////////////////////////////////////////////////////////////////////
//// APPLICATION CLASS
///////////////////////////////////////////////////////////////////////////////

class App {



  ///////////////////////////////////////////////////////////////////////////////
  //// CONSTRUCTION & DESTRUCTION
  ///////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.viewportWidth = window.innerWidth
    this.viewportHeight = window.innerHeight

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
    this.renderer.setSize(this.viewportWidth, this.viewportHeight)
    this.renderer.setClearColor(0x000000, 1)
    document.body.appendChild(this.renderer.domElement)

    // scene
    // this.scene = new WalkerScene(this.viewportWidth, this.viewportHeight, this.renderer, this.gui)
    this.scene = new VectorScene(this.viewportWidth, this.viewportHeight, this.renderer, this.gui)

    // render & animation ticker
    TweenMax.ticker.fps(60)
    TweenMax.ticker.addEventListener(`tick`, () => { this.handleTick() })

    // resize
    window.addEventListener(`resize`, (e) => { this.handleResize(e) }, false)
    window.addEventListener(`keydown`, (e) => { this.handleKeyDown(e) }, false)
    window.addEventListener(`keyup`, (e) => { this.handleKeyUp(e) }, false)
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// UPDATE & DRAW
  ///////////////////////////////////////////////////////////////////////////////

  update() {
    this.scene.update(this.clock)
  }



  draw() {
    this.scene.draw(this.clock)
  }



  resize() {
    this.scene.resize(this.viewportWidth, this.viewportHeight)
    this.renderer.setSize(this.viewportWidth, this.viewportHeight)
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// HANDLERS & UTILS
  ///////////////////////////////////////////////////////////////////////////////

  handleTick() {
    this.update()
    this.draw()
  }



  handleResize(e) {
    this.viewportWidth = window.innerWidth
    this.viewportHeight = window.innerHeight
    this.resize()
  }


  handleKeyDown(e) {
    this.scene.keyDown(e)
  }


  handleKeyUp(e) {
    this.scene.keyUp(e)
  }

}



///////////////////////////////////////////////////////////////////////////////
//// EXPORTS
///////////////////////////////////////////////////////////////////////////////

export const app = new App()
