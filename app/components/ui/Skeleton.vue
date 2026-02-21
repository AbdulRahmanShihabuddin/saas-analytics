<!--
  Skeleton Loader Component
  
  Configurable placeholder for loading states.
  Props: width, height, rounded (circle/rect)
-->

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  circle?: boolean
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  circle: false
})
</script>

<template>
  <div 
    class="skeleton" 
    :style="{ 
      width, 
      height, 
      borderRadius: circle ? '50%' : undefined 
    }"
  />
</template>
