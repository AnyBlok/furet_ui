import axios from "axios";
import { defineComponent } from "../factory";
import { loginPages } from "./login-pages";

defineComponent("furet-ui-login-password", {
  template: `
    <div class="container has-text-centered">
      <form v-on:submit="logIn">
         <furet-ui-page-errors v-bind:errors="errors" />
         <b-field v-bind:label="$t('components.login.username')">
           <b-input v-model="username" expanded></b-input>
         </b-field>
         <b-field v-bind:label="$t('components.login.password')">
           <b-input v-model="password" type="password" expanded password-reveal></b-input>
         </b-field>
         <br />
         <div class="buttons">
           <b-button 
             type="is-primary" 
             native-type="submit" 
             expanded
             v-bind:disabled="is_not_clickable"
           >
           {{ $t('components.login.button') }}
           </b-button>
         </div>
      </form>
    </div>
  `,
  prototype: {
    data() {
      return {
        username: "",
        password: "",
        errors: [],
      };
    },
    computed: {
      is_not_clickable() {
        if (!this.username) return true;
        if (!this.password) return true;
        return false;
      },
    },
    methods: {
      logIn() {
        if (this.is_not_clickable) return;
        this.errors = [];
        axios
          .post("/furet-ui/login", {
            login: this.username,
            password: this.password,
            redirect: this.$route.query.redirect,
          })
          .then((result) => {
            this.$dispatchAll(result.data);
          })
          .catch((error) => {
            this.errors = [error];
          });
      },
    },
  },
});

loginPages.password = "furet-ui-login-password";
