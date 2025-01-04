<template>
  <time :datetime="isoDate" :class="className">{{ formattedDate }}</time>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date'

interface Props {
  date: string | Date
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: 'text-sm text-gray-500'
})

const formattedDate = computed(() => formatDate(props.date))
const isoDate = computed(() => new Date(props.date).toISOString())
</script>