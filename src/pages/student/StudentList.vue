<template>
  <div>
    <button @click="handleClick">make it in-active</button>
    <Table :data="userList" />
  </div>
</template>


<script>
import Table from "../../components/table/Table.vue";
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { getUsers } from "../../apis/user";
import { ref } from "vue";
import { useSocketState } from '../../stores/socket.js'
import useSocketIO from "../../socket";
export default {
  components: {
    Table,
  },
  setup() {
    const socketState = useSocketState()
    const { gUsers } = storeToRefs(socketState)
    const { socket } = useSocketIO()

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


    socket.on('userlist', (res) => {
      console.log('#Student app', res)
      socketState.setUsers(res)
    })




    const updateUsers = async (res) => {
      console.log(1231312, res);
      userList.value = userList.value.map((x) => {
        return {
          ...x,
          isActive: !!res.find((r) => (r.name === x.name && !!r.isActive)),
        };
      });
    }

    onMounted(async () => {
      await fetchUsers()
    });

    const cUsers = computed(() => {
      updateUsers(gUsers.value)
      return userList.value
    })


    const handleClick = () => {
      console.log('#handleClick')
      socket.emit('activate-user', false)
    }

    return {
      userList: cUsers,
      handleClick
    };
  },
};
</script>