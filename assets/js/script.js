$(function() {
  $('.countdown').countdown({
    date: "May 31, 2017 23:59:59"
  });

  $(".skype-link").hover(function () {
      $(".skype").toggleClass("skype-visible");
  });
});

function openNav() {
  $(".trigger-content").addClass("trigger-width");
  document.getElementById("trigger").style.display = "none";
}

function closeNav() {
  $(".trigger-content").removeClass("trigger-width");
  document.getElementById("trigger").style.display = "block";
}
