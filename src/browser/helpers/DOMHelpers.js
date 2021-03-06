// User device specs detection
export function userDevice() {
  const viewport = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  const touchscreen = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
  let device = '';
  if (viewport.width > 950) {
    device = 'desktop';
  } else if (
    (viewport.width < 950 && viewport.width > 670) ||
    (viewport.width > 950)
  ) {
    device = 'tablet';
  } else {
    device = 'smartphone';
  }
  return { viewport, device, touchscreen };
}
// Scroll event handlers for smartphones and tablets
function artificialPreventDefault(e) {
  const event = e !== undefined ? e : window.event;
  if (event.preventDefault) {
    event.preventDefault();
  }
  event.returnValue = false;
}
export function disableScroll() {
  window.ontouchmove = artificialPreventDefault;
}
export function enableScroll() {
  window.ontouchmove = null;
}
// Replace all instances of a string within another string (buggy on IE)
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
