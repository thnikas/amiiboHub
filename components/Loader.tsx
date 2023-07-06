"use client"
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useGlobalContext } from '@/app/context'
const Loader = () => {//custom loader that works with animations
  const [position, setPosition] = useState(0);
  const { loader,setLoader} = useGlobalContext();
  
  const animationVariants = {//the animation that changes the Mario position
    initial: { x: "-1500%" },
    animate: { x: "-300%", transition: { duration: 5, ease: "easeOut" } },
  };
  const changeState=()=>{
    setTimeout(()=>{
      setLoader(false)
    },500)
  }
 
  return (
    loader? //if the value is true show mario
    <div className='flex m-2 pt-5'> 
      <motion.div //mushroom animation
      className="box"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.2,
        delay: 1.1,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <Image src={"/Mushroom.png"} alt='amiibo model' className='mush-image '   width={50}
    height={50}  />
      </motion.div>
      <motion.div
        className="box"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.5 }}
        onAnimationComplete={()=>changeState()}
        transition={{
          duration: 0.2,
          delay: 3.1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <Image src={"/Mushroom.png"} alt='amiibo model' className='mush-image'   width={50}
      height={50}  />
      </motion.div>
      <motion.div
        className="box"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.5 }}
        transition={{
          duration: 0.2,
          delay: 6,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <Image src={"/Mushroom.png"} alt='amiibo model' className='mush-image'   width={50}
      height={50}  />
      </motion.div>
      <motion.div
        initial="initial"
        animate="animate"
    
        variants={animationVariants}
      >
        <motion.div //the animation that grows mario
          animate={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 ,delay:1.1}}>
        <motion.div //the animation that grows mario
          animate={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 ,delay:3.1}}
        >
          <Image   src={"/mario_retro.png"} alt='moving Image' width={50}height={50}  />
        </motion.div>
   
      </motion.div> 
    </motion.div>
 




                  
  </div>
:null)
   
}

export default Loader
