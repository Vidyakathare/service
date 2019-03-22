// $(".navbar a").on("click", function(e) {
//   // console.log(this.hash);
//   if (this.hash !== "") {
//     e.preventDefault();
//     const hash = this.hash;
//     $("html", "body").animate(
//       {
//         scrollTop: $(hash).offset().top
//       },
//       500
//     );
//   }
// });
const scroll = new SmoothScroll('.navbar a[href*="#"]', {
  speed: 1200
});

if ("serviceWorker" in navigator) {
  // console.log("Service Worker Supported");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_site.js")
      .then(reg => console.log("Service worker: Registered"))
      .catch(err => console.log(`Service worker: Error: ${err}`));
  });
}
