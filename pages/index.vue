<template>
    <v-app app dark>
        <v-navigation-drawer app  mobile-break-point="650">
            <v-list subheader>
                <v-subheader>Cписок всех пользователей</v-subheader>
                <v-list-tile v-for="u in usersApi" :key="u.id" @click.prevent>
                    <v-list-tile-content>
                        <v-list-tile-title style="display: flex;justify-content: space-between">
                            <span>  {{ u.name }} </span>
                            <span>  {{ u.when }} </span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app>
            <v-toolbar-title>Добро пожаловать в чат Vekil </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-layout column justify-center align-center>
                    <v-card min-width="400">
                        <v-card-title>
                            <h1>Vekil  чат</h1>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="addUser">
                                <v-text-field v-model="userForm.email" :counter="50" :rules="nameRules" label="Ваше мейл" required></v-text-field>
                                <v-text-field type="password" v-model="userForm.password" :rules="roomRules" label="Введите пароль" required></v-text-field>
                                <v-btn :disabled="!valid" color="primary" type="submit">Войти</v-btn>
                                {{ error}}
                            </v-form>
                        </v-card-text>
                    </v-card>
            </v-layout>
        </v-content>
    </v-app>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        // middleware: 'check',
        data: () => ({
            valid: true,
            error: '',
            userForm: {
                email: '',
                password: ''
            },
            nameRules: [
                v => (v && v.length <= 50) || "Мейл не должен превышать 16 символов"
            ],
            room: "",
            roomRules: [v => !!v || "Введите пароль"]
        }),
        async fetch({store}) {
            await store.dispatch('users/getUsers');
        },
        methods: {
            async addUser() {
                await this.$auth.login({
                    data: this.userForm
                })
                    .then(response => {
                        this.$router.push('/room');
                    })
                    .catch(e => {
                        this.error = e.response.data.error;
                    })
            },
        },
        computed:{
            ...mapState('users', ['usersApi'])
        }
    }
</script>

<style scoped>

</style>
