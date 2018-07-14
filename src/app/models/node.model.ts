/**
 * Generic class Node of tree
 */
import {ICategory} from '../app.interface';
import Category from './category.model';

export class Node<T> {

  entity: T;
  children: Array<Node<T>>;
  isOpen: boolean;

  /**
   * Use for calculate padding in tree
   * @type {number}
   */
  level = 1;

  private readonly parent: Node<T>;

  constructor(entity: T, parent: Node<T> = null) {
    this.entity = entity;
    this.parent = parent;
    this.children = [];
    this.isOpen = false;

    if ( this.parent ) {
      this.level = this.parent.level + 1;
    }

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
  addChild(entity: any): void {
    this.children.push( new Node<any>(entity, this) );
  }

  /**
   * Set children
   * @param {Array<T>} entities
   */
  setChildren(entities: Array<any>): void {
    this.children = entities.map( entity => new Node<T>(entity, this)).sort((a, b) => a.entity instanceof Category ? -1 : 1 );
  }

  get hasChildren(): boolean {
    return !!this.children.length;
  }


}
