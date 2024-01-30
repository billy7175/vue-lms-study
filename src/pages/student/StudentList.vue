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
    const socket = io("http://127.0.0.1:3000", {
      transports: ["websocket"],
    });


    console.log('#student list app',  socket)
    const userList = ref([]);


    const setUsers = (list = []) => {
      if (!list.length) return [];
      return list?.map((x) => {
        return {
          ...x,
          isActive: false,
        };
      });
    };

    const fetchUsers = async () => {
      const { data } = await getUsers();
      userList.value = setUsers(data);
    }

    const updateUsers = async (res) => {
      console.log(1231312, res);
      userList.value = userList.value.map((x) => {
        return {
          ...x,
          isActive: !!res.find((r) => r.name === x.name),
        };
      });
    }

    onMounted(async () => {
      await fetchUsers()
      socket.emit(
        "userlist",
        'test value',
        () => {
          console.log(44);
        },
        (res) => {
          console.log(423423423, res)
          updateUsers(res)
        }
      );


      socket.on("userlist", (res) => {
        console.log('socket on studentlist')
        console.log(1231312, res);
        updateUsers(res)
      });


    });


    // socket.on('userlist', () => {
    //     console.log('나 보여 ????? student-list')
    //   })




    return {
      userList: userList,
    };
  },
};
</script>