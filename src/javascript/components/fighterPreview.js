import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const { name, health, attack, defense, source } = fighter;
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (!fighter) return;
    const fighterMarkup = `
    <img src=${source} alt=${name}/>
    <p>Name: ${name}</p>
    <p>Health: ${health}</p>
    <p>Attack: ${attack}</p>
    <p>Defense: ${defense}</p>`;
    // todo: show fighter info (image, name, health, etc.)

    fighterElement.insertAdjacentHTML('beforeend', fighterMarkup);

    // eslint-disable-next-line consistent-return
    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
