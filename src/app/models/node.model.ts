/**
 * Generic class Node of tree
 */
export class Node<T> {

  entity: T;
  children: Array<Node<T>>;

  private readonly parent: Node<T>;

  constructor(entity: T, parent: Node<T> = null) {
    this.entity = entity;
    this.parent = parent;
    this.children = [];
  }

  /**
   * Return parent node
   * @returns {Node<T>}
   */
  getParent(): Node<T> {
    return this.parent;
  }

  /**
   * Add child node
   * @param {T} entity
   */
  addChild(entity: T): void {
    this.children.push( new Node<T>(entity, this) );
  }

  /**
   * Set children
   * @param {Array<T>} entities
   */
  setChildren(entities: Array<T>): void {
    this.children = entities.map( entity => new Node<T>(entity));
  }

  get hasChildren(): boolean {
    return !!this.children.length;
  }


}
