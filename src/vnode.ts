export type VNode = {
  tag: string;
  props?: Record<string, any>;
  children?: VNode[] | string;
  el?: HTMLElement | null;
};

export function h(tag: string, props?: Record<string, any>, children?: VNode[] | string): VNode {
  return {
    tag,
    props,
    children,
    el: null
  };
}
