<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in row" :key="item.id">
        <td v-for="column in columns" :key="column.key">{{ item[column.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    row: {
      type: Array,
      required: true,
    },
  },
};
</script>


