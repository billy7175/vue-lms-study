<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            <slot name="column" :column="column">{{ column.label }}</slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index" @click="$emit('select', item)">
          <td v-for="column in columns" :key="column.key">
            <slot name="cell" :column="column" :item="item">
              {{ item[column.key] }} <!-- slot 대체 컨텐츠 -->
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
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
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.row.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.row.slice(startIndex, endIndex);
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
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

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 0 5px;
    }
  }
}
</style>
