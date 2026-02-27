const categories = {
  "Phy Ed": ["fitness", "sport", "exercise", "run", "gym"],
  "Math": ["algebra", "geometry", "equation", "solve", "graph"],
  "English": ["essay", "grammar", "novel", "poem", "literature"],
  "Social Studies": ["history", "government", "war", "map", "culture"],
  "Health": ["nutrition", "mental", "health", "diet", "sleep"],
  "Science": ["biology", "chemistry", "physics", "lab", "experiment"],
  "Custom": []
};

function sortData() {
  const text = document.getElementById("inputText").value;
  const lines = text.split("\n").filter(l => l.trim() !== "");
  const customName = document.getElementById("customName").value.trim();

  if (customName !== "") {
    categories["Custom"] = [customName.toLowerCase()];
  }

  lines.forEach(line => {
    let placed = false;

    for (let cat in categories) {
      for (let keyword of categories[cat]) {
        if (line.toLowerCase().includes(keyword)) {
          saveData(cat, line);
          placed = true;
          break;
        }
      }
      if (placed) break;
    }

    if (!placed) {
      saveData("Custom", line);
    }
  });

  displayAll();
}

function saveData(category, text) {
  let stored = JSON.parse(localStorage.getItem(category)) || [];
  stored.push(text);
  localStorage.setItem(category, JSON.stringify(stored));
}

function displayAll() {
  const results = document.getElementById("results");
  results.innerHTML = "";

  for (let cat in categories) {
    let data = JSON.parse(localStorage.getItem(cat)) || [];
    if (data.length === 0) continue;

    let div = document.createElement("div");
    div.className = "category";

    let title = document.createElement("h3");
    title.textContent = cat;
    div.appendChild(title);

    data.forEach(item => {
      let p = document.createElement("p");
      p.textContent = item;
      div.appendChild(p);
    });

    results.appendChild(div);
  }
}

function searchData() {
  const search = document.getElementById("searchBar").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = "";

  for (let cat in categories) {
    let data = JSON.parse(localStorage.getItem(cat)) || [];

    let filtered = data.filter(item =>
      item.toLowerCase().includes(search)
    );

    if (filtered.length > 0) {
      let div = document.createElement("div");
      div.className = "category";

      let title = document.createElement("h3");
      title.textContent = cat;
      div.appendChild(title);

      filtered.forEach(item => {
        let p = document.createElement("p");
        p.textContent = item;
        div.appendChild(p);
      });

      results.appendChild(div);
    }
  }
}

displayAll();
