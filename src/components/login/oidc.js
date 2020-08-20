import axios from "axios";
import { defineComponent } from "../factory";
import { loginPages } from "./login-pages";

defineComponent("furet-ui-login-oidc", {
  template: `
    <div class="container has-text-centered">
        <furet-ui-page-errors v-bind:errors="errors" />
        <b-button 
          type="is-primary" 
          @click="logIn"
        >Connect with Gitlab</b-button>
    </div>
  `,
  prototype: {
    data() {
      return {
        errors: [],
      };
    },
    computed: {},
    methods: {
      logIn() {
        this.errors = [];
        axios
          .post("/furet-ui/oidc/login", {
            redirect: this.$route.query.redirect,
          })
          .then((result) => {
            document.location.href = result.data;
          })
          .catch((error) => {
            this.errors = [error];
          });
      },
    },
  },
});

loginPages.oidc = "furet-ui-login-oidc";
