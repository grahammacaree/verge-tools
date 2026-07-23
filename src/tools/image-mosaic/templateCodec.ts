import { assetUrl } from '../../lib/assetUrl';

/** Legacy-compatible: btoa(encodeURIComponent(html)) */
export function encodeTemplateHtml(html: string): string {
  return btoa(encodeURIComponent(html));
}

export function decodeTemplateHtml(encoded: string): string {
  return decodeURIComponent(atob(encoded));
}

export function buildTemplateHtml(container: HTMLElement): string {
  const holder = document.createElement('div');
  holder.className = 'template-holder';
  const clone = container.cloneNode(true) as HTMLElement;
  holder.appendChild(clone);

  const placeholder = assetUrl('images/placeholder.png');
  holder.querySelectorAll('img').forEach((img) => {
    img.setAttribute('src', placeholder);
  });
  holder.querySelector('.background-container')?.remove();
  holder.querySelectorAll('.selected, .pannable, .draggable, .highlight').forEach((el) => {
    el.classList.remove('selected', 'pannable', 'draggable', 'highlight');
  });
  holder.querySelectorAll('.resize').forEach((el) => el.remove());
  holder.querySelectorAll('.inner-container').forEach((el) => {
    (el as HTMLElement).dataset.zoom = '1';
    (el as HTMLElement).style.transform = '';
  });
  holder.querySelectorAll('*').forEach((el) => {
    (el as HTMLElement).style.transform = '';
  });

  const imageContainer = holder.querySelector('.image-container');
  if (imageContainer) {
    imageContainer.removeAttribute('id');
    imageContainer.classList.add('template-display');
    imageContainer.classList.remove('image-container');
  }

  return holder.innerHTML;
}

