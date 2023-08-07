let res = await fetch("/component/header.htm");
let text = await res.text();
let dom = new DOMParser().parseFromString(text, "text/html");
let html = dom.getElementsByTagName("body")[0].innerHTML;

let template = document.createElement("template");
template.innerHTML = html;

function select(id) {
    template.content.querySelector("#" + id).classList.add("selected");
}

switch (document.location.pathname) {
    case "/":
    case "/index.html":
        select("index");
        break;
    case "/about.html":
        select("about");
        break;
    case "/players.html":
        select("players");
        break;
    case "/partner.html":
        select("partner");
        break;
}

customElements.define('nika-header',
    class extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));

            const link = this.dataset.link || "index.html";
            shadowRoot.querySelector("div#home a").setAttribute("href", link)
            shadowRoot.querySelector("#menu_tab_btn").onclick = () => {
                var header = shadowRoot.querySelector("header");
                var isOpen = header.classList.contains("open");
                if (isOpen) {
                    header.classList.remove("open");
                } else {
                    header.classList.add("open");
                }
            };
        }
    }
);