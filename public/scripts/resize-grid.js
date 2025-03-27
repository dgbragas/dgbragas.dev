function resizeGrid() {
  const grid = document.querySelector('.masonry-grid');

  if (!grid) return;

  const items = grid.querySelectorAll('.masonry-grid__item');
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'),
  );
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue('gap'),
  );

  items.forEach(item => {
    const content = item.querySelector('.masonry-grid__item__content');

    if (!content) return;

    const contentHeight = content.getBoundingClientRect().height;

    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  });
}

function onImagesLoaded(callback) {
  const images = document.querySelectorAll('.masonry-grid img');
  let loaded = 0;

  if (images.length === 0) {
    callback();
    return;
  }

  images.forEach(img => {
    if (img.complete) {
      if (++loaded === images.length) callback();
    } else {
      img.onload = img.onerror = () => {
        if (++loaded === images.length) callback();
      };
    }
  });
}

window.addEventListener('load', () => {
  onImagesLoaded(() => resizeGrid());
});
window.addEventListener('resize', resizeGrid);
