<template>
  <div>
    <h4 class="mb-4">
      <i class="far fa-edit mr-2"></i>Leave your comment
    </h4>
    <form @submit="handleSubmit">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group row">
            <label for="firstName" class="col-sm-4 col-form-label">First Name</label>
            <div class="col-sm-8">
              <input
                type="text"
                id="firstName"
                class="form-control"
                :class="{'is-invalid': formData.errors.firstName}"
                v-model="formData.firstName"
              >
              <div
                class="invalid-feedback"
                v-if="formData.errors.firstName"
              >{{formData.errors.firstName}}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group row">
            <label for="lastName" class="col-sm-4 col-form-label">Last Name</label>
            <div class="col-sm-8">
              <input
                type="text"
                id="lastName"
                class="form-control"
                :class="{'is-invalid': formData.errors.lastName}"
                v-model="formData.lastName"
              >
              <div
                class="invalid-feedback"
                v-if="formData.errors.lastName"
              >{{ formData.errors.lastName}}</div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group row">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input
                type="text"
                id="email"
                class="form-control"
                :class="{'is-invalid': formData.errors.email}"
                v-model="formData.email"
              >
              <div class="invalid-feedback" v-if="formData.errors.email">{{ formData.errors.email}}</div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="comment">Comment</label>
            <div>
              <textarea
                name="comment"
                id="comment"
                class="form-control"
                row="5"
                v-model="formData.comment"
                :class="{'is-invalid': formData.errors.comment}"
              ></textarea>
              <div
                class="invalid-feedback"
                v-if="formData.errors.comment"
              >{{ formData.errors.comment}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-primary" :disabled="isSubmitting">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { isEmptyStr, isValidEmail } from "../../utils/validate";

export default {
  props: ["postId"],
  data: () => {
    return {
      isSubmitting: false,
      formData: {
        errors: {
          firstName: null,
          lastName: null,
          email: null,
          comment: null
        },
        firstName: "",
        lastName: "",
        email: "",
        comment: "",
        touched: false
      }
    };
  },
  watch: {
    "formData.firstName": {
      handler: function(value) {
        if (!this.formData.touched) {
          return;
        }
        if (!isEmptyStr(value)) {
          this.formData.errors.firstName = null;
        } else {
          this.formData.errors.firstName = "First Name cannot be blank";
        }
      },
      deep: true
    },
    "formData.lastName": {
      handler: function(value) {
        if (!this.formData.touched) {
          return;
        }
        if (!isEmptyStr(value)) {
          this.formData.errors.lastName = null;
        } else {
          this.formData.errors.lastName = "Last Name cannot be blank";
        }
      },
      deep: true
    },
    "formData.comment": {
      handler: function(value) {
        if (!this.formData.touched) {
          return;
        }
        if (!isEmptyStr(value)) {
          this.formData.errors.comment = null;
        } else {
          this.formData.errors.comment = "Comment cannot be blank";
        }
      },
      deep: true
    },
    "formData.email": {
      handler: function(value) {
        if (!this.formData.touched) {
          return;
        }
        if (isEmptyStr(value)) {
          this.formData.errors.email = "Email cannot be blank";
        } else if (!isValidEmail(value)) {
          this.formData.errors.email = "Email is invalid";
        } else {
          this.formData.errors.email = null;
        }
      },
      deep: true
    }
  },
  methods: {
    validateForm() {
      let isValidForm = true;
      if (isEmptyStr(this.formData.email)) {
        this.formData.errors.email = "Email cannot be blank";
        isValidForm = false;
      } else if (!isValidEmail(this.formData.email)) {
        this.formData.errors.email = "Email is invalid";
        isValidForm = false;
      } else {
        this.formData.errors.email = null;
      }

      if (isEmptyStr(this.formData.firstName)) {
        this.formData.errors.firstName = "First Name cannot be blank";
        isValidForm = false;
      } else {
        this.formData.errors.firstName = null;
      }

      if (isEmptyStr(this.formData.lastName)) {
        this.formData.errors.lastName = "Last Name cannot be blank";
        isValidForm = false;
      } else {
        this.formData.errors.lastName = null;
      }

      if (isEmptyStr(this.formData.comment)) {
        this.formData.errors.comment = "Comment cannot be blank";
        isValidForm = false;
      } else {
        this.formData.errors.comment = null;
      }
      return isValidForm;
    },

    resetData() {
      this.formData.firstName = "";
      this.formData.lastName = "";
      this.formData.email = "";
      this.formData.comment = "";
      this.formData.touched = false;
    },

    async handleSubmit(e) {
      e.preventDefault();
      if (!this.formData.touched) {
        this.formData.touched = true;
      }
      if (!this.validateForm()) {
        return;
      }
      this.isSubmitting = true;
      const data = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        content: this.formData.comment,
        postId: this.postId
      };
      await this.createComment({ data });
      this.resetData();
      this.isSubmitting = false;
    },
    ...mapActions({
      createComment: "createComment"
    })
  }
};
</script>

<style scoped>
.col-form-label {
  font-size: 15px;
}
</style>
