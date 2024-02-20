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
import { ref, computed } from 'vue';

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
  setup(props, { emit }) {
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(props.row.length / props.pageSize);
    });

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * props.pageSize;
      const endIndex = startIndex + props.pageSize;
      return props.row.slice(startIndex, endIndex);
    });

    const visiblePages = computed(() => {
      const totalVisiblePages = Math.min(totalPages.value, props.maxVisiblePages);
      const pages = [];

      if (currentPage.value <= totalVisiblePages - 2) {
        // Display pages from the beginning
        for (let i = 1; i <= totalVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages.value);
      } else if (currentPage.value >= totalPages.value - totalVisiblePages + 3) {
        // Display pages near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages.value - totalVisiblePages + 2; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        // Display pages around the current page
        pages.push(1);
        if (currentPage.value > 3) {
          pages.push('...');
        }
        for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
          pages.push(i);
        }
        if (currentPage.value < totalPages.value - 2) {
          pages.push('...');
        }
        pages.push(totalPages.value);
      }

      return pages;
    });

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const selectPage = (page) => {
      if (page !== '...') {
        currentPage.value = page;
      }
    };

    return {
      currentPage,
      totalPages,
      paginatedData,
      visiblePages,
      previousPage,
      nextPage,
      selectPage,
    };
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