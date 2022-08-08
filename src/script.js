import Matter from 'matter-js'

export const init = () => {
  const listEls = document.querySelectorAll('#mjs-wrapper li')
  const engine = Matter.Engine.create()

  const stack = Matter.Composites.stack(
    // xx, yy, columns, rows, columnGap, rowGap, cb
    2,
    2,
    listEls.length,
    1,
    0,
    0,
    (xx, yy, i) => {
      const { x, y, width, height } = listEls[i].getBoundingClientRect()
      return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: false
      })
    }
  )
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    element: document.body
  })
  const ground = Matter.Bodies.rectangle(
    200, 200, 1000, 10, {isStatic: true}
  )
  Matter.Composite.add(engine.world, [stack, ground, mouseConstraint])

  listEls.forEach((e) => {
    e.style.position = 'absolute'
    e.addEventListener('click', (e) => console.log(e.target.textContent))
  });
  (function update () {
    requestAnimationFrame(update)
    stack.bodies.forEach((block, i) => {
      const li = listEls[i]
      const { x, y } = block.vertices[0]
      li.style.top = `${y}px`
      li.style.left = `${x}px`
      li.style.transform = `translate(-50%, -50%)
                          rotate(${block.angle}rad)
                          translate(50%, 50%)`
    })
    Matter.Engine.update(engine)
  })()
}
