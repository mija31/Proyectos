<template>
    <v-form v-model="valid">
        <v-layout row wrap>
            
                <v-flex xs6 md6>
                    <v-text-field
                            v-model="cliente.titulo"
                            :counter="10"
                            label="Titulo"
                            required></v-text-field>
                </v-flex>
                <v-flex xs6 md6>
                    <v-text-field
                            v-model="cliente.area"
                            :counter="10"
                            label="Area"
                            required></v-text-field>
                </v-flex>
                <v-flex xs6 md6>
                    <v-textarea solo
                        v-model="cliente.descripcion"
                        :counter="100"
                        label="Descripcion"
                        required></v-textarea>             
                </v-flex>
        </v-layout>
        <v-btn @click.prevent="saveChildren" color="success">Enviar</v-btn>
    </v-form>
</template>

<script>
    export default {
        name: "cliente-form",
        props: [
            'cliente'
        ],
        data: () => ({
            //datosParaEnviar:''
            valid: true,
            formCliente: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            descriptionRules: [
                v => !!v || 'Descripcion is required',
                v => v.length <= 100 || 'Name must be less than 100 characters'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }),
        methods:{
            saveChildren(){
                this.$emit('storeUpdate', /*this.datosParaEnviar*/)
            },
             presionarEnter(){
                alert('presiono enter');
            }
        }
    }
</script>

<style scoped>

</style>