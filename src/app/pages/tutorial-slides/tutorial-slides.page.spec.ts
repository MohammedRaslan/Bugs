import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorialSlidesPage } from './tutorial-slides.page';

describe('TutorialSlidesPage', () => {
  let component: TutorialSlidesPage;
  let fixture: ComponentFixture<TutorialSlidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialSlidesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialSlidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
