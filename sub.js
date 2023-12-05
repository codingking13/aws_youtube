document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.word-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const word = link.innerText;
      window.location.href = `/sub?word=${encodeURIComponent(word)}`;
    });
  });
});