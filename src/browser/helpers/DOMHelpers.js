export function replaceAll(str, find, replace) {
  let string = str;
  if (Array.isArray(find)) {
    find.forEach(
      (test, index) => {
        string = string.replace(new RegExp(find[index], 'g'), replace[index]);
      },
    );
  } else {
    string = str.replace(new RegExp(find, 'g'), replace);
  }
  return str;
}

// recursively checks if a DOM element is the child of another
export function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }
  return isChildOf(child.parentNode, parent);
}

export function testOverlayer(e) {
  e.preventDefault();
  const doc = document.body;
  if (doc.classList.contains('menu_open')) {
    doc.classList.remove('menu_open');
    doc.classList.add('closing');
    setTimeout(() => { doc.classList.remove('closing'); }, 305);
  } else {
    doc.classList.add('menu_open');
  }
}
