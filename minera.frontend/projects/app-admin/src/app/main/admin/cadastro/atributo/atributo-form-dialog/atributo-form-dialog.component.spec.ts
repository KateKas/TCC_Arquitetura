import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributoFormDialogComponent } from './atributo-form-dialog.component';

describe('AtributoFormDialogComponent', () => {
  let component: AtributoFormDialogComponent;
  let fixture: ComponentFixture<AtributoFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtributoFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtributoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
