import { BreadcrumbType } from './breadcrumb-type';

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
