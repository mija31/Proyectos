<template>
    <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(cliente,c) in clientes"
          :key="c">
          <template v-slot:header >
            <div> 
                <h2>Titulo: {{cliente.titulo}}</h2>
                <p>Area: {{cliente.area}}</p>
            </div>
          </template>            
          <v-card>
            <v-card-text>
                  <h3>Descripcion:</h3>
                {{cliente.descripcion}}
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-text>
                  <h3>Respuesta:</h3>
                {{cliente.respuesta}}
            </v-card-text>
          </v-card>
            <!--opciones del usuario-->
            <div v-if="tipoUsuario.typeUser == 'u'" align="right">
                 <a href="#" @click.prevent="openEdit(cliente)" ><v-btn fab dark small color="primary"><v-icon dark>edit</v-icon></v-btn></a> 
                 <a href="#" @click.prevent="remove(cliente, tipoUsuario.typeUser)"><v-btn fab dark small color="pink"><v-icon dark>delete</v-icon></v-btn></a>
            </div>
             <!--opciones del soporte-->
            <div align="right" v-if="tipoUsuario.typeUser == 's'">
                <v-btn @click.prevent="remove(cliente, tipoUsuario.typeUser)" color="info">Borrar Pregunta</v-btn>
            </div>
            
            <div v-if="tipoUsuario.typeUser == 's'">
                <v-form v-model="valid">
                    <v-flex xs6 md6 >
                        <v-textarea solo
                            v-model="cliente.respuesta"
                            :counter="100"
                            label="Respuesta"
                            required></v-textarea>
                    </v-flex>
                    <v-flex xs6 md6>
                        <v-btn @click.prevent="saveRespuesta(cliente)" color="success">Responder</v-btn>
                        <!--v-btn @click.prevent="removeRespuesta(cliente)" color="error">Eliminar Respuesta</v-btn-->
                    </v-flex>
                </v-form>
            </div>
            <!--soporte-->
        </v-expansion-panel-content>


        <v-dialog
                v-model="dialog"
                width="500">
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                    Editar Notificacion
                </v-card-title>

                <v-card-text>
                    <cliente-form
                            :cliente="editCliente"
                            @storeUpdate="update"/>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-expansion-panel>
</template>

<script>

    import {db} from './../firebase'
    import Vue from 'vue'
    import ClienteForm from './../components/ClienteForm'
    //inicializacion de evento para realizar bass o listener para refrescar reactivamente
    export const eventBusCliente = new Vue();
    export const eventBusSoporte = new Vue();

    export default {
        name: "cliente-table",
        eventBusCliente,
        eventBusSoporte,
        components:{
            ClienteForm
        },
        data() {
          return{
              dialog: false,
              editCliente: {},
              }
        },
        props: {
            clientes:{
                type: Array
            },
            soportes:{
                type: Array
            },
            tipoUsuario:{
                type: Array
            },
            headers:{
                type:Array
            }
        },
        methods:{
            openEdit(cliente){
                this.dialog = true
                this.editCliente = cliente
            },
            update(){
                let vm = this
                db.collection("usuario").doc(this.editCliente.id).set({
                'titulo': vm.editCliente.titulo,
                'descripcion': vm.editCliente.descripcion,
                'area': vm.editCliente.area
                });
                //declaramos el evento buss para listener
                eventBusCliente.$emit('refesh-cliente');
                this.dialog = false
            },
            remove(cliente, typeUser){
                if (typeUser == 'u') {
                    let copyCliente = cliente
                    db.collection("usuario").doc(cliente.id).delete().then(function() {
                        eventBusCliente.$emit('refresh-borrado', copyCliente);
                    }).catch(function(error) {
                        console.log(error)
                    });
                }else{
                    let copyCliente = cliente
                    db.collection("usuario").doc(cliente.id).delete().then(function() {
                        eventBusSoporte.$emit('refresh-borrado', copyCliente);
                    }).catch(function(error) {
                        console.log(error)
                    });
                }
            },
            reset(){
                this.editCliente={}
                this.dialog = false
            },
            saveRespuesta(cliente){
                let vm = this
                this.editCliente = cliente
                db.collection("usuario").doc(this.editCliente.id).set({
                'titulo': vm.editCliente.titulo,
                'descripcion': vm.editCliente.descripcion,
                'area': vm.editCliente.area,
                'respuesta': vm.editCliente.respuesta,
                });
                vm.reset()
                //declaramos el evento buss para listener
                eventBusSoporte.$emit('refesh-soporte');
            },
            reset(){
                this.cliente.respuesta=''
            }
        }
    }
</script>
<style scoped>
</style>