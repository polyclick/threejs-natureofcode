export default class SquareWalker {

  constructor(scene, color) {
    this.scene = scene
    this.color = color

    this.MAX_POINTS = 30000

    this.position = new THREE.Vector3(0.0, 0.0, 0.0)

    this.prevAxis = -1
    this.prevDirection = -1

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

    // helper vars
    let axis, direction, found = false

    do {

      // pick a random axis and direction to walk along
      axis = this.randomBetween(0, 2)        // 0 = x, 1 = y, 2 = z
      direction = this.randomBetween(0, 1)   // forward, backward

      // never move more than once on a specific axis
      if(axis === this.prevAxis) continue;

      // if we get passed this point, we break out
      found = true
    } while(!found)

    // axes to move along to, distance to travel
    let axes = [`x`, `y`, `z`]
    let distance = 2

    // move position chosen axes with a particular distance, clamp between min & max
    this.position[axes[axis]] = this.position[axes[axis]] + (((direction * 2) - 1) * distance)
    this.position[axes[axis]] = this.clamp(this.position[axes[axis]], -1000, 1000)

    // set new position as vertex in geometry
    let positions = this.line.geometry.attributes.position.array
    positions[(this.drawRange * 3) + 0] = this.position.x
    positions[(this.drawRange * 3) + 1] = this.position.y
    positions[(this.drawRange * 3) + 2] = this.position.z

    // change drawing range so we draw the new point
    this.drawRange++
    this.line.geometry.attributes.position.needsUpdate = true
    this.line.geometry.setDrawRange(0, this.drawRange)

    // keep track over which axis we moved
    this.prevAxis = axis
    this.prevDirection = direction
  }


  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


  clamp(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
  }

}