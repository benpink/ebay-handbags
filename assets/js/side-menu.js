(function () {
    $('.menu-btn, .sidebar h2').click(function() {
      $('body').toggleClass('sidebar-visible');
      window.scrollTo(0,0);
    });
})();
