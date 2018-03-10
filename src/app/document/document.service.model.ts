export class ProjectCatalog {
    public name: string
    public items: ProjectCatalogItem[]
}
export class ProjectCatalogItem {
    public id: string
    public title: string
    public subItems: ProjectCatalogItem[]
}
export class ApiInfo {
    public name: string
    public description: string
    public requestTableHeader: string[]
    public requestTableBody: string[][]
    public responseTableHeader: string[]
    public responseTableBody: string[][]
}