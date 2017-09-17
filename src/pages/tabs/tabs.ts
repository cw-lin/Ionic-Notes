import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { NotesPage } from '../class notes/notes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotesPage;
  tab2Root = SettingsPage;

  constructor() {

  }
}
