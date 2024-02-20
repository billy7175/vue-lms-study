<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          <slot name="column" :column="column">{{ column.label }}</slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in row" :key="item.id" @click="$emit('select', item)">
        <td v-for="column in columns" :key="column.key">
          <slot name="cell" :column="column" :item="item">
            {{ item[column.key] }} <!-- slot 대체 컨텐츠 -->
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 6px;

  tr {
    border-bottom: 1px solid #dcd5d5;
  }

  th {
    text-align: left;
    background: #f3f4f6;
  }

  td {
    text-align: left;
    cursor: pointer;
  }


  td {
    padding: 8px;
  }

  th {
    padding: 8px;
  }


}
</style>


