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
        new THREE.SphereGeometry(25, 16, 16),
        new THREE.MeshNormalMaterial()
      )
    }



    ///////////////////////////////////////////////////////////////////////////////
    //// UPDATE & DRAW
    ///////////////////////////////////////////////////////////////////////////////

    update() {
      this.acceleration.set(
        utils.randomFloat(-0.4, 0.4),
        utils.randomFloat(-0.4, 0.4),
        utils.randomFloat(-0.4, 0.4)
      )

      this.velocity.add(this.acceleration)
      this.location.add(this.velocity)

      this.velocity.clampLength(-5, 5)
    }


    edges() {
      if(this.location.x < this.bounds.min.x) this.location.x = this.bounds.max.x
      if(this.location.x > this.bounds.max.x) this.location.x = this.bounds.min.x
      if(this.location.y < this.bounds.min.y) this.location.y = this.bounds.max.y
      if(this.location.y > this.bounds.max.y) this.location.y = this.bounds.min.y
      if(this.location.z < this.bounds.min.z) this.location.z = this.bounds.max.z
      if(this.location.z > this.bounds.max.z) this.location.z = this.bounds.min.z
    }


    apply() {
      this.object.position.set(this.location.x, this.location.y, this.location.z)
    }


    draw() {

    }

  }