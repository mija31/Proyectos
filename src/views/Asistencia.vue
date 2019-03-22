<template>
    <div>
        <v-card>
            <v-container>
                <asistencia-form
                        :asistencia="asistencia"
                        @store="save" />
            </v-container>
        </v-card>
        <br>
        <v-card>
            <v-container>
                <asistencia-table
                        :headers="headers"
                        :asistencias="asistencias" />
            </v-container>
        </v-card>
    </div>
</template>

<script>

    import {db} from './../firebase'
    import AsistenciaForm from './../components/AsistenciaForm'
    import AsistenciaTable, {eventBusAsistencia} from './../components/AsistenciaTable'

    export default {
        name: "asistencia",
        components:{
            AsistenciaForm,
            AsistenciaTable
        },
        data: () => ({
            asistencia: {
                firstname: '',
                lastname: '',
                email: '',
            },
            asistencias: [],
            headers: [
                {
                    text: 'Id',
                    text: 'Nombres',
                    text: 'Apellido',
                    text: 'Opción'
                },
            ]
        }),
        created(){
          this.show()
          eventBusAsistencia.$on('refesh-asistencia', this.show);
        },
        methods: {
            show() {
                let vm = this
                //vaciar la colecion asistencia
                this.asistencias = []
                console.log(db.collection('asistencia').get());
                db.collection('asistencia').get().then((querySnapshot) => {
                    let asistenciaArray = []
                    querySnapshot.forEach((doc) => {
                        let asist = doc.data()
                        asist.id = doc.id
                        vm.asistencias.push(asist)
                        //asistenciaArray.push(asist)
                        console.log(doc.id, ' => ', doc.data())
                    })
                    //this.asistencias = asistenciaArray
                })
            },
            save(){
                let vm = this;
                db.collection('asistencia').add({
                    firstname: vm.asistencia.firstname,
                    lastname: vm.asistencia.lastname,
                    email: vm.asistencia.email,
                });
                //this.push(this.asistencia)
                this.show()
                this.reset()
            },
            edit() {

            },
            destroy(){

            },
            reset(){
                this.asistencia.firstname=''
                this.asistencia.lastname=''
                this.asistencia.email=''
            }
        }
    }
</script>

<style scoped>

</style>