import Matter from 'matter-js'

export const init = () => {
  const engine = Matter.Engine.create()
  const box = {
    body: Matter.Bodies.rectangle(150, 0, 40, 40),
    elem: document.querySelector('#box'),
    render () {
      const { x, y } = this.body.position
      this.elem.style.top = `${y - 20}px`
      this.elem.style.left = `${x - 20}px`
      this.elem.style.transform = `rotate(${this.body.angle}rad)`
    }
  }
  const ground = Matter.Bodies.rectangle(200, 200, 400, 120, { isStatic: true })
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: document.body
  })
  Matter.Composite.add(engine.world, [box.body, ground, mouseConstraint]);
  (function rerender () {
    box.render()
    Matter.Engine.update(engine)
    requestAnimationFrame(rerender)
  })()
}
