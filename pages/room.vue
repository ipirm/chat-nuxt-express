<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8>
            <v-card min-width="400">
                <v-card-title>
                    <h1>Добро пожаловать {{ user.name }}</h1>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="room" :rules="roomRules" label="Введите комнату" required></v-text-field>
                        <v-btn :disabled="!valid" color="primary" @click="submit">Войти</v-btn>
                        <v-btn color="secondary" @click.prevent.stop="dialog = true">Укажите когда вы будете онлайн
                        </v-btn>
                        <v-row justify="center">
                            <v-dialog v-model="dialog" persistent max-width="600px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Укажите когда вы будете онлайн</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="onlineText"
                                                                  label="Укажите время когда будете онлайн *"
                                                                  required></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <small>* Указывает на обязательные поля</small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                        <v-btn color="blue darken-1" text @click="changeOnline">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapMutations, mapActions} from "vuex";

    export default {
        layout: "empty",
        head: {
            title: "Vekil Chat"
        },
        sockets: {
            connect: function () {
                console.log("socket connected");
            }
        },
        data: () => ({
            valid: true,
            dialog: false,
            name: "",
            onlineText: '',
            room: "",
            roomRules: [v => !!v || "Введите комнату"]
        }),
        methods: {
            ...mapMutations(["setUser"]),
            ...mapActions('users', ["chacngeOnline"]),
            changeOnline() {
                let body = {
                    id: this.$auth.user.id,
                    text: this.onlineText
                }
                this.chacngeOnline(body).then(() => {
                    this.dialog = !this.dialog;
                    this.$toast.success('Выбранная вами дата указана')
                });

            },
            submit() {
                if (this.$refs.form.validate()) {
                    const user = {
                        name: this.user.name,
                        room: this.room
                    };

                    this.$socket.emit("userJoined", user, data => {
                        if (typeof data === "string") {
                        } else {
                            user.id = data.userId;
                            this.setUser(user);
                            this.$router.push("/chat");
                        }
                    });
                }
            }
        }
    };
</script>
