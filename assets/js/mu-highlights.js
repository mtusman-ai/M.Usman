/* Profile highlights — JS-rendered infographic for the al-folio about page.
   Vanilla JS, no build step. Themed via al-folio CSS variables (light/dark aware).
   Content traces to 00-Profile/Master-Profile.md. A static <noscript> fallback in
   about.md carries the same content for crawlers / JS-off. */
(function () {
  "use strict";

  var mount = document.getElementById("mu-highlights");
  if (!mount) return;

  var STATS = [
    { to: 18, prefix: "", suffix: "+", label: "years leading data &amp; analytics" },
    { to: 3, prefix: "AED ", suffix: "B+", label: "portfolio managed (BI &amp; MDM)" },
    { to: 33, prefix: "", suffix: "", label: "algorithms in the REACH scheduler" },
    { to: 4, prefix: "", suffix: "", label: "CI-green ML repositories" }
  ];

  var PILLARS = [
    {
      title: "Data Engineering &amp; Architecture",
      sub: "18+ years · enterprise data delivery",
      items: [
        { icon: "fa-chart-line", text: "<b>AED 3B+</b> portfolio at <b>~21% CAGR</b> over 7 years (IFFCO)" },
        { icon: "fa-chart-pie", text: "Enterprise <b>BI architecture</b> on Tableau &amp; QlikView, end to end" },
        { icon: "fa-database", text: "<b>Oracle &amp; SAP</b> ERP data programmes (Fujitsu &amp; IBM as SIs)" },
        { icon: "fa-sitemap", text: "<b>Master Data Management</b> &amp; data-nomenclature standards" },
        { icon: "fa-server", text: "<b>MLOps</b>: two containerised FastAPI / Docker model services with CI" }
      ]
    },
    {
      title: "Data Science &amp; AI Research",
      sub: "PhD Computer Science · University of Huddersfield",
      items: [
        { icon: "fa-microchip", text: "<b>REACH</b>: real-time, failure-aware scheduler for heterogeneous CPU+GPU+FPGA cloud (<b>33 algorithms</b>)" },
        { icon: "fa-brain", text: "<b>Failure predictor</b> (REACH-FP): deep-learning task-failure model" },
        { icon: "fa-circle-nodes", text: "<b>Knowledge graphs</b>: NLP entity extraction; healthcare KG seminar" },
        { icon: "fa-share-nodes", text: "<b>Semantic Web</b>: OWL ontology engineering (MSc, Distinction)" },
        { icon: "fa-file-lines", text: "<b>Journal</b> under review (IEEE Access) + <b>Springer chapter</b> forthcoming" }
      ]
    }
  ];

  // Styles — al-folio CSS variables so light/dark both work; fallbacks for safety.
  var css = [
    "#mu-highlights{margin:1.6rem 0 2.2rem;}",
    "#mu-highlights .mu-hl-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-bottom:1.1rem;}",
    "#mu-highlights .mu-hl-stat{text-align:center;padding:.75rem .4rem;border-radius:12px;background:var(--global-card-bg-color,#fff);border:1px solid var(--global-divider-color,rgba(0,0,0,0.1));opacity:0;transform:translateY(12px);transition:opacity .5s ease,transform .5s ease;}",
    "#mu-highlights.in .mu-hl-stat{opacity:1;transform:none;}",
    "#mu-highlights .mu-hl-stat:nth-child(2){transition-delay:.07s;}",
    "#mu-highlights .mu-hl-stat:nth-child(3){transition-delay:.14s;}",
    "#mu-highlights .mu-hl-stat:nth-child(4){transition-delay:.21s;}",
    "#mu-highlights .mu-hl-num{font-size:1.7rem;font-weight:800;line-height:1;color:#1b998b;}",
    "#mu-highlights .mu-hl-cap{display:block;font-size:.72rem;margin-top:.35rem;opacity:.75;line-height:1.25;}",
    "#mu-highlights .mu-hl-cards{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}",
    "#mu-highlights .mu-hl-card{background:var(--global-card-bg-color,#fff);border:1px solid var(--global-divider-color,rgba(0,0,0,0.1));border-radius:12px;padding:1rem 1.2rem;opacity:0;transform:translateY(16px);transition:opacity .55s ease,transform .55s ease,box-shadow .25s ease;}",
    "#mu-highlights.in .mu-hl-card{opacity:1;transform:none;}",
    "#mu-highlights .mu-hl-card:nth-child(2){transition-delay:.12s;}",
    "#mu-highlights .mu-hl-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.10);}",
    "#mu-highlights .mu-hl-card h4{margin:0;font-size:1.05rem;font-weight:700;color:var(--global-theme-color,#2a6f97);}",
    "#mu-highlights .mu-hl-sub{display:block;font-size:.76rem;opacity:.7;margin:.15rem 0 .7rem;font-weight:400;}",
    "#mu-highlights .mu-hl-card ul{list-style:none;padding:0;margin:0;}",
    "#mu-highlights .mu-hl-card li{display:flex;gap:.6rem;align-items:flex-start;padding:.34rem 0;font-size:.875rem;line-height:1.4;border-top:1px solid var(--global-divider-color,rgba(0,0,0,0.1));}",
    "#mu-highlights .mu-hl-card li:first-child{border-top:none;}",
    "#mu-highlights .mu-hl-card li i{color:var(--global-theme-color,#2a6f97);width:1.15rem;text-align:center;margin-top:.18rem;flex:0 0 auto;}",
    "#mu-highlights .mu-hl-card li b{font-weight:700;}",
    "@media(max-width:768px){#mu-highlights .mu-hl-cards{grid-template-columns:1fr;}#mu-highlights .mu-hl-stats{grid-template-columns:repeat(2,1fr);}}"
  ].join("");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var statsWrap = el("div", "mu-hl-stats");
  STATS.forEach(function (s) {
    var box = el("div", "mu-hl-stat");
    var num = el("div", "mu-hl-num");
    num.setAttribute("data-to", s.to);
    num.setAttribute("data-prefix", s.prefix || "");
    num.setAttribute("data-suffix", s.suffix || "");
    num.innerHTML = (s.prefix || "") + "0" + (s.suffix || "");
    box.appendChild(num);
    box.appendChild(el("span", "mu-hl-cap", s.label));
    statsWrap.appendChild(box);
  });

  var cardsWrap = el("div", "mu-hl-cards");
  PILLARS.forEach(function (p) {
    var card = el("div", "mu-hl-card");
    card.appendChild(el("h4", null, p.title + '<span class="mu-hl-sub">' + p.sub + "</span>"));
    var ul = el("ul");
    p.items.forEach(function (it) {
      ul.appendChild(el("li", null, '<i class="fa-solid ' + it.icon + '"></i><span>' + it.text + "</span>"));
    });
    card.appendChild(ul);
    cardsWrap.appendChild(card);
  });

  mount.appendChild(statsWrap);
  mount.appendChild(cardsWrap);

  function countUp(node) {
    var to = parseFloat(node.getAttribute("data-to")) || 0;
    var prefix = node.getAttribute("data-prefix") || "";
    var suffix = node.getAttribute("data-suffix") || "";
    var dur = 1200, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      node.innerHTML = prefix + Math.round(to * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else node.innerHTML = prefix + to + suffix;
    }
    requestAnimationFrame(step);
  }

  var revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    mount.classList.add("in");
    var nums = mount.querySelectorAll(".mu-hl-num");
    for (var i = 0; i < nums.length; i++) countUp(nums[i]);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { reveal(); io.disconnect(); }
      });
    }, { threshold: 0.25 });
    io.observe(mount);
  } else {
    reveal();
  }
})();
