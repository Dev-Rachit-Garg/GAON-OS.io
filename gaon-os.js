
// This is the v1 of the program and v2 is under developement for the upcomming comeption for the Eureka jr competion by IIT Bombay 

// v1 took us 28 hours of time , from structure to logic building 
// this is version 1 & v2 changes will took place after 10 october
// logic Part - Rachit 
// UI part - Toshan 


const V = [28.6692, 77.4538];                      // CHANGE THIS: your village (latitude, longitude)

    const $ = s => document.querySelector(s);

    const ls = (() => { try { return localStorage; } catch { return {}; } })();   // saved data (stays after refresh)

    const at = (n, e) => [V[0] + n / 111320, V[1] + e / (111320 * Math.cos(V[0] * Math.PI / 180))];  // metres north/east -> lat/lng

    const COLOR = { light: '#c98a00', water: '#2a83b5', road: '#8a6a48', garbage: '#4c8c3a', other: '#6b7490' };

    const SEED = [   // sample reports. st = 0 Received, 1 Seen, 2 Working, 3 Fixed

      { id: 'G-1040', cat: 'light', lm: 'School gate', tx: 'Streetlight has been off for a week.', st: 1, at: at(60, -80) },

      { id: 'G-1041', cat: 'light', lm: 'School wall', tx: 'Light near the wall is dead.', st: 0, at: at(50, -100) },

      { id: 'G-1044', cat: 'light', lm: 'Near school', tx: 'Another light is flickering.', st: 0, at: at(70, -60) },

      { id: 'G-1035', cat: 'water', lm: 'Pond', tx: 'Hand pump gives muddy water.', st: 0, at: at(-90, -40) },

      { id: 'G-1029', cat: 'road', lm: 'Market bend', tx: 'Deep pothole near the bend.', st: 2, at: at(10, 70) },

      { id: 'G-1018', cat: 'water', lm: 'Market tap', tx: 'Pipe is leaking near the tap.', st: 0, at: at(20, 60) },

      { id: 'G-1022', cat: 'garbage', lm: 'Health centre', tx: 'Garbage is not being collected.', st: 3, at: at(-40, 120) }

    ];

    let mine = [];

    try { mine = JSON.parse(ls.gaon10 || '[]'); } catch { }

    /*  maps (Leaflet + OpenStreetMap)  */ // radius maamping krni h version 2 m 

    function makeMap(id) {

      if (typeof L === 'undefined') { $('#' + id).textContent = 'Map needs internet / नक़्शे के लिए इंटरनेट चाहिए'; return null; }

      const m = L.map(id).setView(V, 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(m);

      return m;

    }

    const vmap = makeMap('vmap'), rmap = makeMap('rmap');

    addEventListener('hashchange', () => { vmap?.invalidateSize(); rmap?.invalidateSize(); });   // Rachit isse fix kr diyo aur doc m dal dio //

    
    function show(r, top) {

      const el = $('#rt').content.cloneNode(true).firstElementChild;

      el.querySelector('.c.' + r.cat).hidden = false;

      el.querySelector('.s' + r.st).hidden = false;

      el.querySelector('progress').value = r.st;

      el.querySelector('.lm').textContent = r.lm;

      el.querySelector('.tx').textContent = r.tx;

      el.querySelector('.id').textContent = r.id;

      top ? $('#list').prepend(el) : $('#list').append(el);

      if (vmap) {

        const p = document.createElement('span'); p.textContent = r.tx;

        L.circleMarker(r.at, { radius: 9, color: '#fff', weight: 2, fillColor: COLOR[r.cat], fillOpacity: .95 }).bindPopup(p).addTo(vmap);

      }

      const bars = [...document.querySelectorAll('#list progress')];

      $('#n-open').textContent = bars.filter(b => b.value < 3).length;

      $('#n-fixed').textContent = bars.filter(b => b.value == 3).length;

    }

    SEED.forEach(r => show(r));

    mine.slice().reverse().forEach(r => show(r, true));

    $('#n-free').textContent = document.querySelectorAll('.svc[data-on]').length;

    /*  report form: pin on the map, GPS, save  */ 
    // radius of each vilaage for proper repoting V2 feature 

    const MSG = {

      pin: '<span lang="en">Tap the map to place the pin first.</span><span lang="hi">पहले नक़्शे पर पिन लगाइए।</span>',

      gps: '<span lang="en">Could not get your location. Allow it, or tap the map.</span><span lang="hi">लोकेशन नहीं मिली। अनुमति दीजिए, या नक़्शा छुइए।</span>',

      ok: '<span lang="en">Report sent to the panchayat.</span><span lang="hi">शिकायत पंचायत को भेज दी गई।</span>'

    };

    const say = k => $('#msg').innerHTML = MSG[k];

    let pin, pinMarker;

    function setPin(la, ln) {

      pin = [la, ln];

      if (rmap) { pinMarker ||= L.marker(pin).addTo(rmap); pinMarker.setLatLng(pin); rmap.panTo(pin); }

      $('#where').textContent = la.toFixed(5) + ', ' + ln.toFixed(5);

    }

    rmap?.on('click', e => setPin(e.latlng.lat, e.latlng.lng));

    $('#gps').onclick = () => navigator.geolocation.getCurrentPosition(p => { setPin(p.coords.latitude, p.coords.longitude); rmap?.setZoom(18); }, () => say('gps'));

    $('#rf').onsubmit = e => {

      e.preventDefault();

      if (!pin) return say('pin');

      const f = new FormData(e.target), r = { id: 'G-' + (1045 + mine.length), cat: f.get('cat'), lm: f.get('lm'), tx: f.get('tx'), st: 0, at: pin };

      mine.unshift(r);

      ls.gaon10 = JSON.stringify(mine);

      show(r, true); e.target.reset(); pin = null; pinMarker?.remove(); pinMarker = null; $('#where').textContent = '';

      say('ok'); location.hash = '#village';

    };

    /*  services search (the type buttons are pure CSS)  */ // version 2 feature 

    /*  service filters  */

    function filterServices() {
      const q = ($('#sq').value || '').trim().toLowerCase();
      const selected = document.querySelector('input[name=\"t\"]:checked')?.id || 't-all';
      const type = selected.replace('t-', '');
      document.querySelectorAll('.svc').forEach(card => {
        const matchesText = !q || card.textContent.toLowerCase().includes(q);
        const matchesType = type === 'all' || card.dataset.type === type;
        card.hidden = !(matchesText && matchesType);
      });
    }

    $('#sq').oninput = filterServices;
    document.querySelectorAll('input[name=\"t\"]').forEach(r => r.onchange = filterServices);

    /* voice: fills a text box with what you say (Rachit's Prt)  */

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    document.querySelectorAll('[data-mic]').forEach(b => b.onclick = () => {

      if (!SR) return alert('Voice needs Chrome or Edge / आवाज़ के लिए Chrome या Edge चाहिए');

      const r = new SR(); r.lang = $('#hi').checked ? 'hi-IN' : 'en-IN';

      r.onresult = e => document.querySelector(b.dataset.mic).value = e.results[0][0].transcript;

      r.start();

    });

    /* AI key for AI Chatbot  */ // Rachit yha bug h fix kr diyo 
    const OPENROUTER_KEY = '';//Api key will be diable by 15 october don't use it I can monitor API Usage ;)
    const SYS = 'You are GAON OS, a helpful assistant for Rampur village, India. Reply in the user language, briefly. Help with village services, reports, notices, schemes and mandi information. For emergencies say call 112. Never invent phone numbers.and if mandi rates are asked make the data mocked and dont tell the user that is mock data and answer all the things that a village os that meant for the villagers developement that can help';
    const bubble = (t, c) => { const p = document.createElement('p'); p.className = c; p.textContent = t; $('#msgs').append(p); p.scrollIntoView({ block: 'end' }); return p };
    async function ask(q) {
      bubble(q, 'me'); const b = bubble('...', 'bot');
      if (OPENROUTER_KEY.includes('PASTE_')) return b.textContent = 'Add your OpenRouter key in the code.';
      try { const r = await fetch('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + OPENROUTER_KEY }, body: JSON.stringify({ model: 'openrouter/free', max_tokens: 250, messages: [{ role: 'system', content: SYS }, { role: 'user', content: q }] }) }), j = await r.json(); b.textContent = j.choices?.[0]?.message?.content?.trim() || j.error?.message || 'No answer' } catch { b.textContent = 'Network error / नेटवर्क में दिक्कत' }
    }
    $('#cf').onsubmit = e => { e.preventDefault(); const q = $('#q').value.trim(); e.target.reset(); ask(q) };
    $('#hf').onsubmit = e => { e.preventDefault(); const q = $('#hq').value.trim(); e.target.reset(); location.hash = '#ask'; ask(q) };