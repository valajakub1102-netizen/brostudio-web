(function(){
  var items = window.BRO_ITEMS || [];
  var cats  = window.BRO_CATEGORIES || [];

  function card(it){
    var a = document.createElement('a');
    a.className = 'poster';
    a.href = 'detail.html?p=' + encodeURIComponent(it.id);
    a.setAttribute('aria-label', it.title);
    var img = document.createElement('img');
    img.src = it.poster; img.alt = it.title; img.loading = 'lazy';
    var l = document.createElement('span');
    l.className = 'label'; l.textContent = it.title;
    a.appendChild(img); a.appendChild(l);
    return a;
  }

  // ---- Hlavní stránka
  var home = document.getElementById('home-grid');
  if (home) items.forEach(function(it){ home.appendChild(card(it)); });

  // ---- Kategorie
  var catRoot = document.getElementById('categories');
  if (catRoot){
    cats.forEach(function(c){
      var list = items.filter(function(i){ return i.category === c.id; });
      if (!list.length) return;
      var sec = document.createElement('section');
      sec.id = c.id;
      sec.innerHTML = '<h2 class="section-title"></h2><div class="section-rule"></div><div class="grid"></div>';
      sec.querySelector('h2').textContent = c.title;
      var g = sec.querySelector('.grid');
      list.forEach(function(it){ g.appendChild(card(it)); });
      catRoot.appendChild(sec);
    });
  }

  // ---- Detail
  var root = document.getElementById('detail-root');
  if (root){
    var id = new URLSearchParams(location.search).get('p');
    var it = items.filter(function(i){ return i.id === id; })[0];
    if (!it){
      root.innerHTML = '<h1 class="hero-title">Nenalezeno</h1><p style="text-align:center"><a href="index.html" style="text-decoration:underline">Zpět na hlavní stránku</a></p>';
      return;
    }
    document.title = it.title + ' – BROSTUDIO';
    var cat = cats.filter(function(c){ return c.id === it.category; })[0];

    var posterWrap = document.getElementById('d-poster');
    var img = document.createElement('img'); img.src = it.poster; img.alt = it.title; posterWrap.appendChild(img);
    document.getElementById('d-title').textContent = it.title;
    document.getElementById('d-meta').textContent = it.type + (cat ? ' · ' + cat.title : '');
    document.getElementById('d-desc').textContent = it.description;
    var castEl = document.getElementById('d-cast');
    if (it.cast) castEl.textContent = it.cast; else castEl.remove();

    var player = document.getElementById('player');
    var box = document.getElementById('player-box');
    var ptitle = document.getElementById('player-title');
    var ylink = document.getElementById('yt-link');
    var actions = document.getElementById('actions');
    var buttons = [];

    function play(src, label, btn){
      buttons.forEach(function(b){ b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      player.hidden = false;
      ptitle.textContent = it.title + ' – ' + label;
      box.innerHTML = '';
      if (src.indexOf('yt:') === 0){
        var vid = src.slice(3);
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vid) + '?autoplay=1&rel=0&modestbranding=1';
        f.title = it.title + ' – ' + label;
        f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        box.appendChild(f);
        ylink.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(vid);
        ylink.hidden = false;
      } else {
        ylink.hidden = true;
        var v = document.createElement('video');
        v.controls = true; v.preload = 'metadata'; v.playsInline = true; v.src = src;
        v.addEventListener('error', function(){
          box.innerHTML = '<div class="soon">Toto video se zatím nepodařilo načíst.</div>';
        });
        box.appendChild(v);
        v.play().catch(function(){});
      }
      player.scrollIntoView({behavior:'smooth', block:'start'});
    }

    (it.videos || []).forEach(function(v){
      var b = document.createElement('button');
      b.className = 'btn'; b.type = 'button'; b.textContent = v.label;
      if (v.src){ b.addEventListener('click', function(){ play(v.src, v.label, b); }); }
      else { b.disabled = true; b.title = 'Již brzy'; }
      buttons.push(b); actions.appendChild(b);
    });

    // Řady seriálu (volitelné)
    if (it.seasons && it.seasons.length){
      var s = document.getElementById('seasons');
      s.hidden = false;
      it.seasons.forEach(function(se){
        var row = document.createElement('div');
        row.className = 'season-row';
        var lab = document.createElement('div');
        lab.className = 'season-label'; lab.textContent = se.label;
        row.appendChild(lab);
        var eps = document.createElement('div');
        eps.className = 'episodes';
        // epizody: pole odkazů (E1, E2, ...) nebo objektů { label, video }
        (se.episodes || (se.video ? [se.video] : [])).forEach(function(ep, i){
          var src = (ep && typeof ep === 'object') ? ep.video : ep;
          var name = (ep && typeof ep === 'object' && ep.label) ? ep.label : 'E' + (i + 1);
          var b = document.createElement('button');
          b.className = 'ep'; b.type = 'button'; b.textContent = name;
          if (src){
            b.addEventListener('click', function(){
              buttons.forEach(function(x){ x.classList.remove('active'); });
              document.querySelectorAll('.ep.active').forEach(function(x){ x.classList.remove('active'); });
              b.classList.add('active');
              play(src, se.label + ' ' + name, null);
            });
          } else { b.disabled = true; b.title = 'Již brzy'; }
          eps.appendChild(b);
        });
        row.appendChild(eps);
        s.appendChild(row);
      });
    }

    // Pokud má projekt jediné dostupné video, nabídni ho hned (bez autoplay)
    var avail = (it.videos || []).filter(function(v){ return v.src; });
    if (!avail.length && !(it.seasons && it.seasons.length)){
      player.hidden = false;
      ptitle.textContent = 'Přehrávač';
      box.innerHTML = '<div class="soon">Video již brzy…</div>';
    }
  }
})();
