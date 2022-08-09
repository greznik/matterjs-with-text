<style lang="scss">
.animation-container {
  @apply relative flex mx-auto w-286px h-274px;

  @screen lg {
    @apply w-993px h-485px;
  }

  .block {
    @apply absolute flex items-center justify-center h-54px;
    border: 2px solid #000000;
    border-radius: 8px;
    font-size: 22px;
    line-height: 22px;
    color: #000000;
    background: transparent;
    cursor: move;
    user-select: none;

    @screen lg {
      @apply h-100px;
      font-size: 44px;
      line-height: 44px;
      border: 3px solid #000000;
    }
  }

  .block1 {
    @apply w-93px h-50px;
    left: -2px;
    top: 15px;
    border-radius: 16px;

    @screen lg {
      @apply w-177px h-93px;
      left: 38px;
      top: 101px;
    }
  }

  .block2 {
    @apply w-113px h-70px;
    left: 88px;
    top: -5px;
    background: #7e3cf5;
    color: #ffffff;

    @screen lg {
      @apply w-244px h-130px;
      left: 212px;
      top: 63px;
      font-size: 52px;
    }
  }

  .block3 {
    @apply w-79px;
    left: 200px;
    top: 10px;
    background: #7e3cf5;
    color: #ffffff;

    @screen lg {
      @apply w-148px h-100px;
      left: 453px;
      top: -4px;
    }
  }

  .block4 {
    @apply w-201px;
    left: 10px;
    top: 63px;
    background: #ff7d25;
    color: #ffffff;
    border-radius: 16px;

    @screen lg {
      @apply w-391px h-100px;
      left: 453px;
      top: 93px;
    }
  }

  .block5 {
    @apply w-72px;
    left: 209px;
    top: 63px;
    border-radius: 76px;

    @screen lg {
      @apply w-133px;
      left: -2px;
      top: 191px;
    }
  }

  .block6 {
    @apply w-157px h-66px;
    left: -1px;
    top: 115px;

    @screen lg {
      @apply w-303px h-130px;
      left: 128px;
      top: 191px;
    }
  }

  .block7 {
    @apply w-132px;
    left: 153px;
    top: 115px;
    border-radius: 16px;

    @screen lg {
      @apply w-253px;
      left: 429px;
      top: 191px;
    }
  }

  .block8 {
    @apply w-163px h-78px;
    left: -1px;
    top: 179px;

    @screen lg {
      @apply w-315px h-100px;
      left: 680px;
      top: 191px;
    }
  }

  .block9 {
    @apply w-126px;
    left: 160px;
    top: 167px;
    background: #ff7d25;
    color: #ffffff;

    @screen lg {
      @apply w-264px;
      left: 456px;
      top: 288px;
      border-radius: 16px;
    }
  }

  .block10 {
    @apply w-68px;
    left: 159px;
    top: 219px;
    border-radius: 76px;

    @screen lg {
      @apply w-125px;
      left: 717px;
      top: 288px;
    }
  }
}
</style>

<template lang="pug">
.animation-container
  .block.block1 Ищем
  .block.block2 лучших
  .block.block3 Java
  .block.block4 программистов

  .block.block5 для
  .block.block6 разработки
  .block.block7 проектов
  .block.block8 крупнейших
  .block.block9 компаний
  .block.block10 РФ
</template>

<script>
import Matter from 'matter-js'
export default {
  name: 'App',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const listEls = document.querySelectorAll('.block')
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
        },
      )
      const ground = Matter.Bodies.rectangle(window.innerWidth / 2, 490, window.innerWidth, 10, {
        isStatic: true
      })
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: document.querySelector('.animation-container')
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
