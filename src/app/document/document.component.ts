import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeModel, NodeEvent, Ng2TreeSettings } from 'ng2-tree';

import { DocumentService } from './document.service'
import { ApiInfo } from './document.service.model'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers: [
    DocumentService
  ]
})
export class DocumentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: DocumentService) { }

  ngOnInit() {
    let organization = this.route.snapshot.paramMap.get('organization');
    let project = this.route.snapshot.paramMap.get('project');

    this.service.getProjectCatalog(organization, project).subscribe(
      data => {
        let model: TreeModel = {
          value: data.name,
          settings: {
            static: true,
          },
          children: []
        }
        for (let i = 0; i < data.items.length; i++) {
          model.children[i] = {
            id: data.items[i].id,
            value: data.items[i].title,
            children: []
          }
          for (let j = 0; j < data.items[i].subItems.length; j++) {
            model.children[i].children[j] = {
              id: data.items[i].subItems[j].id,
              value: data.items[i].subItems[j].title
            }
          }
        }

        this.catalog = model
      }, error => {
        console.log(error)
      })
  }

  public treeSettings: Ng2TreeSettings = {
    rootIsVisible: false
  };

  public catalog: TreeModel

  public info: ApiInfo

  public clickCatalogItem(e: NodeEvent): void {
    if (e.node.node.id == null) {
      return;
    }
    this.service.getApiInfo(e.node.node.id.toString()).subscribe(
      data => {
        this.info = data
      }, error => {
        console.log(error)
      });
  }
}