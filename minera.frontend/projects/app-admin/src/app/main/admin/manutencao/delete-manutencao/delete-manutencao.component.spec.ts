import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManutencaoComponent } from './delete-manutencao.component';

describe('DeleteManutencaoComponent', () => {
  let component: DeleteManutencaoComponent;
  let fixture: ComponentFixture<DeleteManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
