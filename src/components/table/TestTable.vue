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
              {{ item[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span v-for="page in visiblePages" :key="page">
        <button @click="selectPage(page)" :class="{ 'selected': currentPage === page }">{{ page }}</button>
      </span>
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
    maxVisiblePages: {
      type: Number,
      default: 5,
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
    visiblePages() {
      const totalVisiblePages = Math.min(this.totalPages, this.maxVisiblePages);
      const pages = [];

      if (this.currentPage <= totalVisiblePages - 2) {
        // Display pages from the beginning
        for (let i = 1; i <= totalVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - totalVisiblePages + 3) {
        // Display pages near the end
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - totalVisiblePages + 2; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Display pages around the current page
        pages.push(1);
        if (this.currentPage > 3) {
          pages.push('...');
        }
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        if (this.currentPage < this.totalPages - 2) {
          pages.push('...');
        }
        pages.push(this.totalPages);
      }

      return pages;
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
    selectPage(page) {
      if (page !== '...') {
        this.currentPage = page;
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
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .selected {
    font-weight: bold;
    color: #333;
  }
}
</style>