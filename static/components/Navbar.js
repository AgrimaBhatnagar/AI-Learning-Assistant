export default{
    template: `
    <div>

<!------horizontal navbar------>

    <nav class="navbar bg-body-tertiary" style="background-color: blue">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"> <img src="/static/components/images/book6.png" alt="Book"> StudyBuddy</a>
    <div class="d-flex">
      <h5 class="me-2 p-2"> STUDENT NAME </h5>
      <button class="btn btn-danger" type="submit">Log Out</button>
    </div>
  </div>
</nav>

<!------vertical navbar--->

<nav id="navbar-example3" style="width:13rem; height: 100vh;" class="navbar navbar-light bg-light flex-column align-items-stretch p-3">
  <a class="navbar-brand text-centre" href="#">My Dashboard</a>
</nav>


</div>
`
}