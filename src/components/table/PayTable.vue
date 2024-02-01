
<template>
  <div class="card p-fluid">
    <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id"
      @row-edit-save="onRowEditSave" :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          // bodycell: ({ state }) => ({
          //   style: state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem'
          // })
          // body: () => { }
        }
      }">
      <Column field="date" header="date" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column field="type" header="Type" style="width: 20%">
        <template #editor="{ data, field }">
          <Dropdown v-model="data[field]" :options="payStatuses" optionLabel="label" optionValue="value"></Dropdown>
        </template>
        <template #body="slotProps">
          <Tag v-if="slotProps.data.type" :value="payStatusLabel[slotProps.data.type]" severity="info"></Tag>
          <span v-else></span>
        </template>
      </Column>
      <Column field="inventoryStatus" header="Status" style="width: 30%">
        <template #editor="{ data, field }">
          <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value"
            placeholder="Select a Status">
            <template #option="slotProps">
              <Tag :value="slotProps.option.label" :severity="getStatusLabel(slotProps.option.value)" />
            </template>
          </Dropdown>
        </template>
        <template #body="slotProps">
          <Tag :value="statusLabel[slotProps.data.inventoryStatus]"
            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
        </template>
      </Column>
      <Column field="price" header="Price" style="width: 20%">
        <template #body="{ data, field }">
          {{ formatCurrency(data[field]) }}
        </template>
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
        </template>
      </Column>
      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
  </div>
</template>

<script>
import { ProductService } from '../../service/ProductService'
export default {
  data() {
    return {
      statusLabel: {
        complete: '완료',
        incomplete: '미납'
      },
      products: null,
      editingRows: [],
      statuses: [
        { label: '완료', value: 'complete' },
        { label: '미납', value: 'incomplete' },
      ],
      payStatuses: [
        { label: '카드', value: 'card' },
        { label: '현금 ', value: 'cash' }
      ],
      payStatusLabel: {
        card: '카드',
        cash: '현금'
      }
    };
  },
  mounted() {
    ProductService.getProductsMini().then((data) => (this.products = data));
  },
  methods: {
    onRowEditSave(event) {
      let { newData, index } = event;

      this.products[index] = newData;
    },
    getStatusLabel(status) {
      switch (status) {
        case 'complete':
          return 'success;'
        case 'incomplete':
          return 'danger'
        default:
          return null;
      }
    },
    formatCurrency(value) {
      // return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'krw' }).format(value);
    }
  }
};
</script>
