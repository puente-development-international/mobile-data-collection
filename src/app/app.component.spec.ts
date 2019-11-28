import { async, TestBed } from '@angular/core/testing';
import { Platform, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
} from '../../test-config/mocks-ionic';

describe('app Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  /*it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });*/

});
