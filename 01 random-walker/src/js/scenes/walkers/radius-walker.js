import * as utils from '../../utils/math-utils.js'

export default class RadiusWalker {

  constructor(scene, color) {
    this.scene = scene
    this.color = color

    this.MAX_POINTS = 30000

    this.position = new THREE.Vector3(0.0, 0.0, 0.0)

    this.setup()
  }


  setup() {
    this.drawRange = 0

    this.positions = new Float32Array(this.MAX_POINTS * 3)
    this.geometry = new THREE.BufferGeometry()
    this.geometry.addAttribute(`position`, new THREE.BufferAttribute(this.positions, 3))

    this.material = new THREE.LineBasicMaterial({ color: this.color, side: THREE.DoubleSide })
    this.line = new THREE.Line(this.geometry, this.material)
    this.scene.add(this.line)
  }


  walk() {

    // don't walk if we reached our max allowed point for this line
    if(this.drawRange > this.MAX_POINTS) return

    // distance to travel
    let radius = 2

    // random point on sphere using current position as the origin
    let point = utils.randomPointAtRadius(this.position.x, this.position.y, this.position.z, radius)

    // set new position
    this.position.set(point[0], point[1], point[2])

    // set new position as vertex in geometry
    let positions = this.line.geometry.attributes.position.array
    positions[(this.drawRange * 3) + 0] = this.position.x
    positions[(this.drawRange * 3) + 1] = this.position.y
    positions[(this.drawRange * 3) + 2] = this.position.z

    // change drawing range so we draw the new point
    this.drawRange++
    this.line.geometry.attributes.position.needsUpdate = true
    this.line.geometry.setDrawRange(0, this.drawRange)
  }

}