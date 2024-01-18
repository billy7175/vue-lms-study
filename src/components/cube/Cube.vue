<template>
  <div class="parent" @click="handleClickCube">
    <div class="cube">
      <div class="cube-face cube-face-front"></div>
      <div class="cube-face cube-face-back"></div>
      <div class="cube-face cube-face-right"></div>
      <div class="cube-face cube-face-left"></div>
      <div class="cube-face cube-face-top"></div>
      <div class="cube-face cube-face-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
    setup(){
        const handleClickCube = () => {
            alert('Don\'t click me')
        }
        return {
            handleClickCube
        }
    }
}
</script>

<style scoped>
.parent {
  --cube--width: 30px;
  --cube--height: 30px;
  --cube--translate--z:calc(var(--cube--width) / 2);
  position: absolute;
  right: 50px;
  top: 35px;
  width:var(--cube--width);
  height:var(--cube--height);
  box-sizing: border-box;
  border: 2px solid white;
  perspective: 400px;
  cursor: pointer;
}

.cube {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: rotateCube 3s infinite linear normal;
}

@keyframes rotateCube {
  from {
    transform: rotateX(360deg) rotateY(0deg) rotateZ(0deg);
  }
  to {
    transform: rotateX(0deg) rotateY(360deg) rotateZ(360deg);
  }
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid white;
  box-shadow: 0px 0px 40px 5px yellow;
}

.cube-face-front {
  background: hsla(0, 100%, 50%, 0.5);
}
.cube-face-right {
  background: hsla(60, 100%, 50%, 0.5);
}
.cube-face-back {
  background: hsla(120, 100%, 50%, 0.5);
}
.cube-face-left {
  background: hsla(180, 100%, 50%, 0.5);
}
.cube-face-top {
  background: hsla(240, 100%, 50%, 0.5);
}
.cube-face-bottom {
  background: hsla(300, 100%, 50%, 0.5);
}

.cube-face-front {
  transform: rotateY(0deg) translateZ(var(--cube--translate--z));
}
.cube-face-right {
  transform: rotateY(90deg) translateZ(var(--cube--translate--z));
}
.cube-face-back {
  transform: rotateY(180deg) translateZ(var(--cube--translate--z));
}
.cube-face-left {
  transform: rotateY(-90deg) translateZ(var(--cube--translate--z));
}
.cube-face-top {
  transform: rotateX(90deg) translateZ(var(--cube--translate--z));
}
.cube-face-bottom {
  transform: rotateX(-90deg) translateZ(var(--cube--translate--z));
}
</style>