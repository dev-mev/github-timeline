$(document).ready(function () {
  $(".form-inline").submit(function (event) {
    event.preventDefault();

    $(".timeline").empty();

    const username = event.target.elements["username"].value;

    $.get(`/api/users/${encodeURI(username)}`)
      .then((data) => {
        const repos = data.user.repositories.nodes;

        if (repos.length > 0) {
          $(".timeline").append(("<ul class='repo-list'>"));

          repos.forEach(element => {
            const d = new Date(element.createdAt);
            const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
            const month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
            const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  
            $(".repo-list").append(
              $("<li>").append(
                $("<div>").append(
                  $("<time>").text(`${month} ${day}, ${year}`),
                  $("<a>").attr("href", element.url).attr("target", "_blank").text(element.name),
                  $("<p>").text(element.description)
                )
              )
            )
          });
        } else {
          $(".timeline").append($("<p>This user has no public repos.</p>"));
        }

        // triggers makeLiVisible() which makes any li that's in the viewport visible
        $(window).scroll();
      })
      .catch(err => {
        if (err.status === 404) {
          $(".timeline").append($("<p>").text("Could not find user " + username));
        } else {
          $(".timeline").append($("<p>Something went wrong, please try again.</p>"));
        }
      })

      showTimeLine();
  });

  function showTimeLine() {
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= $(window).height() &&
        rect.right <= $(window).width()
      );
    }
  
    function makeLiVisible() {
      $(".timeline li").each((index, element) => {
        if (isElementInViewport(element)) {
          $(element).addClass("in-view");
        }
      });
    }

    // listen for events
    $(window).on("DOMContentLoaded load resize scroll", makeLiVisible);
  }
});
