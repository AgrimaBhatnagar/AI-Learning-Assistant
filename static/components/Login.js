export default {
  template: `
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="mb-3 p-5 w-50 bg-light shadow rounded">
        <!-------- Welcome Text ------------->
        <form class="row g-3">
          <div class="col-12">
            <p class="font-raleway text-center fw-semibold fs-4">Welcome To StudyBuddy</p>
          </div>

          <!-------- Email Block ------------->
          <div class="col-10">
            <div class="mb-3 row">
              <label for="email" class="col-sm-2 col-form-label">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>
                </h3>
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  style="border-bottom: 1px solid grey"
                  placeholder="Email"
                  class="form-control-plaintext"
                  id="email"
                  v-model="cred.email"
                />
              </div>
            </div>
          </div>

          <!-------- Password Block ------------->
          <div class="col-10">
            <div class="mb-3 row">
              <label for="password" class="col-sm-2 col-form-label">
                <span class="material-symbols-outlined">lock</span>
              </label>
              <div class="col-sm-10">
                <input
                  type="password"
                  placeholder="Password"
                  style="border-bottom: 1px solid grey"
                  class="form-control-plaintext"
                  id="password"
                  v-model="cred.password"
                />
              </div>
            </div>
          </div>

          <!-------- Button Block ------------->
          <div class="col-12 text-center mt-3">
            <button
              type="submit"
              @click.prevent="login"
              class="btn btn-danger mb-3"
            >
              Log In
            </button>
          </div>

          <!-------- Forgot Password Link ------------->
          <div class="col-12 text-center">
            <button
              type="submit"
              @click.prevent="login"
              class="btn btn-link mb-3"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  data() {
    return {
      cred: {
        email: null,
        password: null,
      },
      error: null,
    };
  },
  methods: {
   async login() {
    const res= await fetch('/auth/login',{
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.cred),
      })
    if(res.ok){
        const data= await res.json()
        localStorage.setItem('auth-token', data.token)
        console.log(data)
        localStorage.setItem('role', data.user.role)
        this.$router.push({ path:`/dashboard/${data.user.id}/${data.user.full_name}`})
    }
    else{
        this.error=data.message
        console.log(data)
        console.log(this.error)
    }
},
  },
};