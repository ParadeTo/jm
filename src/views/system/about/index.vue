<template>
  <div class="app-container">
    <tinymce v-model="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    Tinymce
  },

  data () {
    return {
      content: ''
    }
  }
}
</script>

