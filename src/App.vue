<style>
#mjs-wrapper {
  /* position this element */
  margin: 1em;
  height: 100%;
}
#mjs-wrapper ul {
  font-size: 14pt;
  list-style: none;
  user-select: none;
  position: relative;
}
#mjs-wrapper li {
  background: #fff;
  border: 1px solid #555;
  display: inline-block;
  padding: 1em;
  cursor: move;
}
#mjs-wrapper li:hover {
  background: #f2f2f2;
}
#box {
  position: absolute;
  background: #111;
  color: #eee;
  height: 80px;
  width: 140px;
  cursor: move;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Amatic SC';
  text-shadow: 2px 2px 3px #38e;
}

#ground {
  position: absolute;
  background: #666;
  top: 350px;
  height: 10px;
  width: 400px;
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
    <!-- <div id="mjs-wrapper">
      <ul>
        <li>Foo</li>
        <li>Bar</li>
        <li>Baz</li>
        <li>Quux</li>
        <li>Garply</li>
        <li>Corge</li>
      </ul>
    </div> -->
    <div id="box">
      <h1>hello world</h1>
    </div>
    <div id="box">
      <h1>hello world</h1>
    </div>
    <div id="ground"></div>
  </div>
</template>

<style></style>

<script>
// import { init } from './script'
import Matter from 'matter-js'
// import { init } from './test'
export default {
  name: 'App',
  data () {
    return {
      engine: null,
      box: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const listEls = document.querySelectorAll('#box')
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
      const ground = Matter.Bodies.rectangle(200, 360, 1000, 10, {
        isStatic: true
      })
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: document.body
      })
      Matter.Composite.add(engine.world, [stack, ground, mouseConstraint]);
      (function rerender () {
        stack.bodies.forEach((block, i) => {
          const li = listEls[i]
          const { x, y } = block.vertices[0]
          li.style.top = `${y}px`
          li.style.left = `${x}px`
          li.style.transform = `rotate(${block.angle}rad)`
        })
        Matter.Engine.update(engine)
        requestAnimationFrame(rerender)
      })()
    }
  }
}
</script>
