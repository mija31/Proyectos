<template>
    <v-form v-model="valid">
        <v-layout>
            <v-flex xs12 md4>
                <v-text-field
                        v-model="asistencia.firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="First name"
                        required></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        v-model="asistencia.lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Last name"
                        required></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
                <v-text-field
                        @keyup.enter="presionarEnter"
                        v-model="asistencia.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-btn @click.prevent="saveChildren" color="success">Guardar</v-btn>
    </v-form>
</template>

<script>
    export default {
        name: "asistencia-form",
        props: [
            'asistencia'
        ],
        data: () => ({
            //datosParaEnviar:''
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }),
        methods:{
            saveChildren(){
                this.$emit('store', /*this.datosParaEnviar*/)
            },
             presionarEnter(){
                alert('presiono enter');
            }
        }
    }
</script>

<style scoped>

</style>