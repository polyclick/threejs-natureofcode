// includes
import * as utils from '../../utils/math-utils.js'



///////////////////////////////////////////////////////////////////////////////
//// SPHERE WALKER
///////////////////////////////////////////////////////////////////////////////

export default class SphereWalker {



    ///////////////////////////////////////////////////////////////////////////////
    //// CONSTRUCTION & DESTRUCTION
    ///////////////////////////////////////////////////////////////////////////////

    constructor(bounds) {
      this.bounds = bounds

      this.location = new THREE.Vector3(0, 0, 0)
      this.velocity = new THREE.Vector3(0, 0, 0)
      this.acceleration = new THREE.Vector3(0.0, 0.0, 0.0)
    }


    setup() {
      this.object = new THREE.Mesh(
        new THREE.SphereGeometry(15, 32, 32),
        new THREE.MeshNormalMaterial({ color: 0xffffff })
      )
    }


    applyForce(force) {
      this.acceleration.add(force)
    }



    ///////////////////////////////////////////////////////////////////////////////
    //// UPDATE & DRAW
    ///////////////////////////////////////////////////////////////////////////////

    update() {
      this.velocity.add(this.acceleration)
      this.location.add(this.velocity)
      this.acceleration.multiplyScalar(0)
    }


    edges() {
      this.checkAxisEdges(`x`, this.bounds)
      this.checkAxisEdges(`y`, this.bounds)
      this.checkAxisEdges(`z`, this.bounds)
    }


    checkAxisEdges(axis, bounds) {
      if(this.location[axis] < bounds.min[axis]) {
        this.location[axis] = bounds.min[axis]
        this.velocity[axis] *= -1.0
      } else if(this.location[axis] > bounds.max[axis]) {
        this.location[axis] = bounds.max[axis]
        this.velocity[axis] *= -1.0
      }
    }


    apply() {
      this.object.position.set(this.location.x, this.location.y, this.location.z)
    }


    draw() {

    }

  }