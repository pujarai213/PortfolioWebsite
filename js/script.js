(() => {
    const carousel = document.querySelector("[data-carousel]");
    if (carousel) {
        const cards = [...carousel.querySelectorAll(".project-card")];
        let active = Math.min(1, cards.length - 1);

        const render = () => {
            const n = cards.length;
            cards.forEach((card, i) => {
                card.classList.remove("is-active", "is-prev", "is-next", "is-hidden");
                const link = card.querySelector(".read-more");
                if (i === active) {
                    card.classList.add("is-active");
                    card.removeAttribute("aria-hidden");
                    link?.setAttribute("tabindex", "0");
                } else {
                    card.setAttribute("aria-hidden", "true");
                    link?.setAttribute("tabindex", "-1");
                    if (i === (active - 1 + n) % n) card.classList.add("is-prev");
                    else if (i === (active + 1) % n) card.classList.add("is-next");
                    else card.classList.add("is-hidden");
                }
            });
        };

        const move = (step) => {
            active = (active + step + cards.length) % cards.length;
            render();
        };

        document.querySelector(".carousel-prev")?.addEventListener("click", () => move(-1));
        document.querySelector(".carousel-next")?.addEventListener("click", () => move(1));
        render();
    }

    const root = document.documentElement;
    const toggle = document.querySelector("[data-theme-toggle]");
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (theme) => {
        root.dataset.theme = theme;
        themeMeta?.setAttribute("content", theme === "light" ? "#fafaf8" : "#111111");
        if (toggle) {
            const next = theme === "light" ? "dark" : "light";
            toggle.setAttribute("aria-label", `Switch to ${next} mode`);
            toggle.title = `Switch to ${next} mode`;
        }
    };

    applyTheme(root.dataset.theme === "light" ? "light" : "dark");

    toggle?.addEventListener("click", () => {
        const next = root.dataset.theme === "light" ? "dark" : "light";
        applyTheme(next);
        try { localStorage.setItem("theme", next); } catch {}
    });

    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
})();
