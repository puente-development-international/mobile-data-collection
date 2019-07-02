import { Component } from '@angular/core';

// Providers
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';


@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = DashboardPage;

  constructor(private auth: AuthProvider) { }

  ionViewCanEnter(): boolean {
    return this.auth.authenticated();
  }

}
