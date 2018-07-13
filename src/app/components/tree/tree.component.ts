import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../models/node.model';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() nodes: Node<any>;

  constructor() { }

  ngOnInit() {
  }

}
