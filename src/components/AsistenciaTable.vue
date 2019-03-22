<template>
    <div class="text-xs-center">
        <!--<v-data-table :headers="headers" :items="asistencias" class="elevation-1">
            <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>
                    <a href="#">Edit</a>
                </td>
            </template>
        </v-data-table>-->

        <table width="100%">
            <tr>
                <td>ID</td>
                <td>NOMBRES</td>
                <td>APELLIDOS</td>
                <td>CORREO</td>
                <td>OPCIONES</td>
            </tr>

            <tr v-for="asistencia in asistencias">
                <td>{{ asistencia.id}}</td>
                <td>{{ asistencia.firstname}}</td>
                <td>{{ asistencia.lastname}}</td>
                <td>{{ asistencia.email}}</td>
                <td><a href="#" @click.prevent="openEdit(asistencia)" ><v-btn fab dark small color="primary"><v-icon dark>edit</v-icon></v-btn></a> <a href="#" @click.prevent="remove(asistencia.id)"><v-btn fab dark small color="pink"><v-icon dark>delete</v-icon></v-btn></a></td>

            </tr>
        </table>

        <v-dialog
                v-model="dialog"
                width="500">
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                    Editar Asistentes
                </v-card-title>

                <v-card-text>
                    <asistencia-form
                            :asistencia="editAsistencia"
                            @storeUpdate="update"/>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

    import AsistenciaForm from './../components/AsistenciaForm'
    import {db} from './../firebase'
    import Vue from 'vue'
    //inicializacion de evento para realizar bass o listener para refrescar reactivamente
    export const eventBusAsistencia = new Vue();

    export default {
        name: "asistencia-table",
        eventBusAsistencia,
        components:{
            AsistenciaForm
        },
        data() {
          return{
              dialog: false,
              editAsistencia: {},
              }
        },
        props: {
            asistencias:{
                type: Array
            },
            headers:{
                type:Array
            }
        },
        methods:{
            openEdit(asistencia){
                this.dialog = true
                this.editAsistencia = asistencia
            },
            update(){
                let vm = this
                db.collection("asistencia").doc(this.editAsistencia.id).set({
                'firstname': vm.editAsistencia.firstname,
                'lastname': vm.editAsistencia.lastname,
                'email': vm.editAsistencia.email
                });
                this.dialog = false
                //declaramos el evento buss para listener
                eventBusAsistencia.$emit('refesh-asistencia');
            },
            remove(id){
                db.collection("asistencia").doc(id).delete();
                eventBusAsistencia.$emit('refesh-asistencia');
            }
        }
    }
</script>

<style scoped>

</style>