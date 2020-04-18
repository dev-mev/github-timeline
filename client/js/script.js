$(document).ready(function () {
  $(".form-inline").submit(function (event) {
    event.preventDefault();

    const username = encodeURI(event.target.elements["username"].value);

    $.get("/api/users/" + username)
      .then(function (data) {
        $(".timeline").text(data);
      });
  });
});
