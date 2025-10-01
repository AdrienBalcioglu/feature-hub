(function() {
  // Config locale (tu peux la remplacer par un fetch JSON plus tard)
  const features = [
    {
      id: "dark-mode",
      title: "Dark Mode",
      description: "Essayez le nouveau thème sombre pour améliorer le confort visuel.",
      cta: "Activer"
    },
    {
      id: "ai-copilot",
      title: "AI Copilot",
      description: "Un assistant intelligent intégré pour vous aider à configurer vos campagnes.",
      cta: "Tester"
    },
    {
      id: "reports-v2",
      title: "Rapports V2",
      description: "Une refonte complète des analytics avec plus de détails et de filtres.",
      cta: "Découvrir"
    }
  ];

  // Création du conteneur flottant
  const container = document.createElement("div");
  container.id = "feature-hub-root";
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: "open" });

  // Styles isolés
  const style = document.createElement("style");
  style.textContent = `
    .fh-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #4F46E5;
      color: white;
      padding: 12px 16px;
      border-radius: 30px;
      font-family: sans-serif;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      transition: background 0.3s;
      z-index: 99999;
    }
    .fh-button:hover { background: #4338CA; }

    .fh-drawer {
      position: fixed;
      top: 0; right: -400px;
      width: 350px;
      height: 100%;
      background: #fff;
      box-shadow: -2px 0 10px rgba(0,0,0,0.2);
      transition: right 0.3s ease;
      padding: 20px;
      overflow-y: auto;
      font-family: sans-serif;
      z-index: 99998;
    }
    .fh-drawer.open { right: 0; }

    .fh-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #111;
    }
    .fh-card {
      border: 1px solid #eee;
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    .fh-card h3 {
      margin: 0 0 8px;
      font-size: 16px;
      color: #222;
    }
    .fh-card p {
      margin: 0 0 12px;
      font-size: 14px;
      color: #555;
    }
    .fh-card button {
      background: #4F46E5;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      color: white;
      font-size: 13px;
      cursor: pointer;
    }
    .fh-card button:hover { background: #4338CA; }
  `;
  shadow.appendChild(style);

  // HTML bouton + drawer
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="fh-button">✨ Découvrir les nouveautés</div>
    <div class="fh-drawer">
      <div class="fh-title">Nouvelles fonctionnalités</div>
      ${features.map(f => `
        <div class="fh-card">
          <h3>${f.title}</h3>
          <p>${f.description}</p>
          <button data-id="${f.id}">${f.cta}</button>
        </div>
      `).join("")}
    </div>
  `;
  shadow.appendChild(wrapper);

  // Logique d’interaction
  const btn = shadow.querySelector(".fh-button");
  const drawer = shadow.querySelector(".fh-drawer");
  btn.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  shadow.querySelectorAll(".fh-card button").forEach(b => {
    b.addEventListener("click", (e) => {
      const fid = e.target.getAttribute("data-id");
      // Tracking GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "featureHubClick",
        featureId: fid
      });
      alert("Merci pour votre intérêt pour " + fid + " !");
    });
  });
})();

