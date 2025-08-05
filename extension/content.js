console.log("🧠 GenAI LeetCode Helper content script loaded!");

let currentPath = location.pathname;
let initialized = false;

function isProblemPage() {
  return (
    location.pathname.startsWith("/problems/") &&
    document.querySelector('meta[property="og:title"]')
  );
}

function extractCleanTitle() {
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const content = ogTitle?.getAttribute("content") || "";
  return content.replace(/ - LeetCode$/, "").trim();
}

function initBox() {
  const cleanTitle = extractCleanTitle();
  if (!cleanTitle || cleanTitle.toLowerCase().includes("leetcode")) return;

  if (document.getElementById("genai-hints-box")) {
    document.getElementById("genai-hints-box").remove();
  }

  console.log("✅ Found title:", cleanTitle);
  initialized = true;
  showHintBox(cleanTitle);
}

setInterval(() => {
  if (location.pathname !== currentPath) {
    currentPath = location.pathname;
    console.log("🔁 URL changed:", currentPath);
    initialized = false;
  }

  if (!initialized && isProblemPage()) {
    initBox();
  }
}, 1000);

function showHintBox(title) {
  const wrapper = document.createElement("div");
  wrapper.id = "genai-hints-box";
  wrapper.style.cssText = `
    position: fixed;
    top: 100px;
    left: calc(100vw - 380px);
    width: 340px;
    background: #1e293b;
    color: white;
    padding: 0;
    border-radius: 16px;
    font-family: 'Segoe UI', sans-serif;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    z-index: 9999;
    user-select: none;
    transition: left 0.1s ease-out, top 0.1s ease-out;
  `;

  const savedX = localStorage.getItem("genai-box-x");
  const savedY = localStorage.getItem("genai-box-y");

  if (savedX && savedY) {
    wrapper.style.left = savedX + "px";
    wrapper.style.top = savedY + "px";
  }

  wrapper.innerHTML = `
    <div id="drag-bar" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; cursor: move;">
      <h2 style="font-size: 18px; font-weight: 600; margin: 0;">💡 HintByte</h2>
      <button id="toggle-box" style="background: transparent; border: none; color: white; font-size: 18px; cursor: pointer;">➖</button>
    </div>
    <div id="hint-content" style="padding: 16px; border-top: 1px solid #334155;">
      <div id="hint-badge" style="background: #2563eb; padding: 4px 10px; border-radius: 9999px; display: inline-block; font-size: 12px;">Hint 1</div>
      <div id="hint-text" style="background: #334155; padding: 12px; border-radius: 8px; margin-top: 8px;">⏳ Loading...</div>
      <div style="display: flex; justify-content: center; margin-top: 8px;" id="pagination-dots"></div>
      <div style="display: flex; justify-content: space-between; margin-top: 12px;">
        <button id="prev-btn" style="padding: 6px 12px; background: #0f172a; border: none; border-radius: 6px; color: white; cursor: pointer;">Previous</button>
        <button id="next-btn" style="padding: 6px 12px; background: #0f172a; border: none; border-radius: 6px; color: white; cursor: pointer;">Next</button>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 12px;">
        <button id="reset-btn" style="padding: 8px; background: #1e40af; border: none; border-radius: 8px; color: white; width: 48%; cursor: pointer;">Reset Hints</button>
        <button id="solution-btn" style="padding: 8px; background: #3b82f6; border: none; border-radius: 8px; color: white; width: 48%; cursor: pointer;">Get Solution</button>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  const dragBar = document.getElementById("drag-bar");
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  dragBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = wrapper.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    wrapper.style.left = `${newX}px`;
    wrapper.style.top = `${newY}px`;
    wrapper.style.right = "auto";
    wrapper.style.bottom = "auto";
    localStorage.setItem("genai-box-x", newX);
    localStorage.setItem("genai-box-y", newY);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
  });

  let currentIndex = 0;
  let hints = [];

  const hintText = () => document.getElementById("hint-text");
  const hintBadge = () => document.getElementById("hint-badge");
  const dots = () => document.getElementById("pagination-dots");

  async function loadHints() {
    try {
      const res = await fetch("http://localhost:5000/api/hints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      hints = data.hints?.slice(0, 3) || [];
      if (hints.length === 0) throw new Error("No hints returned");

      renderHint();
      renderDots();
    } catch (e) {
      console.error("❌ Failed to fetch hints:", e);
      hintText().innerText = "❌ Could not load hints.";
    }
  }

  function renderHint() {
    hintText().innerText = hints[currentIndex];
    hintBadge().innerText = `Hint ${currentIndex + 1}`;
    Array.from(dots().children).forEach((dot, i) => {
      dot.style.opacity = i === currentIndex ? "1" : "0.4";
    });
  }

  function renderDots() {
    dots().innerHTML = "";
    hints.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.style.cssText = `
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 9999px;
        margin: 0 4px;
        opacity: ${i === currentIndex ? "1" : "0.4"};
      `;
      dots().appendChild(dot);
    });
  }

  document.getElementById("next-btn").onclick = () => {
    if (currentIndex < hints.length - 1) {
      currentIndex++;
      renderHint();
    }
  };

  document.getElementById("prev-btn").onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderHint();
    }
  };

  document.getElementById("reset-btn").onclick = () => {
    currentIndex = 0;
    hintText().innerText = "⏳ Loading...";
    loadHints();
  };

  document.getElementById("solution-btn").onclick = () => {
    alert("🚧 Coming soon: AI-generated solutions!");
  };

  document.getElementById("toggle-box").onclick = () => {
    const content = document.getElementById("hint-content");
    const toggle = document.getElementById("toggle-box");
    if (content.style.display === "none") {
      content.style.display = "block";
      toggle.innerText = "➖";

      const x = localStorage.getItem("genai-box-x") || 100;
      const y = localStorage.getItem("genai-box-y") || 100;
      wrapper.style.left = `${x}px`;
      wrapper.style.top = `${y}px`;
      wrapper.style.right = "auto";
      wrapper.style.bottom = "auto";
    } else {
      content.style.display = "none";
      toggle.innerText = "➕";
      wrapper.style.top = "auto";
      wrapper.style.left = "auto";
      wrapper.style.bottom = "20px";
      wrapper.style.right = "20px";
    }
  };

  loadHints();
}
