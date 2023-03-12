let res = await fetch("component/footer.htm");
let text = await res.text();
let dom = new DOMParser().parseFromString(text, "text/html");
let html = dom.getElementsByTagName("body")[0].innerHTML;

let template = document.createElement("template");
template.innerHTML = html;

customElements.define('nika-footer',
    class extends HTMLElement {
        constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'})
            .appendChild(template.content.cloneNode(true));
        }
    }
);