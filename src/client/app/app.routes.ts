import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { VatRoutes } from "./vat/components/vat.routes";
import {LoginRoutes} from "./+login/components/login.routes";
import {CostRoutes} from "./cost/components/cost.routes";
import {BookRoutes} from "./book/components/book.routes";
import {ActivumRoutes} from "./activum/components/activum.routes";
import {CostMatchRoutes} from "./match/components/match.routes";

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...VatRoutes,
  ...CostRoutes,
  ...CostMatchRoutes,
  ...BookRoutes,
  ...ActivumRoutes,
  ...LoginRoutes
];
