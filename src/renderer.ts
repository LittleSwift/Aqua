import type { VNode } from './vnode';

export function render(vnode: VNode, container: HTMLElement) {
  const prevVNode = (container as any)._vnode;
  patch(prevVNode, vnode, container);
  (container as any)._vnode = vnode;
}

export function patch(oldVNode: VNode | null, newVNode: VNode, container: HTMLElement) {
  if (!oldVNode) {
    mountElement(newVNode, container);
  } else if (oldVNode.tag !== newVNode.tag) {
    const el = document.createElement(newVNode.tag);
    container.replaceChild(el, oldVNode.el!);
    newVNode.el = el;
  } else {
    const el = (newVNode.el = oldVNode.el!);
    if (typeof newVNode.children === 'string') {
      el.textContent = newVNode.children;
    } else if (Array.isArray(newVNode.children)) {
      el.innerHTML = '';
      newVNode.children.forEach(child => patch(null, child, el));
    }
  }
}

function mountElement(vnode: VNode, container: HTMLElement) {
  const el = document.createElement(vnode.tag);
  vnode.el = el;

  if (vnode.props) {
    for (const key in vnode.props) {
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key]);
      } else {
        el.setAttribute(key, vnode.props[key]);
      }
    }
  }

  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el));
  }

  container.appendChild(el);
}
