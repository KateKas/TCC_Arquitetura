import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoFormComponent } from './manutencao-form.component';

describe('ManutencaoFormComponent', () => {
  let component: ManutencaoFormComponent;
  let fixture: ComponentFixture<ManutencaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutencaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
