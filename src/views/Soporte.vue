<template>
    <div>
        <!--<v-card>
            <v-container>
                <cliente-form
                        :cliente="cliente"
                        @storeUpdate="save" />
            </v-container>
        </v-card>-->
        <br>
        <v-card>
            <v-container>
                <cliente-table
                        :headers="headers"
                        :clientes="clientes"
                        :tipoUsuario="tipoUsuario"/>
            </v-container>

            <div align="center">
                <h3><p>Total de Notificaciones: {{total}}</p></h3>
            </div>
        </v-card>
        <v-snackbar
                v-model="notification.snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :multi-line="notification.mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="notification.timeout"
                :top="y === 'top'"
                :color="notification.color"
                :vertical="notification.mode === 'vertical'" >
            {{ notification.text }}
        </v-snackbar>
    </div>
</template>
<script>

    import {db} from './../firebase'
    import ClienteTable,  { eventBusSoporte } from './../components/ClienteTable'

    export default {
        name: "cliente",
        components:{
            ClienteTable
        },
        data: () => ({
            notification:{
                snackbar: false,
                //y: 'top',
                //x: null,
                mode: '',
                timeout: 3000,
                text: '',
                color:''
            },
            cliente: { 
                respuesta:'',
            },
            tipoUsuario:{
                typeUser:'s'
            },
            clientes: [],
            headers: [
                {
                    
                },
            ]
        }),
        created(){
          this.show()
          eventBusSoporte.$on('refresh-borrado', this.borrarSoporte);
          eventBusSoporte.$on('refesh-soporte', this.show);
          
        },
        computed:{
                total(){
                    let total =0;
                    total = parseInt(total) + parseInt(this.clientes.length);
                    return total
                }
        },
        methods: {
            borrarSoporte(copyCliente){
                let vm = this
                vm.notification.snackbar = true
                vm.notification.text = "Se elimino correctamente."
                vm.notification.color = "success"
                //console.log("Entro al borrado")
                //buscar el objeto
                let index = this.clientes.indexOf(copyCliente)
                //Borrar del arreglo el objeto
                this.clientes.splice(index, 1)
            },
            show() {
                let vm = this
                //vaciar la colecion asistencia
                this.clientes = []
                //console.log(db.collection('usuario').get());
                db.collection('usuario').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let asist = doc.data()
                        asist.id = doc.id
                        vm.clientes.push(asist)
                        //console.log(doc.id, ' => ', doc.data())
                    })
                })
            },
            edit() {
            },
            destroy(){
            }
        }
    }
</script>

<style scoped>

</style>