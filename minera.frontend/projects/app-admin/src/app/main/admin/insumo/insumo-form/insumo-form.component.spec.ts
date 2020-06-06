import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoFormComponent } from './insumo-form.component';

describe('InsumoFormComponent', () => {
  let component: InsumoFormComponent;
  let fixture: ComponentFixture<InsumoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
