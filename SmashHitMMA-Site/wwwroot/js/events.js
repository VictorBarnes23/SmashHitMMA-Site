// Edit your events here (keep ISO "YYYY-MM-DD")
const EVENTS = [
    // Example entries — add yours when ready:
    // { date: "2025-11-15", title: "FREE Group Boxing", time: "Sat 6–8 PM", location:"Main Floor", url:"#", color:"#e5383b" },
    // { date: "2025-11-16", title: "Women’s Self-Defense Fundraiser", time: "Sun 12–1:30 PM", location:"Studio A", url:"#", color:"#208b3a" },
];

const monthLabel = document.getElementById("monthLabel");
const grid = document.getElementById("eventsGrid");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let viewDate = new Date();

function fmtMonth(date) {
    const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return m[date.getMonth()] + " " + date.getFullYear();
}

function getMonthEvents(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return EVENTS.filter(ev => (ev.date || "").startsWith(`${y}-${m}-`))
        .sort((a, b) => a.date.localeCompare(b.date));
}

function render() {
    if (!monthLabel || !grid) return;
    monthLabel.textContent = fmtMonth(viewDate);
    grid.setAttribute("aria-busy", "true");
    grid.innerHTML = "";

    const items = getMonthEvents(viewDate);
    if (items.length === 0) {
        const none = document.createElement("div");
        none.className = "events-empty";
        none.textContent = "No events scheduled this month. Check back soon!";
        grid.appendChild(none);
        grid.setAttribute("aria-busy", "false");
        return;
    }

    items.forEach(ev => {
        const d = new Date(ev.date);
        const day = d.getDate();
        const mon = d.toLocaleString(undefined, { month: "short" }).toUpperCase();
        const title = ev.title || "Untitled Event";
        const sub = [ev.time, ev.location].filter(Boolean).join(" • ");
        const tooltip = [ev.title, ev.time, ev.location].filter(Boolean).join(" — ");

        const card = document.createElement("a");
        card.href = ev.url || "#!";
        card.className = "event-card";
        card.style.setProperty("--accent", ev.color || "#4c63ff");
        card.title = tooltip;
        card.setAttribute("role", "button");
        card.addEventListener("click", (e) => {
            if (!ev.url) { e.preventDefault(); alert(`Registration coming soon for: ${title} (${ev.date})`); }
        });

        card.innerHTML = `
      <div class="event-card__month">${mon}</div>
      <div class="event-card__day">${day}</div>
      <div class="event-card__meta">${sub || "&nbsp;"}</div>
      <div class="event-card__title">${title}</div>
      <div class="event-card__tag">${ev.location ? ev.location : "Details"}</div>
    `;

        grid.appendChild(card);
    });

    grid.setAttribute("aria-busy", "false");
}

if (prevBtn) prevBtn.addEventListener("click", () => { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1); render(); });
if (nextBtn) nextBtn.addEventListener("click", () => { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1); render(); });

render();
