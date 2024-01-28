<template>
  <div>
    <pre>
      {{ data }}
    </pre>
    <DataTable
      selectionMode="single"
      @rowSelect="(row) => routeTo('student-detail', row.data)"
      filterDisplay="menu"
      :value="data"
      tableStyle="min-width: 50rem"
      size="Normal"
    >
      <template #header>
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
          "
        >
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <Column field="name" header="name" style="width: 250px">
        <template #body="slotProps">
          <div style="display: flex; align-items: center">
            <Avatar
              image="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png"
              class="flex align-items-center justify-content-center mr-2"
              size="large"
              shape="circle"
            />
            <span>{{ slotProps.data.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="isActive" header="Active" style="width: 200px">
        <template #body="slotProps">
          <div style="display: flex">
            <span class="tag-wrapper is-active" v-if="slotProps.data.isActive">
              <span class="tag is-active"></span>
              <span class="tag-text">Active</span>
            </span>
            <span v-else class="tag-wrapper is-inactive">
              <span class="tag is-not-active"></span>
              <span class="tag-text">In-Active</span>
            </span>
          </div>
        </template>
      </Column>
      <Column field="isTeacher" header="Role">
        <template #body="slotProps">
          {{ slotProps.data.role === 'teacher' ? 'Teacher' : 'Student'}}
        </template>
      </Column>
      <Column field="class" header="Class">
        <template #body="slotProps">
          {{slotProps.data.class.label}}
        </template>
      </Column>
      <Column field="email" header="Email"></Column>
      <Column field="isPremium" header="Premium">
        <template #body="slotProps">
          <div> 
            <i
              v-if="slotProps.data.isPremium"
              class="pi pi-check-circle"
              style="color: #4daa57; font-weight: 900; font-size: 20px"
            ></i>
            <i
              v-else
              class="pi pi-ban"
              style="color: #777; font-weight: 900; font-size: 20px"
            ></i>
          </div>
        </template>
      
      </Column>
      <Column field="isPaid" header="Paid">
        <template #body="slotProps">
          <div>
            <i
              v-if="slotProps.data.isPaid"
              class="pi pi-check-circle"
              style="color: #4daa57; font-weight: 900; font-size: 20px"
            ></i>
            <i
              v-else
              class="pi pi-ban"
              style="color: #777; font-weight: 900; font-size: 20px"
            ></i>
          </div>
        </template>
      </Column>
      <Column field="isLocked" header="Locked">
        <template #body="slotProps">
          <div>
            <i v-if="slotProps.data.isActive" class="pi pi-lock"></i>
            <i v-else class="pi pi-lock-open"></i>
          </div>
        </template>
      </Column>
      <Column field="date" header="Registered Date">
        <template #body="slotProps">
          <div v-if="slotProps.data.createdAt">
            {{ dayjs(slotProps.data.createdAt).format('YYYY-MM-DD')}}
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>


<script>
import dayjs from 'dayjs'
import { useRouter } from "vue-router";
export default {
  props: {
    data : {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const router = useRouter();
    const routeTo = (routerName, row) => {
      console.log("#routeName", routerName);
      console.log(row.id);
      const userId = row.id
      
      router.push({
        name: routerName,
        params: {
            id: userId
        }
        
      });
    };

    const handleRowSelect = () => {
      alert("alerttt");
    };

    return {
      routeTo,
      handleRowSelect,
      dayjs
    };
  },
};
</script>

<style scoped>
.tag-wrapper {
  display: inline-block;
  display: flex;
  align-items: center;
  background: #daf2dd;
  color: #4daa57;
  padding: 8px 12px;
  border-radius: 10px;
}

.tag-wrapper.is-inactive {
  background: #f6b3b3;
}
.tag-wrapper.is-inactive .tag-text {
  color: #dc504f;
}
.tag.is-active {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  background: #4daa57;
  border-radius: 50%;
  position: relative;
}

.tag.is-active::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: circle-pulse 1.5s infinite;
  box-shadow: 0 0 0 0 #4daa57;
}

.tag.is-not-active {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  background: #dc504f;
  border-radius: 50%;
}

@keyframes circle-pulse {
  0% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
    -webkit-box-shadow: 0 0 0 0 rgba(77, 170, 87, 0.9);
    box-shadow: 0 0 0 0 rgba(77, 170, 87, 0.9);
  }

  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-box-shadow: 0 0 0 8px rgba(77, 170, 87, 0);
    box-shadow: 0 0 0 8px rgba(77, 170, 87, 0);
  }

  100% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
    -webkit-box-shadow: 0 0 0 0 rgba(77, 170, 87, 0);
    box-shadow: 0 0 0 0 rgba(77, 170, 87, 0);
  }
}
</style>