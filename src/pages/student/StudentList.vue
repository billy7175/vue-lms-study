<template>
  <div>
    <Table :data="userList" />
  </div>
</template>


<script>
import { io } from "socket.io-client";
import Table from "../../components/table/Table.vue";
import { onMounted } from "vue";
import { getUsers } from "../../apis/user";
import { ref } from "vue";
export default {
  components: {
    Table,
  },
  setup() {
    const userList = ref([]);
    onMounted(async () => {
      const { data } = await getUsers();
      const setUsers = (list = []) => {
        if (!list.length) return [];
        return list?.map((x) => {
          return {
            ...x,
            isActive: false,
          };
        });
      };
      userList.value = setUsers(data);

      const socket = io("http://127.0.0.1:3000", {
        transports: ["websocket"],
      });

      socket.emit(
        "userlist",
        [123123123],
        () => {
          console.log(44);
        },
        (res) => {
          console.log(55555, res);
        }
      );

      socket.on("userlist", (res) => {
        console.log(1231312, res);
        userList.value = userList.value.map(x => {
          return {
            ...x,
            isActive: res.find(r => r.name === x.name)
          }
        })
      });
    });
    return {
      userList: userList,
    };
  },
};
</script>