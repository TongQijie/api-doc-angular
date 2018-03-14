import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeModel, NodeEvent, Ng2TreeSettings } from 'ng2-tree';

import { TreeNode } from 'primeng/api'

import { DocumentService } from './document.service'
import { ApiInfo } from './document.service.model'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers: [
    DocumentService
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: DocumentService) { }

  ngOnInit() {
    this.organization = this.route.snapshot.paramMap.get('organization');
    this.project = this.route.snapshot.paramMap.get('project');

    this.service.getProjectCatalog(this.organization, this.project).subscribe(
      data => {
        let nodes: TreeNode[] = []
        for (let i = 0; i < data.items.length; i++) {
          nodes[i] = {
            data: null,
            label: data.items[i].title,
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder",
            children: []
          }
          for (let j = 0; j < data.items[i].subItems.length; j++) {
            nodes[i].children[j] = {
              data: data.items[i].subItems[j].id,
              label: data.items[i].subItems[j].title,
              icon: "fa fa-code"
            }
          }
        }
        this.catalog = nodes

        // let model: TreeModel = {
        //   value: data.name,
        //   settings: {
        //     static: true,
        //   },
        //   children: []
        // }
        // for (let i = 0; i < data.items.length; i++) {
        //   model.children[i] = {
        //     id: data.items[i].id,
        //     value: data.items[i].title,
        //     children: []
        //   }
        //   for (let j = 0; j < data.items[i].subItems.length; j++) {
        //     model.children[i].children[j] = {
        //       id: data.items[i].subItems[j].id,
        //       value: data.items[i].subItems[j].title
        //     }
        //   }
        // }
        // this.catalog = model
      }, error => {
        console.log(error)
      })
  }

  public treeSettings: Ng2TreeSettings = {
    rootIsVisible: false
  };

  public organization: string

  public project: string

  //public catalog: TreeModel

  public catalog: TreeNode[]

  public selectedCatalogItem: TreeNode

  public info: ApiInfo

  public editable: boolean

  public clickCatalogItem(event): void {
    if (event.node.data == null) {
      this.info = null
      return
    }
    this.service.getApiInfo(event.node.data.toString()).subscribe(
      data => {
        this.info = data
        this.editable = false
      }, error => {
        console.log(error)
      });
  }

  public clickToEdit(): void {
    this.editable = true
  }

  public clickToSave(): void {

  }

  public clickToReview(): void {
    this.editable = false
  }
}