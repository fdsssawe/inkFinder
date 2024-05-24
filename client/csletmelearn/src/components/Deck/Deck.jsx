import React, { useEffect , useState } from 'react';
import { useDrag } from 'react-use-gesture'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import styles from './styles.module.css'

const cards = [
    'https://res.cloudinary.com/drfyxnas2/image/upload/v1685902558/abyw5dcdwyrkcvmwcyei.png',
    'https://res.cloudinary.com/drfyxnas2/image/upload/v1685901441/axqnkb8vlcjmoyhgwgmw.png',
    'https://res.cloudinary.com/drfyxnas2/image/upload/v1685901170/hryzyyhkvfu8u5hinmrv.png',
    'https://res.cloudinary.com/drfyxnas2/image/upload/v1685901534/vka8gyf9d6k7uc2e4dkw.png',
    'https://res.cloudinary.com/drfyxnas2/image/upload/v1685116790/vxekuk1nao36v5czcdik.png',
    'https://res.cloudinary.com/drfyxnas2/image/upload/v1685901762/wf2j9p6uu9asm3j8jkoo.png',
]

const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  })
  const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
  

const Deck = () => {
        //Unnecessary coments
        const [gone] = useState(() => new Set())
        const [props, api] = useSprings(cards.length, i => ({
          ...to(i),
          from: from(i),
        }))
        const scaleValue = 1
        const scaleValueDown = 1.1
        const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
          const trigger = velocity > 0.2 
          const dir = xDir < 0 ? -1 : 0 
          if (!down && trigger) gone.add(index) 
          api.start(i => {
            if (index !== i) return 
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) 
            //Magic number
            const scale = down ? scaleValueDown : scaleValue // Active cards lift up a bit
            return {
              x,
              rot,
              scale,
              delay: undefined,
              config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            }
          })
          if (!down && gone.size === cards.length)
            setTimeout(() => {
              gone.clear()
              api.start(i => to(i))
            }, 600)
        })
        return (
          <>
            {props.map(({ x, y, rot, scale }, i) => (
              <animated.div className={styles.deck} key={i} style={{ x, y }}>
                <animated.div
                  {...bind(i)}
                  style={{
                    transform: interpolate([rot, scale], trans),
                    backgroundImage: `url(${cards[i]})`,
                  }}
                />
              </animated.div>
            ))}
          </>
        )
      }

export default Deck;