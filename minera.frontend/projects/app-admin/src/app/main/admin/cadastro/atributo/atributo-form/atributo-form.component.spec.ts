import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributoFormComponent } from './atributo-form.component';

describe('AtributoFormComponent', () => {
  let component: AtributoFormComponent;
  let fixture: ComponentFixture<AtributoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtributoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtributoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
