$(document).ready(function () {
  $(".form-inline").submit(function (event) {
    event.preventDefault();

    $(".timeline").empty();

    const username = encodeURI(event.target.elements["username"].value);

    $.get("/api/users/" + username)
      .then(function (data) {
        const repos = data.user;
        $(".timeline").append(("<ul class='repo-list'>"));

        repos.repositories.nodes.forEach(element => {
          const d = new Date(element.createdAt);
          const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
          const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
          const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

          $(".repo-list").append(
            $("<li>").append(
              $("<div>").append(
                $("<time>").text(`${month} ${day}, ${year}`),
                $(`<a href="${element.url}">`).text(element.name),
                $("<p>").text(element.description)
              )
            )
          )
        });
      });

      createTimeLine();
  });

  function createTimeLine() {
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= $(window).height() &&
        rect.right <= $(window).width()
      );
    }
  
    function callbackFunc() {
      $(".timeline li").each((index, element) => {
        if (isElementInViewport(element)) {
          $(element).addClass("in-view");
        }
      });
    }

    // listen for events
    $(window).on('DOMContentLoaded load resize scroll', callbackFunc);
  }
});
