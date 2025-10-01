(function() {
  // Empêche le script d'être injecté deux fois
  if (window.__featureHubLoaded) return;
  window.__featureHubLoaded = true;

  // Création du container isolé avec Shadow DOM
  const hubContainer = document.createElement("div");
  hubContainer.id = "feature-hub";
  document.body.appendChild(hubContainer);

  const shadow = hubContainer.attachShadow({ mode: "open" });

  // Styles isolés
  const style = document.createElement("style");
  style.textContent = `
    #hub-wrapper {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      font-family: sans-serif;
      width: 280px;
      z-index: 99999;
    }
    #hub-header {
      padding: 10px;
      background: #0070f3;
      color: white;
      border-radius: 12px 12px 0 0;
      font-weight: bold;
      font-size: 14px;
    }
    #hub-content {
      padding: 10px;
    }
    .feature-card {
      border: 1px solid #eee;
      border-radius: 8px;
      margin-bottom: 10px;
      padding: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .feature-card:hover {
      background: #f5f5f5;
    }
    .feature-title {
      font-weight: bold;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .feature-desc {
      font-size: 12px;
      color: #555;
    }
  `;
  shadow.appendChild(style);

  // Contenu HTML
  const wrapper = document.createElement("div");
  wrapper.id = "hub-wrapper";
  wrapper.innerHTML = `
    <div id="hub-header">🚀 Feature Hub</div>
    <div id="hub-content">
      <div class="feature-card" data-feature="dark-mode">
        <div class="feature-title">Dark Mode</div>
        <div class="feature-desc">Essayez notre nouveau mode sombre.</div>
      </div>
      <div class="feature-card" data-feature="ai-copilot">
        <div class="feature-title">AI Copilot</div>
        <div class="feature-desc">Un assistant intelligent dans votre app.</div>
      </div>
    </div>
  `;
  shadow.appendChild(wrapper);

  // Tracking des clics
  shadow.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("click", () => {
      const featureName = card.dataset.feature;

      // Envoi dans le dataLayer pour GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "feature_hub_click",
        feature: featureName,
        timestamp: Date.now()
      });

      alert(`Merci pour votre intérêt dans: ${featureName} 🚀`);
    });
  });

  console.log("[FeatureHub] Loaded successfully.");
})();
