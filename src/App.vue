<style>

#box, #box1 {
  cursor: move;
  user-select: none;
  border: 1px solid #000000;
  border-radius: 16px;
  padding: 20px 24px;
  font-weight: 700;
  font-size: 44px;
  line-height: 53px;
  text-align: center;
  width: fit-content;
}
.box1 {
  background: #6367E7;
  border: 3px solid #000000;
  border-radius: 8px;
  color: #FFFFFF;
}
.box2 {
  padding: 20px 24px;
  background: #F3F464;
  color: #000000;
}
.box3 {
  color: #000000;
  background: tranparent;
}
#ground {
  position: absolute;
  background: #666;
  top: 1050px;
  height: 10px;
  width: 100%;
}
.wrapper {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80vh;
}
html,
body {
  position: relative;
  height: 100%;
  margin: 0;
}
</style>

<template>
  <div id="app">
      <div id="box" class="box1">
        Java
      </div>
      <div class="wrapper">
        <div>
          <div id="box" class="box2">
            для
          </div>
          <div id="box" class="box2">
            разработки
          </div>
          <div id="box" class="box2">
            проектов
          </div>
          <div id="box" class="box2">
            крупнейших
          </div>
        </div>
       <div class="first">
          <div id="box" class="box3">
            ищем
          </div>
          <div id="box" class="box2">
            лучших
          </div>
          <div id="box" class="box2">
            программистов
          </div>
       </div>
      </div>
    <div id="ground"></div>
  </div>
</template>

<script>
// import { init } from './script'
import Matter from 'matter-js'
// import { init } from './test'
export default {
  name: 'App',
  mounted () {
    // this.init()
  },
  methods: {
    init () {
      const listEls = document.querySelectorAll('#box')
      const engine = Matter.Engine.create()

      const stack = Matter.Composites.stack(
        // xx, yy, columns, rows, columnGap, rowGap, cb
        0,
        0,
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
      const ground = Matter.Bodies.rectangle(window.innerWidth / 2, 1050, window.innerWidth, 100, {
        isStatic: true
      })
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: document.body
      })
      listEls.forEach((e) => {
        e.style.position = 'absolute'
      })
      Matter.Composite.add(engine.world, [stack, ground, mouseConstraint]);
      (function rerender () {
        stack.bodies.forEach((block, i) => {
          const el = listEls[i]
          const { x, y } = block.vertices[0]
          el.style.top = `${y}px`
          el.style.left = `${x}px`
          el.style.transform = `translate(-50%, -50%)
                                rotate(${block.angle}rad)
                                translate(50%, 50%)`
        })
        Matter.Engine.update(engine)
        requestAnimationFrame(rerender)
      })()
    }
  }
}
</script>
