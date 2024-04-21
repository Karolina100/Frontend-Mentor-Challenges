export function createElementFromTemplate(templateId) {
    const templateElement = document.getElementById(templateId);
    if (!templateElement) {
        return null;
    }

    const templateElementClone = templateElement.content.cloneNode(true);
    if (templateElementClone.children.length === 0) {
        return null;
    }

    return templateElementClone.children[0];
}

export function renderHeader(container, title, description) {
    const headerElement = createElementFromTemplate("header-template");

    const headerTitleElement = headerElement.querySelector("h1");
    headerTitleElement.textContent = title;

    const headerDescriptionElement = headerElement.querySelector("p");
    headerDescriptionElement.textContent = description;

    container.prepend(headerElement);
}
