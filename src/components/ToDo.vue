<script setup>
import { ref } from 'vue'

</script>


<template>
<section class="vh-100 gradient-custom-2">
    <Modal v-show="isModalVisible">
        <form>
            <div class="form-group">
              <label for="task-ava" style="margin-bottom: 10px">Avatar</label>
              <div style="display: flex">
                <div>
                  <input v-model="model.ava" type="radio" id="ava1-bg" value="ava1-bg" name="task-ava" checked>  
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                         alt="avatar 1" style="width: 40px; height: auto;">                   
                </div>
                <div>
                  <input v-model="model.ava" type="radio" id="ava2-bg" value="ava2-bg"  name="task-ava">  
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                         alt="avatar 2" style="width: 40px; height: auto;">                 
                </div>
                <div>
                  <input v-model="model.ava" type="radio" id="ava3-bg" value="ava3-bg"  name="task-ava">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                         alt="avatar 3" style="width: 40px; height: auto;">                   
                </div>
                <div>
                  <input v-model="model.ava" type="radio" id="ava4-bg" value="ava4-bg"  name="task-ava">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                         alt="avatar 4" style="width: 40px; height: auto;">                   
                </div>
                <div>
                  <input v-model="model.ava" type="radio" id="ava5-bg" value="ava5-bg"  name="task-ava">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                         alt="avatar 5" style="width: 40px; height: auto;">                   
                </div>
              </div>
            </div>
            <div class="form-group" style="margin-top: 10px">
                <label for="task-name">Team name</label>
                <input v-model="model.name" type="text" class="form-control" id="task-name"
                    aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="task-title">Task title</label>
                <input v-model="model.title" type="text" class="form-control" id="task-title"
                    aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="task-type">Severity</label><br>
                <select name="task-type" id="task-type" class="form-control" v-model="model.type">
                    <option value="High">High priority</option>
                    <option value="Middle">Middle priority</option>
                    <option value="Low">Low priority</option>
                </select>
            </div>
            <div>
                <button type="submit" class="bi bi-plus submit-btn" @click.prevent="submit" :disabled="!isValid">Submit</button>
                <button class="bi bi-plus close-btn" @click.prevent="closeModal">Close Modal</button>
            </div>
        </form>
    </Modal>
    <div class="container py-5 h-100 m-60">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-12 col-xl-10">
                <div class="card mask-custom">
                    <div class="card-body p-4 text-white">
                        <div class="text-center pt-3 pb-2">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                 alt="Check" width="60">
                            <h2 class="my-4">Task List</h2>
                        </div>

                        <table class="table text-white mb-0">
                            <thead>
                            <tr>
                                <th scope="col">Team Member</th>
                                <th scope="col">Task</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                              <tr v-for="(item, index) in finalTaskList" class="fw-normal">
                                  <th>
                                      <img :src='"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/" + item.ava + ".webp"'
                                           alt="chosen avatar" style="width: 45px; height: auto;">
                                      <span class="ms-2">{{item.name}}</span>
                                  </th>
                                  <td class="align-middle">{{item.title}}</td>
                                  <td class="align-middle">
                                      <h6 class="mb-0"><span class="badge" :class="item.type">{{item.type}}</span></h6>
                                  </td>
                                  <td class="align-middle">
                                      <a v-if="!item.completed" href="#!" data-mdb-toggle="tooltip" title="Done" @click="completedTask(index)"><i
                                              class="bi bi-check-lg me-3"></i></a>
                                      <a href="#!" data-mdb-toggle="tooltip" title="Remove" @click="deleteTask(index)"><i
                                              class="bi bi-trash"></i></a>
                                 </td>
                              </tr>
                                                
                            </tbody>
                            
                        </table>
                        <button type="submit" @click="showModal"><i class="bi bi-plus"></i>Add record</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>


<script>
import {Task} from '../models/tasks.js';
import Modal from './Modal.vue';

export default {
    name: "ToDo",
    props: {},
    components: {
      Modal,
    },
    data: () => {
      return {
        model: new Task(),
        taskList: [],
        isModalVisible: false,
      }
    },

    methods: {
      submit() {
        this.taskList.push(this.model);
        this.model = new Task();
        this.isModalVisible = false;
      },

      showModal() {
        this.isModalVisible = true;
      },

      closeModal() {
        this.isModalVisible = false;
      },

      deleteTask(index) {
        if (index >= 0 && index < this.taskList.length) {
            this.taskList.splice(index, 1); // Remove the task at the specified index
        }
      },

      completedTask(index) {
        if (index >= 0 && index < this.taskList.length) {
            const task = this.taskList[index];
            task.completed = !task.completed; // Toggle the completed property

            // Change the badge class based on completion status
            if (task.completed) {
                task.type = 'Completed';
            }
        }
      },
    },

    watch: {
      message() {
        console.log("Message changed");
      }
    },
    computed: {
      messageLength() {
        return ("" + this.message).length;
      },
      isValid() {
        return this.model.ava && this.model.name && this.model.title && this.model.type;
      },
      
      finalTaskList() {
        return this.taskList.filter((item) => {
          return true; // Filter tasks based on priority
        });
      }
    }
  }

</script>

<style scoped>
 .gradient-custom-2 {
    /* fallback for old browsers */
    background: #7e40f6;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(
       to right,
      rgba(126, 64, 246, 1),
      rgba(80, 139, 252, 1)
    );

            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(
       to right,
      rgba(126, 64, 246, 1),
      rgba(80, 139, 252, 1)
    ); 
    overflow-y: scroll;
  }

  .mask-custom {
    background: rgba(24, 24, 16, 0.2);
    border-radius: 2em;
    backdrop-filter: blur(25px);
    border: 2px solid rgba(255, 255, 255, 0.05);
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
  }

  .submit-btn{
    background-color: #77B5F3;
    color: white;
  }

  .close-btn{
    background-color: rgb(200,200,200);
    margin-left: 10px;
    color: white;
  }
  
  .m-60{
    margin-bottom: 60px;
  }

  .High{
    background-color: #dc3545;
  }

  .Middle{
    background-color: #ffc107;
  }

  .Low{
    background-color: #198754;
  }

  .completed{
    background-color: #3971D4;
  }

</style>
