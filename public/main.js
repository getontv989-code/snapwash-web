(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Header: solid after scroll, hides on scroll down ---------- */
  var header = document.querySelector(".site-header");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle("is-solid", y > 24);
      var goingDown = y > lastY && y > 400;
      header.classList.toggle("is-hidden", goingDown && !doc.classList.contains("menu-open"));
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Light / dark theme ---------- */
  var themeBtn = document.querySelector(".theme-btn");
  function syncThemeBtn() {
    if (!themeBtn) return;
    var dark = doc.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  syncThemeBtn();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";
      doc.classList.add("theme-anim");
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("snapwash-theme", next); } catch (e) {}
      syncThemeBtn();
      setTimeout(function () { doc.classList.remove("theme-anim"); }, 450);
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    doc.classList.toggle("menu-open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (menu) menu.setAttribute("aria-hidden", String(!open));
    if (open && menu) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () { setMenu(!doc.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("click", function (e) {
      if (doc.classList.contains("menu-open") && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
    });
  }

  /* ---------- Kinetic headlines: wrap each word ---------- */
  document.querySelectorAll(".split").forEach(function (el) {
    var i = 0;
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span");
            w.className = "w";
            var inner = document.createElement("span");
            inner.style.setProperty("--i", i++);
            inner.textContent = p;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          walk(child);
        }
      });
    }
    walk(el);
  });

  /* ---------- Scroll reveals ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.remove("is-pending"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.92) { el.classList.add("is-pending"); io.observe(el); }
    });
    window.addEventListener("load", function () {
      setTimeout(function () { reveals.forEach(function (el) { el.classList.remove("is-pending"); }); }, 8000);
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduce) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Home: app tour ---------- */
  var tour = document.getElementById("tour");
  if (tour) {
    var tTabs = Array.prototype.slice.call(tour.querySelectorAll("[data-step]"));
    var tViews = Array.prototype.slice.call(tour.querySelectorAll(".app-view"));
    var tMs = 3600, tCur = 0, tTimer = null;
    tour.style.setProperty("--tour-ms", tMs + "ms");
    function show(n) {
      tViews[tCur].classList.remove("is-active");
      tViews[tCur].classList.add("is-leaving");
      var leaving = tViews[tCur];
      setTimeout(function () { leaving.classList.remove("is-leaving"); }, 600);
      tCur = (n + tViews.length) % tViews.length;
      tViews.forEach(function (v, i) {
        if (i === tCur) {
          // restart the screen's own entrance animations
          v.classList.remove("is-active"); void v.offsetWidth; v.classList.add("is-active");
        }
      });
      tTabs.forEach(function (t, i) {
        t.setAttribute("aria-selected", String(i === tCur));
        t.classList.toggle("is-done", i < tCur);
        var bar = t.querySelector(".bar i");
        if (i === tCur && bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
      });
    }
    function play() { stop(); if (!reduce) tTimer = setInterval(function () { if (!tour.classList.contains("is-paused")) show(tCur + 1); }, tMs); }
    function stop() { if (tTimer) clearInterval(tTimer); tTimer = null; }
    tTabs.forEach(function (t, i) {
      t.addEventListener("click", function () { if (i !== tCur) show(i); play(); });
    });
    tour.addEventListener("pointerenter", function () { tour.classList.add("is-paused"); });
    tour.addEventListener("pointerleave", function () { tour.classList.remove("is-paused"); play(); });
    tour.addEventListener("focusin", function () { tour.classList.add("is-paused"); });
    tour.addEventListener("focusout", function () { tour.classList.remove("is-paused"); });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else play(); });
    play();
  }

  /* ---------- Pinned horizontal steps ---------- */
  var hs = document.querySelector(".hsteps");
  if (hs) {
    var track = hs.querySelector(".hsteps-track");
    var view = hs.querySelector(".hsteps-viewport") || track.parentNode;
    var bar = hs.querySelector(".hsteps-progress");
    var mq = window.matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)");
    function layout() {
      if (mq.matches) { hs.style.height = ""; track.style.transform = ""; return; }
      var dist = track.scrollWidth - view.clientWidth;
      hs.style.height = (window.innerHeight + Math.max(dist, 0)) + "px";
      update();
    }
    function update() {
      if (mq.matches) return;
      var r = hs.getBoundingClientRect();
      var dist = track.scrollWidth - view.clientWidth;
      var p = Math.min(1, Math.max(0, -r.top / (hs.offsetHeight - window.innerHeight || 1)));
      track.style.transform = "translate3d(" + (-p * Math.max(dist, 0)) + "px,0,0)";
      if (bar) bar.style.setProperty("--p", p.toFixed(3));
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", layout);
    if (mq.addEventListener) mq.addEventListener("change", layout);
    window.addEventListener("load", layout);
    layout();
  }

  /* ---------- Scan demo ---------- */
  var scanBtn = document.getElementById("scan-btn");
  if (scanBtn) {
    var stage = document.getElementById("scan-phone");
    var label = document.getElementById("scan-label");
    var bag = document.getElementById("bag");
    var shapes = document.querySelectorAll(".viewfinder .garment");
    var items = [
      { name: "Oxford shirt", color: "White", hex: "#FFFFFF", shape: 0 },
      { name: "Wool blazer", color: "Navy", hex: "#1D2B5C", shape: 1 },
      { name: "Slim chinos", color: "Khaki", hex: "#C9B48A", shape: 2 },
      { name: "Silk dress", color: "Black", hex: "#111111", shape: 3 },
      { name: "Linen shirt", color: "Sky blue", hex: "#9DBDFF", shape: 0 }
    ];
    var idx = 0, busy = false;
    function showShape(n) { shapes.forEach(function (s, i) { s.classList.toggle("is-off", i !== n); }); }
    showShape(items[0].shape);
    scanBtn.addEventListener("click", function () {
      if (busy) return;
      if (idx >= items.length) {
        idx = 0; bag.innerHTML = '<li class="bag-empty">Your bag is empty. Scan an item to add it.</li>';
        scanBtn.querySelector("span").textContent = "Scan an item";
        showShape(items[0].shape); label.classList.remove("is-on");
        return;
      }
      busy = true;
      var it = items[idx];
      showShape(it.shape);
      label.classList.remove("is-on");
      stage.classList.add("is-scanning");
      scanBtn.setAttribute("aria-busy", "true");
      setTimeout(function () {
        stage.classList.remove("is-scanning");
        label.textContent = it.name + " · " + it.color;
        label.classList.add("is-on");
        var empty = bag.querySelector(".bag-empty");
        if (empty) empty.remove();
        var li = document.createElement("li");
        li.innerHTML = "<i></i><span></span><span></span>";
        li.children[0].style.background = it.hex;
        li.children[1].textContent = it.name;
        li.children[2].textContent = it.color;
        bag.appendChild(li);
        idx++;
        scanBtn.querySelector("span").textContent = idx >= items.length ? "Start over" : "Scan next item";
        scanBtn.removeAttribute("aria-busy");
        busy = false;
      }, reduce ? 200 : 1400);
    });
  }

  /* ---------- Drive: route animation ---------- */
  var leg = document.getElementById("route-leg");
  var car = document.getElementById("route-car");
  var status = document.getElementById("route-status");
  if (leg && car && leg.getTotalLength) {
    var L = leg.getTotalLength();
    leg.style.strokeDasharray = L;
    var labels = [[0, "Heading to pickup"], [0.42, "Bag collected, to the cleaner"], [0.78, "Clean, out for delivery"], [0.99, "Delivered, photo saved"]];
    var start = performance.now(), dur = 9000;
    function drive(now) {
      var p = reduce ? 1 : ((now - start) % (dur + 1500)) / dur;
      p = Math.min(1, p);
      leg.style.strokeDashoffset = L * (1 - p);
      var pt = leg.getPointAtLength(L * p);
      car.setAttribute("transform", "translate(" + pt.x + "," + pt.y + ")");
      if (status) {
        var txt = labels[0][1];
        labels.forEach(function (l) { if (p >= l[0]) txt = l[1]; });
        if (status.textContent !== txt) status.textContent = txt;
      }
      if (!reduce) requestAnimationFrame(drive);
    }
    requestAnimationFrame(drive);
  }

  /* ---------- Drive: pick-your-week ---------- */
  var week = document.getElementById("week");
  var weekOut = document.getElementById("week-out");
  if (week && weekOut) {
    function sayWeek() {
      var on = Array.prototype.slice.call(week.querySelectorAll('[aria-pressed="true"]')).map(function (b) { return b.getAttribute("data-day"); });
      weekOut.textContent = on.length === 0 ? "No days picked. Taking the week off is allowed too." :
        on.length === 7 ? "Every day. Bold. Switch off any of them whenever you like." :
        "You drive " + on.join(", ") + ". Change it any time.";
    }
    week.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
      sayWeek();
    });
    sayWeek();
  }

  /* ---------- Cleaners: dashboard tabs + incoming orders ---------- */
  var tabs = document.querySelectorAll("[data-filter]");
  var rows = document.getElementById("order-rows");
  if (tabs.length && rows) {
    function applyFilter(f) {
      Array.prototype.forEach.call(rows.children, function (tr) {
        tr.hidden = f !== "all" && tr.getAttribute("data-state") !== f;
      });
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (o) { o.setAttribute("aria-selected", String(o === t)); });
        applyFilter(t.getAttribute("data-filter"));
      });
    });
    var incoming = [
      ["#2419", "4 items · shirts, blazer", "8:12 pm"],
      ["#2420", "2 items · dress, coat", "8:19 pm"],
      ["#2421", "7 items · wash & fold", "8:26 pm"]
    ];
    var n = 0;
    var counter = document.getElementById("today-count");
    if (!reduce) {
      var timer = setInterval(function () {
        if (n >= incoming.length) { clearInterval(timer); return; }
        var o = incoming[n++];
        var tr = document.createElement("tr");
        tr.className = "is-new";
        tr.setAttribute("data-state", "in");
        tr.innerHTML = '<td></td><td></td><td></td><td><span class="pill pill--in">Incoming</span></td>';
        tr.children[0].textContent = o[0]; tr.children[1].textContent = o[1]; tr.children[2].textContent = o[2];
        rows.insertBefore(tr, rows.firstChild);
        var current = document.querySelector('[data-filter][aria-selected="true"]');
        applyFilter(current ? current.getAttribute("data-filter") : "all");
        if (counter) counter.textContent = String(parseInt(counter.textContent, 10) + 1);
      }, 3200);
    }
  }

  /* ---------- Count-up numbers ---------- */
  var counts = document.querySelectorAll("[data-count]");
  if (counts.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, to = parseFloat(el.getAttribute("data-count")), pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
        var s = performance.now();
        (function tick(now) {
          var p = Math.min(1, (now - s) / 1600);
          var eased = 1 - Math.pow(1 - p, 4);
          el.textContent = pre + Math.round(to * eased) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(s);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counts.forEach(function (c) { cio.observe(c); });
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();

/* Footer logo re-hangs itself when it scrolls into view */
(function () {
  var fl = document.querySelector(".foot-logo");
  if (!fl || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { fl.classList.toggle("is-swinging", e.isIntersecting); });
  }, { threshold: 0.6 });
  io.observe(fl);
})();
