# ngcx-breadcrumb

This breadcrumb library for Angular. Just fill in your config into the `allBreadcrumbs` property and you are good to go!

Stackblitz example:

## Table of Contents

- [ngcx-breadcrumb](#ngcx-breadcrumb)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Limitations](#limitations)
  - [Usage](#usage)
    - [Required fields](#required-fields)
    - [Html file usage](#html-file-usage)
    - [App module registration](#app-module-registration)
    - [Important remarks](#important-remarks)
  - [API](#api)
    - [Input](#input)
    - [Breadcrumb core objects \& enums](#breadcrumb-core-objects--enums)
    - [BreadcrumbService](#breadcrumbservice)
      - [Objects](#objects)
      - [Properties](#properties)
      - [Methods](#methods)

## Features

- Multiple type of titles available
- Conditional show of the entire breadcrumb
- Conditional show of the specific breadcrumb
- Show of the dynamic generated pages (details pages with id)
- Conditional navigation according to rules specified

## Installation

First you need to install the npm module:

```sh
npm install ngcx-breadcrumb --save
```

Choose the version corresponding to your Angular version:

| Angular     | ngcx-breadcrumb       |
| ----------- | --------------------- |
| 10/11/12/13 | 13.x (available soon) |
| 9           | 0.0.1-beta            |
| 8           | 8.x (available soon)  |
| 7           | 7.x (available soon)  |
| 6           | 6.x (available soon)  |
| 5           | 5.x (available soon)  |
| 4.3         | 4.x (available soon)  |
| 2 to 4.2.x  | 2.x (available soon)  |

## Limitations

- Only one wildcard for the ids

## Usage

### Required fields

- `homeRoute` : The route for the home page
- `allBreadcrumbs` : All the breadcrumbs in an array of the type Breadcrumb
- `isMobile` : Whether it currently a mobile resolution or not
- `currentNavigatedUrl` : Usually the URL
- `currentRoute` : The URL after redirects

### Html file usage

```html
<ngcx-breadcrumb
  [homeRoute]="homeRoute"
  [allBreadcrumbs]="allBreadcrumbs"
  [isMobile]="false"
  [currentNavigatedUrl]="currentNavigatedUrl"
>
</ngcx-breadcrumb>

<router-outlet></router-outlet>
```

### App module registration

Import statically the module

```typescript
 imports: [
    BrowserModule,
    AppRoutingModule,
    NgcxBreadcrumbModule.forRoot(),
    BrowserAnimationsModule,
  ]

```

### Important remarks

1. Make sure to use the lifecycles ngOnInit and ngOnDestroy when navigating
```typescript
 ngOnDestroy(): void {
    const pageInfo = [
      {
        id: null,
        wildCard: 'id',
      },
    ];
    this.breadcrumbService.updatePageInfo(pageInfo);
  }

  ngOnInit(): void {
    const pageInfo = [
      {
        id: '1',
        wildCard: 'id',
      },
    ];
    this.breadcrumbService.updatePageInfo(pageInfo);

    this.breadcrumbService.pageChangeSubject$.subscribe((page) => {
      if (page === null) {
        this.navigateBack();
      } else {
        this.routeTo(page);
      }
    });
  }
  public navigateBack() {
    this.location.back();
  }
  public routeTo(update: PageUpdate): void {
    this.router.navigate([update.route]);
  }
```

## API
### Input
1. `homeRoute` - The route for the home icon
2. `isMobile` - If enabled the short title will be used
3. `allBreadcrumbs` - The array of the Breadcrumb type which holds all the information about the breadcrumbs
4. `currentNavigatedUrl` - The current URL usually the url from the event url of the NavigationEnd object

### Breadcrumb core objects & enums

1. `BreadcrumbType` - States the kind of the breadcrumb that can be used:

   - `Static` : The route always stays the same, as a list page;
   - `Dynamic` : The route changes; For Example in a details page the id is changed according to the item that was selected from a list page.

2. `Breadcrumb` - The main object:
   - `name` : Represents the name of the breadcrumb;
   - `route` : Relative route of the current breadcrumb according to the current parent breadcrumb and sibling breadcrumbs (in the same breadcrumbs array);
   - `absoluteRoute` : The full route of the breadcrumb that includes the dynamic fields also the wildcards for the ids if it's a dynamic type;
   - `linkLast` : Whether it's the last breadcrumb to display or not the link
   - `title` : The actual value that is going to be displayed. You may need to translate it first before setting the title value;
   - `subTitle` : A value that is displayed along with the title separated by a dash
   - `shortTitle` : The value that will be displayed only for the mobile resolutions
   - `isId` : Marks a breadcrumb as a id breadcrumb
   - `show` : Whether to show or not the breadcrumb when it reaches own route
   - `showBreadcrumb` : If the URL has a valid breadcrumb the whole breadcrumb is displayed
   - `type` : Indicated whether it is static or dynamic
   - `breadcrumbs` : Child breadcrumbs of the current breadcrumbs

Values by default:

```typescript
export class Breadcrumb {
  name: string;
  route: string;
  absoluteRoute: string;
  linkLast? = false;
  title: string;
  subTitle?: string;
  shortTitle?: string;
  isId? = false;
  show? = false;
  showBreadcrumb? = false;
  type: BreadcrumbType = BreadcrumbType.Static;
  breadcrumbs: Breadcrumb[] = [];
}
```

Example:

```typescript

   public readonly allBreadcrumbs: Breadcrumb[] = [
    {
      name: 'main',
      title: '',
      route: 'main',
      absoluteRoute: 'main',
      type: BreadcrumbType.Static,
      breadcrumbs: [
        {
          name: 'reports-list',
          title: 'reportsList',
          route: 'reports-list',
          absoluteRoute: 'main/reports-list',
          type: BreadcrumbType.Static,
          breadcrumbs: null,
        },
        {
          name: 'order-list',
          title: 'orderList',
          route: 'order-list',
          absoluteRoute: 'main/order-list',
          type: BreadcrumbType.Static,
          show: true,
          breadcrumbs: [
            //*Order matters
            {
              name: this.idWildcard,
              title: 'orderList',
              subTitle: '',
              route: 'order-list',
              absoluteRoute: `main/order-list/${this.idWildcard}`,
              //*Order matters
              wildCards: [this.idWildcard],
              isId: true,
              type: BreadcrumbType.Dynamic,
              show: true,
              showBreadcrumb: true,
              breadcrumbs: [
                {
                  name: 'transport',
                  title: 'Transport Info',
                  route: 'transport',
                  shortTitle: 'TI',
                  wildCards: [this.idWildcard],
                  absoluteRoute: `main/order-list/${this.idWildcard}/transport`,
                  type: BreadcrumbType.Static,
                  show: true,
                  breadcrumbs: [
                    {
                      name: 'vehicle',
                      title: 'Vehicle Info',
                      route: 'vehicle',
                      wildCards: [this.idWildcard, this.vehicleIdWildcard],
                      absoluteRoute: `main/order-list/${this.idWildcard}/transport/${this.vehicleIdWildcard}`,
                      type: BreadcrumbType.Dynamic,
                      show: true,
                      breadcrumbs: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
```

### BreadcrumbService

#### Objects

- `PageInfo` : Holds information on:
  - `id` - the actual id of the page;
  - `viewId` - the dynamic id that should be displayed if it's provided;
- `PageUpdate` : Hold information on:
  - `route` - the relative route that should be used to navigate `this.router.navigate([route])`;
  - `isLogout` - to be used to check if a the route is for a logout.

#### Properties

- `pageInfoSubject$` : Observable used to communicate data about the page information (id, viewId). If the viewId is set it will be displayed instead of the Id. The case when a custom id should be displayed.
- `pageChangeSubject$` : Observable used to communicate data about the `route` and `isLogout`.

#### Methods

- `updatePageInfo` : Updates the data about the current page
- `updatePage` : Updates the route data
